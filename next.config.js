const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const nextConfig = withPlaiceholder({
  images: {
    domains: ["airtable.com", "dl.airtable.com", "v5.airtableusercontent.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
