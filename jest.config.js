module.exports = {
  // Other Jest configuration options...
  transform: {
    "^.+\\.jsx?$": [
      "babel-jest",
      { presets: ["@babel/preset-env", "@babel/preset-react"] },
    ],
  },
};
