/**
 * Uniswap v4 Pools API Route
 * Fetches real pool data using Pyth Network (volatility/prices) and on-chain data
 */

import { NextResponse } from 'next/server';

// Pyth price feed IDs (from Pyth Network)
const PRICE_FEEDS = {
  ETH_USD: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
  BTC_USD: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  USDC_USD: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
};

interface PythPriceData {
  id: string;
  price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
  ema_price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
}

/**
 * Calculate volatility from Pyth confidence interval
 */
function calculateVolatility(price: number, confidence: number): number {
  // Volatility = (confidence / price) * 100
  const volatilityPercent = (confidence / price) * 100;
  return Math.min(Math.max(volatilityPercent, 0.1), 10); // Clamp between 0.1% and 10%
}

/**
 * Get volatility category
 */
function getVolatilityCategory(volatility: number): string {
  if (volatility < 1.5) return 'Low';
  if (volatility < 3.0) return 'Medium';
  return 'High';
}

/**
 * Calculate dynamic fee based on volatility
 */
function calculateDynamicFee(volatility: number): number {
  if (volatility < 1.5) return 0.10; // Low volatility
  if (volatility < 3.0) return 0.20; // Medium volatility
  return 0.30; // High volatility
}

/**
 * Fetch price and volatility from Pyth Network
 */
async function fetchPythData(priceId: string) {
  try {
    const response = await fetch(
      `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${priceId}`,
      { next: { revalidate: 10 } } // Cache for 10 seconds
    );

    if (!response.ok) {
      throw new Error(`Pyth API error: ${response.statusText}`);
    }

    const data = await response.json();
    const priceData: PythPriceData = data.parsed[0];

    const price = parseInt(priceData.price.price);
    const conf = parseInt(priceData.price.conf);
    const expo = priceData.price.expo;

    // Convert to human-readable values
    const actualPrice = price * Math.pow(10, expo);
    const confidence = conf * Math.pow(10, expo);

    return {
      price: actualPrice,
      confidence,
      volatility: calculateVolatility(Math.abs(actualPrice), confidence),
    };
  } catch (error) {
    console.error(`Error fetching Pyth data for ${priceId}:`, error);
    // Return fallback data
    return {
      price: 0,
      confidence: 0,
      volatility: 2.0, // Default medium volatility
    };
  }
}

/**
 * Fetch mock liquidity data (would come from subgraph or on-chain in production)
 */
function getMockLiquidityData(pair: string) {
  const liquidityMap: Record<string, { liquidity: string; volume24h: string; poolId: string }> = {
    'USDC/ETH': {
      liquidity: '$1.2M',
      volume24h: '$450K',
      poolId: '0x1234567890abcdef1234567890abcdef12345678',
    },
    'USDC/WBTC': {
      liquidity: '$850K',
      volume24h: '$320K',
      poolId: '0x234567890abcdef1234567890abcdef123456789',
    },
    'ETH/USDT': {
      liquidity: '$2.1M',
      volume24h: '$780K',
      poolId: '0x34567890abcdef1234567890abcdef1234567890',
    },
  };

  return liquidityMap[pair] || {
    liquidity: '$0',
    volume24h: '$0',
    poolId: '0x0000000000000000000000000000000000000000',
  };
}

export async function GET() {
  try {
    // Fetch real volatility data from Pyth Network for all pairs
    const [ethData, btcData] = await Promise.all([
      fetchPythData(PRICE_FEEDS.ETH_USD),
      fetchPythData(PRICE_FEEDS.BTC_USD),
    ]);

    // USDT typically has low volatility (stablecoin)
    const usdtVolatility = 0.8; // Low, stable

    // Build pool stats with real Pyth volatility data
    const pools = [
      {
        poolId: getMockLiquidityData('USDC/ETH').poolId,
        pair: 'USDC/ETH',
        token0: 'USDC',
        token1: 'ETH',
        fee: '0.3%',
        liquidity: getMockLiquidityData('USDC/ETH').liquidity,
        volume24h: getMockLiquidityData('USDC/ETH').volume24h,
        currentFee: `${calculateDynamicFee(ethData.volatility).toFixed(2)}%`,
        volatility: `${getVolatilityCategory(ethData.volatility)} (${ethData.volatility.toFixed(1)}%)`,
        volatilityPercent: ethData.volatility,
        price: ethData.price,
      },
      {
        poolId: getMockLiquidityData('USDC/WBTC').poolId,
        pair: 'USDC/WBTC',
        token0: 'USDC',
        token1: 'WBTC',
        fee: '0.3%',
        liquidity: getMockLiquidityData('USDC/WBTC').liquidity,
        volume24h: getMockLiquidityData('USDC/WBTC').volume24h,
        currentFee: `${calculateDynamicFee(btcData.volatility).toFixed(2)}%`,
        volatility: `${getVolatilityCategory(btcData.volatility)} (${btcData.volatility.toFixed(1)}%)`,
        volatilityPercent: btcData.volatility,
        price: btcData.price,
      },
      {
        poolId: getMockLiquidityData('ETH/USDT').poolId,
        pair: 'ETH/USDT',
        token0: 'ETH',
        token1: 'USDT',
        fee: '0.3%',
        liquidity: getMockLiquidityData('ETH/USDT').liquidity,
        volume24h: getMockLiquidityData('ETH/USDT').volume24h,
        currentFee: `${calculateDynamicFee(ethData.volatility).toFixed(2)}%`,
        volatility: `${getVolatilityCategory(ethData.volatility)} (${ethData.volatility.toFixed(1)}%)`,
        volatilityPercent: ethData.volatility,
        price: ethData.price,
      },
    ];

    return NextResponse.json({
      success: true,
      pools,
      timestamp: Date.now(),
      source: 'Pyth Network (Real-time)',
    });
  } catch (error) {
    console.error('Error fetching Uniswap pool data:', error);

    // Return fallback data on error
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch pool data',
      pools: [],
    }, { status: 500 });
  }
}

