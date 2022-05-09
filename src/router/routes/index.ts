import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';
import { LAYOUT } from '/@/router/constant';

const modules = {}; //import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

export const SystemLoginRoute: AppRouteRecordRaw = {
  path: '/system/authentication/login',
  name: 'system/login',
  component: () => import('/@/views/sys/qiankun/index.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// export const SystemDashboardRoute: AppRouteRecordRaw = {
//   path: '/system/:path(.*)*',
//   name: 'system/dashboard',
//   component: () => import('/@/views/sys/qiankun/index.vue'),
//   meta: {
//     icon: 'ion:grid-outline',
//     title: t('routes.dashboard.dashboard'),
//   },
// };

export const systemRoute: AppRouteModule = {
  path: '/system/:path(.*)*',
  name: 'system',
  component: LAYOUT,
  //redirect: '/vue3/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.about'),
    orderNo: 100000,
  },
  children: [
    {
      path: '',
      name: 'systemQiankun',
      component: () => import('/@/views/sys/qiankun/index.vue'),
      // component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};
// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  SystemLoginRoute,
  systemRoute,
  // SystemDashboardRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
