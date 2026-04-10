import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-4xl font-black text-zinc-900 mb-2">404: Page Not Found</h1> 
      <p className="text-zinc-500 mb-8">The link you followed to get here must be broken...</p> 
      <div className="h-40 w-40 bg-zinc-200 rounded-3xl border-2 border-dashed border-zinc-400 flex items-center justify-center mb-8">
        <span className="text-zinc-400 font-bold uppercase text-[10px]">Broken Link Image</span>
      </div>
      <Button to="/" variant="primary">Back to Safety</Button>
    </div>
  );
};

export default NotFoundPage;