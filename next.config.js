const withTM = require("next-transpile-modules")([
  "three",
  "@react-three/drei",
]);

module.exports = withTM({
  images: {
    domains: [process.env.IMAGE_DOMAIN],
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
});
