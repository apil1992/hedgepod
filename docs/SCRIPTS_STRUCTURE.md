# HedgePod Scripts Structure

Clean, organized structure for all deployment and utility scripts.

## 📁 New Structure

```
hedgepod/
├── config/                           # ⭐ Root-level configurations
│   ├── networks.ts                  # Network configs (all chains)
│   ├── priceIds.ts                  # Pyth price feed IDs
│   ├── index.ts                     # Barrel exports
│   └── README.md                    # Config documentation
│
├── scripts/
│   ├── deploy/                      # ⭐ Deployment scripts
│   │   ├── deployer.ts             # Main comprehensive deployer
│   │   └── deploy-all.js           # Multi-network orchestrator
│   │
│   ├── verify/                      # ⭐ Verification scripts
│   │   └── verify.ts               # Contract verification
│   │
│   ├── abi/                         # ABI management
│   │   ├── saveAbi.mjs             # Save contract ABIs
│   │   └── cleanAbi.mjs            # Clean old ABIs
│   │
│   ├── logs/                        # Logging utilities
│   │   ├── console_logger.mjs      # Colored console output
│   │   └── data/
│   │       └── data_logger.mjs     # Save deployment data
│   │
│   ├── check/                       # Status checking
│   │   └── checkBalance.mjs        # Check deployer balance
│   │
│   ├── faucet/                      # Test tokens
│   │   └── mintUSDC.mjs            # Mint test USDC
│   │
│   ├── roles/                       # Access control
│   │   └── assignRoles.mjs         # Assign contract roles
│   │
│   ├── environment/                 # Env management
│   │   └── envUpdater.mjs          # Update .env files
│   │
│   └── README.md                    # Scripts documentation
│
├── deployments/                     # Deployment outputs
│   ├── baseSepolia.json            # Latest deployments
│   ├── deployment-*.json           # Historical deployments
│   └── abis/                        # Contract ABIs
│
├── Makefile                         # ⭐ All commands
└── docs/
    └── DEPLOYMENT.md                # Deployment guide
```

---

## 🔄 What Changed

### Before (Messy)
```
scripts/
├── deployer.ts              ❌ At root
├── deploy-new.ts            ❌ Old name
├── deploy.ts                ❌ Redundant
├── deploy-all.js            ❌ At root
├── verify.ts                ❌ At root
├── config/                  ❌ In scripts
│   ├── networks.ts
│   └── priceIds.ts
└── ...other folders
```

### After (Clean) ✅
```
config/                      ✅ At project root
├── networks.ts
├── priceIds.ts
└── index.ts

scripts/
├── deploy/                  ✅ Organized
│   ├── deployer.ts         ✅ Renamed from deploy-new.ts
│   └── deploy-all.js
├── verify/                  ✅ Organized
│   └── verify.ts
└── ...other folders
```

---

## 📝 Updated Paths

### Scripts

| Old Path | New Path |
|----------|----------|
| `scripts/deploy-new.ts` | `scripts/deploy/deployer.ts` |
| `scripts/deploy.ts` | ❌ **DELETED** (redundant) |
| `scripts/deploy-all.js` | `scripts/deploy/deploy-all.js` |
| `scripts/verify.ts` | `scripts/verify/verify.ts` |
| `scripts/config/*` | `config/*` (moved to root) |

### Imports in Scripts

**deployer.ts:**
- Config import: `../config` → `../../config`
- File paths: `__dirname, ".."` → `__dirname, "..", ".."`

**deploy-all.js:**
- Script path: `scripts/deployer.ts` → `scripts/deploy/deployer.ts`

**verify.ts:**
- File paths: `__dirname, ".."` → `__dirname, "..", ".."`

### Makefile Commands

All deployment and verification commands updated:
```bash
# Before
npx hardhat run scripts/deployer.ts --network base

# After
npx hardhat run scripts/deploy/deployer.ts --network base
```

---

## 🚀 Usage

### Deploy Commands

```bash
# Interactive deployment
make deploy

# Deploy to specific network
make deploy-base
make deploy-world
make deploy-celo

# Deploy to all networks
make deploy-all
```

### Direct Script Execution

```bash
# Main deployer
npx hardhat run scripts/deploy/deployer.ts --network baseSepolia

# Multi-network deployment
node scripts/deploy/deploy-all.js

# Verification
npx hardhat run scripts/verify/verify.ts --network baseSepolia
```

---

## 🎯 Benefits

### ✅ Better Organization
- Related scripts grouped in folders
- Clear separation of concerns
- Easier to find scripts

### ✅ Cleaner Root
- No script clutter at root level
- Organized by function

### ✅ Scalability
- Easy to add new deployment scripts
- Easy to add new verification scripts
- Room for growth

### ✅ Consistency
- All deployment scripts in `deploy/`
- All verification scripts in `verify/`
- Utility scripts in descriptive folders

---

## 📚 Documentation Updated

All documentation has been updated to reflect the new structure:

✅ `Makefile` - All script paths updated  
✅ `scripts/README.md` - Structure documented  
✅ `docs/DEPLOYMENT.md` - Paths updated  
✅ `config/README.md` - Root-level config documented  

---

## 🧪 Testing

To verify everything works:

```bash
# 1. Check structure
ls -la scripts/deploy/
ls -la scripts/verify/
ls -la config/

# 2. Test compilation (if TypeScript)
npx tsc scripts/deploy/deployer.ts --noEmit --skipLibCheck

# 3. Test make commands
make help
make compile
make test

# 4. Test deployment (dry run)
npx hardhat run scripts/deploy/deployer.ts --network hardhat
```

---

**Last Updated:** 2025-01-22  
**Status:** ✅ Complete and tested

