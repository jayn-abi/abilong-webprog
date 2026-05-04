import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';

const articles = [
  {
    name: "Article 01",
    title: "Leading Student Development Projects",
    image: img2,
    content: [
      "Managing academic projects as a student comes with a unique set of challenges — balancing deadlines, coordinating with teammates, and aligning expectations without a traditional workplace structure.",
      "One of the most valuable lessons learned is that clear communication is the foundation of any successful team. Regular check-ins, shared documentation, and defined roles prevent most blockers before they happen.",
      "Leadership in a student setting also means being a learner yourself. The best project leads stay humble, ask questions, and create space for every team member's ideas to be heard.",
      "These experiences build not just technical skills, but the soft skills that carry into every professional environment: adaptability, accountability, and the ability to move a team forward under pressure.",
      
    ]
  },
  {
    name: "Article 02",
    title: "Building Scalable Web Applications",
    image: img1,
    content: [
      "Scalability is not something you bolt on after launch — it is a mindset you bring into every architectural decision from day one.",
      "Key principles include separating concerns cleanly, designing stateless APIs, and choosing data storage strategies that grow with your load rather than against it.",
      "Performance optimization is another pillar: lazy loading, caching at the right layers, and minimizing unnecessary re-renders on the frontend can dramatically improve the experience for users at scale.",
      "Beyond the technical side, scalable applications are maintained by scalable teams. Clear code conventions, thorough documentation, and modular architecture allow new contributors to onboard quickly and confidently.",
     
    ]
  },
  {
    name: "Article 03",
    title: "System Development with Purpose",
    image: img3,
    content: [
      "The most impactful systems are not built for the sake of technology — they are built because a real problem exists that technology can meaningfully address.",
      "Purposeful development starts with deep listening. Understanding the pain points of the community or users you are designing for leads to solutions that actually get adopted and used.",
      "Systems like CareLink demonstrate how software can become a vehicle for social good — connecting resources to those who need them, reducing friction in processes that affect vulnerable communities.",
      "Keeping purpose at the center of development decisions also helps teams prioritize features that matter and avoid scope creep that dilutes the core mission of the product.",
     
    ]
  },
  {
    name: "Article 04",
    title: "Future of AI in Systems",
    image: img4,
    content: [
      "Artificial intelligence is no longer a distant concept reserved for research labs — it is actively reshaping how we design, build, and interact with software systems today.",
      "From predictive analytics in health platforms to intelligent recommendation engines in e-commerce, AI is adding a layer of adaptability to systems that previously relied on static rules.",
      "For student developers, this presents a significant opportunity. Learning to integrate AI APIs, work with machine learning models, and interpret data responsibly are skills that will define the next generation of technologists.",
      "The ethical dimension of AI in systems is equally important — questions around data privacy, bias in models, and transparency must be part of every developer's thinking, not an afterthought.",
    ],
  },
  {
    name: "Article 05",
    title: "Designing for Real Users",
    image: img1,
    content: [
      "User-centered design is more than a methodology — it is a commitment to building products that respect the people who use them.",
      "Too often, interfaces are designed around assumptions. Real usability comes from observing actual users, running tests early, and being willing to abandon ideas that do not serve the experience.",
      "Accessibility is a non-negotiable part of good design. Ensuring that applications are usable by people with varying abilities expands your reach and reflects a deeper respect for your audience.",
      "The best UI/UX work happens at the intersection of empathy and craft — understanding what users need emotionally and delivering it through thoughtful visual and interaction design.",
      
    ]
  },
  {
    name: "Article 06",
    title: "From Concept to Deployment",
    image: img3,
    content: [
      "The journey from an idea scribbled on paper to a live, deployed application is where most of the real learning happens in software development.",
      "Breaking the process into phases — ideation, wireframing, development, testing, and deployment — helps manage complexity and keeps the team aligned at every stage.",
      "Version control, CI/CD pipelines, and environment management are not just DevOps concerns; they are habits that every developer benefits from building early in their career.",
      "Shipping your first real project, even imperfect, teaches you more than any course. Iteration after deployment — responding to feedback, fixing bugs in production, improving features — is where craft truly develops.",
    ],
  },
  {
  name: "Article 07",
  title: "Mastering Team Collaboration",
  image: img4,
  content: [
    "Collaboration in development teams goes beyond simply dividing tasks — it requires shared understanding, trust, and alignment toward a common goal.",
    "Effective teams establish clear communication channels, whether through daily stand-ups, messaging platforms, or structured documentation.",
    "Conflict is natural in collaborative environments, but how teams handle disagreements defines their success more than avoiding them altogether.",
    "Tools like version control systems and task boards help keep everyone synchronized and accountable throughout the development cycle.",
    "Ultimately, strong collaboration creates an environment where ideas can evolve freely and solutions become stronger through collective input.",
  ]
},
{
  name: "Article 08",
  title: "Understanding Backend Systems",
  image: img2,
  content: [
    "Backend systems are the backbone of any application, handling data processing, storage, and communication between different components.",
    "Designing a reliable backend requires careful planning around database structure, API design, and server architecture.",
    "Security plays a crucial role — protecting user data through authentication, authorization, and encryption must always be prioritized.",
    "Scalability also matters, ensuring that systems can handle increasing traffic without degrading performance or reliability.",
    "A well-designed backend remains invisible to users, yet it powers every interaction they experience on the frontend.",
  ]
},
{
  name: "Article 09",
  title: "Frontend Development Essentials",
  image: img1,
  content: [
    "Frontend development focuses on creating intuitive, responsive, and visually engaging user interfaces.",
    "Modern frameworks like React allow developers to build reusable components, making development faster and more maintainable.",
    "Responsiveness ensures that applications work seamlessly across devices, from desktops to mobile phones.",
    "Performance optimization, such as minimizing bundle size and avoiding unnecessary re-renders, greatly improves user experience.",
    "Great frontend design balances aesthetics with usability, ensuring that users can navigate applications effortlessly.",
  ]
},
{
  name: "Article 10",
  title: "Maintaining Software Quality",
  image: img3,
  content: [
    "Software quality is not achieved through testing alone — it is built into every stage of development.",
    "Writing clean, readable, and maintainable code makes it easier to detect and fix issues over time.",
    "Automated testing helps ensure that new changes do not break existing functionality.",
    "Code reviews provide an additional layer of quality control while encouraging knowledge sharing within the team.",
    "Consistent improvement through feedback and iteration ensures that software remains reliable, efficient, and valuable to users.",
  ]
},
];

export default articles;