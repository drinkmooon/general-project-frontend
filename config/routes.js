export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: '/user',
            redirect: '/User/login',
          },
          {
            name: '注册结果',
            path: '/user/register-result',
            component: './User/register-result',
          },
          {
            name: '注册',
            path: '/user/register',
            component: './User/register',
          },
          {
            name: '登录',
            icon: 'smile',
            path: '/user/login',
            component: './User/Login',
          },
          {
            component: '404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/BlankLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/cart/cart',
              },
              {
                path: '/item',
                name: '在线商城',
                icon: 'shop',
                redirect: '/item/browse',
                routes: [
                  {
                    name: '浏览商品',
                    path: '/item/browse',
                    component: './Item/ItemsBrowse',
                  },
                  {
                    name: '商品详情',
                    path: '/item/detail',
                    component: './Item/ItemDetail',
                  },
                ],
              },              
              {
                path: '/test',
                name: 'test-page',
                hideInMenu: true,
                component: './test/test',
              },
              {
                path:'/cart',
                name: 'cart-container',
                icon: 'table',
                routes: [
                  {
                    name: 'cart',
                    path: '/cart/:userId',
                    component: './Cart/Cart',
                  },
                ]
              },
              {
                path: '/home',
                name: 'home-container',
                icon: 'table',
                routes: [
                  {
                    path: '/home/home',
                    name: 'index',
                    component: './Account/Settings',
                  },
                ],

              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
