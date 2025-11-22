/**
 * Stub implementation for Pyth Hermes Client
 * Replace with actual @pythnetwork/hermes-client in production
 */

export interface PriceData {
  id: string;
  price: {
    price: string;
    conf: string;
    expo: number;
    publish_time: number;
  };
}

export class HermesClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    console.log(`[Stub] Hermes client initialized with URL: ${baseUrl}`);
  }

  async getLatestPriceFeeds(priceIds: string[]): Promise<PriceData[]> {
    console.log(`[Stub] Getting price feeds for ${priceIds.length} assets`);
    
    // Return mock data for development
    return priceIds.map(id => ({
      id,
      price: {
        price: "2000",
        conf: "1",
        expo: -8,
        publish_time: Math.floor(Date.now() / 1000)
      }
    }));
  }

  async getPriceUpdates(priceIds: string[]): Promise<string[]> {
    console.log(`[Stub] Getting price update data for ${priceIds.length} assets`);
    return ["0x0000"];
  }
}

