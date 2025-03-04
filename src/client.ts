import "dotenv/config";
import {
  getBalance,
  generatePixFluxImage,
  generateBitForgeImage,
  animateSkeletonFromSkeleton,
  animateSkeletonFromText,
  rotateImage,
  inpaintImage,
} from "./lib";

import {
  AnimateSkeletonResponse,
  AnimateFromSkeletonParams,
  AnimateWithTextParams,
  BalanceResponse,
  BitForgeImageGenerationParams,
  ImageGenerationResponse,
  InpaintImageParams,
  PixFluxImageGenerationParams,
  RequestSettings,
  RotateImageParams,
} from "./types";
import { API } from "../constants";

export default class PixelLabClient {
  private apiKey: string | undefined;
  private baseUrl: string = API.BASE_URL;
  private requestSettings: RequestSettings;

  constructor() {
    this.apiKey = process.env.PIXELLAB_API_KEY;

    if (!this.apiKey) {
      throw new Error("A Pixellab API key is required to use this client.");
    }

    this.requestSettings = {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      baseUrl: this.baseUrl,
    };
  }

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
  async getBalance(): Promise<BalanceResponse> {
    return getBalance(this.requestSettings);
  }

  /**
   * Generate an image using PixFlux.
   *
   * @param params - The parameters for image generation
   * @returns {Promise<ImageGenerationResponse>} Response containing the generated image and usage information
   * @throws {Error} If authentication fails or validation errors occur
   * @throws {HTTPError} For other HTTP-related errors
   *
   * @example
   * ```ts
   * const client = new PixelLabClient();
   * const result = await client.generatePixFluxImage({
   *   description: "A cute cat",
   *   image_size: { width: 400, height: 400 },
   * });
   * console.log(result?.image.type); // "base64"
   * ```
   */
  async generatePixFluxImage(
    params: PixFluxImageGenerationParams
  ): Promise<ImageGenerationResponse> {
    return generatePixFluxImage(this.requestSettings, params);
  }

  /**
   * Generate an image using BitForge.
   *
   * @param params - The parameters for image generation
   * @returns {Promise<ImageGenerationResponse>} Response containing the generated image and usage information
   * @throws {Error} If authentication fails or validation errors occur
   * @throws {HTTPError} For other HTTP-related errors
   *
   * @example
   * ```ts
   * const client = new PixelLabClient();
   * const result = await client.generateBitForgeImage({
   *   description: "A cute cat",
   *   image_size: { width: 400, height: 400 },
   * });
   * console.log(result?.image.type); // "base64"
   * ```
   */
  async generateBitForgeImage(
    params: BitForgeImageGenerationParams
  ): Promise<ImageGenerationResponse> {
    return generateBitForgeImage(this.requestSettings, params);
  }

  /**
   * Creates a pixel art animation based on the provided parameters.
   *
   * @param params - The request parameters for animating a skeleton with a skeleton
   * @returns {Promise<AnimateSkeletonResponse>} Response containing the generated images and usage information
   * @throws {Error} If authentication fails or validation errors occur
   * @throws {HTTPError} For other HTTP-related errors
   *
   * @example
   * ```ts
   * const client = new PixelLabClient();
   * const result = await client.animateSkeletonFromSkeleton({
   *  view: "side",
   *  direction: "east",
   *  image_size: { width: 63, height: 64 },
   *  reference_image: referenceImageData,
   *  skeleton_keypoints: skeletonKeypoints,
   * });
   * console.log(result?.images.length); // 2
   * console.log(result?.images[-1]?.type); // "base64"
   * ```
   */
  async animateSkeletonFromSkeleton(
    params: AnimateFromSkeletonParams
  ): Promise<AnimateSkeletonResponse> {
    return animateSkeletonFromSkeleton(this.requestSettings, params);
  }

  /**
   * Creates a pixel art animation based on the provided parameters.
   *
   * @param params - The request parameters for animating a skeleton with a skeleton
   * @returns {Promise<AnimateSkeletonResponse>} Response containing the generated images and usage information
   * @throws {Error} If authentication fails or validation errors occur
   * @throws {HTTPError} For other HTTP-related errors
   *
   * @example
   * ```ts
   * const client = new PixelLabClient();
   * const result = await client.animateSkeletonFromText({
   *  description: "A funny cat",
   *  action: "walk",
   *  image_size: { width: 64, height: 64 },
   *  view: "side",
   *  direction: "east",
   *  reference_image: referenceImageData,
   * });
   * console.log(result?.images.length); // 3
   * console.log(result?.images[0]?.type); // "base64"
   * ```
   */
  async animateSkeletonFromText(
    params: AnimateWithTextParams
  ): Promise<AnimateSkeletonResponse> {
    return animateSkeletonFromText(this.requestSettings, params);
  }

  /**
   * Creates a pixel art animation based on the provided parameters.
   *
   * @param params - The request parameters for rotating a pixel art image
   * @returns {Promise<ImageGenerationResponse>} Response containing the rotated image and usage information
   * @throws {Error} If authentication fails or validation errors occur
   * @throws {HTTPError} For other HTTP-related errors
   *
   * @example
   * ```ts
   * const client = new PixelLabClient();
   * const result = await client.rotateImage({
   *  from_view: "side",
   *  to_view: "side",
   *  from_direction: "east",
   *  to_direction: "west",
   *  image_size: { width: 64, height: 64 },
   *  from_image: fromImageData,
   * });
   * console.log(result?.image.type); // "base64"
   * ```
   */
  async rotateImage(
    params: RotateImageParams
  ): Promise<ImageGenerationResponse> {
    return rotateImage(this.requestSettings, params);
  }

  /**
   * Create pixel art based on the provided parameters.
   *
   * @param params - The request parameters for creating a pixel art image
   * @returns {Promise<ImageGenerationResponse>} Response containing the image and usage information
   * @throws {Error} If authentication fails or validation errors occur
   * @throws {HTTPError} For other HTTP-related errors
   *
   * @example
   * ```ts
   * const client = new PixelLabClient();
   * const result = await client.inpaintImage({
   *  description: "A cute cat",
   *  mask: maskImageData,
   *  inptainting_image: inpaintingImageData,
   *  image_size: { width: 64, height: 64 },
   * });
   * console.log(result?.image.type); // "base64"
   * ```
   */
  async inpaintImage(
    params: InpaintImageParams
  ): Promise<ImageGenerationResponse> {
    return inpaintImage(this.requestSettings, params);
  }
}
