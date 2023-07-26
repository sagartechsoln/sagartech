import { FiPackage, FiTool } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-black w-screen h-screen z-[1]" style={{ opacity: '0.65' }}></div>
        <div
          className="relative flex md:flex-row flex-col justify-center items-center h-screen"
          style={{
            backgroundImage: "url('/home_banner.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="card w-96 bg-white rounded-lg shadow-lg p-6 m-4 transition-transform transform hover:scale-105 z-[99]">
            <div className="flex items-center mb-4">
              <FiPackage className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-medium">Products</h3>
            </div>
            <p className="text-gray-500 mb-4">Explore our wide range of electric products for all your needs.</p>
            <Link to="/Products">
              <button className="bg-blue-500 md:text-lg text-sm hover:bg-blue-600 m-4 text-white rounded-lg px-4 py-2">
                Go to Products
              </button>
            </Link>
          </div>
          <div className="card w-96 bg-white rounded-lg shadow-lg p-6 m-4 transition-transform transform hover:scale-105 z-[99]">
            <div className="flex items-center mb-4">
              <FiTool className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-medium">Services</h3>
            </div>
            <p className="text-gray-500 mb-4">Experience our professional electric services for your home or business.</p>
            <Link to="/Services">
              <button className="bg-blue-500 md:text-lg text-sm hover:bg-blue-600 m-4 text-white rounded-lg px-4 py-2">
                Go to Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
