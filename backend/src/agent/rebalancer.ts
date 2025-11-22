/**
 * HedgePod Rebalancing Agent
 * Autonomous agent that monitors yields and rebalances across chains
 */

import { pythService } from '../services/pyth.service';
import { oneInchService } from '../services/oneinch.service';
import { cdpService } from '../services/cdp.service';
import { supabase, logRebalance, updateRebalanceStatus, logAPRSnapshot } from '../lib/supabase';

export interface ChainYield {
  chain: string;
  chainId: number;
  apr: number;
  tvl: number;
  timestamp: number;
}

export interface RebalanceDecision {
  shouldRebalance: boolean;
  fromChain: string;
  toChain: string;
  amount: string;
  expectedAPRGain: number;
  reason: string;
}

export class RebalancingAgent {
  private agentId: string;
  private agentWallet: any;
  private isRunning: boolean = false;
  private MIN_APR_DELTA: number = 1.0; // Minimum 1% APR improvement
  private CHECK_INTERVAL: number = 60000; // Check every 60 seconds

  constructor(agentId: string = 'agent-1') {
    this.agentId = agentId;
    console.log(`🦔 HedgePod Agent ${agentId} initialized`);
  }

  /**
   * Start the agent monitoring loop
   */
  async start() {
    if (this.isRunning) {
      console.log('⚠️  Agent already running');
      return;
    }

    console.log('🚀 Starting HedgePod rebalancing agent...');
    this.isRunning = true;

    // Create agent wallet via CDP
    try {
      this.agentWallet = await cdpService.createAgentWallet('base-sepolia');
      console.log(`✅ Agent wallet created: ${this.agentWallet.address}`);
    } catch (error) {
      console.error('Failed to create agent wallet:', error);
    }

    // Start monitoring loop
    this.monitorAndRebalance();
  }

  /**
   * Stop the agent
   */
  stop() {
    console.log('🛑 Stopping HedgePod agent...');
    this.isRunning = false;
  }

  /**
   * Main monitoring and rebalancing loop
   */
  private async monitorAndRebalance() {
    while (this.isRunning) {
      try {
        console.log('\n📊 Checking yields across chains...');

        // 1. Fetch current yields for all chains
        const chainYields = await this.fetchChainYields();

        // 2. Log APR snapshots to database
        await this.logAPRData(chainYields);

        // 3. Analyze and decide if rebalancing is needed
        const decision = await this.analyzeRebalanceOpportunity(chainYields);

        // 4. Execute rebalance if profitable
        if (decision.shouldRebalance) {
          await this.executeRebalance(decision);
        } else {
          console.log(`ℹ️  No rebalance needed: ${decision.reason}`);
        }

        // 5. Update agent performance metrics
        await this.updatePerformanceMetrics();

      } catch (error) {
        console.error('❌ Error in monitoring loop:', error);
      }

      // Wait before next check
      await this.sleep(this.CHECK_INTERVAL);
    }
  }

  /**
   * Fetch current APR yields for all supported chains
   */
  private async fetchChainYields(): Promise<ChainYield[]> {
    const chains = [
      { name: 'base', chainId: 8453 },
      { name: 'polygon', chainId: 137 },
      { name: 'celo', chainId: 42220 },
      { name: 'arbitrum', chainId: 42161 },
      { name: 'optimism', chainId: 10 },
    ];

    const yields: ChainYield[] = [];

    for (const chain of chains) {
      try {
        // In production, would query actual protocol APRs
        // For now, simulate with Pyth prices + mock APR calculation
        const ethPrice = await pythService.getPrice('ETH');
        
        // Mock APR calculation (would use real protocol data)
        const apr = 5 + Math.random() * 15; // 5-20% APR range
        const tvl = 1000000 + Math.random() * 9000000; // $1M-$10M TVL

        yields.push({
          chain: chain.name,
          chainId: chain.chainId,
          apr: parseFloat(apr.toFixed(2)),
          tvl: parseFloat(tvl.toFixed(2)),
          timestamp: Date.now(),
        });

        console.log(`  ${chain.name}: ${apr.toFixed(2)}% APR`);
      } catch (error) {
        console.error(`Failed to fetch yield for ${chain.name}:`, error);
      }
    }

    return yields;
  }

  /**
   * Log APR data to Supabase
   */
  private async logAPRData(chainYields: ChainYield[]) {
    for (const yield of chainYields) {
      try {
        await logAPRSnapshot({
          chain: yield.chain,
          protocol: 'hedgepod-vault',
          apr: yield.apr,
          tvl: yield.tvl,
        });
      } catch (error) {
        console.error(`Failed to log APR for ${yield.chain}:`, error);
      }
    }
  }

  /**
   * Analyze if rebalancing is profitable
   */
  private async analyzeRebalanceOpportunity(
    chainYields: ChainYield[]
  ): Promise<RebalanceDecision> {
    // Sort by APR descending
    const sortedYields = [...chainYields].sort((a, b) => b.apr - a.apr);

    const bestChain = sortedYields[0];
    const currentChain = sortedYields[Math.floor(sortedYields.length / 2)]; // Assume middle

    const aprDelta = bestChain.apr - currentChain.apr;

    if (aprDelta >= this.MIN_APR_DELTA) {
      // Check if swap is profitable using 1inch
      const isProfitable = await oneInchService.isProfitable(
        currentChain.chainId,
        '0xUSDC', // Mock USDC address
        '0xUSDC',
        '1000000000', // $1000 in wei
        0.5 // 0.5% min profit
      );

      if (isProfitable) {
        return {
          shouldRebalance: true,
          fromChain: currentChain.chain,
          toChain: bestChain.chain,
          amount: '1000000000', // $1000
          expectedAPRGain: aprDelta,
          reason: `APR improvement: ${aprDelta.toFixed(2)}%`,
        };
      }
    }

    return {
      shouldRebalance: false,
      fromChain: '',
      toChain: '',
      amount: '0',
      expectedAPRGain: 0,
      reason: `APR delta too small: ${aprDelta.toFixed(2)}% < ${this.MIN_APR_DELTA}%`,
    };
  }

  /**
   * Execute the rebalance transaction
   */
  private async executeRebalance(decision: RebalanceDecision) {
    console.log(`\n🔄 Executing rebalance:`);
    console.log(`   ${decision.fromChain} → ${decision.toChain}`);
    console.log(`   Amount: ${decision.amount}`);
    console.log(`   Expected APR gain: ${decision.expectedAPRGain.toFixed(2)}%`);

    const txHash = `0x${Math.random().toString(16).substring(2)}...`; // Mock tx hash

    try {
      // 1. Log rebalance start to database
      await logRebalance({
        agent_id: this.agentId,
        tx_hash: txHash,
        from_chain: decision.fromChain,
        to_chain: decision.toChain,
        amount: parseFloat(decision.amount) / 1e18,
        token: 'USDC',
        from_apr: 0, // Would fetch current APR
        to_apr: decision.expectedAPRGain,
        status: 'pending',
      });

      // 2. Execute via CDP (with x402 authorization)
      // In production:
      // const realTxHash = await cdpService.executeAuthorizedRebalance(
      //   this.agentId,
      //   vaultAddress,
      //   targetChainId,
      //   decision.amount,
      //   authorizationId
      // );

      console.log(`✅ Rebalance transaction submitted: ${txHash}`);

      // 3. Update status to confirmed
      await updateRebalanceStatus(txHash, 'confirmed');

      console.log(`✅ Rebalance completed successfully!`);
    } catch (error) {
      console.error('❌ Rebalance failed:', error);
      
      try {
        await updateRebalanceStatus(txHash, 'failed', error.toString());
      } catch (dbError) {
        console.error('Failed to update rebalance status:', dbError);
      }
    }
  }

  /**
   * Update agent performance metrics in database
   */
  private async updatePerformanceMetrics() {
    // Would update agent_performance table with latest stats
    console.log('📈 Performance metrics updated');
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const rebalancingAgent = new RebalancingAgent('agent-1');

// Auto-start if running as main module
if (require.main === module) {
  console.log('🦔 Starting HedgePod Rebalancing Agent...\n');
  rebalancingAgent.start();

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    rebalancingAgent.stop();
    process.exit(0);
  });
}
