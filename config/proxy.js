/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
// const BASE_URL = 'http://mockjs.docway.net/mock/1b5MYNv513x';
const MYSQL_URL = 'http://47.107.74.210:18000';
const HIVE_URL = 'http://47.107.74.210:8888';
export default {
  
  dev: {
    '/api/v1/mysql': {
      target: MYSQL_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/api/v1/hive':{
      target: HIVE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      }
    },
  },
  test: {
    '/api/v1/mysql': {
      target: MYSQL_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },   
    '/api/v1/hive':{
      target: HIVE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      }
    },
  },
  pre: {
    '/api/v1/mysql': {
      target: MYSQL_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/api/v1/hive':{
      target: HIVE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      }
    },
  },
};
