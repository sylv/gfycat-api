import { GfycatSource } from "./gfycat-source.interface";
import { GfycatUser } from "./gfycat-user.interface";

export interface GfycatPost {
  id: string;
  title?: string;
  description?: string;
  rating?: string;
  thumbnail?: string;
  source?: string;
  tags?: string[];
  nsfw?: boolean;
  md5?: string;
  slug?: string;
  createdAt: Date;
  author?: GfycatUser;
  sources: GfycatSource[];
  meta: {
    frameRate: number;
    frameCount: number;
    hasAudio: boolean;
    hasTransparency: boolean;
    averageColour: string;
  };
  votes: {
    likes: number;
    dislikes: number;
  };
  resolution: {
    height: number;
    width: number;
  };
}
