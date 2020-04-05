import Layout from '@/layout'

const dataRouter = {
  path: '/data',
  component: Layout,
  meta: { title: '信息源' },
  children: [
    {
      path: '',
      component: () => import('@/views/data/index'),
      meta: { title: '状态', icon: 'eye-open' }
    },
    {
      path: 'analyze',
      component: () => import('@/views/data/index'),
      meta: { title: '统计分析', icon: 'chart' }
    },
    {
      path: 'resourse',
      component: () => import('@/views/data/index'),
      meta: { title: '资源', icon: 'international' }
    },
    {
      path: 'object',
      component: () => import('@/views/data/index'),
      meta: { title: '对象', icon: 'example' }
    },
    {
      path: 'tactics',
      component: () => import('@/views/data/index'),
      meta: { title: '策略', icon: 'skill' }
    },
    {
      path: 'action',
      component: () => import('@/views/data/index'),
      meta: { title: '操作', icon: 'link' }
    },
    {
      path: 'setup',
      component: () => import('@/views/data/index'),
      meta: { title: '设置', icon: 'component' }
    },
    {
      path: 'common',
      component: () => import('@/views/source/common'),
      meta: { title: '公共信息源', icon: 'component' }
    },
    {
      path: 'storage',
      component: () => import('@/views/source/storage'),
      meta: { title: '存储信息源', icon: 'component' }
    },
    {
      path: 'internet',
      component: () => import('@/views/source/internet'),
      meta: { title: '网络信息源', icon: 'component' }
    },
    {
      path: 'terminal',
      component: () => import('@/views/source/terminal'),
      meta: { title: '终端信息源', icon: 'component' }
    },
    {
      path: 'newset',
      component: () => import('@/views/source/newset'),
      meta: { title: '新建信息源', icon: 'component' }
    }
  ]
}
export default dataRouter
