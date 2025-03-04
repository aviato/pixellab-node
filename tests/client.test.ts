import PixelLabClient from "../src/client";
import * as lib from "../src/lib";
import {
  AnimateSkeletonResponse,
  CameraView,
  Direction,
  ImageGenerationResponse,
} from "../src/types";

jest.mock("../src/lib", () => ({
  getBalance: jest.fn(),
  generatePixFluxImage: jest.fn(),
  generateBitForgeImage: jest.fn(),
  animateSkeletonFromSkeleton: jest.fn(),
  animateSkeletonFromText: jest.fn(),
  rotateImage: jest.fn(),
  inpaintImage: jest.fn(),
}));

const originalEnv = process.env;

describe("PixelLabClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("constructor", () => {
    beforeAll(() => {
      process.env.PIXELLAB_API_KEY = "env-api-key";
    });

    it("should initialize with API key from environment variable", () => {
      const client = new PixelLabClient();
      expect(client).toBeDefined();
    });

    it("should throw error if no API key is provided", () => {
      delete process.env.PIXELLAB_API_KEY;
      expect(() => new PixelLabClient()).toThrow(
        "A Pixellab API key is required to use this client."
      );
    });
  });

  describe("getBalance", () => {
    it("should call lib.getBalance with correct settings", async () => {
      const mockResponse = { usd: 100 };
      (lib.getBalance as jest.Mock).mockResolvedValue(mockResponse);

      const client = new PixelLabClient();
      const result = await client.getBalance();

      expect(lib.getBalance).toHaveBeenCalledWith({
        headers: {
          Authorization: "Bearer env-api-key",
        },
        baseUrl: "https://api.pixellab.ai/v1",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("generatePixFluxImage", () => {
    it("should call lib.generatePixFluxImage with correct params", async () => {
      const mockParams = {
        description: "test description",
        image_size: { width: 400, height: 400 },
      };
      const mockResponse: ImageGenerationResponse = {
        image: { type: "base64", base64: "image-data" },
        usage: { type: "usd", usd: 0.01 },
      };
      (lib.generatePixFluxImage as jest.Mock).mockResolvedValue(mockResponse);

      const client = new PixelLabClient();
      const result = await client.generatePixFluxImage(mockParams);

      expect(lib.generatePixFluxImage).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: "Bearer env-api-key" },
        }),
        mockParams
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("generateBitForgeImage", () => {
    it("should call lib.generateBitForgeImage with correct params", async () => {
      const mockParams = {
        description: "test description",
        image_size: { width: 512, height: 512 },
      };
      const mockResponse: ImageGenerationResponse = {
        image: { type: "base64", base64: "image-data" },
        usage: { type: "usd", usd: 0.02 },
      };
      (lib.generateBitForgeImage as jest.Mock).mockResolvedValue(mockResponse);

      const client = new PixelLabClient();
      const result = await client.generateBitForgeImage(mockParams);

      expect(lib.generateBitForgeImage).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: "Bearer env-api-key" },
        }),
        mockParams
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("animateSkeletonFromSkeleton", () => {
    it("should call lib.animateSkeletonFromSkeleton with correct params", async () => {
      const mockParams = {
        reference_image: { type: "base64" as const, base64: "ref-image" },
        skeleton_keypoints: [],
        image_size: { width: 64, height: 64 },
      };
      const mockResponse: AnimateSkeletonResponse = {
        images: [{ type: "base64", base64: "frame1" }],
        usage: { type: "usd", usd: 0.03 },
      };
      (lib.animateSkeletonFromSkeleton as jest.Mock).mockResolvedValue(
        mockResponse
      );

      const client = new PixelLabClient();
      const result = await client.animateSkeletonFromSkeleton(mockParams);

      expect(lib.animateSkeletonFromSkeleton).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: "Bearer env-api-key" },
        }),
        mockParams
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("animateSkeletonFromText", () => {
    it("should call lib.animateSkeletonFromText with correct params", async () => {
      const mockParams = {
        description: "A funny cat",
        action: "walk",
        image_size: { width: 64, height: 64 },
        view: "side" as CameraView,
        direction: "east" as Direction,
        reference_image: { type: "base64", base64: "ref-image" },
      };
      const mockResponse: AnimateSkeletonResponse = {
        images: [
          { type: "base64", base64: "frame1" },
          { type: "base64", base64: "frame2" },
          { type: "base64", base64: "frame3" },
        ],
        usage: { type: "usd", usd: 0.04 },
      };
      (lib.animateSkeletonFromText as jest.Mock).mockResolvedValue(
        mockResponse
      );

      const client = new PixelLabClient();
      const result = await client.animateSkeletonFromText(mockParams);

      expect(lib.animateSkeletonFromText).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: "Bearer env-api-key" },
        }),
        mockParams
      );
      expect(result).toEqual(mockResponse);
      expect(result.images.length).toBe(3);
    });
  });

  describe("rotateImage", () => {
    it("should call lib.rotateImage with correct params", async () => {
      const mockParams = {
        from_image: { type: "base64" as const, base64: "image-data" },
        image_size: { width: 64, height: 64 },
      };
      const mockResponse: ImageGenerationResponse = {
        image: { type: "base64", base64: "rotated-image" },
        usage: { type: "usd", usd: 0.005 },
      };
      (lib.rotateImage as jest.Mock).mockResolvedValue(mockResponse);

      const client = new PixelLabClient();
      const result = await client.rotateImage(mockParams);

      expect(lib.rotateImage).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: "Bearer env-api-key" },
        }),
        mockParams
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("inpaintImage", () => {
    it("should call lib.inpaintImage with correct params", async () => {
      const mockParams = {
        description: "A knight with a sword",
        inpainting_image: { type: "base64" as const, base64: "image-data" },
        mask_image: { type: "base64" as const, base64: "mask-data" },
        image_size: { width: 512, height: 512 },
      };
      const mockResponse = {
        image: { type: "base64", base64: "inpainted-image" },
        usage: { type: "usd", usd: 0.03 },
      };
      (lib.inpaintImage as jest.Mock).mockResolvedValue(mockResponse);

      const client = new PixelLabClient();
      const result = await client.inpaintImage(mockParams);

      expect(lib.inpaintImage).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: "Bearer env-api-key" },
        }),
        mockParams
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
