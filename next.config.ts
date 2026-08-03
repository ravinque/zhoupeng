import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const isAliyunBuild = process.env.npm_lifecycle_event === "build:aliyun";
const isStaticExport = isGithubPages || isAliyunBuild || process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubPages ? "/zhoupeng" : "");

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
