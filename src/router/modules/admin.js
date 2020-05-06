import Layout from '@/layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  meta: { title: '管理员' },
  redirect: '/admin/user',
  children: [
    {
      path: 'password',
      component: () => import('@/views/admin/index'),
      hidden: true
    },
    {
      path: 'component',
      component: () => import('@/views/admin/index'),
      meta: { title: '组件管理', icon: 'eye-open', roles: ['1000000000000000001'] }
    },
    {
      path: 'user',
      component: () => import('@/views/admin/index'),
      meta: { title: '用户管理', icon: 'eye-open' }
    },
    {
      path: 'role',
      component: () => import('@/views/admin/index'),
      meta: { title: '角色管理', icon: 'eye-open' }
    },
    {
      path: 'dept',
      component: () => import('@/views/admin/index'),
      meta: { title: '组织管理', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'hostwhite',
      component: () => import('@/views/admin/index'),
      meta: { title: '主机白名单管理', icon: 'eye-open' }
    },
    {
      path: 'setting',
      component: () => import('@/views/admin/index'),
      meta: { title: '基本设置', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'alarm',
      component: () => import('@/views/admin/index'),
      meta: { title: '告警管理', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'license',
      component: () => import('@/views/admin/index'),
      meta: { title: '许可管理', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'tools',
      component: () => import('@/views/admin/index'),
      meta: { title: '系统工具', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'lotus',
      component: () => import('@/views/admin/index'),
      meta: { title: 'LOTUS配置', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'upgrade',
      component: () => import('@/views/admin/index'),
      meta: { title: '系统升级', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'log',
      component: () => import('@/views/admin/index'),
      meta: { title: '安全日志维护', icon: 'eye-open', roles: ['1000000000000000001'] }
    },
    {
      path: 'ip',
      component: () => import('@/views/admin/index'),
      meta: { title: '内网IP设置', icon: 'eye-open', roles: ['1000000000000000001'] }
    }
  ]
}
export default adminRouter
