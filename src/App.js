import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { HOME_PAGE_URL, PERSONAL_PAGE_URL, ROLE_ADMIN, ROLE_USER } from './constants';
import FullLayout from './layouts/FullLayout';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PersonalPage from './pages/PersonalPage';
import ProductPage from './pages/ProductPage';
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
                <FullLayout>
                    <Routes>
                        <Route path={HOME_PAGE_URL} element={<HomePage />} />
                        <Route path={'/'} element={<HomePage />} />
                        <Route path={'/login'} element={<LoginPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path={'/category/:categoryCode'} element={<CategoryPage />} />
                        <Route path={'/product/:productCode'} element={<ProductPage />} />
                        <Route path={'/cart'} element={<CartPage />} />
                        <Route path={'/history'} element={<HistoryPage />} />
                    </Routes>

                    {(isAuthenticatedState === ROLE_ADMIN || isAuthenticatedState === ROLE_USER) && (
                        <Routes>
                            <Route path={PERSONAL_PAGE_URL} element={<PersonalPage />} />
                        </Routes>
                    )}
                </FullLayout>
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
