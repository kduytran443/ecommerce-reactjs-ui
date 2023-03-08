import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { HOME_PAGE_URL, PERSONAL_PAGE_URL, ROLE_ADMIN, ROLE_USER } from './constants';
import AdminLayout from './layouts/AdminLayout';
import FullLayout from './layouts/FullLayout';
import AdminCategoryDetailsPage from './pages/AdminCategoryDetailsPage';
import AdminCategoryPage from './pages/AdminCategoryPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminOrderDetailsPage from './pages/AdminOrderDetailsPage';
import AdminOrderPage from './pages/AdminOrderPage';
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
import { authorize } from './services/useService';

function App() {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);

    useEffect(() => {
        const login = authorize().then((data) => data);
        login.then((data) => {
            setIsAuthenticatedState(data);
        });
    }, [isAuthenticatedState]);

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
                        path={'/search'}
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
