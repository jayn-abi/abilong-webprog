import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
          <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            <img
              src="src/assets/images/img0.jpg"
              alt="Visual"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Building technology that empowers communities and creates opportunities for the next generation.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Constantly exploring new technologies to enhance skill sets and deliver better products.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick Summary </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Bachelor of Science Information Technology-MWA</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Education</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Community-focused technology, UI/UX Design, continuous improvement</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Interests</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Problem-solving, fast learner, leadership, project management</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Strengths</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Vite + React, Information Securty, System Administration</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Currently Learning</p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

       
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Stacked content wireframe</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Leadership & Collaboration</h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Project Leadership</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Managed development workflows and task delegation.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Team Collaboration</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Worked closely with developers and stakeholders
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Problem Solving</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Quickly adapts and resolves technical and project challenges.
                </p>
              </article>
            </div>
          </div>

          
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
    Visual Grid
  </p>
  <div className="mt-5 grid gap-4 sm:grid-cols-2">
    <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
      <img
        src="src/assets/images/img1.jpg"
        alt="Image 1"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
      <img
        src="src/assets/images/img2.jpg"
        alt="Image 2"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
      <img
        src="src/assets/images/img3.jpg"
        alt="Image 3"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
      <img
        src="src/assets/images/img4.jpg"
        alt="Image 4"
        className="h-full w-full object-cover"
      />
    </div>
  </div>
  <Button className="mt-5">View Section</Button>
</div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;