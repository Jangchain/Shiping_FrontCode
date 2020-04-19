import Layout from "@/layout";

const dataRouter = {
  path: "/data",
  component: Layout,
  meta: {
    title: "信息源"
  },
  redirect:'/data/storage',
  children: [
    {
      path: "common",
      component: () => import("@/views/data/common"),
      meta: {
        title: "公共信息源",
        icon: "component"
      }
    },
    {
      path: "storage",
      component: () => import("@/views/data/storage"),
      meta: {
        title: "存储信息源",
        icon: "component"
      },
      children: [
        {
          path: ":type",
          component: () => import("@/views/data/storage"),
          hidden: true,
          meta: {
            title: "共享文档"
          }
        }
      ]
    },
    {
      path: "internet",
      component: () => import("@/views/data/internet"),
      meta: {
        title: "网络信息源",
        icon: "component"
      },
      children: [
        {
          path: ":type",
          component: () => import("@/views/data/internet"),
          hidden: true,
          meta: {
            title: "端口资源"
          }
        }
      ]
    },
    {
      path: "terminal",
      component: () => import("@/views/data/terminal"),
      meta: {
        title: "终端信息源",
        icon: "component"
      },
      children: [
        {
          path: ":type",
          component: () => import("@/views/data/terminal"),
          hidden: true,
          meta: {
            title: "终端信息源组1"
          }
        }
      ]
    },
    {
      path: "newset",
      component: () => import("@/views/data/newset"),
      meta: {
        title: "新建信息源",
        icon: "component"
      },
      name: "newset",
      children: [
        {
          path: "storage",
          component: () => import("@/views/data/newset/storage"),
          meta: {
            title: "存储信息源",
            icon: "component",
            type: "storage"
          },
          hidden: true,
          children: [
            {
              path: ":type",
              component: () => import("@/views/data/newset/storage"),
              meta: {
                title: "共享文档",
                type: "storage"
              }
            }
          ]
        },
        {
          path: "internet",
          component: () => import("@/views/data/newset/internet"),
          meta: {
            title: "网络信息源",
            icon: "component",
            type: "internet"
          },
          hidden: true
        },
        {
          path: "terminal",
          component: () => import("@/views/data/newset/terminal"),
          meta: {
            title: "终端信息源",
            icon: "component",
            type: "terminal"
          },
          hidden: true
        },
        {
          path: "public",
          component: () => import("@/views/data/newset/public"),
          meta: {
            title: "公共信息源",
            icon: "component",
            type: "public"
          },
          hidden: true
        }
      ]
    }
  ]
};
export default dataRouter;
