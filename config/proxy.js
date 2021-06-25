/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

const MOCK_URL = 'http://mockjs.docway.net/mock/1anTtSjfMYb/';
const SERVER_URL = 'http://[ip]:[port]';
const LOCAL_SERVER_URL = 'http://127.0.0.1:5000/';
const BASE_URL = LOCAL_SERVER_URL;
export default {
  
  dev: {
    '/api/':{
      target: LOCAL_SERVER_URL,
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
