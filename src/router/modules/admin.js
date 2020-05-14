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
      component: () => import('@/views/admin/component'),
      meta: { title: '组件管理', icon: 'eye-open', roles: ['1000000000000000001'] }
    },
    {
      path: 'component/edit',
      component: () => import('@/views/admin/componentEdit'),
      hidden: true,
      meta: { title: '编辑组件', icon: 'eye-open' }
    },
    {
      path: 'user',
      component: () => import('@/views/admin/user'),
      meta: { title: '用户管理', icon: 'eye-open' }
    },
    {
      path: 'user/edit',
      hidden: true,
      component: () => import('@/views/admin/userEdit'),
      meta: { title: '修改用户' }
    },
    {
      path: 'role',
      component: () => import('@/views/admin/role'),
      meta: { title: '角色管理', icon: 'eye-open' }
    },
    {
      path: 'role/edit',
      hidden: true,
      component: () => import('@/views/admin/roleEdit'),
      meta: { title: '编辑角色' }
    },
    {
      path: 'dept',
      component: () => import('@/views/admin/dept'),
      meta: { title: '组织管理', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'dept/edit',
      component: () => import('@/views/admin/deptEdit'),
      meta: { title: '组织管理' },
      hidden: true
    },
    {
      path: 'hostwhite',
      component: () => import('@/views/admin/hostwhite'),
      meta: { title: '主机白名单管理', icon: 'eye-open' }
    },
    {
      path: 'hostwhite/edit',
      component: () => import('@/views/admin/hostwhiteEdit'),
      hidden: true,
      meta: { title: '编辑主机白名单', icon: 'eye-open' }
    },
    {
      path: 'setting',
      component: () => import('@/views/admin/setting'),
      meta: { title: '基本设置', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'alarm',
      component: () => import('@/views/admin/index'),
      meta: { title: '告警管理', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'license',
      component: () => import('@/views/admin/license'),
      meta: { title: '许可管理', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'tools',
      component: () => import('@/views/admin/tools'),
      meta: { title: '系统工具', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'lotus',
      component: () => import('@/views/admin/lotus'),
      meta: { title: 'LOTUS配置', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'upgrade',
      component: () => import('@/views/admin/upgrade'),
      meta: { title: '系统升级', icon: 'eye-open', roles: ['1000000000000000000'] }
    },
    {
      path: 'upgrade/edit',
      hidden: true,
      component: () => import('@/views/admin/upgradeEdit'),
      meta: { title: '上传系统升级包', roles: ['1000000000000000000'] }
    },
    {
      path: 'log',
      component: () => import('@/views/admin/log'),
      meta: { title: '安全日志维护', icon: 'eye-open', roles: ['1000000000000000001'] }
    },
    {
      path: 'log/archive',
      component: () => import('@/views/admin/logArchive'),
      hidden: true,
      meta: { title: '日志归档' }
    },
    {
      path: 'ip',
      component: () => import('@/views/admin/intranetSetting'),
      meta: { title: '内网IP设置', icon: 'eye-open', roles: ['1000000000000000001'] }
    },
    {
      path: 'ip/edit',
      component: () => import('@/views/admin/intranetSettingEdit'),
      hidden: true,
      meta: { title: '内网IP设置', icon: 'eye-open', roles: ['1000000000000000001'] }
    }
  ]
}
export default adminRouter
