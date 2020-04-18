import path from 'path'

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  roleName: state => state.user.roleName,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  navRoutes: state => {
    const r = []
    state.permission.routes.forEach(v => {
      if (v.path.startsWith(`/${state.nav.data[state.nav.current].key}`) && v.children.length > 0) {
        v.children.forEach(n => {
          n.path = path.resolve(v.path, n.path)
          r.push(n)
        })
      }
    })
    return r
  }
}
export default getters
