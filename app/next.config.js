module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_BASE_URL:process.env.REACT_APP_BASE_URL
  },
  experimental: {
    outputStandalone: true,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  }
}