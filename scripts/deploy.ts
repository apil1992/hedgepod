import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

// Pyth Price IDs
const PRICE_IDS = {
  ETH_USD: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  USDC_USD: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  BTC_USD: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"
};

// Network-specific contract addresses
const NETWORK_CONFIG: Record<string, any> = {
  worldchain: {
    pythOracle: "0x0000000000000000000000000000000000000000", // Replace with actual
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000",
    depositToken: "0x0000000000000000000000000000000000000000", // USDC
  },
  base: {
    pythOracle: "0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000",
    depositToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  },
  baseSepolia: {
    pythOracle: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000",
    depositToken: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
  },
  celo: {
    pythOracle: "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000",
    depositToken: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C", // USDC on Celo
  },
  polygon: {
    pythOracle: "0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000",
    depositToken: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC on Polygon
  },
  zircuit: {
    pythOracle: "0x0000000000000000000000000000000000000000",
    chainlinkOracle: "0x0000000000000000000000000000000000000000",
    lzEndpoint: "0x0000000000000000000000000000000000000000",
    depositToken: "0x0000000000000000000000000000000000000000",
  }
};

async function main() {
  const networkName = network.name;
  console.log(`\n🚀 Deploying to ${networkName}...`);
  
  const [deployer] = await ethers.getSigners();
  console.log(`📝 Deployer address: ${deployer.address}`);
  console.log(`💰 Deployer balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH\n`);

  const config = NETWORK_CONFIG[networkName];
  if (!config) {
    throw new Error(`Network ${networkName} not configured`);
  }

  // Deploy YieldOracle
  console.log("📊 Deploying YieldOracle...");
  const YieldOracle = await ethers.getContractFactory("YieldOracle");
  const yieldOracle = await YieldOracle.deploy(
    config.pythOracle,
    config.chainlinkOracle
  );
  await yieldOracle.waitForDeployment();
  const yieldOracleAddress = await yieldOracle.getAddress();
  console.log(`✅ YieldOracle deployed to: ${yieldOracleAddress}`);

  // Deploy AutoYieldToken
  console.log("\n🪙 Deploying AutoYieldToken...");
  const AutoYieldToken = await ethers.getContractFactory("AutoYieldToken");
  const autoYieldToken = await AutoYieldToken.deploy(
    config.lzEndpoint,
    100 // 1% APR threshold
  );
  await autoYieldToken.waitForDeployment();
  const autoYieldTokenAddress = await autoYieldToken.getAddress();
  console.log(`✅ AutoYieldToken deployed to: ${autoYieldTokenAddress}`);

  // Set yield oracle in token
  console.log("🔗 Setting yield oracle in AutoYieldToken...");
  await autoYieldToken.setYieldOracle(yieldOracleAddress);
  console.log("✅ Yield oracle set");

  // Deploy HedgePodVault
  console.log("\n🏦 Deploying HedgePodVault...");
  const HedgePodVault = await ethers.getContractFactory("HedgePodVault");
  const vault = await HedgePodVault.deploy(
    config.depositToken,
    autoYieldTokenAddress,
    config.pythOracle,
    PRICE_IDS.ETH_USD,
    PRICE_IDS.USDC_USD
  );
  await vault.waitForDeployment();
  const vaultAddress = await vault.getAddress();
  console.log(`✅ HedgePodVault deployed to: ${vaultAddress}`);

  // Set yield oracle in vault
  console.log("🔗 Setting yield oracle in HedgePodVault...");
  await vault.setYieldOracle(yieldOracleAddress);
  console.log("✅ Yield oracle set");

  // Grant MINTER_ROLE to vault
  console.log("🔑 Granting MINTER_ROLE to vault...");
  const MINTER_ROLE = await autoYieldToken.MINTER_ROLE();
  await autoYieldToken.grantRole(MINTER_ROLE, vaultAddress);
  console.log("✅ MINTER_ROLE granted");

  // Deploy VolatilityFeeHook
  console.log("\n🎣 Deploying VolatilityFeeHook...");
  const poolManager = deployer.address; // Mock pool manager for now
  const VolatilityFeeHook = await ethers.getContractFactory("VolatilityFeeHook");
  const hook = await VolatilityFeeHook.deploy(
    config.pythOracle,
    poolManager,
    PRICE_IDS.ETH_USD
  );
  await hook.waitForDeployment();
  const hookAddress = await hook.getAddress();
  console.log(`✅ VolatilityFeeHook deployed to: ${hookAddress}`);

  // Save deployment info
  const deploymentInfo = {
    network: networkName,
    chainId: (await ethers.provider.getNetwork()).chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      YieldOracle: yieldOracleAddress,
      AutoYieldToken: autoYieldTokenAddress,
      HedgePodVault: vaultAddress,
      VolatilityFeeHook: hookAddress,
    },
    config: {
      pythOracle: config.pythOracle,
      chainlinkOracle: config.chainlinkOracle,
      lzEndpoint: config.lzEndpoint,
      depositToken: config.depositToken,
      priceIds: PRICE_IDS,
    }
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info to file
  const filename = path.join(deploymentsDir, `${networkName}.json`);
  fs.writeFileSync(filename, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n💾 Deployment info saved to: ${filename}`);

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Network:           ${networkName}`);
  console.log(`YieldOracle:       ${yieldOracleAddress}`);
  console.log(`AutoYieldToken:    ${autoYieldTokenAddress}`);
  console.log(`HedgePodVault:     ${vaultAddress}`);
  console.log(`VolatilityFeeHook: ${hookAddress}`);
  console.log("=".repeat(60));
  console.log("\n✨ Deployment complete!\n");

  // Verification instructions
  console.log("📝 To verify contracts, run:");
  console.log(`npx hardhat verify --network ${networkName} ${yieldOracleAddress} ${config.pythOracle} ${config.chainlinkOracle}`);
  console.log(`npx hardhat verify --network ${networkName} ${autoYieldTokenAddress} ${config.lzEndpoint} 100`);
  console.log(`npx hardhat verify --network ${networkName} ${vaultAddress} ${config.depositToken} ${autoYieldTokenAddress} ${config.pythOracle} ${PRICE_IDS.ETH_USD} ${PRICE_IDS.USDC_USD}`);
  console.log(`npx hardhat verify --network ${networkName} ${hookAddress} ${config.pythOracle} ${poolManager} ${PRICE_IDS.ETH_USD}`);
  console.log();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

