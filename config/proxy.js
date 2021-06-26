/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
// const BASE_URL = 'http://8.133.173.118:8848'; 

const MOCK_URL = 'http://mockjs.docway.net/mock/1anTtSjfMYb/'
// const SERVER_URL = 'http://121.4.51.246:8081';
const SERVER_URL = 'http://localhost:2074'
const BASE_URL = SERVER_URL;
export default {
  
  dev: {
    '/api/':{
      target: SERVER_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
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
