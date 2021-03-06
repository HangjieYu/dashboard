// https://umijs.org/config/
import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV} = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  path: '/dashboard',
                  redirect: '/dashboard/rate',
                },
                {
                  name: 'rate',
                  icon: 'smile',
                  path: '/dashboard/rate',
                  component: './dashboard/rate',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              routes: [
                {
                  path: '/',
                  redirect: '/list/rate-list',
                },
                {
                  name: 'rate-list',
                  icon: 'smile',
                  path: '/list/rate-list',
                  component: './list/rate-list',
                },
                {
                  name: 'process-debug',
                  icon: 'smile',
                  path: '/list/process-debug',
                  component: './list/process-debug',
                },
                {
                  name: 'watcher-list',
                  icon: 'smile',
                  path: '/list/watcher-list',
                  component: './list/watcher-list',
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              routes: [
                {
                  path: '/',
                  redirect: '/profile/advanced',
                },
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic/:id',
                  component: './profile/basic',
                  hideInMenu: true
                },
                {
                  name: 'rate-company',
                  icon: 'smile',
                  path: '/profile/rate-company',
                  component: './profile/rate-company',
                },
                {
                  name: 'rate-company',
                  icon: 'smile',
                  path: '/profile/rate-company/:id',
                  component: './profile/rate-company',
                  hideInMenu: true
                },
                {
                  name: 'advanced',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: 'center',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
  base: '/workflow/admin/',
  publicPath: '/workflow/',
});
