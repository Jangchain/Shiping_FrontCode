import Layout from '@/layout'

const ruleRouter = {
  path: '/rule',
  component: Layout,
  meta: { title: '数据规则' },
  children: [
    {
      path: '',
      component: () => import('@/views/rule/index'),
      meta: { title: '状态', icon: 'eye-open' }
    },
    {
      path: 'analyze',
      component: () => import('@/views/rule/index'),
      meta: { title: '统计分析', icon: 'chart' }
    },
    {
      path: 'resourse',
      component: () => import('@/views/rule/index'),
      meta: { title: '资源', icon: 'international' }
    },
    {
      path: 'object',
      component: () => import('@/views/rule/index'),
      meta: { title: '对象', icon: 'example' }
    },
    {
      path: 'tactics',
      component: () => import('@/views/rule/index'),
      meta: { title: '策略', icon: 'skill' }
    },
    {
      path: 'action',
      component: () => import('@/views/rule/index'),
      meta: { title: '操作', icon: 'link' }
    },
    {
      path: 'setup',
      component: () => import('@/views/rule/index'),
      meta: { title: '设置', icon: 'component' }
    }
  ]
}
export default ruleRouter
