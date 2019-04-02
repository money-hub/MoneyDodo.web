export default ({ app, route, next } ) => {
  if (route.path !== '/' && !app.router.app.$root.user) {
    next({
      path: '/',
      query: {redirect: route.fullPath}
    })
  }
}