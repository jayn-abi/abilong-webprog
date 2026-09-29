import Hero from '../../components/sections/Hero';
import About from '../../components/sections/About';
import Projects from '../../components/sections/Projects';
import Skills from '../../components/sections/Skills';
import Certifications from '../../components/sections/Certifications';
import Experience from '../../components/sections/Experience';
import Credentials from '../../components/sections/Credentials';
import Contact from '../../components/sections/Contact';

// The whole portfolio on one scrolling page; the nav bar jumps between sections.
const HomePage = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Certifications />
    <Experience />
    <Credentials />
    <Contact />
  </>
);

export default HomePage;
