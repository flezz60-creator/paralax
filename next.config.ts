import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Export the entire site as static HTML so it can run on GitHub Pages or
   * traditional webspace without a Node.js runtime.
   */
  output: "export",
  /**
   * Disable the built-in Image Optimization since static hosting platforms do
   * not provide the required server endpoints.
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
