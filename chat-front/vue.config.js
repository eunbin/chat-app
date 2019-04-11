module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        path: {
          '^/api': ''
        }
      }
    }
  },
  outputDir: '../chat-server/public',
  indexPath: '../public/index.html'
}
