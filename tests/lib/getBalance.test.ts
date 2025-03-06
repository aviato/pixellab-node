import { API } from "../../src/constants";
import getBalance from "../../src/lib/getBalance";
import {
  mockFetchSuccess,
  mockFetchNetworkError,
  createMockClientSettings,
} from "../utils";

const mockBalanceResponse = {
  usd: 25.75,
};

describe("getBalance", () => {
  let mockClientSettings: any;

  beforeAll(() => {
    mockClientSettings = createMockClientSettings();
  });

  it("should retrieve balance successfully", async () => {
    mockFetchSuccess(mockBalanceResponse);

    const result = await getBalance(mockClientSettings);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.BALANCE}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
        },
      }
    );
    expect(result).toEqual(mockBalanceResponse);
    expect(result.usd).toBe(25.75);
  });

  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(getBalance(mockClientSettings)).rejects.toThrow(
      "Failed to get balance: Error: Network request failed"
    );
  });
});
