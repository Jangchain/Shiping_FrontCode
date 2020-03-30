import Layout from '@/layout'

const auditRouter = {
  path: '/audit',
  component: Layout,
  meta: { title: '内容管控' },
  children: [
    {
      path: '',
      component: () => import('@/views/audit/index'),
      meta: { title: '状态', icon: 'eye-open' }
    },
    {
      path: 'analyze',
      component: () => import('@/views/audit/index'),
      meta: { title: '统计分析', icon: 'chart' }
    },
    {
      path: 'tactics',
      component: () => import('@/views/audit/index'),
      meta: { title: '策略', icon: 'skill' }
    },
    {
      path: 'event',
      component: () => import('@/views/audit/index'),
      meta: { title: '事件', icon: 'guide' }
    },
    {
      path: 'setup',
      component: () => import('@/views/audit/index'),
      meta: { title: '设置', icon: 'component' }
    }
  ]
}
export default auditRouter
