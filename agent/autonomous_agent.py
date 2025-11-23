#!/usr/bin/env python3
"""
HedgePod Autonomous Agent
Monitors APRs across chains and triggers rebalances when profitable

This script runs 24/7 and:
1. Monitors APRs using Pyth Network data
2. Calculates gas costs for rebalancing
3. Only rebalances when APR improvement exceeds costs
4. Logs all decisions transparently
5. Uses Coinbase CDP Server Wallets for execution

Usage:
    python autonomous_agent.py --agent-id <agent_id>

Environment Variables:
    COINBASE_CDP_API_KEY - CDP API key
    COINBASE_CDP_SECRET - CDP API secret  
    SUPABASE_URL - Supabase project URL
    SUPABASE_SERVICE_KEY - Supabase service key
    PYTH_HERMES_API_URL - Pyth Hermes API endpoint
"""

import asyncio
import os
import sys
import logging
import time
from datetime import datetime
from typing import Dict, List, Optional
import requests
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(f'agent_{datetime.now().strftime("%Y%m%d")}.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class HedgePodAgent:
    """Autonomous yield optimization agent"""
    
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.is_running = False
        
        # Configuration
        self.check_interval = int(os.getenv('CHECK_INTERVAL_SECONDS', '300'))  # 5 minutes default
        self.min_apr_improvement = float(os.getenv('MIN_APR_IMPROVEMENT', '0.5'))  # 0.5% minimum
        self.gas_safety_margin = float(os.getenv('GAS_SAFETY_MARGIN', '1.5'))  # 1.5x gas estimate
        
        # API endpoints
        self.supabase_url = os.getenv('SUPABASE_URL')
        self.supabase_key = os.getenv('SUPABASE_SERVICE_KEY')
        self.pyth_api = os.getenv('PYTH_HERMES_API_URL', 'https://hermes.pyth.network')
        self.oneinch_api = os.getenv('ONEINCH_API_URL', 'https://api.1inch.dev')
        
        # CDP credentials
        self.cdp_api_key = os.getenv('COINBASE_CDP_API_KEY')
        self.cdp_secret = os.getenv('COINBASE_CDP_SECRET')
        
        # Supported chains
        self.chains = ['base', 'optimism', 'arbitrum', 'polygon', 'celo', 'avalanche', 'world-chain']
        
        logger.info(f"🤖 Initialized HedgePod Agent {agent_id}")
        logger.info(f"📊 Check interval: {self.check_interval}s")
        logger.info(f"💹 Min APR improvement: {self.min_apr_improvement}%")

    async def get_agent_config(self) -> Dict:
        """Fetch agent configuration from Supabase"""
        try:
            headers = {
                'apikey': self.supabase_key,
                'Authorization': f'Bearer {self.supabase_key}',
                'Content-Type': 'application/json'
            }
            
            response = requests.get(
                f'{self.supabase_url}/rest/v1/agent_performance',
                headers=headers,
                params={'agent_id': f'eq.{self.agent_id}'}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data:
                    return data[0]
            
            logger.error(f"Failed to fetch agent config: {response.status_code}")
            return {}
        except Exception as e:
            logger.error(f"Error fetching agent config: {e}")
            return {}

    async def fetch_chain_aprs(self) -> Dict[str, float]:
        """Fetch current APRs for all active chains"""
        aprs = {}
        
        for chain in self.chains:
            try:
                # In production, this would call actual DeFi protocol APIs
                # For now, we'll use a mock implementation
                # TODO: Integrate with Aave, Compound, Yearn APIs
                
                # Mock APR (replace with real API calls)
                base_apr = 3.5
                volatility = await self._get_chain_volatility(chain)
                apr = base_apr + (volatility * 0.1)  # APR increases with volatility
                
                aprs[chain] = round(apr, 2)
                logger.debug(f"📈 {chain}: {apr}% APR")
                
            except Exception as e:
                logger.error(f"Error fetching APR for {chain}: {e}")
                aprs[chain] = 0.0
        
        return aprs

    async def _get_chain_volatility(self, chain: str) -> float:
        """Get chain volatility from Pyth Network"""
        try:
            # Fetch ETH/USD price data as proxy for chain volatility
            response = requests.get(
                f'{self.pyth_api}/api/latest_price_feeds',
                params={'ids[]': '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'}  # ETH/USD
            )
            
            if response.status_code == 200:
                data = response.json()
                if data:
                    price_feed = data[0]
                    price = int(price_feed['price']['price'])
                    conf = int(price_feed['price']['conf'])
                    
                    # Calculate volatility as confidence interval / price
                    volatility = (conf / abs(price)) * 100
                    return volatility
            
            return 1.0  # Default volatility
            
        except Exception as e:
            logger.error(f"Error fetching volatility: {e}")
            return 1.0

    async def estimate_gas_cost(self, from_chain: str, to_chain: str, amount: float) -> float:
        """Estimate gas cost for cross-chain rebalance"""
        try:
            # Simplified gas estimation
            # TODO: Use actual gas price oracles
            
            base_gas = {
                'base': 0.0001,  # ETH
                'optimism': 0.0001,
                'arbitrum': 0.0001,
                'polygon': 0.05,  # MATIC
                'celo': 0.001,
                'avalanche': 0.01,  # AVAX
                'world-chain': 0.0001,
            }
            
            # Cross-chain adds LayerZero fee
            lz_fee = 0.002  # ~$2 in ETH
            
            total_gas_eth = base_gas.get(from_chain, 0.001) + lz_fee
            
            # Convert to USD (simplified)
            eth_price = 2500  # TODO: Get real-time ETH price
            gas_cost_usd = total_gas_eth * eth_price
            
            return gas_cost_usd
            
        except Exception as e:
            logger.error(f"Error estimating gas: {e}")
            return 999999.0  # High cost to prevent execution on error

    async def calculate_rebalance_profitability(
        self, 
        current_chain: str,
        current_apr: float,
        target_chain: str,
        target_apr: float,
        amount_usd: float
    ) -> Dict:
        """Calculate if rebalancing is profitable"""
        
        # APR improvement (annualized)
        apr_delta = target_apr - current_apr
        
        # Daily yield improvement
        daily_improvement = (amount_usd * apr_delta / 100) / 365
        
        # Estimate gas cost
        gas_cost = await self.estimate_gas_cost(current_chain, target_chain, amount_usd)
        
        # Calculate break-even days
        if daily_improvement > 0:
            break_even_days = gas_cost / daily_improvement
        else:
            break_even_days = 999999
        
        # Profitable if break-even < 30 days and APR improvement > minimum
        is_profitable = (
            break_even_days < 30 and
            apr_delta > self.min_apr_improvement
        )
        
        return {
            'is_profitable': is_profitable,
            'apr_delta': apr_delta,
            'daily_improvement_usd': daily_improvement,
            'gas_cost_usd': gas_cost,
            'break_even_days': break_even_days,
            'target_chain': target_chain,
            'target_apr': target_apr
        }

    async def execute_rebalance(self, from_chain: str, to_chain: str, amount: float):
        """Execute cross-chain rebalance using CDP"""
        try:
            logger.info(f"🔄 Executing rebalance: {from_chain} → {to_chain} ({amount} USDC)")
            
            # TODO: Implement actual CDP wallet transaction
            # 1. Withdraw from source chain
            # 2. Bridge via LayerZero
            # 3. Deposit to target chain
            
            # Mock execution for now
            await asyncio.sleep(2)
            
            # Log to Supabase
            await self._log_rebalance(from_chain, to_chain, amount, 'success')
            
            logger.info(f"✅ Rebalance completed successfully")
            
        except Exception as e:
            logger.error(f"❌ Rebalance failed: {e}")
            await self._log_rebalance(from_chain, to_chain, amount, 'failed', str(e))

    async def _log_rebalance(
        self, 
        from_chain: str, 
        to_chain: str, 
        amount: float, 
        status: str,
        error: Optional[str] = None
    ):
        """Log rebalance event to Supabase"""
        try:
            headers = {
                'apikey': self.supabase_key,
                'Authorization': f'Bearer {self.supabase_key}',
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            }
            
            payload = {
                'agent_id': self.agent_id,
                'from_chain': from_chain,
                'to_chain': to_chain,
                'amount': amount,
                'status': status,
                'tx_hash': '0x' + 'mock' * 16,  # TODO: Real tx hash
                'timestamp': datetime.utcnow().isoformat(),
                'error_message': error
            }
            
            response = requests.post(
                f'{self.supabase_url}/rest/v1/rebalancing_history',
                headers=headers,
                json=payload
            )
            
            if response.status_code not in [200, 201]:
                logger.error(f"Failed to log rebalance: {response.text}")
                
        except Exception as e:
            logger.error(f"Error logging rebalance: {e}")

    async def monitor_and_rebalance(self):
        """Main monitoring loop"""
        logger.info(f"🚀 Starting autonomous monitoring for agent {self.agent_id}")
        
        self.is_running = True
        
        while self.is_running:
            try:
                # Fetch agent config
                config = await self.get_agent_config()
                
                if not config:
                    logger.warning("No agent config found, retrying...")
                    await asyncio.sleep(self.check_interval)
                    continue
                
                current_chain = config.get('current_chain', 'base')
                total_deposited = float(config.get('total_deposited', 0))
                
                if total_deposited <= 0:
                    logger.info("No deposits, skipping rebalance check")
                    await asyncio.sleep(self.check_interval)
                    continue
                
                # Fetch APRs for all chains
                logger.info("📊 Fetching chain APRs...")
                chain_aprs = await self.fetch_chain_aprs()
                
                current_apr = chain_aprs.get(current_chain, 0)
                logger.info(f"💰 Current position: {current_chain} @ {current_apr}% APR ({total_deposited} USDC)")
                
                # Find best opportunity
                best_opportunity = None
                best_profit = None
                
                for target_chain, target_apr in chain_aprs.items():
                    if target_chain == current_chain:
                        continue
                    
                    profit = await self.calculate_rebalance_profitability(
                        current_chain,
                        current_apr,
                        target_chain,
                        target_apr,
                        total_deposited
                    )
                    
                    if profit['is_profitable']:
                        if best_profit is None or profit['daily_improvement_usd'] > best_profit['daily_improvement_usd']:
                            best_profit = profit
                            best_opportunity = target_chain
                
                # Execute if profitable
                if best_opportunity and best_profit:
                    logger.info(f"🎯 Profitable opportunity found!")
                    logger.info(f"   Target: {best_opportunity} @ {best_profit['target_apr']}% APR")
                    logger.info(f"   APR Delta: +{best_profit['apr_delta']:.2f}%")
                    logger.info(f"   Daily Improvement: ${best_profit['daily_improvement_usd']:.2f}")
                    logger.info(f"   Gas Cost: ${best_profit['gas_cost_usd']:.2f}")
                    logger.info(f"   Break-even: {best_profit['break_even_days']:.1f} days")
                    
                    await self.execute_rebalance(current_chain, best_opportunity, total_deposited)
                else:
                    logger.info(f"✋ No profitable rebalance opportunity. Staying on {current_chain}")
                
                # Wait before next check
                logger.info(f"⏰ Next check in {self.check_interval} seconds\n")
                await asyncio.sleep(self.check_interval)
                
            except Exception as e:
                logger.error(f"Error in monitoring loop: {e}")
                await asyncio.sleep(self.check_interval)

    def stop(self):
        """Stop the agent"""
        logger.info("🛑 Stopping agent...")
        self.is_running = False


async def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description='HedgePod Autonomous Agent')
    parser.add_argument('--agent-id', required=True, help='Agent ID from database')
    args = parser.parse_args()
    
    agent = HedgePodAgent(args.agent_id)
    
    try:
        await agent.monitor_and_rebalance()
    except KeyboardInterrupt:
        logger.info("\n👋 Received shutdown signal")
        agent.stop()


if __name__ == '__main__':
    asyncio.run(main())

