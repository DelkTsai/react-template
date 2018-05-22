/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       配置路由
 * */

import Loadable from "../components/common/Loadable/Loadable";

const routes = [
  {
    path: "/",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-search" */ "../components/Search/Search"),
    }),
  },
  {
    path: "/book/chapters",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-chapter" */ "../components/Chapter/Chapter"),
    }),
  },
  {
    path: "/book/chapters/detail",
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "route-content" */ "../components/Content/Content"),
    }),
  },
];

export { routes };
