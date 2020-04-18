import Layout from '@/layout'

const dataRouter = {
  path: '/data',
  component: Layout,
  meta: {
    title: '信息源'
  },
  children: [{
      path: 'common',
      component: () => import('@/views/source/common'),
      meta: {
        title: '公共信息源',
        icon: 'component'
      }
    },
    {
      path: 'storage',
      component: () => import('@/views/source/storage'),
      meta: {
        title: '存储信息源',
        icon: 'component'
      },
      children: [{
        path: ':storgeType',
        component: () => import('@/views/source/storage'),
        hidden: true,
        meta: {
          title: '共享文档'
        }
      }]
    },
    {
      path: 'internet',
      component: () => import('@/views/source/internet'),
      meta: {
        title: '网络信息源',
        icon: 'component'
      }
    },
    {
      path: 'terminal',
      component: () => import('@/views/source/terminal'),
      meta: {
        title: '终端信息源',
        icon: 'component'
      }
    },
    {
      path: 'newset',
      component: () => import('@/views/source/newset'),
      meta: {
        title: '新建信息源',
        icon: 'component'
      },
      name: 'newset',
      children: [{
          path: 'storage',
          component: () => import('@/views/source/newset/storage'),
          meta: {
            title: '存储信息源',
            icon: 'component',
            type: 'storage'
          },
          hidden: true,
          children: [{
            path: ':type',
            component: () => import('@/views/source/newset/storage'),
            meta: {
              title: '共享文档',
              type: 'storage'
            }
          }]
        },
        {
          path: 'internet',
          component: () => import('@/views/source/newset/internet'),
          meta: {
            title: '网络信息源',
            icon: 'component',
            type: 'internet'
          },
          hidden: true
        },
        {
          path: 'terminal',
          component: () => import('@/views/source/newset/terminal'),
          meta: {
            title: '终端信息源',
            icon: 'component',
            type: 'terminal'
          },
          hidden: true
        },
        {
          path: 'public',
          component: () => import('@/views/source/newset/public'),
          meta: {
            title: '公共信息源',
            icon: 'component',
            type: 'public'
          },
          hidden: true
        }
      ]
    }
  ]
}
export default dataRouter
