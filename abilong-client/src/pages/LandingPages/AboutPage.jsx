import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      
      <section className="hero-mesh border-b border-(--border) px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 lg:items-center">

         
          <div className="gradient-ring rounded-3xl">
            <div className="gradient-ring-inner bg-(--card)">
              <div className="flex min-h-72 items-center justify-center rounded-[calc(1.5rem-3px)] overflow-hidden">
                <img
                  src="src/assets/images/img0.jpg"
                  alt="Visual"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl gradient-text">
              Building technology that empowers communities and creates opportunities for the next generation.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-(--muted) sm:text-base">
              Constantly exploring new technologies to enhance skill sets and deliver better products.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles" variant="secondary">Open Articles</Button>
            </div>
          </div>

        </div>
      </section>

      
      <section className="border-b border-(--border) bg-(--card) px-4 py-10 sm:px-6 sm:py-12 lg:px-8 transition-colors duration-300">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              Profile Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-(--text)">Quick Summary</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Bachelor of Science Information Technology-MWA", label: "Education", accent: "#00d4ff" },
              { title: "Community-focused technology, UI/UX Design, continuous improvement", label: "Interests", accent: "#a855f7" },
              { title: "Problem-solving, fast learner, leadership, project management", label: "Strengths", accent: "#22d3a5" },
              { title: "Vite + React, Information Security, System Administration", label: "Currently Learning", accent: "#00d4ff" },
            ].map((card) => (
              <div
                key={card.label}
                className="glass-card card-lift rounded-[1.25rem] p-5"
                style={{ borderTop: `2px solid ${card.accent}33` }}
              >
                <p className="text-sm font-bold text-(--text) leading-snug">{card.title}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: card.accent }}>{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="border-b border-(--border) px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">Stacked content wireframe</p>
            <h2 className="mt-2 text-2xl font-bold text-(--text)">Leadership & Collaboration</h2>
            <div className="mt-6 space-y-4">
              {[
                { title: "Project Leadership", body: "Managed development workflows and task delegation." },
                { title: "Team Collaboration", body: "Worked closely with developers and stakeholders." },
                { title: "Problem Solving", body: "Quickly adapts and resolves technical and project challenges." },
              ].map((item) => (
                <article key={item.title} className="glass-card glow-border-hover rounded-[1.25rem] p-5">
                  <h3 className="text-base font-bold text-(--text)">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-(--muted)">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[1.25rem] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              Visual Grid
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"].map((img, i) => (
                <div key={i} className="flex aspect-square items-center justify-center rounded-2xl overflow-hidden border border-(--border)">
                  <img
                    src={`src/assets/images/${img}`}
                    alt={`Image ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <Button className="mt-5" variant="primary">View Section</Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
