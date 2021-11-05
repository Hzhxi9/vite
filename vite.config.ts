import { defineConfig, UserConfig } from 'vite'

/**数据mock */
import { viteMockServe } from 'vite-plugin-mock'

import vue from '@vitejs/plugin-vue'

const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig => {

  return {
    server: {
      /**设置代理 */
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      /**设置别名报错, 因为tsconfig.json 也需要同步修改 */
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/components')
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        // close support .ts file
        supportTs: false,
      })
    ],
  }
})
