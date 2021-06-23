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
                redirect: '/search',
              },
              {
                name: 'search',
                path: '/search',
                component: './SearchBoard',
                authority: ['guest','SchoolAdmin','Member'],
              },
              {
                name: 'Departments',
                path: '/departments',
                component: './Departments',
                authority: ['SchoolAdmin','Member'],
              },
              {
                name: 'Paper',
                path: '/paper',
                component: './Paper',
                authority: ['SchoolAdmin'],
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
