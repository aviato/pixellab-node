import animateSkeletonFromSkeleton from "../../src/lib/animateSkeletonFromSkeleton";
import {
  mockFetchSuccess,
  mockFetchNetworkError,
  createMockClientSettings,
} from "../utils";
import { AnimateFromSkeletonParams, SkeletonKeypoints } from "../../src/types";
import mockSkeletonKeypoints from "../data/mockSkeletonKeypoints.json";
import { API } from "../../constants";

const mockAnimateSkeletonParams: AnimateFromSkeletonParams = {
  reference_image: {
    type: "base64",
    base64: "mockbase64image",
  },
  skeleton_keypoints: mockSkeletonKeypoints.pose_keypoints as SkeletonKeypoints,
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

    const result = await animateSkeletonFromSkeleton(
      mockClientSettings,
      mockAnimateSkeletonParams
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API.BASE_URL}${API.ROUTES.ANIMATE_SKELETON_WITH_SKELETON}`,
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: `Bearer ${mockClientSettings.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockAnimateSkeletonParams),
      })
    );

    expect(result).toEqual(mockSkeletonResponse);
  });

  it("should throw an error on failure", async () => {
    mockFetchNetworkError();
    expect.assertions(1);
    await expect(
      animateSkeletonFromSkeleton(mockClientSettings, mockAnimateSkeletonParams)
    ).rejects.toThrow(
      "Failed to animate skeleton with skeleton: Error: Network request failed"
    );
  });
});
