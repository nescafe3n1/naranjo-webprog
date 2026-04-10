import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <article key={article.name} className="group border-2 border-zinc-900 rounded-3xl overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          <div className="aspect-[4/3] bg-zinc-200 border-b-2 border-zinc-900 overflow-hidden">
             <img src={`https://picsum.photos/seed/${article.name}/600/400`} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="p-6">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
              Article {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">{article.title}</h3>
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              {article.content[0].substring(0, 100)}...
            </p>
            <Link to={`/articles/${article.name}`}>
              <Button variant="primary" className="w-full">Read More</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;