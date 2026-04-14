import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../assets/article-content';

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      
      <section className="hero-mesh border-b border-(--border) px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
            Articles
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl gradient-text">
            Articles & Insights
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-(--muted) sm:text-base">
            A collection of insights, experiences, and learnings in technology, leadership, and system development.
          </p>
          <div className="mt-6">
            <Button to="/" variant="primary">Back Home</Button>
          </div>
        </div>
      </section>

      
      <section className="border-b border-(--border) px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-bold text-(--text)">Article card grid</h2>
          </div>
          <ArticleList articles={articles} />
        </div>
      </section>

    </div>
  );
};

export default ArticleListPage;
