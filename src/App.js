import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { HOME_PAGE_URL } from './constants';
import FullLayout from './layouts/FullLayout';
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
                </Routes>
            </ScrollToTop>
        </div>
    );
}

export default App;
