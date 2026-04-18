import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-zinc-300 bg-zinc-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16">
          <div className="w-full max-w-md rounded-[2rem] border-4 border-zinc-900 overflow-hidden shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
            <img 
              src="https://www.shutterstock.com/image-photo/smiling-businessman-shaking-hands-colleagues-600nw-2487652779.jpg" 
              alt="Professional business team" 
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </div>

        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;