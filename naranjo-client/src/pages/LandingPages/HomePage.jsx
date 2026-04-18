import Button from '../../components/Button';

const HomePage = () => (
  <div className="flex w-full flex-col gap-12 p-8">
    <section className="grid lg:grid-cols-2 gap-12 items-center py-12 border-b-2 border-zinc-900">
      <div>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-4 text-blue-600">Design System v1.0</p>
        <h1 className="text-6xl font-black text-zinc-900 leading-none mb-6">Build Faster with Blueprints.</h1>
        <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
          Master the art of digital structure. We provide high-fidelity wireframes that focus on user experience and content hierarchy before you ever touch a pixel of color.
        </p>
        <Button to="/about" variant="primary" className="h-14 px-10 text-xs">Start Your Journey</Button>
      </div>
      <div className="aspect-video bg-zinc-200 rounded-[2rem] border-4 border-zinc-900 overflow-hidden shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
        <img src="https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg" alt="Wireframe" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Performance Metrics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[ {n: '120+', l: 'Components'}, {n: '45', l: 'Layouts'}, {n: '12k', l: 'Users'}, {n: '04', l: 'Global Awards'} ].map(kpi => (
          <div key={kpi.l} className="p-8 border-2 border-zinc-900 rounded-2xl bg-white hover:-translate-y-2 transition-transform shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <p className="text-4xl font-black text-zinc-900">{kpi.n}</p>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{kpi.l}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default HomePage;