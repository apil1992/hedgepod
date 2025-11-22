/**
 * API Route: Agent Management
 * Handles creating, listing, and managing CDP Server Wallet agents
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || supabaseUrl.includes('placeholder') || !supabaseKey || supabaseKey.includes('placeholder')) {
      console.warn('⚠️ Supabase not configured - returning empty agent list');
      return NextResponse.json({
        success: true,
        agents: [],
        count: 0,
        warning: 'Database not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.'
      });
    }

    // TODO: Add owner_wallet column to database schema for multi-user support
    // For now, fetch all agents (single-user mode)
    const { data, error } = await supabase
      .from('agent_performance')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      agents: data || [],
      count: data?.length || 0,
    });
  } catch (error: any) {
    console.error('❌ Error fetching agents:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/agents - Deploy new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, chains, depositAmount, agentName } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: 'Wallet address required' },
        { status: 400 }
      );
    }

    // Generate agent ID
    const agentId = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create agent record in Supabase
    // TODO: Add owner_wallet to schema and store walletAddress
    const { data: newAgent, error: dbError } = await supabase
      .from('agent_performance')
      .insert({
        agent_id: agentId,
        agent_name: agentName || `HedgePod Agent #${Date.now().toString().slice(-4)}`,
        total_value_managed: depositAmount || 0,
        current_apr: 0,
        total_rebalances: 0,
        successful_rebalances: 0,
        failed_rebalances: 0,
        status: 'inactive', // Start inactive, activate after funding
        chain_distribution: chains ? chains.reduce((acc: any, chain: string) => {
          acc[chain] = 0;
          return acc;
        }, {}) : {},
        last_rebalance_at: null,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // TODO: Call backend to create CDP Server Wallet
    // const cdpWallet = await createCDPWallet(agentId);

    return NextResponse.json({
      success: true,
      agent: newAgent,
      message: 'Agent deployed successfully! Fund the agent to activate.',
    });
  } catch (error: any) {
    console.error('❌ Error deploying agent:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

