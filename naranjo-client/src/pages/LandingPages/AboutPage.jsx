import Button from '../../components/Button';

const AboutPage = () => (
  <div className="flex flex-col gap-10 p-8">
    <section className="bg-zinc-900 text-white rounded-[3rem] p-12 grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tighter leading-none">Naranjoes</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          We believe that a website is only as strong as its foundation. Our team specializes in low-fidelity structural guides that ensure clarity and accessibility for every user.
        </p>
        <div className="flex gap-4">
          <Button to="/" variant="secondary" className="border-none">Back Home</Button>
          <Button to="/articles" variant="primary" className="border-white">View Methods</Button>
        </div>
      </div>
      <div className="relative aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-pulse"></div>
        <img src="https://avatars.githubusercontent.com/u/184327153?v=4" className="rounded-full w-full h-full object-cover grayscale border-4 border-white" alt="Team Lead" />
      </div>
    </section>
  </div>
);

export default AboutPage;