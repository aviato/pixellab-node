import { beforeAll, describe, expect, it } from 'vitest';
import { API } from "../../src/constants.js";
import generateBitForgeImage from "../../src/lib/generateBitForgeImage.js";
import { BitForgeImageGenerationParams } from "../../src/types.js";
import {
  mockFetchSuccess,
  mockFetchNetworkError,
  createMockClientSettings,
} from "../utils/index.js";

const mockBitForgeImageGenerationParams: BitForgeImageGenerationParams = {
  description: "a cat playing piano",
  image_size: {
    width: 512,
    height: 512,
  },
  negative_description: "blurry, low quality",
  seed: 42,
};

describe("generateBitForgeImage", () => {
  let mockClientSettings: any;

  beforeAll(() => {
    mockClientSettings = createMockClientSettings();
  });

  it("should generate a valid BitForge image on success", async () => {
    mockFetchSuccess({
      image: {
        base64: "mockbase64dataforbitforge",
        type: "base64",
      },
      usage: {
        type: "usd",
        usd: 0.002,
      },
    });
    const imageResponse = await generateBitForgeImage(
      mockClientSettings,
      mockBitForgeImageGenerationParams
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.BITFORGE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockBitForgeImageGenerationParams),
      }
    );
    expect(imageResponse.usage.type).toBe("usd");
    expect(imageResponse.usage.usd).toBe(0.002);
    expect(imageResponse.image.type).toBe("base64");
    expect(imageResponse.image.base64).toBe("mockbase64dataforbitforge");
  });

  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(
      generateBitForgeImage(
        mockClientSettings,
        mockBitForgeImageGenerationParams
      )
    ).rejects.toThrow(
      "Failed to generate BitForge image: Error: Network request failed"
    );
  });
});
