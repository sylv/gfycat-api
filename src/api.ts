import fetch from "cross-fetch";
import { titleCase } from "title-case";
import UserAgent from "user-agents";
import { GfycatPost } from "./interfaces/gfycat-post.interface";
import { GfycatSource } from "./interfaces/gfycat-source.interface";
import { GfycatUser } from "./interfaces/gfycat-user.interface";
import { GfycatAPIItem, GfycatAPIItemResponse, GfycatAPIPaginatedResponse, GfycatAPIUser } from "./types";

export class API {
  constructor(protected baseUrl: string, protected origin: string) {}

  public async getUser(username: string): Promise<GfycatUser> {
    const user = await this.get<GfycatAPIUser>(`users/${username}`);
    return this.formatUser(user);
  }

  async getUserPosts(username: string, limit: number = 100, cursor?: string) {
    const query = { count: limit, cursor: cursor };
    const page = await this.get<GfycatAPIPaginatedResponse>(`users/${username}/gfycats`, query);
    return {
      cursor: page.cursor || null,
      results: page.gfycats.map((post) => this.formatPost(post)),
    };
  }

  async getPost(gfyId: string): Promise<GfycatPost> {
    const path = `gfycats/${gfyId.toLowerCase()}`;
    const post = await this.get<GfycatAPIItemResponse>(path);
    return this.formatPost(post.gfyItem);
  }

  private formatPost(post: GfycatAPIItem): GfycatPost {
    const data: GfycatPost = {
      id: post.gfyName,
      title: post.title,
      source: post.url,
      description: post.description || undefined,
      rating: post.rating,
      thumbnail: post.posterUrl,
      tags: this.formatPostTags(post.tags),
      nsfw: this.isNSFWPost(post),
      md5: post.md5,
      slug: post.gfySlug,
      createdAt: new Date(post.createDate * 1000),
      author: post.userData && !Array.isArray(post.userData) ? this.formatUser(post.userData) : undefined,
      sources: this.getPostSources(post),
      meta: {
        frameRate: post.frameRate,
        frameCount: post.numFrames,
        hasAudio: post.hasAudio,
        hasTransparency: post.hasTransparency,
        averageColour: post.avgColor,
      },
      votes: {
        likes: post.likes,
        dislikes: post.dislikes,
      },
      resolution: {
        height: post.height,
        width: post.width,
      },
    };

    const otherSources = ["webm", "mp4", "gif"] as const;
    for (const source of otherSources) {
      if (post.content_urls[source]) {
        // this type already exists in data.sources, so we don't
        // need to add it from other urls.
        continue;
      }

      const url = post[`${source}Url` as const];
      const size = post[`${source}Size` as const];
      if (url && size) {
        data.sources.push({
          type: source,
          url: url,
          size: size,
          height: post.height,
          width: post.width,
        });
      }
    }

    return data;
  }

  private formatPostTags(tags?: string[]): string[] | undefined {
    return tags?.map((tag) => titleCase(tag.trim()));
  }

  private getPostSources(post: GfycatAPIItem): GfycatSource[] {
    return Object.entries(post.content_urls).map(([key, value]) => ({
      type: key,
      url: value.url,
      height: value.height,
      width: value.width,
      size: value.size,
    }));
  }

  private isNSFWPost(post: GfycatAPIItem): boolean | undefined {
    return typeof post.nsfw === "number" || typeof post.nsfw === "boolean" ? !!post.nsfw : undefined;
  }

  private formatUser(user: GfycatAPIUser): GfycatUser {
    return {
      userName: user.username,
      url: user.profileUrl ?? this.getProfileUrl(user.username),
      displayName: user.name ?? user.userid,
      avatarUrl: user.profileImageUrl,
      verified: user.verified,
      views: user.views,
      description: user.description,
      followers: user.followers,
      following: user.following,
    };
  }

  private getProfileUrl(username: string) {
    if (this.baseUrl.includes("redgifs")) return `${this.origin}users/${username}`;
    return `${this.origin}@${username}`;
  }

  private async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(this.baseUrl + path);
    if (params) {
      for (const key in params) {
        const value = params[key];
        if (value === undefined || value === null) continue;
        url.searchParams.set(key, value);
      }
    }

    const userAgent = new UserAgent();
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": userAgent.toString(),
        accept: "application/json",
        origin: this.origin,
        referer: this.origin,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const body = await response.json();
    return body as T;
  }
}
