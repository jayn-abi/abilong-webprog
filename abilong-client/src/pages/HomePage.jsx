import Button from '../components/Button';
import girl from '../assets/images/girl.jpg'; 
import healthcast from '../assets/images/healthcast.png';
import carelink from '../assets/images/carelink.png';
import laundry from '../assets/images/ivs.png';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hero Section
            </p>
            <h1 className="max-w-xl text-5xl font-bold leading-tight">
              <span className="text-zinc900">
                Welcome to Jhyne's 
                </span>
                <br /> 
                <span className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent">
                Portfolio
                </span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Designs and builds digital systems that turn ideas into real-world solutions. An IT student specializing in mobile and web development, focused on creating functional, user-centered applications and using technology to contribute to communities—especially in empowering children through accessible and impactful solutions.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">Learn More</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <img 
            src={girl} 
            alt="Hero Image"
            className="h-72 w-full rounded-[1.25rem] object-cover"
            />

            
          </div>

        </div>
      </section>

     
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick Overview</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">5</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Projects Completed</p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Technologies</p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">3+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Years Learning</p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">100%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Commitment</p>
          </div>
        </div>
      </section>

     
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Featured Projects</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            
           <div className="w-full h-32 rounded-full overflow-hidden">
  <img
    src={carelink}
    alt="CareLink Project"
    className="w-full h-full object-contain rounded-full"
  />
</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">CareLink</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A system designed to connect sponsors to orphanages to foster the growth of children in need. CareLink aims to create a positive impact on the lives of children in orphanages around the Philippines.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
           <div className="w-full h-32 rounded-full overflow-hidden">
  <img
    src={laundry}
    alt="IV'S Laundry Management Project"
    className="w-full h-full object-contain rounded-full"
  />
</div>

            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Laundry Management UI/UX</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A web-based platform that simplifies laundry operations through user and admin functionalities, improving service efficiency, tracking, and overall customer experience.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            
            <div className="w-full h-32 rounded-full overflow-hidden">
  <img
    src={healthcast}
    alt="HealthCast Project"
    className="w-full h-full object-contain rounded-full"
  />
</div>
            
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">HealthCast</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A health-focused platform that leverages predictive analytics and weather pattern data to provide actionable insights on mosquito-borne diseases, supporting early awareness and prevention.
            </p>
            <Button className="mt-4" variant="primary">View More</Button>
          </article>

        </div>
      </section>

    </div>
  );
};

export default HomePage;