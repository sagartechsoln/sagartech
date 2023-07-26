import React, { useState, useEffect } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import { useStateContext } from '../../Admin/contexts/ContextProvider';
import { ThemeSettings } from '../../Admin/components';

export default function Header() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleServicesDropdownToggle = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  // Define menu items as an array
  const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About us', link: '/' },
    { label: 'Services', link: '/', dropdown: true, subItems: ['Service 1', 'Service 2', 'Service 3'] }
  ];

  return (
    <>
      <header>
        <nav className="px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a className="flex items-center">
              <img src="../Logo.png" className="mr-3 h-[60px] sm:h-[60px]" alt="LOGO" />
            </a>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              onClick={handleMobileMenuToggle}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`w-6 h-6 ${mobileMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <svg className={`w-6 h-6 ${mobileMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${mobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu-2">
              <ul className="flex flex-col mt-4 text-white lg:flex-row lg:space-x-8 lg:mt-0">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.dropdown ? (
                      <div className="relative">
                        <button
                          onClick={handleServicesDropdownToggle}
                          className={`block py-2 pr-4 pl-3 font-bold lg:p-0 hover:dark:text-indigo-500 hover:text-indigo-500  text-gray-800 dark:text-gray-200 flex ${servicesDropdownOpen ? 'text-indigo-500 dark:text-indigo-500' : ''}`}
                          aria-expanded={servicesDropdownOpen}
                        >
                          {item.label}
                          <svg className="w-4 h-4 ml-2 relative top-[4px] -left-[2px]" viewBox="0 0 20 20" fill="currentColor">
                            {servicesDropdownOpen ? (
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6 8l4 4 4-4h-8zm0 4l4 4 4-4h-8z"
                              />
                            ) : (
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10 6l4 4-4 4-4-4 4-4z"
                              />
                            )}
                          </svg>
                        </button>
                        {servicesDropdownOpen && (
                          <ul className="absolute mt-2 space-y-2 bg-white dark:bg-slate-600 rounded-md shadow-lg right-0">
                            {item.subItems.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a
                                  href={`#${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                  className="block px-4 py-2 text-gray-800 dark:hover:bg-slate-200 dark:text-gray-200 hover:bg-slate-500 "
                                >
                                  {subItem}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <a
                        href={item.link}
                        className={`block py-2 pr-4 pl-3 font-bold lg:p-0 text-gray-800 dark:text-gray-200 ${activeMenu === index ? 'text-indigo-500' : ''}`}
                        aria-current={activeMenu === index ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {themeSettings && (<ThemeSettings />)}
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <TooltipComponent content="Settings" position="Top">
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
    </>
  );
}
