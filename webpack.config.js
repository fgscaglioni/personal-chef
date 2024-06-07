var WebpackObfuscator = require('webpack-obfuscator');
module.exports = {
  plugins: [
    new WebpackObfuscator({
      debugProtection: true,
    }, ['vendor.js'])
  ]
}
