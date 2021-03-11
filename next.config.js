const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
]);

const nextConfig = {
  images: {
    domains: process.env.IMAGE_DOMAINS.split(","),
  },
  webpack: (config) => {
    config.module.rules.push({
      // MUST BE USED for the Loader component from drei
      // https://github.com/pmndrs/react-spring/issues/1078
      test: /react-spring/,
      sideEffects: true,
    });
    return config;
  },
};

module.exports = withPlugins([[withBundleAnalyzer], [withTM]], nextConfig);
