import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  devIndicators: false,       // hide the N badge in dev
};

export default nextConfig;
