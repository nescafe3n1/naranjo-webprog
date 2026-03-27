import Button from '../components/Button';

const ArticlePage = () => {
  const blogPosts = [
    { title: 'The Grid Logic', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXptbTBG-H1HcCwpitm9g93JG_sxlamw9KOw&s', tag: 'Structure' },
    { title: 'React Reusability', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400', tag: 'Dev' },
    { title: 'Typography Scales', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400', tag: 'Visuals' },
    { title: 'UX Flowcharts', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400', tag: 'Strategy' },
  ];

  return (
    <div className="p-8 space-y-12">
      <div className="border-b-4 border-zinc-900 pb-8">
        <h1 className="text-7xl font-black tracking-tighter text-zinc-900 uppercase">Insights.</h1>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <article key={post.title} className="group border-2 border-zinc-900 rounded-3xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <div className="aspect-[4/3] border-b-2 border-zinc-900 overflow-hidden">
              <img src={post.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="p-6">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">{post.tag}</span>
              <h3 className="text-xl font-bold mt-2 mb-4 leading-none">{post.title}</h3>
              <Button variant="primary" className="w-full text-[9px]">Read Article</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;