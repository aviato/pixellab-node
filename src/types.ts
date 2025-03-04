export type ValidCurrencyTypes = "usd";

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

export interface Base64Image {
  /** Always "base64" */
  type: "base64";
  /** Base64-encoded image data */
  base64: string;
}

export type SkeletonLabel =
  | "NOSE"
  | "NECK"
  | "RIGHT SHOULDER"
  | "RIGHT ELBOW"
  | "RIGHT ARM"
  | "LEFT SHOULDER"
  | "LEFT ELBOW"
  | "LEFT ARM"
  | "RIGHT HIP"
  | "RIGHT KNEE"
  | "RIGHT LEG"
  | "LEFT HIP"
  | "LEFT KNEE"
  | "LEFT LEG"
  | "RIGHT EYE"
  | "LEFT EYE"
  | "RIGHT EAR"
  | "LEFT EAR";

export interface SkeletonKeypoint {
  x: number;
  y: number;
  label: SkeletonLabel;
  z_index: number;
}

export type SkeletonKeypoints = SkeletonKeypoint[][];

export type CameraView = "side" | "low top-down" | "high top-down";

export type Direction =
  | "south"
  | "south-east"
  | "east"
  | "north-east"
  | "north"
  | "north-west"
  | "west"
  | "south-west";

export type Outline =
  | "single color black outline"
  | "single color outline"
  | "selective outline"
  | "lineless";

export type Shading =
  | "flat shading"
  | "basic shading"
  | "medium shading"
  | "detailed shading"
  | "highly detailed shading";

export type Detail = "low detail" | "medium detail" | "highly detail";

export interface ImageSize {
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

export interface InitImageParams {
  init_image?: Base64Image;
  /** Strength of the initial image influence */
  init_image_strength?: number;
}

export interface OptionalInpaintingParams {
  inpainting_image?: Base64Image;
  mask_image?: Base64Image;
}

export interface StyleViewParams {
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

export interface ProjectionParams extends StyleViewParams {
  /** Generate in oblique projection */
  oblique_projection?: boolean;
}

export type StyleViewParamsForAnimation = Pick<
  StyleViewParams,
  "view" | "direction"
>;

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

export interface AnimateFromSkeletonParams
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
