export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
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
                    component: './Home/index',
                  },
                ],
                
              }, 
              // {
              //   path: '/statistics',
              //   name: 'statistics',
              //   icon: 'table',
              //   routes: [
              //     {
              //       name: 'list.general-list',
              //       path: '/statistics/general-statistics',
              //       component: './Statistics/GeneralStatistics',
              //     },
              //     {
              //       name: 'list.user-list',
              //       path: '/statistics/user-statistics',
              //       component: './Statistics/UserStatistics',
              //     },
              //     {
              //       name: 'list.goods-list',
              //       path: '/statistics/goods-statistics',
              //       component: './Statistics/GoodsStatistics',
              //     },
              //   ],               
              // },                                                        
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
