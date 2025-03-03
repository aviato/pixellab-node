import 'dotenv/config';
import {
  getBalance,
  generatePixFluxImage,
  generateBitForgeImage,
  animateSkeletonFromSkeleton,
  animateSkeletonFromText,
  rotateImage,
  inpaintImage
} from './lib';
import {
  AnimateWithSkeletonParams,
  AnimateWithTextParams,
  BitForgeImageGenerationParams,
  InpaintImageParams,
  PixFluxImageGenerationParams,
  RequestSettings,
  RotateImageParams,
} from './types';

export default class PixelLabClient {
  private apiKey: string | undefined;
  private baseUrl: string = "https://api.pixellab.ai/v1";
  private requestSettings: RequestSettings;

  constructor(apiKey = process.env.PIXELLAB_API_KEY) {
    if (!apiKey) {
      throw new Error("A Pixellab API key is required to use this client.");
    }
    this.apiKey = apiKey;
    this.requestSettings = {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      baseUrl: this.baseUrl,
    }
  }

  async getBalance() {
    return await getBalance(this.requestSettings);
  }

  async generatePixFluxImage(params: PixFluxImageGenerationParams) {
    return await generatePixFluxImage(this.requestSettings, params);
  }

  async generateBitForgeImage(params: BitForgeImageGenerationParams) {
    return await generateBitForgeImage(this.requestSettings, params);
  }

  async animateSkeletonFromSkeleton(params: AnimateWithSkeletonParams) {
    return await animateSkeletonFromSkeleton(this.requestSettings, params);
  }

  async animateSkeletonFromText(params: AnimateWithTextParams) {
    return await animateSkeletonFromText(this.requestSettings, params);
  }

  async rotateImage(params: RotateImageParams) {
    return await rotateImage(this.requestSettings, params);
  }

  async inpaintImage(params: InpaintImageParams) {
    return await inpaintImage(this.requestSettings, params);
  }
}

