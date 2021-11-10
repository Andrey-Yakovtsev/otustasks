
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/books', component: () => import('pages/BooksPage') },
      { path: '/authors', component: () => import('pages/AuthorsPage') },
      { path: '/addauthor', component: () => import('pages/AddAuthorPage') },
      { path: '/addbook', component: () => import('pages/AddBookPage') },
      { path: '/books/:id', component: () => import('pages/SingleBookPage') },
      { path: '/addtags', component: () => import('pages/AddTagsPage') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
