/**
 * HedgePod Agent - Main Landing Page
 * World Mini App for autonomous cross-chain DeFi
 */

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HedgePod Agent
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Autonomous cross-chain DeFi that makes 23M World App users their own hedge fund
          </p>
        </div>

        {/* TL;DR Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-center">
            <span className="font-semibold">TL;DR:</span> Deposit once. AI agents automatically
            rebalance across 8+ chains for optimal yield. Gasless. Chain-abstracted. Human-readable.
            Built for non-crypto users.
          </p>
        </div>

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
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            Open in World App
          </button>
          <p className="text-sm text-gray-500">
            For 23M World App users who don't know what an RPC is—and never should.
          </p>
        </div>

        {/* Integration Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          <Badge text="LayerZero" />
          <Badge text="Pyth Network" />
          <Badge text="1inch" />
          <Badge text="Uniswap v4" />
          <Badge text="Chainlink" />
          <Badge text="World" />
          <Badge text="Privy" />
          <Badge text="Coinbase CDP" />
          <Badge text="ENS" />
          <Badge text="Octav" />
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-8">
          <p>Built with ❤️ at ETHGlobal Buenos Aires 2025</p>
          <p className="mt-2">Eight chains. One app. Zero friction.</p>
        </footer>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
      {text}
    </span>
  );
}
