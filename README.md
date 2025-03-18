# pixellab-node
A simple client for interacting with the [Pixel Lab Developer API](http://api.pixellab.ai/v1/docs), with full TypeScript support.

## Overview
This client simplifies working with the Pixel Lab Developer API. For processing image data, you can use either the Node.js API (see examples below) or popular image processing libraries like [JIMP](https://github.com/jimp-dev/jimp) or [sharp](https://github.com/lovell/sharp).

## Features
All features are powered by wrapping the official Pixel Lab API in an easy-to-use interface:

* 🎨 **Image Generation with Pixflux** - Create characters, items, and environments from simple text descriptions
* 🖌️ **Style-Matched Images with Bitforge** - Use reference images to match a specific art style
* 🦴 **Skeleton Animations** - Bring biped and quadruped characters to life with skeleton-based animations
* ✨ **Text-Driven Animation** - Transform concepts into movement using plain text descriptions
* 🔧 **Inpainting Tools** - Seamlessly edit and enhance existing pixel art
* 🔄 **Rotation Tools** - Generate different angle views of characters and objects with ease
* 💰 **Balance Checking** - Monitor your API usage and remaining credits

## Installation
* `npm i pixellab-node`
  * Note: project requires Node 18+
* [Add your PixelLab API key to a .env file](#setting-up-authentication)
* [Import and initialize `PixelLabClient`](#example-usage)

### Setting up authentication
* Create a `.env` file in your project root and add your Pixel Lab API key:
  * Example: `PIXELLAB_API_KEY=YOUR-API-KEY-GOES-HERE`

**Never share your API key with anyone or commit it to source control.**

Consider using a `.gitignore` file to exclude your `.env` file from version control.

## Example Usage
Here's a simple example demonstrating how to import and initialize the `PixelLabClient` in a Next.js app:
```ts
import PixelLabClient, {
  AnimateSkeletonResponse,
  Base64Image,
  SkeletonKeypoints,
} from "pixellab-node";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";
import corgiJsonData from "../../public/skeleton_keypoints.json";

async function getImageAsBase64(imageName: string): Promise<string> {
  try {
    const imagePath = path.join(process.cwd(), "public", imageName);
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");
    return base64Image;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default async function Home() {
  const client = new PixelLabClient();
  const startingImage = await getImageAsBase64("corgi-test-dog.png");
  const skeletonResult: AnimateSkeletonResponse =
    await client.animateSkeletonFromSkeleton({
      skeleton_keypoints: corgiJsonData.pose_keypoints as SkeletonKeypoints,
      image_size: { width: 64, height: 64 },
      reference_image: { type: "base64", base64: startingImage },
    });

  return (
    <main className="flex flex-row items-center bg-slate-700 text-white">
      {skeletonResult.images.map((image: Base64Image, index: number) => {
        return (
          <Image
            alt={`Corgi Test Animation (${index})`}
            key={index}
            src={`data:image/png;base64,${image.base64}`}
            width={64}
            height={64}
          />
        );
      })}
    </main>
  );
}

```
![corgo-test](https://github.com/user-attachments/assets/8d4a7e0f-a0d5-4272-bdbf-3f3a6c230a7b)

Note: the above example uses skeleton keypoint data exported from Aesprite
