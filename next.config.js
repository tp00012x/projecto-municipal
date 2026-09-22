/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { proposalSlugRedirects } from "./src/lib/proposal-redirects.js";

/** @type {import("next").NextConfig} */
const config = {
  serverExternalPackages: ["postgres"],
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return proposalSlugRedirects;
  },
};

export default config;
