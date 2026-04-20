/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isActionsBuild = process.env.GITHUB_ACTIONS === "true" && process.env.NODE_ENV === "production";
const isUserOrOrgPage = repoName.endsWith(".github.io");
const basePath = isActionsBuild && !isUserOrOrgPage ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
