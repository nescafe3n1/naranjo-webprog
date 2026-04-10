import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-24 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;