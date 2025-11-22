/**
 * HedgePod Agent - Main Landing Page
 * Animal Crossing-inspired World Mini App for autonomous cross-chain DeFi
 */

import { Button } from '@/components/Button';
import { FeatureCard, HeroCard } from '@/components/Card';
import { BadgeGroup } from '@/components/Badge';
import { Avatar } from '@/components/Avatar';
import { Navigation } from '@/components/Navigation';
import { PageLayout } from '@/components/PageLayout';

export default function Home() {
  const integrations = [
    'LayerZero', 'Pyth Network', '1inch', 'Uniswap v4', 
    'Chainlink', 'World', 'Privy', 'Coinbase CDP', 
    'ENS', 'Octav'
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        <Navigation />

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-green-700 drop-shadow-lg">
            HedgePod Agent
          </h1>
          <p className="text-lg md:text-xl text-green-800 font-body max-w-2xl mx-auto">
            Autonomous cross-chain DeFi that makes 23M World App users their own hedge fund
          </p>
        </div>

        {/* Hero Card with Hedgehog */}
        <HeroCard>
          <Avatar size="lg" />
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-green-700 text-center">
            HedgePod Agent
          </h2>
          
          <p className="text-center text-green-800 font-body text-lg leading-relaxed">
            <span className="font-bold text-pink-600">TL;DR:</span> Deposit once. AI agents automatically
            rebalance across 8+ chains for optimal yield. Gasless. Chain-abstracted. Human-readable.
            Built for non-crypto users.
          </p>
          
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </HeroCard>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon="📊"
            title="Real-Time Monitoring"
            description="Monitor yields across 8+ chains in real-time"
          />
          <FeatureCard 
            icon="🤖"
            title="Autonomous Agents"
            description="AI agents automatically rebalance for optimal APR"
          />
          <FeatureCard 
            icon="⚡"
            title="Gasless UX"
            description="All transactions sponsored via Privy"
          />
          <FeatureCard 
            icon="🌐"
            title="LayerZero"
            description="Seamless cross-chain token transfers"
          />
          <FeatureCard 
            icon="🔒"
            title="World ID"
            description="Sybil-resistant with World ID verification"
          />
          <FeatureCard 
            icon="📈"
            title="Uniswap v4"
            description="Dynamic fees based on volatility"
          />
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <p className="text-sm text-green-700 font-body italic">
            For 23M World App users who don't know what an RPC is—and never should.
          </p>
        </div>

        {/* Integration Badges */}
        <BadgeGroup badges={integrations} />

        {/* Footer */}
        <footer className="text-center text-sm text-green-700 pt-8 font-body">
          <p>Built with ❤️ at ETHGlobal Buenos Aires 2025</p>
          <p className="mt-2 font-display font-bold text-pink-600">Eight chains. One app. Zero friction.</p>
        </footer>
      </div>
    </PageLayout>
  );
}
