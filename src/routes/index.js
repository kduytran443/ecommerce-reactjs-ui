import { HOME_PAGE_URL, LOGIN_PAGE_URL, PERSONAL_PAGE_URL } from '~/constants';
import LoginPage from '~/pages/LoginPage';
import PersonalPage from '~/pages/PersonalPage';

const { default: FullLayout } = require('~/layouts/FullLayout');
const { default: HomePage } = require('~/pages/HomePage');

const publicRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: FullLayout,
    },
    {
        path: HOME_PAGE_URL,
        component: HomePage,
        layout: FullLayout,
    },
    {
        path: LOGIN_PAGE_URL,
        component: LoginPage,
        layout: FullLayout,
    },
];

const privateRoutes = [
    {
        path: PERSONAL_PAGE_URL,
        component: PersonalPage,
        layout: FullLayout,
    },
];

export { publicRoutes, privateRoutes };
