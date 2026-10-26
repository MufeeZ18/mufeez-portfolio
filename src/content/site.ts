/**
 * Site content — the single source of truth for everything on the page.
 *
 * Sources, in priority order:
 *   1. Details Mufeez confirmed directly (contact, experience dates, project lineup).
 *   2. Reference resume ~/Documents/Resume/Mufeez_Shaikh_Visa.pdf (education,
 *      skills, project details). Never published or linked.
 *
 * Never invent achievements, metrics, testimonials, availability, or URLs.
 * Leave a field out (or say "coming soon") rather than guess.
 */

export const profile = {
  name: "Mufeez Shaikh",
  firstName: "Mufeez",
  lastName: "Shaikh",
  initials: "MS",
  role: "Software Engineer",
  location: "Pune, India",
  email: "mufeezswe.28@gmail.com",
  current: {
    company: "Accenture",
    role: "Advanced Associate Software Engineer",
  },
  /** Hero introduction — grounded in the resume. */
  intro:
    "I build full-stack applications with Java, Spring Boot and React, combining reliable backend services, well-designed APIs and responsive interfaces. I focus on writing maintainable software that solves practical problems.",
  /** Rotating focus line in the hero. */
  focusAreas: [
    "Spring Boot services",
    "REST APIs",
    "React.js interfaces",
    "Docker & Kubernetes",
  ],
  about: [
    "I'm a software engineer based in Pune, working across the stack with a backend bias. Most of my work lives in Java and Spring Boot — REST endpoints, Hibernate and SQL — connected to React.js screens on the other side.",
    "I care about the unglamorous parts that keep software dependable: tests written with JUnit and Mockito, queries that don't do unnecessary work, and releases that move cleanly through Jenkins into Docker and Kubernetes environments.",
  ],
} as const;

export const copyrightYear = "2026";

/* ── Navigation ───────────────────────────────────────────────────────── */

export type SectionId = "about" | "projects" | "experience" | "skills" | "contact";

export const navItems: readonly { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/* ── Links ────────────────────────────────────────────────────────────── */

export type SocialLink = {
  id: "github" | "linkedin" | "email" | "instagram";
  label: string;
  href: string;
  /** Short visible detail shown next to the label. */
  handle: string;
  external: boolean;
};

export const socialLinks: readonly SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/MufeeZ18",
    handle: "MufeeZ18",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mufeez-shaikh/",
    handle: "mufeez-shaikh",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
    external: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/mufeez.18/",
    handle: "mufeez.18",
    external: true,
  },
];

export function getSocialLink(id: SocialLink["id"]): SocialLink {
  const link = socialLinks.find((l) => l.id === id);
  if (!link) throw new Error(`Unknown social link: ${id}`);
  return link;
}

/* ── Experience ───────────────────────────────────────────────────────── */

export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;
  end: string;
  current?: boolean;
};

/**
 * Company, role, and dates only — by design. Most recent first.
 * Dates are Mufeez's confirmed values and override the resume.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    company: "Accenture",
    role: "Advanced Associate Software Engineer – Java Full Stack",
    start: "July 2026",
    end: "Present",
    current: true,
  },
  {
    company: "Quadruple Software Systems LLP",
    role: "Software Engineer",
    start: "March 2025",
    end: "July 2026",
  },
  {
    company: "Lamrin Solutions Pvt Ltd",
    role: "Web Developer Intern",
    start: "January 2024",
    end: "April 2024",
  },
  {
    company: "Quadruple Software Systems LLP",
    role: "Python Developer Intern",
    start: "July 2021",
    end: "September 2021",
  },
];

/* ── Education (resume) ───────────────────────────────────────────────── */

export type EducationEntry = {
  institution: string;
  qualification: string;
  location: string;
  start: string;
  end: string;
  coursework?: readonly string[];
};

export const education: readonly EducationEntry[] = [
  {
    institution: "Sinhgad College of Engineering",
    qualification: "Bachelor of Engineering, Computer Science",
    location: "Pune, MH",
    start: "Nov 2022",
    end: "June 2025",
    coursework: [
      "Advanced Data Structures and Algorithms",
      "Software Engineering",
      "Design Patterns",
      "Application Engineering and Development",
    ],
  },
  {
    institution: "Bharati Vidyapeeth's Jawaharlal Nehru Institute of Technology",
    qualification: "Diploma in Computer Technology",
    location: "Pune, MH",
    start: "Aug 2019",
    end: "July 2022",
  },
];

/* ── Skills (resume + confirmed AWS) ──────────────────────────────────── */

export type SkillGroup = {
  id: string;
  label: string;
  skills: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  { id: "languages", label: "Languages", skills: ["Java", "Python", "JavaScript", "SQL"] },
  {
    id: "backend",
    label: "Backend",
    skills: ["Spring Boot", "REST APIs", "Hibernate", "JDBC", "Node.js"],
  },
  { id: "frontend", label: "Frontend", skills: ["React.js", "HTML5", "CSS3"] },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
  },
  { id: "databases", label: "Databases", skills: ["MySQL", "MongoDB"] },
  {
    id: "testing",
    label: "Testing & Tooling",
    skills: ["JUnit", "Mockito", "Postman", "Git", "Jira"],
  },
];

/* ── Projects ─────────────────────────────────────────────────────────── */

export type ProjectVisual = "social" | "booking" | "purchases" | "marketplace" | "ev-photo";

export type Project = {
  id: string;
  title: string;
  /** Short category line shown above the title. */
  kind?: string;
  summary: string;
  highlights?: readonly string[];
  tech: readonly string[];
  visual: ProjectVisual;
  /** Small caption on the artwork. Defaults to "Concept illustration". */
  artworkLabel?: string;
  /** Accent used only inside this project's illustration. */
  accent: string;
  badge?: string;
  /** Set only when the overview is not yet documented. */
  comingSoon?: boolean;
  /** Projects shown for reference that are not Mufeez's own work. */
  reference?: { author: string; url: string };
  /** Only set once Mufeez supplies a verified URL — never "#" or a guess. */
  repositoryUrl?: string;
  demoUrl?: string;
};

export const projects: readonly Project[] = [
  {
    id: "ecosphere",
    title: "Ecosphere",
    kind: "Social media application",
    summary:
      "A social media application for sharing posts and connecting with other users, with likes, comments, and authenticated access through a responsive React interface.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    visual: "social",
    artworkLabel: "UI concept",
    accent: "#4fd1a5",
  },
  {
    id: "airbnb-clone",
    title: "Airbnb Clone",
    kind: "Property booking & reservations",
    summary:
      "A property booking platform for browsing listings, checking availability and making reservations.",
    highlights: [
      "Node.js REST endpoints with booking state persisted in MongoDB",
      "JWT authorization on login and reservation actions",
      "Responsive React.js interface across device breakpoints",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "JWT"],
    visual: "booking",
    artworkLabel: "UI concept",
    accent: "#ff8a7a",
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    kind: "Full Stack Application",
    summary:
      "A full-stack application for recording purchases and generating vendor-specific reports. Integrates Spring Boot vendor and material services with a responsive React interface featuring dependent dropdowns, input validation, transaction confirmation, and date-range filtering.",
    highlights: [
      "Vendor and material lookup with category-dependent types and units.",
      "Validated purchase entry with transaction confirmation and clear loading/error states.",
      "Purchase reports filtered by vendor and date range, including empty-result handling.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "React",
      "REST APIs",
      "Maven",
      "JUnit",
      "Jenkins",
      "SonarQube",
      "Apache Tomcat",
    ],
    visual: "purchases",
    accent: "#f5b84b",
  },
  {
    id: "skillsphere",
    title: "SkillSphere",
    kind: "Freelance marketplace",
    summary: "A freelancing platform that connects clients with service providers.",
    highlights: [
      "Freelancer discovery and job request management",
      "Profiles with past work, reviews and ratings",
      "Real-time notifications on a Firebase backend",
    ],
    tech: ["React", "Node.js", "Firebase"],
    visual: "marketplace",
    accent: "#a78bfa",
  },
  {
    id: "electroroute-ev",
    title: "ElectroRoute EV",
    kind: "EV charging station management",
    summary: "A management system for EV charging stations.",
    highlights: [
      "Geo-location search for stations",
      "JWT authentication over Spring Boot REST APIs",
      "Docker containerisation",
    ],
    tech: ["Java", "Spring Boot", "MySQL", "Docker"],
    visual: "ev-photo",
    accent: "#7ee0ff",
  },
];

/* ── Signature diagram (illustrative) ─────────────────────────────────── */

export type DiagramNodeId = "interface" | "api" | "services" | "database" | "cloud";

export const diagramNodes: readonly {
  id: DiagramNodeId;
  label: string;
  detail: string;
  explanation: string;
}[] = [
  {
    id: "interface",
    label: "Interface",
    detail: "React.js",
    explanation:
      "The client layer — screens people interact with, calling the API over HTTPS.",
  },
  {
    id: "api",
    label: "API",
    detail: "REST · JWT",
    explanation:
      "The front door — authenticates each request and routes it to the right service.",
  },
  {
    id: "services",
    label: "Services",
    detail: "Spring · Node.js",
    explanation:
      "Business logic — validation, workflows and integrations, kept testable in isolation.",
  },
  {
    id: "database",
    label: "Database",
    detail: "MySQL · MongoDB",
    explanation:
      "Persistent state — relational records and flexible documents, queried efficiently.",
  },
  {
    id: "cloud",
    label: "Cloud",
    detail: "AWS · Docker · K8s",
    explanation:
      "The platform — containerised with Docker, orchestrated by Kubernetes, running on AWS.",
  },
];
