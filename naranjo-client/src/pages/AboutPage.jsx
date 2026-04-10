import { useParams } from 'react-router-dom';
import articles from '../assets/article-content';
import Button from '../components/Button';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);

  if (!article) return <NotFoundPage />;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Button to="/articles" className="mb-8">← Back to Articles</Button>
      <h1 className="text-5xl font-black mb-6 tracking-tight">{article.title}</h1>
      <div className="prose prose-zinc lg:prose-xl">
        {article.content.map((para, i) => (
          <p key={i} className="mb-4 text-zinc-700 leading-relaxed text-lg">{para}</p>
        ))}
      </div>
    </div>
  );
};

export default ArticlePage;