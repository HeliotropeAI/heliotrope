import { useState } from 'react';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Home', link: '/' },
    { title: 'Github', link: '#' },
    { title: 'TWITTER', link: '#' },
    { title: 'DEXTOOLS', link: '#' },
    { title: 'dexscreener', link: '#' },
  ];

  return (
    <div className="relative z-50">
      {/* Hamburger Button */}
      <button 
        className="lg:hidden p-2 flex flex-col justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-6 h-0.5 bg-white mb-1 block"></span>
        <span className="w-6 h-0.5 bg-white mb-1 block"></span>
        <span className="w-6 h-0.5 bg-white block"></span>
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-6">
        {menuItems.map((item) => (
          <a
            key={item.title}
            href={item.link}
            className="text-white hover:text-gray-300 transition-colors uppercase"
          >
            {item.title}
          </a>
        ))}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-16 right-4 w-48 bg-gray-800 shadow-xl rounded-lg py-2 lg:hidden z-50">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors uppercase"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavMenu;
