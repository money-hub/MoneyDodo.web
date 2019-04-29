export default ({ store, route, next }) => {
  if (route.path !== '/' && !store.state.token) {
    next({
      path: '/',
      query: { redirect: route.fullPath }
    })
  } else if (store.state.token) {
    if (route.path === '/') {
      next('/home')
    } else if (route.query.redirect) {
      next(route.query.redirect)
    }
  }
}
