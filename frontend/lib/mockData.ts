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
    id: 1,
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Polygon',
    to_chain: 'World Chain',
    amount: '500.00',
    token: 'USDC',
    apr: 8.4,
    tx_hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 2,
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Arbitrum',
    to_chain: 'Base',
    amount: '750.00',
    token: 'USDC',
    apr: 8.1,
    tx_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 3,
    agent_id: 'agent_1732468923_demo001',
    from_chain: 'Base',
    to_chain: 'Polygon',
    amount: '300.00',
    token: 'USDC',
    apr: 7.9,
    tx_hash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
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

// Demo mode flag - set this to true for demo video
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

