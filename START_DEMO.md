# ⚡ START DEMO MODE (2 Steps)

## Step 1: Add to `.env.local`
```bash
echo "NEXT_PUBLIC_DEMO_MODE=true" >> frontend/.env.local
```

## Step 2: Restart Dev Server
```bash
cd frontend && npm run dev
```

## ✅ You're Ready!
- Go to http://localhost:3000
- Connect your wallet
- Click "View Portfolio" → See 3 mock agents
- Click "Deploy New Agent" → See World ID QR code auto-verify

## 🎬 Start Recording!
Follow `docs/DEMO_SCRIPT.md` for the perfect 3-minute demo.

---

**Turn OFF demo mode after recording:**
```bash
# Remove the line from .env.local or set to false
NEXT_PUBLIC_DEMO_MODE=false
```

