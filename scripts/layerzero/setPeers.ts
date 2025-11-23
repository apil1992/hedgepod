/**
 * LayerZero V2 Set Peers Script
 * 
 * This script configures cross-chain peers for AutoYieldToken OFT,
 * allowing it to send/receive tokens across multiple chains.
 * 
 * Usage:
 *   npx hardhat run scripts/layerzero/setPeers.ts --network baseSepolia
 */

import { ethers, network } from "hardhat";
import { NETWORK_CONFIG } from "../../config/networks";
import * as fs from "fs";
import * as path from "path";

// Read deployment addresses
const deploymentsPath = path.join(__dirname, "../../deployments");

interface DeploymentData {
  network: string;
  chainId: number;
  timestamp: string;
  contracts: {
    AutoYieldToken?: { address: string };
  };
}

interface PeerConfig {
  network: string;
  eid: number;
  address: string;
}

/**
 * Convert an Ethereum address to bytes32 format for LayerZero
 */
function addressToBytes32(address: string): string {
  // Remove 0x prefix, pad to 32 bytes
  const addr = address.toLowerCase().replace('0x', '');
  return '0x' + '0'.repeat(24) + addr;
}

/**
 * Load deployment data for a specific network
 */
function loadDeployment(networkName: string): DeploymentData | null {
  const filePath = path.join(deploymentsPath, `${networkName}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No deployment found for ${networkName}`);
    return null;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return data;
}

/**
 * Get all deployed OFT instances across chains
 */
function getAllDeployedPeers(): PeerConfig[] {
  const peers: PeerConfig[] = [];
  
  for (const [networkName, config] of Object.entries(NETWORK_CONFIG)) {
    if (networkName === 'hardhat' || networkName === 'localhost') {
      continue; // Skip local networks
    }
    
    const deployment = loadDeployment(networkName);
    if (deployment && deployment.contracts.AutoYieldToken) {
      peers.push({
        network: networkName,
        eid: config.lzEid,
        address: deployment.contracts.AutoYieldToken.address
      });
    }
  }
  
  return peers;
}

async function main() {
  console.log("\n🔗 LayerZero V2 - Setting OFT Peers\n");
  console.log(`📡 Current Network: ${network.name}`);
  
  // Get current network config
  const currentConfig = NETWORK_CONFIG[network.name];
  if (!currentConfig) {
    throw new Error(`Network ${network.name} not configured`);
  }
  
  console.log(`🆔 Current EID: ${currentConfig.lzEid}`);
  
  // Load current deployment
  const deployment = loadDeployment(network.name);
  if (!deployment || !deployment.contracts.AutoYieldToken) {
    throw new Error(`AutoYieldToken not deployed on ${network.name}`);
  }
  
  const oftAddress = deployment.contracts.AutoYieldToken.address;
  console.log(`📍 AutoYieldToken: ${oftAddress}\n`);
  
  // Get contract instance
  const oft = await ethers.getContractAt("AutoYieldToken", oftAddress);
  
  // Get all deployed peers
  const allPeers = getAllDeployedPeers();
  console.log(`Found ${allPeers.length} deployed OFT instances:\n`);
  
  // Set peers for each remote chain
  let setPeerCount = 0;
  
  for (const peer of allPeers) {
    // Skip self
    if (peer.network === network.name) {
      continue;
    }
    
    console.log(`\n🌉 Setting peer for ${peer.network}:`);
    console.log(`   EID: ${peer.eid}`);
    console.log(`   Address: ${peer.address}`);
    
    try {
      // Convert address to bytes32
      const peerBytes32 = addressToBytes32(peer.address);
      console.log(`   Bytes32: ${peerBytes32}`);
      
      // Check if peer is already set
      const existingPeer = await oft.peers(peer.eid);
      if (existingPeer !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
        console.log(`   ⚠️  Peer already set, skipping...`);
        continue;
      }
      
      // Set peer (LayerZero V2 OFT uses setPeer function)
      const tx = await oft.setPeer(peer.eid, peerBytes32);
      console.log(`   📤 Transaction: ${tx.hash}`);
      
      await tx.wait();
      console.log(`   ✅ Peer set successfully`);
      
      setPeerCount++;
      
    } catch (error: any) {
      console.error(`   ❌ Error setting peer: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Set ${setPeerCount} peers for ${network.name}`);
  console.log(`\n📝 Summary:`);
  console.log(`   Current Network: ${network.name}`);
  console.log(`   Current EID: ${currentConfig.lzEid}`);
  console.log(`   OFT Address: ${oftAddress}`);
  console.log(`   Peers Set: ${setPeerCount}/${allPeers.length - 1}`);
  console.log(`\n✨ Cross-chain routing configured!\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

