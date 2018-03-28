
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/login', component: () => import('pages/login') },
      { path: '/tag', component: () => import('pages/tag') },
      { path: '/nearbyTrees', component: () => import('pages/nearbyTrees') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
