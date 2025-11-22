# 🌐 Frontend Environment Setup

## Required Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
# From frontend directory
cp .env.local.example .env.local
```

### Minimum Required Variables

```bash
# 1. WalletConnect Project ID (REQUIRED)
# Get from: https://cloud.walletconnect.com/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# 2. Supabase Configuration (REQUIRED for database features)
# Get from: https://supabase.com/ → Your Project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional Variables

```bash
# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
```

## Quick Setup

1. **Get WalletConnect ID** (5 minutes)
   - Go to https://cloud.walletconnect.com/
   - Sign up / Login
   - Create new project
   - Copy Project ID

2. **Get Supabase Keys** (5 minutes)
   - Go to https://supabase.com/
   - Create project (if you haven't already)
   - Go to Settings → API
   - Copy:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Create `.env.local`**

```bash
cd frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
EOF
```

4. **Start dev server**

```bash
npm run dev
```

## ✅ Verification

Your frontend should now:
- ✅ Connect wallets via RainbowKit
- ✅ Load agent performance data from Supabase
- ✅ Show real-time rebalancing updates
- ✅ Display APR charts and analytics

## 🐛 Troubleshooting

### Error: "supabaseUrl is required"
→ Check your `.env.local` file exists and has `NEXT_PUBLIC_SUPABASE_URL`

### Error: "supabaseAnonKey is required"
→ Check your `.env.local` file has `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Database queries failing
→ Verify you've run the SQL schema in Supabase (see `docs/DATABASE_SETUP.md`)

### Wallet not connecting
→ Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set correctly

---

**🦔 Ready to build!**

