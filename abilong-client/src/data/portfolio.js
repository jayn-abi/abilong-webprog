/*
 * Default portfolio content.
 *
 * The live site loads content saved from the admin dashboard
 * (Dashboard → Site content / Projects / Certifications). Any section that
 * has never been saved there falls back to the defaults in this file, which
 * are also used if the API is unreachable.
 *
 *  - Any link left as '' (empty) is hidden or shown as "Available on request".
 *  - Any optional field left as '' / [] is simply not rendered.
 *  - Images are uploaded to Cloudinary from the dashboard; until then each
 *    project shows a built-in illustrative interface preview.
 */

export const profile = {
  name: 'Gyrzzel Jhyne Abilong',
  shortName: 'Gyrzzel',
  initials: 'GJA',
  title: 'Information Technology Student',
  tagline: 'IT Student · Project Management', // shown under the name in the nav bar
  location: 'Philippines',
  summary:
    'Building technology-driven solutions through project management, Agile practices, and quality assurance.',
  focus: ['Project Management', 'Agile / Scrum', 'QA & Testing'],
  availability: 'Open to internships',
};

export const links = {
  email: 'abilonggyrzzeljhyne@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gyrzzel-jhyne-abilong-4a9312219/',
  github: 'https://github.com/jayn-abi',
  cv: '/Abilong-CV.pdf', // served from abilong-client/public — replace that file to update it
  transcript: 'https://drive.google.com/drive/folders/1jsExHBrtgOPNysRx_Y7CTxVzBgM6qSbt?usp=drive_link',
  certificates: 'https://drive.google.com/drive/folders/1b9oH6d6LloOu0pCgcWKa27z1sy4mXmEw?usp=sharing',
  video: '',          // TODO: link to your video introduction (YouTube / Drive)
};

export const about = {
  paragraphs: [
    "I'm a BS Information Technology student with experience in software development, project coordination, technical support, and customer service, working across mobile and web application projects.",
    'I combine technical knowledge with communication, problem-solving, and collaboration skills built through academic projects, student leadership, and professional support work, and I am growing toward project management, Agile delivery, and software quality assurance.',
  ],
  languages: 'Filipino (Native) · English (Proficient) · Italian (Introductory)',
  interests: [
    { title: 'Project Management', body: 'Planning scope, timelines, and responsibilities for team projects.' },
    { title: 'Agile / Scrum', body: 'Iterative delivery, clear backlogs, and regular team check-ins.' },    { title: 'QA & Software Testing', body: 'Verifying features against requirements before they ship.' },
    { title: 'Technology-driven Solutions', body: 'Using data and software to address real community problems.' },
    { title: 'User-centered Experiences', body: 'Interfaces designed around the people who actually use them.' },
  ],
};

/*
 * Projects — every project has the same fields and gets its own case-study
 * page at /projects/<id>. The one marked "featured" is shown large on the
 * Projects page and previewed in the hero. Managed from Dashboard → Projects.
 *
 * media: Cloudinary image slots — { web, mobile, logo }. Until an image is
 * uploaded, "mockup" picks a built-in interface preview (and HealthCast,
 * CareLink, and IV's keep their bundled logos).
 */
export const projects = [
  {
    id: 'healthcast',
    featured: true,
    name: 'HealthCast',
    tagline: 'Predictive health platform',
    subtitle: 'Climate Change and Mosquito-Borne Diseases: A Predictive Trend Analysis',
    description:
      'A mobile and web-based predictive health platform focused on analyzing weather and disease surveillance data to identify potential mosquito-borne disease risk.',
    role: 'Project Manager / Developer / QA',
    context: 'Capstone Project · National University · 2025 – 2026',
    technologySummary: 'MERN Stack and Flutter',
    focus: 'Predictive Analytics · Project Management · Software Testing',
    tech: ['Flutter', 'React', 'Node.js / Express', 'MongoDB', 'REST APIs'],
    responsibilities: [
      { title: 'Project coordination', body: 'Led the planning and coordination of the platform across mobile, web, backend, database, testing, and documentation work.' },
      { title: 'Development', body: 'Worked as mobile developer on the Flutter app and contributed to the wider MERN codebase.' },
      { title: 'System integration', body: 'Contributed to integrating the Flutter, React, Node.js / Express, and MongoDB components.' },
      { title: 'QA / testing', body: 'Took part in functional, integration, usability, compatibility, and performance testing.' },
      { title: 'Documentation', body: 'Coordinated the documentation requirements of the project.' },
      { title: 'Stakeholder coordination', body: 'Coordinated system evaluation and feedback with stakeholders, including the Department of Health.' },
      { title: 'UI/UX design', body: 'Designed the interface flows for the mobile and web experience.' },
    ],
    media: { web: 'healthcast-web', mobile: 'healthcast-mobile', logo: 'healthcast-logo' },
    github: '',   // TODO: repository link, if public
    demo: '',     // TODO: live demo link, if available
  },
  {
    id: 'bulldogs-exchange',
    name: 'Bulldogs Exchange',
    tagline: 'Campus e-commerce platform',
    subtitle: 'BulldogEx Shop — an online store for National University students',
    context: 'Advanced Web Programming (CTADWEBL) · National University · 2026',
    description:
      'A full-stack e-commerce website where NU students can browse and buy campus essentials, student merch, and uniforms in one storefront, with supplier and admin tools for managing products, categories, and orders.',
    role: 'Full-Stack Developer',
    technologySummary: 'MERN Stack with Cloudinary',
    focus: 'Backend Architecture · API Security · Database Design',
    tech: ['React', 'Node.js / Express', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt', 'Multer', 'Cloudinary', 'Helmet', 'Postman'],
    contribution:
      'Built the REST API and storefront end to end, from the MongoDB data model and MVC structure through role-based security, request validation, rate limiting, audit logging, and Cloudinary product images.',
    responsibilities: [
      { title: 'Database design', body: 'Modelled the product, category, cart, order, review, supplier, and user collections in MongoDB, choosing referenced or embedded documents per relationship (orders keep a price and name snapshot) and adding indexes for common queries.' },
      { title: 'MVC backend', body: 'Organised the Express API into models, controllers, routes, middleware, and a central config that loads environment settings.' },
      { title: 'Authentication & RBAC', body: 'Implemented registration with Bcrypt password hashing, JWT login, and role-based access for customers, suppliers, and admins, including owner-only checks for editing accounts, products, and reviews.' },
      { title: 'API security', body: 'Added express-validator request validation, Helmet security headers, a CORS allow-list, rate limiting with longer lockouts after repeated failed logins, and centralised error handling.' },
      { title: 'Audit logging', body: 'Wrote middleware that records every request (method, path, user, status code, and duration) to MongoDB at info, warning, or error level.' },
      { title: 'Media management', body: 'Handled product image uploads with Multer and Cloudinary, with size and type limits, file-signature checks that reject files posing as images, and image replacement and deletion.' },
      { title: 'Storefront & admin UI', body: 'Built the React storefront, cart, and orders pages plus an admin dashboard for products, orders, reviews, and users, with image previews before upload.' },
      { title: 'API testing', body: 'Tested every endpoint and role scenario in Postman, including validation errors, forbidden access, and rate-limit responses.' },
    ],
    media: { web: 'bulldogs-exchange-web', mobile: 'bulldogs-exchange-mobile', logo: 'bulldogs-exchange-logo' },
    github: '',   // TODO: repository link, if public
    demo: '',     // TODO: live demo link, if available
  },
  {
    id: 'carelink',
    name: 'CareLink',
    tagline: 'Orphanage Assistance System',
    description:
      'A system designed to connect sponsors with orphanages to support the growth of children in need across the Philippines.',
    role: '',            // TODO: your role on CareLink
    tech: [],            // TODO: technologies used
    contribution: '',    // TODO: your key contribution
    media: { web: 'carelink', mobile: 'carelink-mobile', logo: 'carelink-logo' },
    mockup: 'carelink',
    github: '',
    demo: '',
  },
  {
    id: 'laundry',
    name: "IV's Laundry Management",
    tagline: 'UI/UX design',
    description:
      'A web-based platform that simplifies laundry operations through user and admin functionality, improving service tracking and the overall customer experience.',
    role: '',            // TODO: e.g. 'UI/UX Designer'
    tech: [],            // TODO: e.g. ['Figma']
    contribution: '',    // TODO
    media: { web: 'laundry', mobile: 'laundry-mobile', logo: 'laundry-logo' },
    mockup: 'laundry',
    github: '',
    demo: '',
  },
  {
    id: 'portfolio-cms',
    name: 'Portfolio & Content Dashboard',
    tagline: 'Full-stack web application',
    description:
      'This portfolio and its admin dashboard: a React front end backed by an Express REST API and MongoDB, with role-based access for admins and editors.',
    role: 'Full-Stack Developer',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Material UI', 'Node.js / Express', 'MongoDB', 'JWT'],
    contribution:
      'Built the REST API, JWT authentication with admin/editor roles, user and article management, and the responsive front end.',
    media: { web: 'portfolio-cms', mobile: 'portfolio-cms-mobile', logo: 'portfolio-cms-logo' },
    mockup: 'dashboard',
    github: 'https://github.com/jayn-abi/abilong-webprog',
    demo: 'https://abilong-portfolio.vercel.app',
  },
];

export const skillGroups = [
  {
    title: 'Project Management',
    items: ['Agile', 'Scrum', 'Project Coordination', 'Team Collaboration', 'Requirements Documentation'],
  },
  {
    title: 'Development',
    items: ['Flutter', 'React', 'JavaScript', 'Node.js / Express', 'REST APIs'],
  },
  {
    title: 'Database & Tools',
    items: ['MongoDB', 'MongoDB Atlas', 'Git', 'GitHub', 'Windows / macOS', 'Microsoft 365', 'Google Workspace'],
  },
  {
    title: 'QA & Testing',
    items: ['Functional Testing', 'Integration Testing', 'Usability Testing', 'Compatibility Testing', 'Performance Testing'],
  },
  {
    title: 'Technical Support',
    items: ['Hardware & Software Troubleshooting', 'Mobile Device Troubleshooting', 'OS Installation & Configuration', 'Computer Hardware Repair', 'Application Software Support', 'Basic Networking'],
  },
];

export const experience = [
  {
    role: 'Tier 1 Technical Support / Customer Service',
    org: 'Alorica',
    period: '2022 – 2023',
    points: [
      'Diagnosed and resolved mobile software, hardware, and wireless connectivity issues for US-based customers as Tier 1 technical support.',
      'Handled high-volume inbound calls for a US-based telecommunications client, resolving billing disputes, device faults, and product queries.',
      'Consistently met all key performance metrics.',
    ],
    tags: ['Technical troubleshooting', 'Mobile support', 'Wireless connectivity', 'Customer communication'],
  },
];

export const leadership = [
  {
    role: 'Student Council President',
    org: 'Fort Bonifacio High School',
    period: '2020 – 2021',
    points: [
      'Established a Peer Tutoring Program so high-performing students could support peers struggling with remote learning during the pandemic.',
      'Provided mobile load assistance so students could keep joining online classes and accessing learning resources.',
      'Organized and facilitated donation drives for students affected by calamities.',
    ],
    tags: ['Leadership', 'Program organization', 'Coordination', 'Community initiatives', 'Communication'],
  },
];

export const education = [
  {
    degree: 'BS Information Technology',
    detail: 'Specialization in Mobile and Web Applications',
    school: 'National University',
    period: '2022 – 2026',
  },
  {
    degree: 'BS Information Technology',
    detail: '',
    school: 'De La Salle University – Manila',
    period: '2021 – 2022',
  },
  {
    degree: 'Senior High School — Information and Communication Technology',
    detail: '',
    school: 'Fort Bonifacio High School',
    period: '2018 – 2020',
  },
];

/*
 * Certifications — managed from Dashboard → Certifications, shown in list order.
 * Shape: { id, name, issuer, year, link, media }  (media = image slot)
 */
export const certifications = [];

// Shown in the Certifications section while the list above is empty.
export const learningAreas = ['Agile', 'Scrum', 'Technology Management', 'Project Management', 'QA / Software Testing'];
export const contact = {
  headline: "Let's Connect",
  body: 'Open to internship opportunities, technology projects, and opportunities related to project management, QA, and IT.',
};

export const defaultPortfolio = {
  profile,
  links,
  about,
  contact,
  projects,
  skillGroups,
  experience,
  leadership,
  education,
  certifications,
  learningAreas,
};
