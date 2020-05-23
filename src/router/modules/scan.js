import Layout from '@/layout'

const scanRouter = {
  path: '/scan',
  component: Layout,
  meta: { title: '合规检测' },
  redirect: '/scan/analyze',
  children: [
    {
      path: 'state',
      component: () => import('@/views/scan/state/index'),
      meta: { title: '状态', icon: 'eye-open' }
    },
    {
      path: 'analyze',
      component: () => import('@/views/scan/analyze/index'),
      meta: { title: '统计分析', icon: 'chart' }
    },
    {
      path: 'index',
      component: () => import('@/views/scan/tactics/index'),
      meta: { title: '策略', icon: 'skill' },
      // redirect: '/tactics/tactics',
      children: [
        {
          path: 'tactics',
          component: () => import('@/views/scan/tactics/tactics'),
          meta: { title: '新建策略', icon: 'skill' }
          // hidden: true,
        },
        {
          path: 'asset',
          component: () => import('@/views/scan/tactics/asset'),
          meta: { title: '数据资产分布', icon: 'skill' },
          hidden: true,
        },
        {
          path: 'exit',
          component: () => import('@/views/scan/tactics/exit'),
          meta: { title: '数据出境检查', icon: 'skill' },
          hidden: true,
        },
        {
          path: 'transfer',
          component: () => import('@/views/scan/tactics/transfer'),
          meta: { title: '数据传输安全', icon: 'skill' },
          hidden: true,
        },
        {
          path: 'newpolicy',
          component: () => import('@/views/scan/tactics/newpolicy'),
          meta: { title: '新建终端扫描任务', icon: 'skill' },
          hidden: true,
        },
        {
          path: 'task',
          component: () => import('@/views/scan/tactics/task'),
          meta: { title: '检测任务', icon: 'skill' },
          // hidden: true,
        },
        {
          path: 'newtask',
          component: () => import('@/views/scan/tactics/newtask'),
          meta: { title: '新建存储任务', icon: 'skill' },
          // hidden: true,
        },
        {
          path: 'taskModify',
          component: () => import('@/views/scan/tactics/taskModify'),
          meta: { title: '修改存储任务', icon: 'skill' },
          // hidden: true,
        },
        {
          path: 'newNetwork',
          component: () => import('@/views/scan/tactics/newNetwork'),
          meta: { title: '新建网络监控任务', icon: 'skill' },
          // hidden: true,
        },
      ]
    },

    {
      path: 'setup',
      component: () => import('@/views/scan/setup/index'),
      meta: { title: '设置', icon: 'component' }
    }
  ]
}
export default scanRouter
