import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import FullLayout from './layouts/FullLayout';
import { privateRoutes, publicRoutes } from './routes';
import { authorize } from './services/useService';

function App() {
    const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

    return (
        <Router>
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

                            const isAuthenticated = true;
                            return (
                                <Route
                                    key={privateRoute.path}
                                    path={privateRoute.path}
                                    element={
                                        isAuthenticated ? (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        ) : (
                                            <Navigate to="/home" />
                                        )
                                    }
                                />
                            );
                        })}
                    </Routes>
                </ScrollToTop>
            </div>
        </Router>
    );
}

export default App;
