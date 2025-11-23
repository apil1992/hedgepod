/**
 * API Route: Agent Rebalancing History
 * Get all rebalancing transactions for a specific agent
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MOCK_REBALANCE_HISTORY } from '@/lib/mockData';

// GET /api/agents/[agentId]/history - Get agent rebalancing history
export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error, count } = await supabase
      .from('rebalancing_history')
      .select('*', { count: 'exact' })
      .eq('agent_id', agentId)
      .order('initiated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.warn(`⚠️ Supabase error, using mock data:`, error.message);
      // Return mock data on Supabase error
      return NextResponse.json({
        success: true,
        history: MOCK_REBALANCE_HISTORY.slice(offset, offset + limit),
        count: MOCK_REBALANCE_HISTORY.length,
        limit,
        offset,
      });
    }

    // If no data from Supabase, use mock data for demo
    if (!data || data.length === 0) {
      console.log(`🎭 No Supabase data, using mock rebalance history for demo`);
      return NextResponse.json({
        success: true,
        history: MOCK_REBALANCE_HISTORY.slice(offset, offset + limit),
        count: MOCK_REBALANCE_HISTORY.length,
        limit,
        offset,
      });
    }

    return NextResponse.json({
      success: true,
      history: data,
      count: count || 0,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error(`❌ Error fetching history for agent ${params.agentId}:`, error);
    console.log(`🎭 Using mock data due to error`);
    
    // Return mock data on any error
    return NextResponse.json({
      success: true,
      history: MOCK_REBALANCE_HISTORY,
      count: MOCK_REBALANCE_HISTORY.length,
      limit: 50,
      offset: 0,
    });
  }
}

