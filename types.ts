export enum AspectRatio {
  Square = '1:1',
  Landscape = '16:9',
  Portrait = '9:16',
  Standard = '4:3',
  Tall = '3:4'
}

export interface GeneratedAd {
  id: string;
  imageUrl: string;
  aspectRatio: AspectRatio;
  prompt: string;
  createdAt: number;
}

export interface AdContent {
  headline: string;
  ctaText: string;
  url: string;
}

export type AdStyle = 'Photorealistic' | 'Minimalist' | 'Vibrant' | 'Luxury' | 'Illustrated';