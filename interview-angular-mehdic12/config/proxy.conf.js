const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "http://localhost:8080/"
  }
]

module.exports = PROXY_CONFIG;
