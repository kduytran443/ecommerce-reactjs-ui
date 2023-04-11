import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { HOME_PAGE_URL, PERSONAL_PAGE_URL, ROLE_ADMIN, ROLE_USER } from './constants';
import AdminLayout from './layouts/AdminLayout';
import FullLayout from './layouts/FullLayout';
import AdminCategoryDetailsPage from './pages/AdminCategoryDetailsPage';
import AdminCategoryPage from './pages/AdminCategoryPage';
import AdminViewOnlyProductPage from './pages/AdminViewOnlyProductPage';
import AdminFavoriteProduct from './pages/AdminViewOnlyProductPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminManufacturerDetailsPage from './pages/AdminManufacturerDetailsPage';
import AdminManufacturerPage from './pages/AdminManufacturerPage';
import AdminOrderDetailsPage from './pages/AdminOrderDetailsPage';
import AdminOrderPage from './pages/AdminOrderPage';
import AdminPostPage from './pages/AdminPostPage';
import AdminProductPage from './pages/AdminProductPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderPage from './pages/OrderPage';
import PersonalPage from './pages/PersonalPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import SignUpPage from './pages/SignUpPage';
import { privateRoutes, publicRoutes } from './routes';
import AdminUserPage from './pages/AdminUserPage';
import { setUserInfo, useUser } from './stores/UserStore';
import { getUserInfo } from './services/useService/useService';
import AdminCategoryDetailsEditPage from './pages/AdminCategoryDetailsPage/AdminCategoryDetailsEditPage';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AdminProductCreatePage from './pages/AdminProductPage/AdminProductCreatePage';
import AdminProductEditPage from './pages/AdminProductPage/AdminProductEditPage';
import AdminConsignmentPage from './pages/AdminConsignmentPage';
import FavoritePage from './pages/FavoritePage';

function App() {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);
    const [userState, dispatchUserState] = useUser();

    useEffect(() => {
        const doFetch = async () => {
            const getUser = getUserInfo();
            getUser.then((data) => {
                if (data && !data.error) {
                    dispatchUserState(setUserInfo(data));
                }
            });
        };
        doFetch();
    }, []);

    return (
        <div className="pd-0 ">
            <ScrollToTop>
                <Routes>
                    <Route
                        path={HOME_PAGE_URL}
                        element={
                            <FullLayout>
                                <HomePage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/'}
                        element={
                            <FullLayout>
                                <HomePage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/login'}
                        element={
                            <FullLayout>
                                <LoginPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <FullLayout>
                                <NotFoundPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/category/:categoryCode'}
                        element={
                            <FullLayout>
                                <CategoryPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/product/:productCode'}
                        element={
                            <FullLayout>
                                <ProductPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/cart'}
                        element={
                            <FullLayout>
                                <CartPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/history'}
                        element={
                            <FullLayout>
                                <HistoryPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/sign-up'}
                        element={
                            <FullLayout>
                                <SignUpPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/search/:searchValue?'}
                        element={
                            <FullLayout>
                                <SearchPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/personal'}
                        element={
                            <FullLayout>
                                <PersonalPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/order'}
                        element={
                            <FullLayout>
                                <OrderPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/order-details/:orderId'}
                        element={
                            <FullLayout>
                                <OrderDetailsPage />
                            </FullLayout>
                        }
                    />
                    <Route
                        path={'/favorite'}
                        element={
                            <FullLayout>
                                <FavoritePage />
                            </FullLayout>
                        }
                    />

                    <Route
                        path={'/admin'}
                        element={
                            <AdminLayout>
                                <AdminHomePage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/home'}
                        element={
                            <AdminLayout>
                                <AdminHomePage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/order'}
                        element={
                            <AdminLayout>
                                <AdminOrderPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/order-details/:orderId'}
                        element={
                            <AdminLayout>
                                <AdminOrderDetailsPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/category'}
                        element={
                            <AdminLayout>
                                <AdminCategoryPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/category/:categoryCode'}
                        element={
                            <AdminLayout>
                                <AdminCategoryDetailsPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/category/edit/:categoryCode?'}
                        element={
                            <AdminLayout>
                                <AdminCategoryDetailsEditPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/manufacturer'}
                        element={
                            <AdminLayout>
                                <AdminManufacturerPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/manufacturer-details/:manufacturerCode?'}
                        element={
                            <AdminLayout>
                                <AdminManufacturerDetailsPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/product/'}
                        element={
                            <AdminLayout>
                                <AdminProductPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/product/create'}
                        element={
                            <AdminLayout>
                                <AdminProductCreatePage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/product/edit/:productCode'}
                        element={
                            <AdminLayout>
                                <AdminProductEditPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/post/'}
                        element={
                            <AdminLayout>
                                <AdminPostPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/view-product/'}
                        element={
                            <AdminLayout>
                                <AdminViewOnlyProductPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/user/'}
                        element={
                            <AdminLayout>
                                <AdminUserPage />
                            </AdminLayout>
                        }
                    />
                    <Route
                        path={'/admin/consignment'}
                        element={
                            <AdminLayout>
                                <AdminConsignmentPage />
                            </AdminLayout>
                        }
                    />
                </Routes>
            </ScrollToTop>
        </div>
    );
}

export default App;

/*

{publicRoutes.map((publicRoute, index) => {
                        const Page = publicRoute.component;

                        let Layout = FullLayout;
                        if (publicRoute.layout) {
                            Layout = publicRoute.layout;
                        } else if (publicRoute.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={publicRoute.path}
                                path={publicRoute.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((privateRoute) => {
                        const Page = privateRoute.component;

                        let Layout = FullLayout;
                        if (privateRoute.layout) {
                            Layout = privateRoute.layout;
                        } else if (privateRoute.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={privateRoute.path}
                                path={privateRoute.path}
                                element={
                                    isAuthenticatedState === false ? (
                                        <Navigate to={HOME_PAGE_URL} />
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
                                }
                            />
                        );
                    })}

*/
