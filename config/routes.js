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
            Routes: ['src/pages/Authorized'],
            routes: [
              {
                path: '/',
                redirect: '/item/browse',
              },
              {
                name: 'book-detail',
                path: '/item/detail/:itemId',
                hideInMenu: true,
                component: './Shop/ItemDetail',
                authority: ['user', 'guest'],
              },
              {
                path: '/item/browse',
                name: 'shop-container',
                icon: 'shop',
                component: './Shop/ItemsBrowse',
                authority: ['user', 'guest'],
              },

              {
                path: '/cart',
                name: 'cart-container',
                icon: 'ShoppingCart',
                component: './Cart/Cart',
                authority: ['user'],
              },
              {
                path: '/order',
                name: 'order-container',
                icon: 'dollar',
                component: './Order/OrdersBrowse',
                authority: ['user'],
                routes: [
                  {
                    name: 'order-detail',
                    path: '/order/detail/:orderId',
                    hideInMenu: true,
                    component: './Order/OrderDetail',
                    authority: ['user'],
                  }
                ]
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
