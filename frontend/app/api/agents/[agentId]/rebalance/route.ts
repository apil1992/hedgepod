/**
 * API Route: Trigger Agent Rebalance
 * Manually trigger a rebalance check for a specific agent
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/agents/[agentId]/rebalance - Trigger manual rebalance
export async function POST(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;

    // 1. Fetch agent data
    const { data: agent, error: agentError } = await supabase
      .from('agent_performance')
      .select('*')
      .eq('id', agentId)
      .eq('status', 'active')
      .single();

    if (agentError || !agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found or not active' },
        { status: 404 }
      );
    }

    // 2. Mock rebalancing logic (in production, would trigger backend agent)
    const mockRebalance = {
      agent_id: agentId,
      tx_hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      from_chain: 'base',
      to_chain: 'polygon',
      amount: 1000 + Math.random() * 4000, // $1000-$5000
      token: 'USDC',
      from_apr: 5 + Math.random() * 5, // 5-10%
      to_apr: 12 + Math.random() * 8, // 12-20%
      expected_gain: 50 + Math.random() * 150, // $50-$200
      gas_cost: 2 + Math.random() * 8, // $2-$10
      execution_time_seconds: 30 + Math.random() * 90, // 30-120 seconds
      status: 'confirmed' as const,
      initiated_at: new Date().toISOString(),
      confirmed_at: new Date(Date.now() + 60000).toISOString(), // 1 min later
    };

    // 3. Insert into rebalancing_history
    const { data: rebalance, error: rebalanceError } = await supabase
      .from('rebalancing_history')
      .insert(mockRebalance)
      .select()
      .single();

    if (rebalanceError) throw rebalanceError;

    // 4. Update agent performance metrics
    const totalYield = (agent.total_yield || 0) + mockRebalance.expected_gain;
    const currentAPR = mockRebalance.to_apr;
    const totalRebalances = (agent.total_rebalances || 0) + 1;

    const { error: updateError } = await supabase
      .from('agent_performance')
      .update({
        current_apr: currentAPR,
        total_yield: totalYield,
        total_rebalances: totalRebalances,
        last_rebalance: mockRebalance.confirmed_at,
        updated_at: new Date().toISOString(),
      })
      .eq('id', agentId);

    if (updateError) throw updateError;

    return NextResponse.json({
      success: true,
      rebalance,
      message: 'Rebalance triggered successfully',
    });
  } catch (error: any) {
    console.error(`❌ Error triggering rebalance for agent ${params.agentId}:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

