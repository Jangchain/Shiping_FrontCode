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
        title: '数据规则',
        icon: 'example'
      }
    },
    {
      path: 'edit',
      component: () => import('@/views/rule/ruleForm'),
      hidden: true,
      meta: {
        title: '修改规则'
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
