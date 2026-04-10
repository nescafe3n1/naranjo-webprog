const Footer = () => {
  return (
    <footer className="border-t-2 border-zinc-900 bg-white py-10 mt-auto">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
           <div className="h-6 w-8 bg-zinc-900 rounded flex items-center justify-center">
             <span className="text-white font-black text-xs">NU</span>
           </div>
           <span className="text-sm font-black tracking-tighter text-zinc-900">COLLEGE OF COMPUTING</span> 
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          © 2026 Lab Activity 3 - Code Reusability
        </p>
      </div>
    </footer>
  );
};

export default Footer;