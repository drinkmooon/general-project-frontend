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
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/item/browse',
              },
              {
                path: '/item',
                name: 'shop-container',
                icon: 'shop',
                component: './Item/ItemsBrowse',
                routes: [
                  {
                    name: 'book-detail',
                    path: '/item/detail',
                    hideInMenu: true,
                    component: './Item/ItemDetail',
                  },
                ],
              },              
              {
                path:'/cart',
                name: 'cart-container',
                icon: 'ShoppingCart',
                component: './Cart/Cart',
              },
              {
                path:'/order',
                name: 'order-container',
                icon: 'dollar',
                component: './Order/OrdersBrowse',
              },              
              {
                path: '/home',
                name: 'home-container',
                icon: 'home',
                component: './Account/Settings',
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
