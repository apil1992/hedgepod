/**
 * Pyth Network Price Feed IDs
 * 
 * Official Pyth price feed identifiers for various assets
 * Source: https://pyth.network/developers/price-feed-ids
 */

export const PRICE_IDS = {
  // Major Cryptocurrencies
  ETH_USD: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  BTC_USD: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  
  // Stablecoins
  USDC_USD: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  USDT_USD: "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
  DAI_USD: "0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd",
  
  // Other Assets (for future use)
  MATIC_USD: "0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52",
  AVAX_USD: "0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7",
  OP_USD: "0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf",
  ARB_USD: "0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5",
  
  // LP Tokens (if needed)
  CELO_USD: "0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411",
};

/**
 * Get price ID for a given asset pair
 * @param asset - Asset symbol (e.g., 'ETH', 'BTC', 'USDC')
 * @param quote - Quote currency (default: 'USD')
 * @returns Pyth price feed ID
 */
export function getPriceId(asset: string, quote: string = 'USD'): string {
  const key = `${asset.toUpperCase()}_${quote.toUpperCase()}`;
  const priceId = PRICE_IDS[key as keyof typeof PRICE_IDS];
  
  if (!priceId) {
    throw new Error(`Price feed not found for ${key}. Available feeds: ${Object.keys(PRICE_IDS).join(', ')}`);
  }
  
  return priceId;
}

/**
 * Get all available price feeds
 */
export function getAvailablePriceFeeds(): string[] {
  return Object.keys(PRICE_IDS);
}

