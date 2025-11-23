# 🤖 HedgePod Autonomous Agent

**True 24/7 autonomous yield optimization across 7 blockchain networks**

## 🌟 What It Does

Your HedgePod agent is a **real autonomous program** that:

1. ✅ **Monitors APRs** across all your selected chains every 5 minutes
2. ✅ **Calculates profitability** by comparing APR improvements vs. gas costs  
3. ✅ **Executes rebalances** automatically when the math makes sense
4. ✅ **Logs everything** transparently to your Supabase database
5. ✅ **Never sleeps** - runs 24/7 in the cloud or on your server

## 📊 How It Works

```
┌─────────────────┐
│  Pyth Network   │ ──> Real-time APR data
│  1inch APIs     │ ──> Liquidity & routing
│  Chain RPCs     │ ──> Gas prices
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Agent Logic    │ ──> Profit calculation
│                 │     • APR delta
│                 │     • Gas cost
│                 │     • Break-even days
└─────────────────┘
         │
         ▼
   Is profitable?
   APR > gas costs?
         │
         ├─ NO  ──> Wait 5 minutes, check again
         │
         └─ YES ──> Execute rebalance
                    └──> CDP Server Wallet
                         └──> x402 authorization
                              └──> LayerZero bridge
                                   └──> Log to Supabase
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# 1. Copy environment template
cp .env.example .env

# 2. Fill in your credentials
nano .env

# 3. Run agent
docker-compose up -d

# 4. View logs
docker-compose logs -f
```

### Option 2: Python

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set environment variables
export AGENT_ID=your-agent-id
export COINBASE_CDP_API_KEY=your-key
export SUPABASE_URL=https://your-project.supabase.co
# ... (see Configuration section)

# 3. Run agent
python autonomous_agent.py --agent-id your-agent-id
```

### Option 3: Systemd (Linux Server)

```bash
# 1. Copy service file
sudo cp hedgepod-agent.service /etc/systemd/system/

# 2. Edit configuration
sudo nano /etc/systemd/system/hedgepod-agent.service

# 3. Enable and start
sudo systemctl enable hedgepod-agent
sudo systemctl start hedgepod-agent

# 4. Check status
sudo systemctl status hedgepod-agent
sudo journalctl -u hedgepod-agent -f
```

## ⚙️ Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AGENT_ID` | Your agent ID from database | `agent-123` |
| `COINBASE_CDP_API_KEY` | CDP API key | `organizations/xxx/apiKeys/yyy` |
| `COINBASE_CDP_SECRET` | CDP private key | `-----BEGIN EC PRIVATE KEY-----\n...` |
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | `eyJhbG...` |

### Optional Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CHECK_INTERVAL_SECONDS` | `300` | How often to check APRs (5 min) |
| `MIN_APR_IMPROVEMENT` | `0.5` | Minimum APR delta to rebalance (0.5%) |
| `GAS_SAFETY_MARGIN` | `1.5` | Multiply gas estimates by this (1.5x) |
| `PYTH_HERMES_API_URL` | `https://hermes.pyth.network` | Pyth API endpoint |
| `ONEINCH_API_URL` | `https://api.1inch.dev` | 1inch API endpoint |

## 📈 Example Agent Behavior

### Scenario 1: Profitable Rebalance

```
[2025-01-15 10:30:00] [INFO] 📊 Fetching chain APRs...
[2025-01-15 10:30:02] [INFO] 💰 Current position: base @ 3.2% APR (1000 USDC)
[2025-01-15 10:30:03] [INFO] 🎯 Profitable opportunity found!
[2025-01-15 10:30:03] [INFO]    Target: arbitrum @ 4.5% APR
[2025-01-15 10:30:03] [INFO]    APR Delta: +1.30%
[2025-01-15 10:30:03] [INFO]    Daily Improvement: $0.36
[2025-01-15 10:30:03] [INFO]    Gas Cost: $3.50
[2025-01-15 10:30:03] [INFO]    Break-even: 9.7 days
[2025-01-15 10:30:03] [INFO] 🔄 Executing rebalance: base → arbitrum (1000 USDC)
[2025-01-15 10:30:08] [INFO] ✅ Rebalance completed successfully
[2025-01-15 10:35:08] [INFO] ⏰ Next check in 300 seconds
```

### Scenario 2: Not Profitable

```
[2025-01-15 10:35:00] [INFO] 📊 Fetching chain APRs...
[2025-01-15 10:35:02] [INFO] 💰 Current position: arbitrum @ 4.5% APR (1000 USDC)
[2025-01-15 10:35:03] [INFO] ✋ No profitable rebalance opportunity. Staying on arbitrum
[2025-01-15 10:35:03] [INFO] ⏰ Next check in 300 seconds
```

## 🔒 Security Features

1. **x402 Authorization** - Agent can only rebalance, never withdraw funds
2. **CDP Server Wallets** - Secure execution without exposing private keys
3. **Gas Safety Margins** - Always estimates higher to prevent failed txs
4. **Transparent Logging** - All decisions recorded to Supabase
5. **Break-even Calculations** - Only rebalances when mathematically profitable

## 📊 Monitoring

### View Agent Logs

```bash
# Docker
docker-compose logs -f

# Systemd
sudo journalctl -u hedgepod-agent -f

# Raw logs
tail -f agent_$(date +%Y%m%d).log
```

### Check Agent Status

Visit your HedgePod dashboard:
- **https://hedgepod.app/portfolio** - See active agents
- **https://hedgepod.app/portfolio/[agentId]/history** - View rebalancing history

### Supabase Dashboard

Query the `rebalancing_history` table:
```sql
SELECT * FROM rebalancing_history 
WHERE agent_id = 'your-agent-id' 
ORDER BY timestamp DESC 
LIMIT 10;
```

## 🛠️ Development

### Run Tests

```bash
python -m pytest tests/
```

### Debug Mode

```bash
export LOG_LEVEL=DEBUG
python autonomous_agent.py --agent-id test-agent
```

### Dry Run (No Execution)

```bash
export DRY_RUN=true
python autonomous_agent.py --agent-id test-agent
```

## 🔧 Troubleshooting

### Agent Not Rebalancing

1. **Check logs** - Look for error messages
2. **Verify APRs** - Are they actually different enough?
3. **Check gas costs** - High gas might make rebalances unprofitable
4. **Verify funds** - Does the agent have enough for gas?

### Database Connection Issues

```bash
# Test Supabase connection
curl "$SUPABASE_URL/rest/v1/agent_performance" \
  -H "apikey: $SUPABASE_SERVICE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_KEY"
```

### CDP Wallet Issues

```bash
# Verify CDP credentials
# TODO: Add CDP CLI validation command
```

## 📚 Architecture

```
agent/
├── autonomous_agent.py      # Main agent logic
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker container
├── docker-compose.yml      # Docker orchestration
├── hedgepod-agent.service  # Systemd service
├── README.md               # This file
└── logs/                   # Agent logs (created at runtime)
```

## 🎯 Future Enhancements

- [ ] Multi-agent coordination
- [ ] Machine learning APR prediction
- [ ] MEV protection
- [ ] Telegram/Discord notifications
- [ ] Web dashboard for agent control
- [ ] Support for additional chains
- [ ] Custom rebalancing strategies

## 📝 License

MIT License - see LICENSE file

## 🦔 Support

- **Documentation**: https://hedgepod.app/about
- **GitHub Issues**: https://github.com/mollybeach/hedgepod/issues
- **Discord**: https://discord.gg/hedgepod
- **Email**: mollybeach@hedgepod.app

---

**Built with ❤️ by Molly Beach at ETHGlobal Buenos Aires 2025**

