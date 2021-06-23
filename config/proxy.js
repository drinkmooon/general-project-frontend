/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
// const BASE_URL = 'http://8.133.173.118:8848'; 

const MOCK_URL = 'http://mockjs.docway.net/mock/1anTtSjfMYb/'
const SERVER_URL = 'http://1.116.230.228:36913';
const BASE_URL = SERVER_URL;
const FILE_URL = 'http://dotnet-1304769744.cos.ap-shanghai.myqcloud.com'
export default {
  
  dev: {
    '/api/':{
      target: SERVER_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/file/':{
      target: FILE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/file/': '',
      },
    }
    // '/api/user/info':{
    //   target: SERVER_URL,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
    // '/api/user/login':{
    //   target: MOCK_URL,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
    // '/api/book': {
    //   target: MOCK_URL,
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
    
  },
  test: {
    '/api/': {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
