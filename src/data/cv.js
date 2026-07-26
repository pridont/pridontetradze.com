// The CV itself. Was src/cv.json, read through an fs shim and kept out of the
// build with an .eleventyignore entry; both are gone now that it lives here.
//
// Identity and contact come from site.js, project URLs from links.js, so no
// value in this file is repeated anywhere else.

const site = require("./site");
const links = require("./links");

module.exports = {
  name: site.name,
  title: site.role,
  contact: site.contact,
  about: {
    lead:
      "I build software for a living, and study humanities for leasure. " +
      "So I spend a lot of time thinking about both systems and the people who " +
      "use them.",
    note:
      "These days I do software development. On the side I read " +
      "psychoanalysis and theology, write music, go fishing and mushroom foraging. " +
      "This site is mostly a place to think out loud."
  },

  experience: [
    {
      title: "Development Team Lead",
      organization: "Webiz | eToro",
      period: "May 2025 - Present",
      location: "Tbilisi, Georgia",
      description: [
        "Lead a team of developers in building and maintaining the eToro platform.",
        "Planned and executed the development of several successful A/B tests that became integral parts of the platform, such as: Comparison charts, user page video bio system, trading notifications, etc.",
        "Architected and developed new eToro marketing website client-side infrastructure for AI-driven development and content-management. Built the CMS rendering engine, enforced clear module boundaries, implemented generators for managing UI blocks and primitives with a schema-first approach.",
      ],
    },
    {
      title: "Senior Frontend Developer",
      organization: "Webiz | eToro",
      period: "February 2024 - May 2025",
      location: "Tbilisi, Georgia",
      description: [
        "Worked on improving and maintaining one of the world's leading broker platforms.",
        "Worked back-to-back with the designers, product managers, and analysts to deliver new features.",
        "Delivered impactful A/B tests, neatly measured with analytics.",
        "Developed extensible libraries used throughout the whole project.",
        'Architected the front-end of "Academy Lite", an interactive learning app for eToro.',
      ],
    },
    {
      title: "Front-end Architect",
      organization: "Codeme",
      period: "April 2023 - July 2024",
      location: "Tbilisi, Georgia",
      description: [
        "Architecting the front-end of the large scale learning management system.",
        "Administering Angular libraries with Nx.",
        "Implementing custom text editor library and its plugin management system with advanced usage of Angular directives and dependency injection.",
        "Ensuring the team is well informed and coordinated to deliver new features and fix bugs.",
        "Ensuring the quality of the code infrastructure with thorough code reviews",
      ],
    },
    {
      title: "Lecturer",
      organization: "IT Academy STEP",
      period: "January 2023 - June 2024",
      location: "Tbilisi, Georgia",
      description: [
        "Taught the fundamentals of front-end development.",
        "Worked closely with the management to improve the teaching process.",
        "Completely revamped the front-end syllabus based on modern technological trends and demands.",
      ],
    },
    {
      title: "Frontend Developer",
      organization: "Payever",
      period: "October 2022 - January 2023",
      location: "Remote",
      description: [
        "Maintained a monolith Ecommerce app “CommerceOS”.",
        "Worked on several apps simultaneously.",
        "Documented the entire project architecture.",
      ],
    },
    {
      title: "Frontend Developer Intern",
      organization: "Optio.ai",
      period: "December 2021 - February 2022",
      location: "Tbilisi, Georgia",
      description: [
        'Developed a campaign management system "Insight Shell" for banks.',
        "Built custom libraries.",
        "Implemented semantic versioning and changelog generator.",
      ],
    },
  ],

  projects: [
    {
      name: "iswavle.com",
      url: links.iswavle,
      description:
        "A project aimed at providing high-quality web development knowledge in Georgian. This is by far the most comprehensive resource on web development in Georgian. Technically, it features static content generation, recursive tree structures in navigation, webcontainers for code editing playground, super-reactive UI and more.",
    },
    {
      name: "NG GUIDE",
      url: links.angularGuide,
      description:
        "The unofficial Georgian Angular guide book. As a professional lecturer, I compiled extensive Georgian resources for Angular framework and made them freely available. This is the most extensive Georgian resource on Angular to date.",
    },
    {
      name: "EverREST",
      url: links.everrest,
      description:
        "A full-featured public REST API for anyone who wants to practice building web applications. It features a shopping system with authentication as well as smaller and simpler APIs such as QR code generator, quote generator, echo etc.",
    },
    {
      name: "Primordial Soup",
      url: links.primordialSoup,
      description:
        "Personal academic platform where I publish articles and video essays exploring psychology, philosophy, and cognitive science for a general audience.",
    },
  ],

  education: [
    {
      degree: "Master's Degree in Human Resource Management (in progress)",
      institution:
        "Sulkhan-Saba Orbeliani University, Faculty of Business and Technologies",
      period: "2025 - present",
      description:
        "Focused on studying human resource management, organizational behavior, and leadership.",
    },
    {
      degree: "Bachelor's Degree in Psychology",
      institution:
        "Ivane Javakhishvili Tbilisi State University, Faculty of Psychology and Education",
      period: "2018 - 2022",
      description:
        "Focused on cognitive psychology, psychoanalytic theory, set psychology.",
    },
  ],

  skills: {
    Frontend: "Angular, TypeScript, JavaScript, RxJS, HTML5, CSS3, Nx, 11ty",
    Backend: "Node.js, Deno, Go",
    Tools: "Git, Webpack, Shell Scripting",
    Languages: "Georgian (Native), English (Fluent), Russian (Limited Working)",
  },
};
