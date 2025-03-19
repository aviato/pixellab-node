import { beforeAll, describe, expect, it } from 'vitest';
import inpaintImage from "../../src/lib/inpaintImage.js";
import {
  mockFetchSuccess,
  mockFetchNetworkError,
  createMockClientSettings,
} from "../utils/index.js";
import { InpaintImageParams } from "../../src/types.js";
import { API } from "../../src/constants.js";

const mockInpaintImageParams: InpaintImageParams = {
  description: "a cat wearing a crown",
  inpainting_image: {
    type: "base64",
    base64: "mockbase64sourceimage",
  },
  mask_image: {
    type: "base64",
    base64: "mockbase64maskimage",
  },
  image_size: {
    width: 512,
    height: 512,
  },
};

describe("inpaintImage", () => {
  let mockClientSettings: any;

  beforeAll(() => {
    mockClientSettings = createMockClientSettings();
  });

  it("should inpaint image successfully", async () => {
    const mockInpaintResponse = {
      image: {
        type: "base64",
        base64: "mockedInpaintedImageBase64Data",
      },
      usage: {
        type: "usd",
        usd: 0.03,
      },
    };

    mockFetchSuccess(mockInpaintResponse);

    const result = await inpaintImage(
      mockClientSettings,
      mockInpaintImageParams
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.INPAINT}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockInpaintImageParams),
      }
    );
    expect(result).toEqual(mockInpaintResponse);
    expect(result.image.type).toBe("base64");
    expect(result.image.base64).toBe("mockedInpaintedImageBase64Data");
    expect(result.usage.type).toBe("usd");
    expect(result.usage.usd).toBe(0.03);
  });

  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(
      inpaintImage(mockClientSettings, mockInpaintImageParams)
    ).rejects.toThrow("Failed to inpaint image: Error: Network request failed");
  });
});
