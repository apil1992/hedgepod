/**
 * The Graph Integration
 * Query Uniswap v3 subgraphs for real pool data
 */

import { MOCK_UNISWAP_POOLS } from './mockData';

// Get The Graph API key from environment
const GRAPH_API_KEY = process.env.NEXT_PUBLIC_GRAPH_API_KEY || process.env.GRAPH_API_KEY;

// The Graph Uniswap v3 subgraph endpoints
// Using decentralized network gateway (requires API key) or Studio endpoints (free tier)
const SUBGRAPH_ENDPOINTS = {
  // Base - Uniswap v3
  base: GRAPH_API_KEY 
    ? `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum`
    : 'https://api.studio.thegraph.com/query/48211/uniswap-v3-base/version/latest',
  
  // Optimism - Uniswap v3
  optimism: GRAPH_API_KEY
    ? `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B`
    : 'https://api.studio.thegraph.com/query/48211/uniswap-v3-optimism/version/latest',
  
  // Arbitrum - Uniswap v3
  arbitrum: GRAPH_API_KEY
    ? `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM`
    : 'https://api.studio.thegraph.com/query/48211/uniswap-v3-arbitrum/version/latest',
  
  // Polygon - Uniswap v3
  polygon: GRAPH_API_KEY
    ? `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm`
    : 'https://api.studio.thegraph.com/query/48211/uniswap-v3-polygon/version/latest',
  
  // Ethereum mainnet - Uniswap v3 (most data available)
  mainnet: GRAPH_API_KEY
    ? `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`
    : 'https://api.studio.thegraph.com/query/48211/uniswap-v3-mainnet/version/latest',
};

export interface UniswapPool {
  id: string; // Pool address
  token0: {
    symbol: string;
    name: string;
  };
  token1: {
    symbol: string;
    name: string;
  };
  feeTier: string; // Fee in basis points (3000 = 0.3%)
  liquidity: string; // Total liquidity in the pool
  volumeUSD: string; // 24h volume in USD (from poolDayData)
  totalValueLockedUSD: string; // TVL in USD
  token0Price: string;
  token1Price: string;
  poolDayData?: Array<{
    volumeUSD: string;
    date: number;
  }>;
}

/**
 * GraphQL query for top pools WITH 24h volume data
 */
const POOLS_QUERY = `
  query GetTopPools {
    pools(
      first: 10,
      orderBy: totalValueLockedUSD,
      orderDirection: desc,
      where: {
        totalValueLockedUSD_gt: "100000"
      }
    ) {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      feeTier
      liquidity
      totalValueLockedUSD
      token0Price
      token1Price
      poolDayData(first: 1, orderBy: date, orderDirection: desc) {
        volumeUSD
        date
      }
    }
  }
`;

/**
 * Query specific pools by token pairs
 */
const SPECIFIC_POOLS_QUERY = `
  query GetSpecificPools($token0: String!, $token1: String!) {
    pools(
      first: 5,
      orderBy: totalValueLockedUSD,
      orderDirection: desc,
      where: {
        token0_contains: $token0,
        token1_contains: $token1,
        totalValueLockedUSD_gt: "10000"
      }
    ) {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      feeTier
      liquidity
      volumeUSD
      totalValueLockedUSD
      token0Price
      token1Price
    }
  }
`;

/**
 * Fetch pools from The Graph subgraph
 */
export async function fetchUniswapPools(
  chain: keyof typeof SUBGRAPH_ENDPOINTS = 'mainnet'
): Promise<UniswapPool[]> {
  const endpoint = SUBGRAPH_ENDPOINTS[chain];

  console.log(`🔍 [The Graph] Fetching pools from ${chain}...`);
  console.log(`📡 [The Graph] Endpoint: ${endpoint}`);
  console.log(`🔑 [The Graph] API Key: ${GRAPH_API_KEY ? '✅ Provided (using decentralized network)' : '❌ Missing (using hosted service - may have rate limits)'}`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(GRAPH_API_KEY && { 'Authorization': `Bearer ${GRAPH_API_KEY}` }),
      },
      body: JSON.stringify({
        query: POOLS_QUERY,
      }),
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    console.log(`📊 [The Graph] Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      console.error(`❌ [The Graph] API error: ${response.status} ${response.statusText}`);
      throw new Error(`Graph API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('❌ [The Graph] GraphQL errors:', JSON.stringify(data.errors, null, 2));
      throw new Error('GraphQL query failed');
    }

    console.log(`✅ [The Graph] Successfully fetched ${data.data.pools?.length || 0} pools`);

    // Transform pools to include 24h volume from poolDayData
    const pools = data.data.pools.map((pool: any) => {
      const volume = pool.poolDayData?.[0]?.volumeUSD || '0';
      console.log(`   Pool ${pool.token0.symbol}/${pool.token1.symbol}:`);
      console.log(`      TVL: $${parseFloat(pool.totalValueLockedUSD).toLocaleString()}`);
      console.log(`      24h Volume: $${parseFloat(volume).toLocaleString()}`);
      console.log(`      Pool ID: ${pool.id}`);
      
      return {
        ...pool,
        volumeUSD: volume,
      };
    });

    return pools;
  } catch (error) {
    console.error(`❌ [The Graph] Error fetching pools from ${chain}:`, error);
    console.log(`   🎭 [The Graph] Using MOCK DATA for demo purposes`);
    console.log(`   💡 Tip: Add NEXT_PUBLIC_GRAPH_API_KEY to .env.local for real data`);
    
    // Return mock data instead of empty array
    return MOCK_UNISWAP_POOLS;
  }
}

/**
 * Fetch specific token pair pools
 */
export async function fetchTokenPairPools(
  token0Symbol: string,
  token1Symbol: string,
  chain: keyof typeof SUBGRAPH_ENDPOINTS = 'mainnet'
): Promise<UniswapPool[]> {
  const endpoint = SUBGRAPH_ENDPOINTS[chain];

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(GRAPH_API_KEY && { 'Authorization': `Bearer ${GRAPH_API_KEY}` }),
      },
      body: JSON.stringify({
        query: SPECIFIC_POOLS_QUERY,
        variables: {
          token0: token0Symbol.toLowerCase(),
          token1: token1Symbol.toLowerCase(),
        },
      }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Graph API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return [];
    }

    return data.data.pools;
  } catch (error) {
    console.error(`Error fetching ${token0Symbol}/${token1Symbol} pools:`, error);
    console.log(`   🎭 [The Graph] Using MOCK DATA for ${token0Symbol}/${token1Symbol} pools`);
    
    // Filter mock pools by token symbols
    const filteredMocks = MOCK_UNISWAP_POOLS.filter(pool => 
      (pool.token0.symbol.toLowerCase().includes(token0Symbol.toLowerCase()) || 
       pool.token1.symbol.toLowerCase().includes(token0Symbol.toLowerCase())) &&
      (pool.token0.symbol.toLowerCase().includes(token1Symbol.toLowerCase()) || 
       pool.token1.symbol.toLowerCase().includes(token1Symbol.toLowerCase()))
    );
    
    return filteredMocks.length > 0 ? filteredMocks : MOCK_UNISWAP_POOLS.slice(0, 3);
  }
}

/**
 * Format large numbers with appropriate suffix (K, M, B)
 */
export function formatUSD(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
}

/**
 * Convert fee tier to percentage
 */
export function formatFeeTier(feeTier: string): string {
  const bps = parseInt(feeTier);
  return `${(bps / 10000).toFixed(2)}%`;
}

