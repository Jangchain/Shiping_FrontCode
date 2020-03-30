import Layout from '@/layout'

const scanRouter = {
  path: '/scan',
  component: Layout,
  meta: { title: '合规检测' },
  children: [
    {
      path: '',
      component: () => import('@/views/scan/index'),
      meta: { title: '状态', icon: 'eye-open' }
    },
    {
      path: 'analyze',
      component: () => import('@/views/scan/index'),
      meta: { title: '统计分析', icon: 'chart' }
    },
    {
      path: 'tactics',
      component: () => import('@/views/scan/index'),
      meta: { title: '策略', icon: 'skill' }
    },
    {
      path: 'setup',
      component: () => import('@/views/scan/index'),
      meta: { title: '设置', icon: 'component' }
    }
  ]
}
export default scanRouter
