import Button from '../../components/Button';
import girl from '../../assets/images/girl.jpg';
import healthcast from '../../assets/images/healthcast.png';
import carelink from '../../assets/images/carelink.png';
import laundry from '../../assets/images/ivs.png';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-0">

      
      <section className="hero-mesh border-b border-(--border) px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              Hero Section
            </p>
            <h1 className="max-w-xl text-5xl font-bold leading-tight">
              <span className="text-(--text)">Welcome to Jhyne's</span>
              <br />
              <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-(--muted) sm:text-base">
              Designs and builds digital systems that turn ideas into real-world solutions. An IT student specializing in mobile and web development, focused on creating functional, user-centered applications and using technology to contribute to communities—especially in empowering children through accessible and impactful solutions.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary" className="btn-glow-pulse">Learn More</Button>
            </div>
          </div>

          
          <div className="gradient-ring rounded-3xl aspect-square max-w-sm mx-auto w-full">
            <div className="gradient-ring-inner bg-(--card) h-full">
              <img
                src={girl}
                alt="Hero Image"
                className="w-full h-full object-cover rounded-[calc(1.5rem-3px)]"
              />
            </div>
          </div>

        </div>
      </section>

      
      <section className="border-b border-(--border) bg-(--card) px-4 py-10 sm:px-6 sm:py-12 lg:px-8 transition-colors duration-300">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              KPI Section
            </p>
            <h2 className="mt-2 text-2xl font-bold text-(--text)">Quick Overview</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "5", label: "Projects Completed", accent: "#00d4ff" },
              { value: "10+", label: "Technologies", accent: "#a855f7" },
              { value: "3+", label: "Years Learning", accent: "#22d3a5" },
              { value: "100%", label: "Commitment", accent: "#00d4ff" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="glass-card rounded-[1.25rem] p-5 card-lift"
                style={{ borderTop: `2px solid ${kpi.accent}33` }}
              >
                <p className="text-3xl font-bold" style={{ color: kpi.accent }}>{kpi.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-(--muted)">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="border-b border-(--border) px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted)">
              Feature Cards
            </p>
            <h2 className="mt-2 text-2xl font-bold text-(--text)">Featured Projects</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <article className="glass-card glow-border-hover card-lift rounded-[1.25rem] p-5 flex flex-col">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border border-(--border) flex items-center justify-center">
                <img src={carelink} alt="CareLink Project" className="w-full h-full object-contain rounded-full" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-(--text)">CareLink</h3>
              <p className="mt-2 text-sm leading-6 text-(--muted) flex-1">
                A system designed to connect sponsors to orphanages to foster the growth of children in need. CareLink aims to create a positive impact on the lives of children in orphanages around the Philippines.
              </p>
              <Button className="mt-4" variant="primary">View More</Button>
            </article>

            <article className="glass-card glow-border-hover card-lift rounded-[1.25rem] p-5 flex flex-col">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border border-(--border) flex items-center justify-center">
                <img src={laundry} alt="IV'S Laundry Management Project" className="w-full h-full object-contain rounded-full" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-(--text)">Laundry Management UI/UX</h3>
              <p className="mt-2 text-sm leading-6 text-(--muted) flex-1">
                A web-based platform that simplifies laundry operations through user and admin functionalities, improving service efficiency, tracking, and overall customer experience.
              </p>
              <Button className="mt-4" variant="primary">View More</Button>
            </article>

            <article className="glass-card glow-border-hover card-lift rounded-[1.25rem] p-5 flex flex-col">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border border-(--border) flex items-center justify-center">
                <img src={healthcast} alt="HealthCast Project" className="w-full h-full object-contain rounded-full" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-(--text)">HealthCast</h3>
              <p className="mt-2 text-sm leading-6 text-(--muted) flex-1">
                A health-focused platform that leverages predictive analytics and weather pattern data to provide actionable insights on mosquito-borne diseases, supporting early awareness and prevention.
              </p>
              <Button className="mt-4" variant="primary">View More</Button>
            </article>

          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
