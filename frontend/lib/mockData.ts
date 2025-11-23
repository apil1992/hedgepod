/**
 * Mock Data for Demo Video
 * Use this to populate the app with realistic-looking data
 */

export const MOCK_AGENTS: any[] = [
  {
    id: 1,
    agent_id: 'agent_1732468923_demo001',
    agent_name: 'Yieldy Hedgehog #42',
    status: 'active',
    chain_distribution: {
      'World Chain': 35,
      'Base': 25,
      'Polygon': 20,
      'Arbitrum': 20,
    } as Record<string, number>,
    last_rebalance_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    total_rebalances: 12,
    current_apr: 8.4,
    total_value_managed: 2500.00,
    successful_rebalances: 11,
  },
  {
    id: 2,
    agent_id: 'agent_1732468824_demo002',
    agent_name: 'Alpha Fox Master',
    status: 'active',
    chain_distribution: {
      'World Chain': 40,
      'Base': 30,
      'Celo': 15,
      'Optimism': 15,
    } as Record<string, number>,
    last_rebalance_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    total_rebalances: 8,
    current_apr: 7.2,
    total_value_managed: 1800.50,
    successful_rebalances: 8,
  },
  {
    id: 3,
    agent_id: 'agent_1732468725_demo003',
    agent_name: 'DeFi Whale Guardian',
    status: 'inactive',
    chain_distribution: {
      'Base': 50,
      'Polygon': 50,
    } as Record<string, number>,
    last_rebalance_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    total_rebalances: 3,
    current_apr: 5.8,
    total_value_managed: 950.00,
    successful_rebalances: 3,
  },
];

export const MOCK_REBALANCE_HISTORY = [
  {
    id: '1',
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Polygon',
    to_chain: 'World Chain',
    amount: 500.00,
    token: 'USDC',
    from_apr: 6.2,
    to_apr: 8.4,
    expected_gain: 12.50,
    gas_cost: 0.85,
    execution_time_seconds: 45,
    status: 'confirmed' as const,
    tx_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    initiated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    confirmed_at: new Date(Date.now() - 2 * 60 * 60 * 1000 + 45000).toISOString(),
  },
  {
    id: '2',
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Arbitrum',
    to_chain: 'Base',
    amount: 750.00,
    token: 'USDC',
    from_apr: 5.8,
    to_apr: 8.1,
    expected_gain: 18.75,
    gas_cost: 1.20,
    execution_time_seconds: 52,
    status: 'confirmed' as const,
    tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    initiated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    confirmed_at: new Date(Date.now() - 8 * 60 * 60 * 1000 + 52000).toISOString(),
  },
  {
    id: '3',
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Base',
    to_chain: 'Polygon',
    amount: 300.00,
    token: 'USDC',
    from_apr: 7.2,
    to_apr: 7.9,
    expected_gain: 5.60,
    gas_cost: 0.65,
    execution_time_seconds: 38,
    status: 'confirmed' as const,
    tx_hash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
    initiated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    confirmed_at: new Date(Date.now() - 12 * 60 * 60 * 1000 + 38000).toISOString(),
  },
  {
    id: '4',
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'World Chain',
    to_chain: 'Optimism',
    amount: 425.00,
    token: 'USDC',
    from_apr: 7.1,
    to_apr: 8.9,
    expected_gain: 9.80,
    gas_cost: 0.75,
    execution_time_seconds: 41,
    status: 'confirmed' as const,
    tx_hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    initiated_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    confirmed_at: new Date(Date.now() - 18 * 60 * 60 * 1000 + 41000).toISOString(),
  },
  {
    id: '5',
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Celo',
    to_chain: 'World Chain',
    amount: 600.00,
    token: 'USDC',
    from_apr: 5.5,
    to_apr: 8.4,
    expected_gain: 16.20,
    gas_cost: 0.90,
    execution_time_seconds: 48,
    status: 'confirmed' as const,
    tx_hash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
    initiated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    confirmed_at: new Date(Date.now() - 24 * 60 * 60 * 1000 + 48000).toISOString(),
  },
];

export const MOCK_POOL_DATA = [
  {
    poolId: '0x88e6A0...3f5640',
    pair: 'USDC/ETH',
    fee: '0.30%',
    liquidity: '$245.8M',
    volume24h: '$89.2M',
    currentFee: '0.10%',
    volatility: 'Low (0.6%)',
    token0: 'USDC',
    token1: 'ETH',
  },
  {
    poolId: '0x11b815...7e8f90',
    pair: 'USDC/WBTC',
    fee: '0.30%',
    liquidity: '$128.4M',
    volume24h: '$42.1M',
    currentFee: '0.15%',
    volatility: 'Medium (1.2%)',
    token0: 'USDC',
    token1: 'WBTC',
  },
  {
    poolId: '0x4e68cf...9a2b34',
    pair: 'ETH/USDT',
    fee: '0.05%',
    liquidity: '$312.5M',
    volume24h: '$156.7M',
    currentFee: '0.08%',
    volatility: 'Low (0.4%)',
    token0: 'ETH',
    token1: 'USDT',
  },
];

// Mock Uniswap Pool data (matches The Graph's UniswapPool interface)
export const MOCK_UNISWAP_POOLS = [
  {
    id: '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
    token0: {
      symbol: 'USDC',
      name: 'USD Coin',
    },
    token1: {
      symbol: 'WETH',
      name: 'Wrapped Ether',
    },
    feeTier: '3000',
    liquidity: '15234567890123456',
    volumeUSD: '89234567.89',
    totalValueLockedUSD: '245876543.21',
    token0Price: '0.00035678',
    token1Price: '2804.56',
  },
  {
    id: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
    token0: {
      symbol: 'USDC',
      name: 'USD Coin',
    },
    token1: {
      symbol: 'WBTC',
      name: 'Wrapped BTC',
    },
    feeTier: '3000',
    liquidity: '8765432109876543',
    volumeUSD: '42187654.32',
    totalValueLockedUSD: '128456789.10',
    token0Price: '0.000011628',
    token1Price: '85987.45',
  },
  {
    id: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
    token0: {
      symbol: 'WETH',
      name: 'Wrapped Ether',
    },
    token1: {
      symbol: 'USDT',
      name: 'Tether USD',
    },
    feeTier: '500',
    liquidity: '21098765432109876',
    volumeUSD: '156789012.45',
    totalValueLockedUSD: '312567890.67',
    token0Price: '2807.89',
    token1Price: '0.00035601',
  },
  {
    id: '0x4e68cff6e1c3c0cf71e87d4c8f9fb7c3e9f9c8d2',
    token0: {
      symbol: 'WETH',
      name: 'Wrapped Ether',
    },
    token1: {
      symbol: 'USDC',
      name: 'USD Coin',
    },
    feeTier: '500',
    liquidity: '18765432109876543',
    volumeUSD: '123456789.01',
    totalValueLockedUSD: '198765432.10',
    token0Price: '2806.34',
    token1Price: '0.00035623',
  },
  {
    id: '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8',
    token0: {
      symbol: 'USDC',
      name: 'USD Coin',
    },
    token1: {
      symbol: 'WETH',
      name: 'Wrapped Ether',
    },
    feeTier: '3000',
    liquidity: '12345678901234567',
    volumeUSD: '78901234.56',
    totalValueLockedUSD: '187654321.98',
    token0Price: '0.00035645',
    token1Price: '2805.12',
  },
];

// Demo mode flag - set this to true for demo video
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

/**
 * Enrich agents with realistic mock data for demo
 * This adds TVL, APR, rebalances, etc. to existing agents
 */
export function enrichAgentWithMockData(agent: any, index: number): any {
  const mockDataSets = [
    {
      current_apr: 8.4,
      total_value_managed: 2500.00,
      total_rebalances: 12,
      successful_rebalances: 11,
      last_rebalance_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      current_apr: 7.2,
      total_value_managed: 1800.50,
      total_rebalances: 8,
      successful_rebalances: 8,
      last_rebalance_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      current_apr: 5.8,
      total_value_managed: 950.00,
      total_rebalances: 3,
      successful_rebalances: 3,
      last_rebalance_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      current_apr: 9.1,
      total_value_managed: 3200.75,
      total_rebalances: 15,
      successful_rebalances: 14,
      last_rebalance_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      current_apr: 6.5,
      total_value_managed: 1250.30,
      total_rebalances: 6,
      successful_rebalances: 6,
      last_rebalance_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
      current_apr: 7.8,
      total_value_managed: 2100.00,
      total_rebalances: 10,
      successful_rebalances: 9,
      last_rebalance_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      current_apr: 8.9,
      total_value_managed: 2750.50,
      total_rebalances: 13,
      successful_rebalances: 12,
      last_rebalance_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const mockData = mockDataSets[index % mockDataSets.length];

  return {
    ...agent,
    ...mockData,
  };
}

