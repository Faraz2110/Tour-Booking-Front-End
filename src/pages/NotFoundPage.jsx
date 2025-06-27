import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center p-10 bg-gradient-to-br from-teal-100 rounded-xl shadow-xl transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-8xl font-bold text-red-600 shadow-md">404</h1>
        <p className="text-lg text-gray-700 mt-4">Oops! The page you're looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg transition-colors duration-300 hover:bg-red-500 hover:shadow-lg"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
 