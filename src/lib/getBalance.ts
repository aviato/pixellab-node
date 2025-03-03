import { BalanceResponse, RequestSettings } from '../types';

/**
 * Get the current balance of a Pixellab account.
 * @param requestSettings - The request settings.
 * @returns The balance of the Pixellab account.
 * @throws An error if the request fails.
 *
 * @example
 * ```ts
 * const client = new PixelLabClient();
 * const balance = await client.getBalance();
 * console.log(balance); // { usd: 100 }
 * ```
 */
export default async function getBalance(requestSettings: RequestSettings): Promise<BalanceResponse> {
  try {
    const res = await fetch(`${requestSettings.baseUrl}/balance`, {
      method: 'GET',
      headers: requestSettings.headers,
    });
    return res.json() as Promise<BalanceResponse>;
  } catch (error) {
    throw new Error(`Failed to get balance: ${error}`);
  }
}

