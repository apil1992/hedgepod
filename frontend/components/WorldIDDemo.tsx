/**
 * World ID Demo Component
 * For demo videos - shows QR code and auto-verifies after 3 seconds
 */
'use client';

import { Button } from './Button';
import { useState } from 'react';
import { DEMO_MODE } from '@/lib/mockData';

interface WorldIDDemoProps {
  onSuccess: (proof: any) => void;
  onError?: (error: any) => void;
}

export function WorldIDDemo({ onSuccess, onError }: WorldIDDemoProps) {
  const [showQR, setShowQR] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyClick = () => {
    setShowQR(true);
    setIsVerifying(true);

    // Auto-verify after 3 seconds for demo
    setTimeout(() => {
      const mockProof = {
        merkle_root: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        nullifier_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        proof: '0x567890abcdef',
        verification_level: 'orb',
        credential_type: 'orb',
      };
      
      setIsVerifying(false);
      setIsVerified(true);
      onSuccess(mockProof);
    }, 3000);
  };

  const handleSkipVerification = () => {
    const mockProof = {
      merkle_root: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      nullifier_hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      proof: '0x567890abcdef',
      verification_level: 'orb',
      credential_type: 'orb',
    };
    
    setIsVerified(true);
    onSuccess(mockProof);
  };

  if (!DEMO_MODE) {
    // In production, use the real World ID widget
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 border-2 border-green-300 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔒</span>
          <div className="flex-1">
            <h4 className="font-display font-bold text-green-700 mb-1">
              Sybil Resistant
            </h4>
            <p className="text-sm text-green-800 font-body">
              World ID verification ensures fair access and prevents bot manipulation.
            </p>
          </div>
        </div>
      </div>

      {!showQR && !isVerified && (
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleVerifyClick}
          className="w-full"
        >
          🔒 Verify with World ID
        </Button>
      )}

      {showQR && !isVerified && (
        <div className="bg-white border-3 border-brown-500 rounded-2xl p-6 text-center space-y-4">
          <h4 className="font-display font-bold text-green-700">
            Scan with World App
          </h4>
          
          {/* Mock QR Code */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-pink-100 to-green-100 rounded-xl flex items-center justify-center border-3 border-brown-400">
              <div className="text-center">
                <div className="text-6xl mb-2">🌍</div>
                <div className="text-xs text-green-700 font-mono">
                  QR Code Here
                </div>
                <div className="text-xs text-green-600 font-body mt-1">
                  (Demo Mode)
                </div>
              </div>
            </div>
          </div>

          {isVerifying && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <p className="text-sm text-green-700 font-body">
                Verifying your humanity...
              </p>
            </div>
          )}

          <p className="text-xs text-green-600 font-body">
            Open World App on your phone and scan this code
          </p>

          {/* Skip button for quick demo */}
          <button
            onClick={handleSkipVerification}
            className="text-xs text-green-600 hover:text-green-700 font-body underline"
          >
            Skip for demo
          </button>
        </div>
      )}

      {isVerified && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center space-y-2">
          <div className="text-4xl">✅</div>
          <p className="font-display font-bold text-green-700">
            Verified with World ID!
          </p>
          <p className="text-sm text-green-600 font-body">
            Your humanity has been verified. You can now deploy your agent.
          </p>
        </div>
      )}

      <p className="text-xs text-center text-green-600 font-body italic">
        World ID uses zero-knowledge proofs to verify you&apos;re human without revealing your identity
      </p>
    </div>
  );
}

