/**
 * Supabase Client for Backend
 * Uses service key for full database access (bypasses RLS)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Supabase credentials not found, database features will be limited');
}

// Use service key for backend (bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// =====================================================
// WRITE FUNCTIONS (for agent operations)
// =====================================================

/**
 * Log agent performance metrics
 */
export async function logAgentPerformance(data: {
  agent_id: string;
  agent_name: string;
  total_value_managed: number;
  current_apr: number;
  total_rebalances: number;
  successful_rebalances: number;
  failed_rebalances: number;
  chain_distribution: Record<string, number>;
  status: string;
  last_rebalance_at?: string;
}) {
  const { error } = await supabase
    .from('agent_performance')
    .insert(data);

  if (error) {
    console.error('Failed to log agent performance:', error);
    throw error;
  }

  console.log(`✅ Logged performance for agent ${data.agent_id}`);
}

/**
 * Log rebalancing transaction
 */
export async function logRebalance(data: {
  agent_id: string;
  tx_hash: string;
  from_chain: string;
  to_chain: string;
  amount: number;
  token: string;
  from_apr: number;
  to_apr: number;
  status: string;
  gas_cost?: number;
  execution_time_seconds?: number;
}) {
  const { error } = await supabase
    .from('rebalancing_history')
    .insert(data);

  if (error) {
    console.error('Failed to log rebalance:', error);
    throw error;
  }

  console.log(`✅ Logged rebalance tx ${data.tx_hash}`);
}

/**
 * Update rebalance status
 */
export async function updateRebalanceStatus(
  tx_hash: string,
  status: 'confirmed' | 'failed',
  error_message?: string
) {
  const { error } = await supabase
    .from('rebalancing_history')
    .update({
      status,
      confirmed_at: new Date().toISOString(),
      error_message,
    })
    .eq('tx_hash', tx_hash);

  if (error) {
    console.error('Failed to update rebalance status:', error);
    throw error;
  }

  console.log(`✅ Updated rebalance status: ${tx_hash} -> ${status}`);
}

/**
 * Log APR snapshot
 */
export async function logAPRSnapshot(data: {
  chain: string;
  protocol: string;
  apr: number;
  tvl?: number;
  volume_24h?: number;
  volatility_score?: number;
  risk_score?: 'low' | 'medium' | 'high';
}) {
  const { error } = await supabase
    .from('apr_snapshots')
    .insert(data);

  if (error) {
    console.error('Failed to log APR snapshot:', error);
    throw error;
  }

  // Don't log every APR snapshot to reduce noise
  // console.log(`✅ Logged APR snapshot for ${data.chain}`);
}

/**
 * Update or create user portfolio
 */
export async function upsertUserPortfolio(data: {
  wallet_address: string;
  ens_name?: string;
  total_deposited: number;
  total_withdrawn: number;
  current_value: number;
  total_yield_earned: number;
  assigned_agent_id?: string;
}) {
  const { error } = await supabase
    .from('user_portfolios')
    .upsert(data, {
      onConflict: 'wallet_address',
    });

  if (error) {
    console.error('Failed to upsert user portfolio:', error);
    throw error;
  }

  console.log(`✅ Updated portfolio for ${data.wallet_address}`);
}

/**
 * Log chain metrics
 */
export async function logChainMetrics(data: {
  chain: string;
  chain_id: number;
  avg_apr?: number;
  total_tvl?: number;
  active_agents: number;
  total_value_locked: number;
  avg_rebalance_time_seconds?: number;
  success_rate?: number;
}) {
  const { error } = await supabase
    .from('chain_metrics')
    .insert(data);

  if (error) {
    console.error('Failed to log chain metrics:', error);
    throw error;
  }

  console.log(`✅ Logged metrics for chain ${data.chain}`);
}

// =====================================================
// READ FUNCTIONS (for querying data)
// =====================================================

/**
 * Get agent performance history
 */
export async function getAgentPerformanceHistory(agentId: string, limit: number = 100) {
  const { data, error } = await supabase
    .from('agent_performance')
    .select('*')
    .eq('agent_id', agentId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Get recent rebalances for an agent
 */
export async function getAgentRebalances(agentId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from('rebalancing_history')
    .select('*')
    .eq('agent_id', agentId)
    .order('initiated_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Get APR history for a chain
 */
export async function getChainAPRHistory(chain: string, hours: number = 24) {
  const hoursAgo = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  
  const { data, error } = await supabase
    .from('apr_snapshots')
    .select('*')
    .eq('chain', chain)
    .gte('snapshot_at', hoursAgo)
    .order('snapshot_at', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Get total stats across all agents
 */
export async function getTotalStats() {
  const { data: agents, error } = await supabase
    .from('agent_summary')
    .select('*');

  if (error) throw error;

  const totalValue = agents?.reduce((sum, agent) => sum + (agent.current_value || 0), 0) || 0;
  const totalRebalances = agents?.reduce((sum, agent) => sum + (agent.total_rebalances || 0), 0) || 0;
  const avgAPR = agents && agents.length > 0
    ? agents.reduce((sum, agent) => sum + (agent.current_apr || 0), 0) / agents.length
    : 0;

  return {
    totalValue,
    totalRebalances,
    avgAPR: Number(avgAPR.toFixed(2)),
    activeAgents: agents?.filter(a => a.status === 'active').length || 0,
    totalAgents: agents?.length || 0,
  };
}

