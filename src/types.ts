export interface GfycatAPIPaginatedResponse {
  cursor: null | string;
  gfycats: GfycatAPIItem[];
  totalCount?: number;
}

export interface GfycatAPIItemResponse {
  gfyItem: GfycatAPIItem;
}

export interface GfycatAPIItem {
  avgColor: string;
  content_urls: { [key: string]: GfycatAPIContent };
  createDate: number;
  dislikes: number;
  encoding?: boolean;
  finished?: boolean;
  gfyId: string;
  gfyName: string;
  height: number;
  likes: number;
  published: number;
  ratio?: null;
  source: number;
  tags: string[];
  type?: number;
  userData?: GfycatAPIUser | [];
  userName?: string;
  views: number;
  views5?: number;
  width: number;
  captionsUrl?: null;
  domainWhitelist: any[];
  duration?: number;
  frameRate: number;
  gatekeeper: number;
  geoWhitelist: any[];
  gifUrl: string;
  gifSize?: number;
  hasAudio: boolean;
  hasTransparency: boolean;
  languageCategories: string[];
  max2mbGif: string;
  max5mbGif: string;
  miniPosterUrl: string;
  mobileHeight?: number;
  mobilePosterUrl: string;
  mobileUrl: string;
  mobileWidth?: number;
  mp4Url: string;
  nsfw: boolean | number;
  numFrames: number;
  posterUrl: string;
  thumb100PosterUrl: string;
  description?: string;
  extraLemmas?: string;
  gfyNumber?: string;
  gfySlug?: string;
  gif100px?: string;
  languageText?: string;
  max1mbGif?: string;
  md5?: string;
  miniUrl?: string;
  mp4Size?: number;
  rating?: string;
  sitename?: string;
  title?: string;
  userDisplayName?: string;
  username?: string;
  userProfileImageUrl?: string;
  webmSize?: number;
  webmUrl?: string;
  webpUrl?: string;
  anonymous?: boolean;
  url?: string;
}

export interface GfycatAPIContent {
  width: number;
  size: number;
  url: string;
  height: number;
}

export interface GfycatAPIUser {
  views: number;
  verified: boolean;
  iframeProfileImageVisible?: boolean;
  url?: string;
  userid?: string;
  username: string;
  following: number;
  followers: number;
  description?: string;
  profileImageUrl: string;
  name: string;
  publishedGfycats?: number;
  createDate?: number;
  subscription?: number;
  profileUrl?: string;
}
