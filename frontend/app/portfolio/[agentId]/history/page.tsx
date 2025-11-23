/**
 * Agent History Page
 * View all rebalancing transactions for a specific agent
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

interface RebalanceHistory {
  id: string;
  agent_id: string;
  tx_hash: string;
  from_chain: string;
  to_chain: string;
  amount: number;
  token: string;
  from_apr: number;
  to_apr: number;
  expected_gain?: number;
  gas_cost?: number;
  execution_time_seconds?: number;
  status: 'pending' | 'confirmed' | 'failed';
  initiated_at: string;
  confirmed_at?: string;
  error_message?: string;
}

export default function AgentHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.agentId as string;
  
  const [history, setHistory] = useState<RebalanceHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/agents/${agentId}/history`);
      const data = await response.json();

      if (data.success) {
        setHistory(data.history);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerRebalance = async () => {
    try {
      setTriggering(true);
      setError(null);
      setSuccessMessage(null);
      
      const response = await fetch(`/api/agents/${agentId}/rebalance`, {
        method: 'POST',
      });
      
      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`✅ Rebalance executed! ${data.rebalance.from_chain} → ${data.rebalance.to_chain} (+${data.rebalance.expected_gain?.toFixed(2) || '0'} USDC)`);
        // Refresh history to show new rebalance
        await fetchHistory();
        
        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTriggering(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      confirmed: 'bg-green-500 text-white',
      pending: 'bg-yellow-500 text-white',
      failed: 'bg-red-500 text-white',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const shortenTxHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-green-700 drop-shadow-lg pt-8">
              Agent History
            </h1>
            <p className="text-lg text-green-800 font-body mt-2">
              Rebalancing transactions for {agentId}
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="primary" 
              size="md" 
              onClick={triggerRebalance}
              disabled={triggering}
            >
              {triggering ? '⏳ Checking...' : '🔄 Run Rebalance Now'}
            </Button>
            <Button variant="nav" size="md" onClick={() => router.back()}>
              ← Back
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <Card variant="dialogue">
            <div className="text-center py-8">
              <p className="text-green-700 font-body">Loading history...</p>
            </div>
          </Card>
        )}

        {/* Success State */}
        {successMessage && (
          <Card variant="dialogue">
            <div className="text-center py-6 bg-green-50 border-green-300">
              <p className="text-green-700 font-body text-lg font-bold">{successMessage}</p>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card variant="dialogue">
            <div className="text-center py-8 bg-red-50 border-red-300">
              <p className="text-red-600 font-body">❌ {error}</p>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && history.length === 0 && (
          <Card variant="dialogue">
            <div className="text-center py-12 space-y-6">
              <div className="text-6xl mb-4">🌱</div>
              <div>
                <p className="text-green-700 font-display font-bold text-2xl mb-2">
                  No rebalancing history yet
                </p>
                <p className="text-green-600 font-body text-lg">
                  This agent hasn&apos;t made any rebalances yet.
                </p>
                <p className="text-green-600 font-body">
                  Click &quot;Run Rebalance Now&quot; above to check for profitable opportunities,
                  or wait for the automated agent to find one.
                </p>
              </div>
              <div className="pt-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={triggerRebalance}
                  disabled={triggering}
                >
                  {triggering ? '⏳ Checking Opportunities...' : '🚀 Check for Opportunities Now'}
                </Button>
              </div>
              <div className="border-t-2 border-green-300 pt-6 mt-6">
                <p className="text-sm text-green-600 font-body">
                  <strong>How it works:</strong> The agent monitors yield rates across 8+ chains in real-time.
                  When a profitable rebalancing opportunity is found (APR improvement &gt; 1%), 
                  it automatically moves your funds via LayerZero and executes swaps through Uniswap v4 or 1inch.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* History List */}
        {!loading && !error && history.length > 0 && (
          <div className="space-y-4">
            {history.map((tx) => (
              <Card key={tx.id} variant="dialogue">
                <div className="space-y-4">
                  {/* Transaction Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-display font-bold text-green-700">
                        {tx.from_chain} → {tx.to_chain}
                      </h3>
                      <p className="text-sm text-green-600">
                        {formatDate(tx.initiated_at)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-display ${getStatusBadge(tx.status)}`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Transaction Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-green-600 mb-1">Amount</p>
                      <p className="text-md font-display font-bold text-green-800">
                        {tx.amount.toLocaleString()} {tx.token}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 mb-1">From APR</p>
                      <p className="text-md font-display font-bold text-pink-600">
                        {tx.from_apr.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 mb-1">To APR</p>
                      <p className="text-md font-display font-bold text-green-600">
                        {tx.to_apr.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 mb-1">Expected Gain</p>
                      <p className="text-md font-display font-bold text-green-800">
                        {tx.expected_gain ? `+$${tx.expected_gain.toFixed(2)}` : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Transaction Hash */}
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-green-600">TX Hash:</p>
                    <a
                      href={`https://layerzeroscan.com/tx/${tx.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-pink-600 hover:text-pink-700 underline"
                    >
                      {shortenTxHash(tx.tx_hash)}
                    </a>
                  </div>

                  {/* Error Message */}
                  {tx.status === 'failed' && tx.error_message && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
                      <p className="text-xs text-red-700 font-body">
                        ❌ {tx.error_message}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

