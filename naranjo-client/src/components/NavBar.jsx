import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-12 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">LSN</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-zinc-900">NARANJOES</span>
        </NavLink>

        <nav className="flex gap-1 bg-zinc-100 p-1 rounded-full border border-zinc-200">
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to}
              className={({ isActive }) => 
                `px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                  isActive ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;