import rotateImage from "../../src/lib/rotateImage";
import {
  mockFetchSuccess,
  mockFetchNetworkError,
  createMockClientSettings,
} from "../utils";
import { RotateImageParams, ImageGenerationResponse } from "../../src/types";
import { API } from "../../src/constants";

const mockRotateImageParams: RotateImageParams = {
  from_image: {
    type: "base64",
    base64: "mockbase64sourceimage",
  },
  image_size: {
    width: 64,
    height: 64,
  },
};

describe("rotateImage", () => {
  let mockClientSettings: any;

  beforeAll(() => {
    mockClientSettings = createMockClientSettings();
  });

  it("should rotate image successfully", async () => {
    const mockRotateResponse = {
      image: {
        type: "base64",
        base64: "mockedRotatedImageBase64Data",
      },
      usage: {
        type: "usd",
        usd: 0.01,
      },
    };

    mockFetchSuccess(mockRotateResponse);

    const result = await rotateImage(mockClientSettings, mockRotateImageParams);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.ROTATE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockRotateImageParams),
      }
    );
    expect(result).toEqual(mockRotateResponse);
    expect(result.image.type).toBe("base64");
    expect(result.image.base64).toBe("mockedRotatedImageBase64Data");
    expect(result.usage.type).toBe("usd");
    expect(result.usage.usd).toBe(0.01);
  });

  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(
      rotateImage(mockClientSettings, mockRotateImageParams)
    ).rejects.toThrow("Failed to rotate image: Error: Network request failed");
  });
});
