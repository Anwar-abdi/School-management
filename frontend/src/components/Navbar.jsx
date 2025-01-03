import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link
              to="/students"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              Students
            </Link>
            <Link
              to="/teachers"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              Teachers
            </Link>
            <Link
              to="/About"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to="/Contact"
              className="flex items-center text-gray-800 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
