import Button from '../components/Button';
import { useParams } from 'react-router-dom';
import articles from '../assets/article-content';

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find(a => a.name === name);
  const articleIndex = articles.findIndex(a => a.name === name);
  const prev = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const next = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">404</p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-900">Article Not Found</h1>
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

      {/* Hero — full-bleed image with overlay title */}
      <section className="relative border-b-2 border-zinc-900">
        <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

          {/* Back button top-left */}
          <div className="absolute left-4 top-4 sm:left-8 sm:top-6">
            <Button to="/articles" variant="secondary">← Articles</Button>
          </div>

          {/* Title overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-8 sm:pb-10 lg:px-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
              {article.name}
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-zinc-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">

          {/* Pull quote — first paragraph styled large */}
          <p className="mb-8 text-lg font-medium leading-8 text-zinc-800 sm:text-xl sm:leading-9">
            {article.content[0]}
          </p>

          {/* Divider */}
          <div className="mb-8 h-px w-16 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]" />

          {/* Remaining paragraphs */}
          <div className="space-y-5">
            {article.content.slice(1).map((paragraph, index) => (
              <p key={index} className="text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="border-t-2 border-zinc-900 bg-zinc-100 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between gap-4">
            {prev ? (
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">Previous</p>
                <Button to={`/articles/${prev.name}`} variant="secondary">← {prev.title}</Button>
              </div>
            ) : <div />}

            {next ? (
              <div className="flex flex-col items-end gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">Next</p>
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