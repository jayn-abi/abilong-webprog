import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          <span className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent">
                  Articles & Insights
                </span>
        
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A collection of insights, experiences, and learnings in technology, leadership, and system development.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          
          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
           <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src="src/assets/images/img2.jpg"
              alt="Visual"
              className="h-full w-full object-cover"
            />
          </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Article 01</p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Leading Student Development Projects</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Lessons learned from managing and collaborating on academic systems.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src="src/assets/images/img1.jpg"
              alt="Visual"
              className="h-full w-full object-cover"
            />
          </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Article 02</p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Building Scalable Web Application</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Key principles and best practices for developing web applications that can grow with your user base. 
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src="src/assets/images/img3.jpg"
              alt="Visual"
              className="h-full w-full object-cover"
            />
          </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Article 03</p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">System Development with Purpose</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Creating systems that address real-world challenges. How system development can be used as a tool for awareness and learning.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src="src/assets/images/img4.jpg"
              alt="Visual"
              className="h-full w-full object-cover"
            />
          </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Article 04</p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Future of AI in Systems</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Exploring the potential of artificial intelligence in system development. How AI is transforming the way we build and interact with software systems.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default ArticlePage;