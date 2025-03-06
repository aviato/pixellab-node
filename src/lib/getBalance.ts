import { API } from "../constants";
import { BalanceResponse, RequestSettings } from "../types";

export default async function getBalance(
  requestSettings: RequestSettings
): Promise<BalanceResponse> {
  try {
    const res = await fetch(`${requestSettings.baseUrl}${API.ROUTES.BALANCE}`, {
      method: "GET",
      headers: requestSettings.headers,
    });
    return res.json() as Promise<BalanceResponse>;
  } catch (error) {
    throw new Error(`Failed to get balance: ${error}`);
  }
}
