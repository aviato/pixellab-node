import { beforeAll, describe, expect, it } from 'vitest';
import animateSkeletonFromText from "../../src/lib/animateSkeletonFromText.js";
import {
  mockFetchSuccess,
  mockFetchNetworkError,
  createMockClientSettings,
} from "../utils/index.js";
import { AnimateWithTextParams } from "../../src/types.js";
import { API } from "../../src/constants.js";

const mockAnimateSkeletonParams: AnimateWithTextParams = {
  reference_image: {
    type: "base64",
    base64: "mockedImageBase64Data",
  },
  description: "a spooky skeleton dancing",
  action: "dance",
  image_size: {
    width: 512,
    height: 512,
  },
};

describe("animateSkeletonFromSkeleton", () => {
  let mockClientSettings: any;

  beforeAll(() => {
    mockClientSettings = createMockClientSettings();
  });

  it("should animate skeleton successfully", async () => {
    const mockSkeletonResponse = {
      images: [
        { type: "base64", base64: "mockedImageBase64Data1" },
        { type: "base64", base64: "mockedImageBase64Data2" },
        { type: "base64", base64: "mockedImageBase64Data3" },
      ],
      usage: {
        type: "usd",
        usd: 0.05,
      },
    };

    mockFetchSuccess(mockSkeletonResponse);

    const result = await animateSkeletonFromText(
      mockClientSettings,
      mockAnimateSkeletonParams
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.ANIMATE_SKELETON_WITH_TEXT}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockAnimateSkeletonParams),
      }
    );
    expect(result).toEqual(mockSkeletonResponse);
  });

  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(
      animateSkeletonFromText(mockClientSettings, mockAnimateSkeletonParams)
    ).rejects.toThrow(
      "Failed to animate skeleton with text: Error: Network request failed"
    );
  });
});
