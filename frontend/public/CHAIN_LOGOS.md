# Chain Logo Guide

This document explains how to add official chain logos to HedgePod.

## Current Status

✅ **World Chain** - Using `/worldchain_logo_white_pixelated.png`
⏳ **Other Chains** - Using emoji placeholders

## How to Add Chain Logos

1. Download the official logo for each chain (preferably white/light color for better visibility on green buttons)
2. Save as PNG with transparent background
3. Place in `/frontend/public/` folder
4. Update the `CHAIN_CONFIG` object in these files:
   - `frontend/app/portfolio/page.tsx`
   - `frontend/app/portfolio/deploy/page.tsx`
   - `frontend/app/portfolio/[agentId]/configure/page.tsx`

## Recommended Logo Sources

### Base
- **Official Site**: https://base.org
- **Suggested Filename**: `base-logo.png`
- **Config Update**: 
  ```typescript
  'Base': { 
    name: 'Base', 
    logo: '/base-logo.png',
    isImage: true
  },
  ```

### Celo
- **Official Site**: https://celo.org
- **Suggested Filename**: `celo-logo.png`
- **Config Update**: 
  ```typescript
  'Celo': { 
    name: 'Celo', 
    logo: '/celo-logo.png',
    isImage: true
  },
  ```

### Zircuit
- **Official Site**: https://zircuit.com
- **Suggested Filename**: `zircuit-logo.png`
- **Config Update**: 
  ```typescript
  'Zircuit': { 
    name: 'Zircuit', 
    logo: '/zircuit-logo.png',
    isImage: true
  },
  ```

### Polygon
- **Official Site**: https://polygon.technology
- **Suggested Filename**: `polygon-logo.png`
- **Config Update**: 
  ```typescript
  'Polygon': { 
    name: 'Polygon', 
    logo: '/polygon-logo.png',
    isImage: true
  },
  ```

### Arbitrum
- **Official Site**: https://arbitrum.io
- **Suggested Filename**: `arbitrum-logo.png`
- **Config Update**: 
  ```typescript
  'Arbitrum': { 
    name: 'Arbitrum', 
    logo: '/arbitrum-logo.png',
    isImage: true
  },
  ```

### Optimism
- **Official Site**: https://optimism.io
- **Suggested Filename**: `optimism-logo.png`
- **Config Update**: 
  ```typescript
  'Optimism': { 
    name: 'Optimism', 
    logo: '/optimism-logo.png',
    isImage: true
  },
  ```

### Avalanche
- **Official Site**: https://avax.network
- **Suggested Filename**: `avalanche-logo.png`
- **Config Update**: 
  ```typescript
  'Avalanche': { 
    name: 'Avalanche', 
    logo: '/avalanche-logo.png',
    isImage: true
  },
  ```

## Logo Specifications

- **Format**: PNG with transparent background
- **Size**: 20x20px (will be scaled automatically)
- **Color**: White or light color preferred (for visibility on green buttons)
- **Style**: Simple, iconic logo (not full brand wordmark)

## Quick Tip

You can also use SVG files for better scaling! Just change the file extension in the config:
```typescript
logo: '/chain-logo.svg'
```

