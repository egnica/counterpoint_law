/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nciholasegner.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
