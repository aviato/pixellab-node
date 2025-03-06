import { API } from "../../src/constants";
import generatePixFluxImage from "../../src/lib/generatePixFluxImage";
import { PixFluxImageGenerationParams } from "../../src/types";
import {
  createMockClientSettings,
  mockFetchSuccess,
  mockFetchNetworkError,
} from "../utils";

const mockPixFluxImageGenerationParams: PixFluxImageGenerationParams = {
  description: "a dog using a computer",
  image_size: {
    width: 256,
    height: 256,
  },
};

describe("generatePixFluxImage", () => {
  let mockClientSettings: any;

  beforeAll(() => {
    mockClientSettings = createMockClientSettings();
  });

  it("should generate a valid PixFlux image on success", async () => {
    mockFetchSuccess({
      image: {
        base64: "mockbase64data",
        type: "base64",
      },
      usage: {
        type: "usd",
        usd: 0.001,
      },
    });
    const imageResponse = await generatePixFluxImage(
      mockClientSettings,
      mockPixFluxImageGenerationParams
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.PIXFLUX}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockPixFluxImageGenerationParams),
      }
    );
    expect(imageResponse.usage.type).toBe("usd");
    expect(imageResponse.usage.usd).toBe(0.001);
    expect(imageResponse.image.type).toBe("base64");
    expect(imageResponse.image.base64).toBe("mockbase64data");
  });
  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(
      generatePixFluxImage(mockClientSettings, mockPixFluxImageGenerationParams)
    ).rejects.toThrow(
      "Failed to generate PixFlux image: Error: Network request failed"
    );
  });
});
