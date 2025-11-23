# 🎬 Demo Mode Setup for Video Recording

Get your app ready for the perfect demo video in 2 minutes!

## 🚀 Quick Setup

### 1. Enable Demo Mode

Add this to your `frontend/.env.local` file:

```bash
# Enable demo mode (shows mock agents and auto-succeeds World ID)
NEXT_PUBLIC_DEMO_MODE=true
```

### 2. Restart Your Dev Server

```bash
cd frontend
npm run dev
```

### 3. You're Ready! 🎉

Demo mode gives you:
- ✅ **3 Mock Agents** with realistic data (8.4% APR, 12 rebalances, etc.)
- ✅ **World ID Auto-Verification** - Shows QR code, then auto-succeeds after 3 seconds
- ✅ **Smooth Animations** - No API delays or errors
- ✅ **Realistic Stats** - Total rebalances, APRs, chain distribution

---

## 📊 What You'll See in Demo Mode

### Portfolio Page
- **Agent 1**: "Yieldy Hedgehog #42" - Active, 8.4% APR, 12 rebalances, $2,500 TVL
- **Agent 2**: "Alpha Fox Master" - Active, 7.2% APR, 8 rebalances, $1,800 TVL
- **Agent 3**: "DeFi Whale Guardian" - Inactive, 5.8% APR, 3 rebalances, $950 TVL

### Deploy Page
1. Click "🔒 Verify with World ID"
2. QR code appears with mock World logo
3. "Verifying your humanity..." animation
4. Auto-succeeds after 3 seconds ✅
5. "Verified with World ID!" confirmation
6. Continue with deployment

---

## 🎥 Recording Your Demo

### Before Recording:
- [ ] `NEXT_PUBLIC_DEMO_MODE=true` in `.env.local`
- [ ] Dev server restarted (`npm run dev`)
- [ ] Browser at 100% zoom
- [ ] Wallet connected
- [ ] 1080p+ recording setup

### During Demo:
1. **Homepage** (30s): Show hero, features, CTAs
2. **Connect Wallet** (20s): Quick RainbowKit connection
3. **Portfolio** (40s): Show 3 mock agents, stats, rebalance history
4. **Deploy Agent** (40s):
   - Click "Deploy New Agent"
   - Show World ID QR code (let it auto-verify)
   - Name agent, select chains
   - Click deploy
5. **Swap Page** (50s): Show pool stats, swap modal, add liquidity
6. **Implementation Pages** (30s): Quick tour of World/LayerZero/CDP
7. **About Page** (20s): Close with tech stack

### After Recording:
- [ ] Turn off demo mode: Set `NEXT_PUBLIC_DEMO_MODE=false`
- [ ] Commit your code (don't commit demo mode enabled!)

---

## 🔄 Toggle Demo Mode

**Enable for recording:**
```bash
# In frontend/.env.local
NEXT_PUBLIC_DEMO_MODE=true
```

**Disable for production:**
```bash
# In frontend/.env.local
NEXT_PUBLIC_DEMO_MODE=false
# Or just remove the line
```

**Check if it's working:**
- Go to Portfolio → Should see 3 mock agents instantly
- Go to Deploy → Should see World ID verification with QR code

---

## 🎯 Demo Mode Features

### What Works:
- ✅ Mock agents load instantly (no API calls)
- ✅ World ID shows QR + auto-verifies
- ✅ All stats are realistic and impressive
- ✅ No errors or loading states
- ✅ Smooth animations everywhere

### What Stays Real:
- ✅ Wallet connection (RainbowKit)
- ✅ Swap page pool data (uses real APIs if available)
- ✅ All UI components and styling
- ✅ Navigation and routing

---

## 💡 Pro Tips

### Make Your Demo Shine:
1. **Pre-connect your wallet** before starting the recording
2. **Let World ID auto-verify** - don't click "Skip for demo"
3. **Show the QR code** for 2-3 seconds so judges see it
4. **Scroll slowly** through agent stats
5. **Point with your cursor** to highlight key features

### If Something Breaks:
- **Mock data not loading?** Check `NEXT_PUBLIC_DEMO_MODE=true` is set
- **World ID not showing?** Make sure you restarted the dev server
- **Agents still empty?** Clear browser cache and reload
- **QR code not appearing?** Check console for errors

---

## 🚨 Important Reminders

1. **Don't commit demo mode enabled!**
   ```bash
   # Before committing:
   NEXT_PUBLIC_DEMO_MODE=false
   ```

2. **Demo mode is for recording ONLY**
   - Not for production
   - Not for testing real features
   - Only for making a smooth demo video

3. **Test your demo flow before recording**
   - Run through the entire script once
   - Make sure all pages load
   - Check that World ID auto-verifies

---

## ✅ Ready to Record?

Follow the demo script in `docs/DEMO_SCRIPT.md` and you'll have a perfect video! 🎬

**Good luck! You've got this! 🦔✨**

