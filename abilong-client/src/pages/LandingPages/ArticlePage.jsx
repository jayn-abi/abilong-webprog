import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import articles from '../../data/article-content';

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);
  const articleIndex = articles.findIndex(a => a.name === name);
  const prev = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const next = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-0">
        <section className="border-b border-(--border) bg-(--base) px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">404</p>
            <h1 className="mt-2 text-3xl font-bold gradient-text">Article Not Found</h1>
            <div className="mt-6">
              <Button to="/articles">Back to Articles</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">

      
      <section className="relative border-b border-(--border)">
        <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0f0f1a] via-[#0f0f1a]/60 to-transparent" />

          <div className="absolute left-4 top-4 sm:left-8 sm:top-6">
            <Button to="/articles" variant="secondary">← Articles</Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-8 sm:pb-10 lg:px-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00d4ff]">
              {article.name}
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      
      <section className="bg-(--base) px-4 py-10 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 text-lg font-medium leading-8 text-(--text) sm:text-xl sm:leading-9">
            {article.content[0]}
          </p>
          <div className="mb-8 h-px w-16 bg-linear-to-r from-[#00d4ff] to-[#a855f7]" />
          <div className="space-y-5">
            {article.content.slice(1).map((paragraph, index) => (
              <p key={index} className="text-sm leading-7 text-(--muted) sm:text-base sm:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

     
      <section className="border-t border-(--border) bg-(--card) px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--muted)">Previous</p>
                <Button to={`/articles/${prev.name}`} variant="secondary">← {prev.title}</Button>
              </div>
            ) : <div />}
            {next ? (
              <div className="flex flex-col items-end gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-(--muted)">Next</p>
                <Button to={`/articles/${next.name}`} variant="secondary">{next.title} →</Button>
              </div>
            ) : <div />}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;
