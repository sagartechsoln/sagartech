import 'tw-elements';
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './Admin/components';
import './App.css';

import { useStateContext } from './Admin/contexts/ContextProvider';
const Dashboard = lazy(() => import('./Admin/pages/Dashboard'));
const Product = lazy(() => import('./Admin/pages/Product'));
const Login = lazy(() => import('./Admin/pages/Login'));
const Logout = lazy(() => import('./Admin/pages/Logout'));
const Profile = lazy(() => import('./Admin/pages/Profile'));
const Category = lazy(() => import('./Admin/pages/Category'));
const Blog = lazy(() => import('./Admin/pages/Blog'));
const UserMain = lazy(() => import('./components/homepage/UserMain'));
const UserHeader = lazy(() => import('./components/header/UserHeader'));
const UserFooter = lazy(() => import('./components/footer/Footer'));
const Aboutme = lazy(() => import('./components/about/Aboutme'));
const ProductPage = lazy(() => import('./components/productpage/ProductPage'));
const BlogPage = lazy(() => import('./components/blogpage/BlogPage'));
const ProductDetail = lazy(() => import('./Products/ProductDetail'));
const Blogsingle = lazy(() => import('./components/blogpage/Blogsingle'));
const EnquiryStatus = lazy(() => import('./EnquiryStatus'));
const LocationPage = lazy(() => import('./components/locationpage/Location'));

const App = () => {
  const checkAdminPath = ['/Admin', '/Admin/Product', '/Admin/Profile', '/Admin/Blog', '/Admin/Category']
  const checkUser = ['/', '/about', '/product', '/blog', '/ProductDetail', '/EnquiryStatus', '/SingleBlog']
  const adminComponentsExists = checkAdminPath.includes(window.location.pathname);
  const checkUserExists = checkUser.includes(window.location.pathname);
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  console.log(window.location.pathname);
  return (
    <BrowserRouter>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        {

          adminComponentsExists ?
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                  <TooltipComponent
                    content="Settings"
                    position="Top"
                  >
                    <button
                      type="button"
                      onClick={() => setThemeSettings(true)}
                      style={{ background: currentColor, borderRadius: '50%' }}
                      className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                      <FiSettings />
                    </button>
                  </TooltipComponent>
                </div>
                {activeMenu ? (
                  <div className={`w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white`}>
                    <Sidebar checkAdminPath={checkAdminPath} />
                  </div>
                ) : (
                  <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar checkAdminPath={checkAdminPath} />
                  </div>
                )}
                <div
                  className={
                    activeMenu
                      ? `dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full`
                      : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                  }
                >
                  <div className="sticky md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                  </div>
                  <div>
                    {themeSettings && (<ThemeSettings />)}
                    <Routes>
                      {/* dashboard  */}
                      <Route path="/Admin" element={(<Dashboard />)} />
                      <Route path="/Admin/Product" element={(<Product />)} />
                      <Route path="/Admin/Category" element={(<Category />)} />
                      <Route path="/Admin/Profile" element={(<Profile />)} />
                      <Route path="/Admin/Blog" element={(<Blog />)} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
              </div>
            </Suspense>
            : <>
              {
                checkUserExists ?
                  <>
                    <Suspense fallback={<div>Loading...</div>}>

                      <UserHeader />
                      <Routes>
                        <Route exact path="/" element={(<UserMain />)} />
                        <Route path="/about" element={(<Aboutme />)} />
                        <Route path="/product" element={(<ProductPage />)} />
                        <Route path="/blog" element={(<BlogPage />)} />
                        <Route path="/location" element={(<LocationPage />)} />
                        <Route path="/SingleBlog" element={(<Blogsingle />)} />
                        <Route path="/ProductDetail" element={(<ProductDetail />)} />
                        <Route path="/EnquiryStatus" element={(<EnquiryStatus />)} />
                      </Routes>
                      <UserFooter />
                    </Suspense>
                  </>
                  :
                  <>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      <Route path="/Admin/Login" element={(<Login />)} />
                      <Route path="/Admin/Logout" element={(<Logout />)} />

                    </Routes>
                  </Suspense>
                  </>

              }
            </>
        }</div>
    </BrowserRouter>
  );
};

export default App;
