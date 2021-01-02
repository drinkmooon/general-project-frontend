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
                redirect: '/movies/by-name',
              },
              {
                path: '/movies',
                name: 'movies',
                icon: 'table',
                routes:[
                  {
                    name: 'ByName',
                    path: 'by-name',
                    component: './Movies/MoviesByName'
                  },
                  {
                    name: 'ByScore',
                    path: 'by-score',
                    component: './Movies/MoviesByScore'
                  }
                ]
              },  
              {
                path: '/analysis',
                name: 'analysis',
                icon: 'table',
                routes:[
                  {
                    name: 'MovieAnalysis',
                    path: 'movie-analysis',
                    component: './Analysis/MovieAnalysis',
                  },
                  {
                    name: 'ScoreAnalysis',
                    path: 'score-analysis',
                    component: './Analysis/ScoreAnalysis',
                  },
                  {
                    name: 'PeopleAnalysis',
                    path: 'people-analysis',
                    component: './Analysis/PeopleAnalysis',
                  },
                  {
                    name: 'TimeAnalysis',
                    path: 'time-analysis',
                    component: './Analysis/TimeAnalysis',
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
