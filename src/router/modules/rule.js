import Layout from '@/layout'

const ruleRouter = {
  path: '/rule',
  component: Layout,
  meta: {
    title: '数据规则'
  },
  children: [{
      path: '',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '状态',
        icon: 'eye-open'
      }
    },
    {
      path: 'analyze',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '统计分析',
        icon: 'chart'
      }
    },
    {
      path: 'resourse',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '资源',
        icon: 'international'
      }
    },
    {
      path: 'object',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '对象',
        icon: 'example'
      }
    },
    {
      path: 'tactics',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '策略',
        icon: 'skill'
      }
    },
    {
      path: 'action',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '操作',
        icon: 'link'
      }
    },
    {
      path: 'setup',
      component: () => import('@/views/rule/index'),
      meta: {
        title: '设置',
        icon: 'component'
      }
    },
    {
      path: 'identifyModel',
      name: 'identifyModel',
      component: () => import('@/views/rule/recognition'),
      meta: {
        title: '识别模型',
        icon: 'component'
      },
      children: [{
        path: 'documentCharacteristics',
        component: () => import('@/views/rule/recognition/documentCharacteristics'),
        meta: {
          title: '文档特征',
          icon: 'component'
        }
      }, {
        path: 'keyword',
        component: () => import('@/views/rule/recognition/keyword'),
        meta: {
          title: '关键字',
          icon: 'component'
        }
      }, {
        path: 'match',
        component: () => import('@/views/rule/recognition/match'),
        meta: {
          title: '匹配模式',
          icon: 'component'
        }
      }, {
        path: 'documentFingerprint',
        component: () => import('@/views/rule/recognition/documentFingerprint'),
        meta: {
          title: '文档指纹',
          icon: 'component'
        }
      }, {
        path: 'databaseFingerprint',
        component: () => import('@/views/rule/recognition/databaseFingerprint'),
        meta: {
          title: '数据库指纹',
          icon: 'component'
        }
      }, {
        path: 'singleIntelligentLearning',
        component: () => import('@/views/rule/recognition/singleIntelligentLearning'),
        meta: {
          title: '二维智能学习',
          icon: 'component'
        }
      }, {
        path: 'multiIntelligentLearning',
        component: () => import('@/views/rule/recognition/multiIntelligentLearning'),
        meta: {
          title: '多维智能学习',
          icon: 'component'
        }
      }]
    },
    {
      path: 'identifyModel/:subType/create',
      component: () => import('@/views/rule/recognitionCreate')
    }
  ]
}
export default ruleRouter
