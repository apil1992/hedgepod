/**
 * Stub implementation for Coinbase SDK
 * Replace with actual @coinbase/coinbase-sdk in production
 */

export interface CoinbaseConfig {
  apiKeyName: string;
  privateKey: string;
}

export interface WalletAddress {
  toString(): string;
}

export interface WalletConfig {
  networkId: string;
}

export interface ContractInvocation {
  contractAddress: string;
  method: string;
  args: any[];
  authorization?: string;
}

export class Wallet {
  static async create(config: WalletConfig): Promise<Wallet> {
    console.log(`[Stub] Creating wallet on network: ${config.networkId}`);
    return new Wallet();
  }

  async getDefaultAddress(): Promise<WalletAddress> {
    return {
      toString: () => "0x0000000000000000000000000000000000000000"
    };
  }

  async invokeContract(invocation: ContractInvocation): Promise<string> {
    console.log(`[Stub] Invoking contract: ${invocation.contractAddress}.${invocation.method}`);
    return "0x0000000000000000000000000000000000000000000000000000000000000000";
  }

  async export(): Promise<any> {
    console.warn("[Stub] Wallet export not implemented");
    return {};
  }
}

export class Coinbase {
  constructor(config: CoinbaseConfig) {
    console.log(`[Stub] Coinbase SDK initialized with API key: ${config.apiKeyName}`);
  }
}

