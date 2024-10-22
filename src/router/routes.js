const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'new-analysis', component: () => import('pages/NewAnalysis.vue') },
      { path: 'analysis-results', component: () => import('pages/AnalysisResults.vue') },
      { path: 'about', component: () => import('pages/AboutTheApp.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
