/* =====================================================================
   PORTFOLIO DATA — edit this file to update your website.
   ---------------------------------------------------------------------
   Everything that appears in the Skills, Services, Projects, Education,
   Experience, Contact and Social sections comes from here.
   You never need to touch index.html to add a project or a skill.

   Rules:
   - Leave a URL as "" (empty) if you don't have it yet. Empty social
     links are hidden automatically; empty project links show a
     disabled "Private repo" / "Demo soon" button instead of a fake link.
   - Skill "level" is a number from 0 to 100 (shown as a progress bar).
   ===================================================================== */

const PORTFOLIO = {
  /* ---------------- Personal information ---------------- */
  profile: {
    name: "Rin Reaksmey",
    shortName: "Reaksmey",
    title: "Web Developer",
    email: "rreaksmey236@gmail.com",
    phone: "+855 69 843 852",
    location: "Sen Sok, Phnom Penh, Cambodia",
    cvFile: "assets/documents/cv.pdf",
    cvDownloadName: "CV_Rin_Reaksmey.pdf",
  },

  /* ---------------- Social links ----------------
     TODO: add your LinkedIn and Facebook profile URLs.
     Example: "https://www.linkedin.com/in/your-username"           */
  socials: [
    { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/meymeyIT" },
    { name: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "" }, // TODO: add URL
    { name: "Facebook", icon: "fa-brands fa-facebook-f", url: "" },  // TODO: add URL
    { name: "Telegram", icon: "fa-brands fa-telegram", url: "" },    // optional, e.g. https://t.me/username
  ],

  /* ---------------- Typing animation words ---------------- */
  typingWords: ["Web Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer"],

  /* ---------------- Technical skills ----------------
     Levels reflect hands-on use in real projects. Adjust them honestly. */
  skills: [
    {
      category: "Frontend",
      icon: "fa-solid fa-laptop-code",
      items: [
        { name: "HTML5", icon: "fa-brands fa-html5", level: 90 },
        { name: "CSS3", icon: "fa-brands fa-css3-alt", level: 85 },
        { name: "JavaScript", icon: "fa-brands fa-js", level: 80 },
        { name: "React.js (Vite)", icon: "fa-brands fa-react", level: 70 },
        { name: "Bootstrap 5", icon: "fa-brands fa-bootstrap", level: 85 },
      ],
    },
    {
      category: "Backend",
      icon: "fa-solid fa-server",
      items: [
        { name: "PHP", icon: "fa-brands fa-php", level: 82 },
        { name: "Laravel", icon: "fa-brands fa-laravel", level: 80 },
        { name: "Node.js / Express", icon: "fa-brands fa-node-js", level: 75 },
        { name: "REST API", icon: "fa-solid fa-plug", level: 78 },
        { name: "Prisma ORM", icon: "fa-solid fa-diagram-project", level: 68 },
      ],
    },
    {
      category: "Database",
      icon: "fa-solid fa-database",
      items: [
        { name: "MySQL / MariaDB", icon: "fa-solid fa-database", level: 85 },
        { name: "PostgreSQL", icon: "fa-solid fa-database", level: 72 },
        { name: "MongoDB", icon: "fa-solid fa-leaf", level: 55 },
        { name: "Database Design (ERD, 3NF)", icon: "fa-solid fa-sitemap", level: 80 },
      ],
    },
    {
      category: "Mobile & Languages",
      icon: "fa-solid fa-mobile-screen-button",
      items: [
        { name: "Flutter", icon: "fa-solid fa-mobile-screen", level: 62 },
        { name: "React Native", icon: "fa-brands fa-react", level: 60 },
        { name: "Java", icon: "fa-brands fa-java", level: 60 },
        { name: "C#", icon: "fa-solid fa-hashtag", level: 58 },
        { name: "Python", icon: "fa-brands fa-python", level: 58 },
      ],
    },
    {
      category: "Tools",
      icon: "fa-solid fa-screwdriver-wrench",
      items: [
        { name: "Git", icon: "fa-brands fa-git-alt", level: 78 },
        { name: "GitHub", icon: "fa-brands fa-github", level: 80 },
        { name: "VS Code", icon: "fa-solid fa-code", level: 90 },
        { name: "Postman", icon: "fa-solid fa-paper-plane", level: 75 },
        { name: "XAMPP / pgAdmin", icon: "fa-solid fa-box-open", level: 80 },
      ],
    },
  ],

  /* Soft skills & spoken languages (shown under the skill cards) */
  softSkills: ["Problem Solving", "Debugging", "Teamwork", "Clear Communication", "Fast Learner", "System Analysis (DFD, Use Case, ERD)"],
  languages: [
    { name: "Khmer", level: "Native" },
    { name: "English", level: "Working proficiency" },
  ],

  /* ---------------- Services ---------------- */
  services: [
    { title: "Website Development", icon: "fa-solid fa-globe", text: "Complete, fast and secure websites built from planning and database design through to deployment." },
    { title: "Frontend Development", icon: "fa-solid fa-palette", text: "Clean, accessible interfaces with HTML, CSS, JavaScript, React and Bootstrap that work on every screen." },
    { title: "Backend Development", icon: "fa-solid fa-gears", text: "REST APIs and server logic with Laravel, PHP and Node.js/Express, including authentication and roles." },
    { title: "Responsive Web Design", icon: "fa-solid fa-mobile-screen-button", text: "Mobile-first layouts tested on phones, tablets and desktops so users get a smooth experience everywhere." },
    { title: "Database Design", icon: "fa-solid fa-database", text: "Normalized MySQL and PostgreSQL schemas with ERDs, relationships and data dictionaries." },
    { title: "Web Application Development", icon: "fa-solid fa-layer-group", text: "Management systems and dashboards: ordering, inventory, school and e-commerce applications." },
    { title: "Website Maintenance", icon: "fa-solid fa-screwdriver-wrench", text: "Bug fixing, debugging, performance improvements and new features for existing websites." },
  ],

  /* ---------------- Projects ----------------
     category must match one of the filter keys: "fullstack", "laravel", "mobile".
     To ADD a project: copy one object, change the values, save. Done.
     To REMOVE a project: delete its object.
     image: put a screenshot in assets/images/projects/ and reference it here. */
  projectFilters: [
    { key: "all", label: "All" },
    { key: "fullstack", label: "Full Stack" },
    { key: "laravel", label: "PHP / Laravel" },
    { key: "mobile", label: "Mobile" },
  ],
  projects: [
    {
      title: "Zoom Garden Restaurant Management System",
      category: "fullstack",
      status: "Final-year thesis",
      image: "assets/images/projects/zoom-garden-rms.svg",
      description:
        "Food ordering and management system for Zoom Garden Café & Wine Restaurant. Customers scan a table QR code to order; kitchen, barista and cashier each get their own screen, with stock tracking and Telegram low-stock alerts.",
      tech: ["React", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "Socket.IO"],
      demo: "", // TODO: add live URL when deployed
      github: "", // TODO: add repo URL if public
    },
    {
      title: "Inventory Management System",
      category: "laravel",
      status: "Completed",
      image: "assets/images/projects/inventory-management.svg",
      description:
        "Production-oriented inventory system for managing products, stock levels, purchases and sales, built in 10 phases with role-based access and an admin dashboard.",
      tech: ["Laravel 12", "PHP 8.2", "MySQL", "Blade", "Bootstrap 5"],
      demo: "",
      github: "https://github.com/meymeyIT/ims",
    },
    {
      title: "School Management System",
      category: "laravel",
      status: "Completed",
      image: "assets/images/projects/school-management.svg",
      description:
        "Admin, teacher and student portals for managing students, teachers, classes, subjects, attendance, grades and timetables, with CSRF protection and secure PDO queries.",
      tech: ["PHP 8", "PDO", "MySQL", "Bootstrap 5", "JavaScript"],
      demo: "",
      github: "",
    },
    {
      title: "E-commerce Website",
      category: "laravel",
      status: "Academic project",
      image: "assets/images/projects/ecommerce-website.svg",
      description:
        "Fully functional online store with user authentication, product search, multiple product images, shopping cart and checkout, plus an admin dashboard for products, categories, brands and orders.",
      tech: ["Laravel", "MySQL", "HTML", "CSS", "JavaScript"],
      demo: "",
      github: "",
    },
    {
      title: "Food Delivery Platform",
      category: "mobile",
      status: "In progress",
      image: "assets/images/projects/food-delivery.svg",
      description:
        "Foodpanda-style platform with four apps (Customer, Rider, Restaurant, Admin) sharing one REST API, with JWT auth, real-time order tracking and KHQR payment planned.",
      tech: ["Flutter", "Node.js", "Express", "Prisma", "PostgreSQL", "Socket.IO"],
      demo: "",
      github: "",
    },
    {
      title: "Mobile Shopping App",
      category: "mobile",
      status: "Personal project",
      image: "assets/images/projects/flutter-shop.svg",
      description:
        "Cross-platform shopping app with product browsing and cart, connected to a Node.js REST API and MongoDB, tested on both the Android emulator and real devices.",
      tech: ["Flutter", "Node.js", "MongoDB", "REST API"],
      demo: "",
      github: "",
    },
  ],

  /* ---------------- Education (timeline) ---------------- */
  education: [
    {
      school: "National Polytechnic Institute of Cambodia (NPIC)",
      degree: "Bachelor of Computer Science",
      period: "Year 4 — Present", // TODO: e.g. "2023 — 2027"
      courses: ["Web Programming", "Database Systems & Normalization", "System Analysis & Design (SDLC)", "Object-Oriented Programming", "Mobile App Development"],
      achievements: [
        "Final-year thesis: Food Ordering Management System for Zoom Garden Café & Wine Restaurant",
        "Delivered full system documentation: Use Case, DFD, ERD and data dictionary",
      ],
    },
  ],

  /* ---------------- Experience (timeline) ----------------
     No formal job yet, so this shows real project and practical experience.
     When you get a job or internship, add it at the TOP of this list. */
  experience: [
    {
      role: "Full Stack Developer — Thesis Team",
      company: "Zoom Garden Café & Wine Restaurant (Academic + real deployment)",
      period: "2026",
      responsibilities: [
        "Built backend REST APIs with Node.js, Express and Prisma on PostgreSQL",
        "Implemented QR table ordering and role-based screens for kitchen, barista and cashier",
        "Added a Telegram bot for low-stock alerts with retry and error handling",
      ],
      tech: ["React", "Node.js", "Prisma", "PostgreSQL"],
      achievements: ["Built with a team of 4 and partially deployed for real use at the café"],
    },
    {
      role: "Academic Projects",
      company: "National Polytechnic Institute of Cambodia (NPIC)",
      period: "Year 2 — Present",
      responsibilities: [
        "Built web projects using HTML, CSS, JavaScript, PHP and MySQL",
        "Supported classmates in coding assignments and group projects",
        "Applied problem-solving and debugging skills to improve project performance",
      ],
      tech: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "MySQL"],
      achievements: ["Completed e-commerce, inventory and school management systems"],
    },
  ],

  /* ---------------- Contact form email delivery ----------------
     The form works in two modes:
     1) EmailJS configured  → messages are sent straight to your inbox.
     2) Not configured      → the visitor's email app opens with the
                              message pre-filled (mailto), and the
                              site says so honestly.
     Setup guide: see README.md → "Enable real email delivery".     */
  emailjs: {
    publicKey: "", // TODO
    serviceId: "", // TODO
    templateId: "", // TODO
  },
};
