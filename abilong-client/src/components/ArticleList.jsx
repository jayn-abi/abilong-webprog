import { Link } from 'react-router-dom';
import Button from './Button';

function ArticleList({ articles }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="glass-card glow-border-hover card-lift rounded-[1.25rem] overflow-hidden flex flex-col"
        >
          {/* Image */}
          <div className="aspect-4/3 overflow-hidden relative">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#00d4ff] font-mono">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-2 text-base font-bold text-(--text) leading-snug">
              {article.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-(--muted) flex-1">
              {article.content[0].substring(0, 120)}…
            </p>

            <Link to={`/articles/${article.name}`} className="mt-4">
              <Button variant="secondary" className="w-full">Read More</Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ArticleList;
