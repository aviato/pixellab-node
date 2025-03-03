type ValidCurrencyTypes = "usd";
export interface Usage {
  type: ValidCurrencyTypes;
  usd: number;
}
export interface BalanceResponse {
  usd: number;
}
export interface RequestSettings {
  headers: Record<string, string>;
  baseUrl: string;
}
interface Base64Image {
  /** Always "base64" */
  type: "base64";
  /** Base64-encoded image data */
  base64: string;
}
interface SkeletonKeypoint {
  x: number;
  y: number;
  label: string;
  z_index: number;
}
type SkeletonKeypoints = SkeletonKeypoint[][];
type CameraView = "side" | "low top-down" | "high top-down";
type Direction =
  | "south"
  | "south-east"
  | "east"
  | "north-east"
  | "north"
  | "north-west"
  | "west"
  | "south-west";
type Outline =
  | "single color black outline"
  | "single color outline"
  | "selective outline"
  | "lineless";
type Shading =
  | "flat shading"
  | "basic shading"
  | "medium shading"
  | "detailed shading"
  | "highly detailed shading";
type Detail = "low detail" | "medium detail" | "highly detail";
type SkeletonFrame = number[][];
interface ImageSize {
  width: number;
  height: number;
}
export interface BaseParams {
  /** Size of the image to generate (height and width values must be divisible by 8) */
  image_size: ImageSize;
  /** Seed decides the starting noise */
  seed?: number;
  /** Image used to extract and set color information */
  color_image?: Base64Image;
}
export interface TextGenerationParams extends BaseParams {
  /** Text description of the image to generate */
  description: string;
  /** Text description of what to avoid in the generated image */
  negative_description?: string;
  /** How closely to follow the text description (min: 1, max: 20, default: 8) */
  text_guidance_scale?: number;
}
interface InitImageParams {
  init_image?: Base64Image;
  /** Strength of the initial image influence */
  init_image_strength?: number;
}
interface OptionalInpaintingParams {
  inpainting_image?: Base64Image;
  mask_image?: Base64Image;
}
interface StyleViewParams {
  outline?: Outline;
  shading?: Shading;
  detail?: Detail;
  view?: CameraView;
  direction?: Direction;
  /** Generate in isometric view (weakly guiding) */
  isometric?: boolean;
  /** Generate with transparent background, (blank background over 200x200 area) */
  no_background?: boolean;
}
interface ProjectionParams extends StyleViewParams {
  /** Generate in oblique projection */
  oblique_projection?: boolean;
}
type StyleViewParamsForAnimation = Pick<StyleViewParams, "view" | "direction">;
export interface AnimateWithTextParams
  extends BaseParams,
    TextGenerationParams,
    StyleViewParamsForAnimation,
    InitImageParams,
    OptionalInpaintingParams {
  /** Action description */
  action: string;
  /** Length of full animation (the model will always generate 4 frames) */
  n_frames?: number;
  /** Starting frame index of the full animation */
  start_frame_index?: number;
}
export interface ImageGenerationParams
  extends BaseParams,
    TextGenerationParams,
    InitImageParams {
  /** Percentage of the canvas to cover */
  coverage_percentage?: number;
}
export interface BitForgeImageGenerationParams
  extends ImageGenerationParams,
    OptionalInpaintingParams,
    ProjectionParams {
  /** How closely to follow the style reference */
  extra_guidance_scale?: number;
  /** Strength of the style transfer (0-100) */
  style_strength?: number;
  style_image?: Base64Image;
}
export interface PixFluxImageGenerationParams
  extends ImageGenerationParams,
    StyleViewParams {}
export interface RotateImageParams
  extends BaseParams,
    InitImageParams,
    OptionalInpaintingParams,
    ProjectionParams {
  from_image: Base64Image;
  from_view?: CameraView;
  to_view?: CameraView;
  from_direction?: Direction;
  to_direction?: Direction;
  /** How closely to follow the reference image */
  image_guidance_scale?: number;
}
export interface AnimateWithSkeletonParams
  extends BaseParams,
    InitImageParams,
    ProjectionParams,
    StyleViewParamsForAnimation {
  reference_image: Base64Image;
  /** Skeleton points */
  skeleton_keypoints?: SkeletonKeypoints;
  /** How closely to follow the reference image and skeleton keypoints */
  guidance_scale?: number;
  inpainting_images?: Base64Image[];
  init_images?: Base64Image[];
  mask_images?: Base64Image[];
}
export interface InpaintImageParams
  extends BaseParams,
    TextGenerationParams,
    InitImageParams,
    ProjectionParams {
  /** Image to inpaint */
  inpainting_image: Base64Image;
  /** Mask image */
  mask_image: Base64Image;
}
export interface ImageGenerationResponse {
  image: Base64Image;
  usage: Usage;
}
export interface AnimateSkeletonResponse {
  images: Base64Image[];
  usage: Usage;
}
