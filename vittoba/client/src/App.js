import 'tw-elements';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './Admin/components';
import './App.css';

import { useStateContext } from './Admin/contexts/ContextProvider';
import Dashboard from './Admin/pages/Dashboard';
import Product from './Admin/pages/Product';
import Login from './Admin/pages/Login';
import Logout from './Admin/pages/Logout';
import Profile from './Admin/pages/Profile';
import ProductHome from './Products/Home';
import Home from './Home';
import Category from './Admin/pages/Category';
import Blog from './Admin/pages/Blog';
import UserMain from './components/homepage/UserMain';
import UserHeader from './components/header/UserHeader';
import UserFooter from './components/footer/Footer';
import Aboutme from './components/about/Aboutme';
import ProductPage from './components/productpage/ProductPage';
import BlogPage from './components/blogpage/BlogPage';
import ProductDetail from './Products/ProductDetail';
import Blogsingle from './components/blogpage/Blogsingle';
import EnquiryStatus from './EnquiryStatus';
import LocationPage from './components/locationpage/Location';

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
            : <>
              {
                checkUserExists ?
                  <>
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

                  </>
                  :
                  <>
                    <Routes>
                      <Route path="/Admin/Login" element={(<Login />)} />
                      <Route path="/Admin/Logout" element={(<Logout />)} />

                    </Routes>

                  </>
              }
            </>
        }</div>
    </BrowserRouter>
  );
};

export default App;
