import {
  FaCss3Alt,
  FaCube,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiAdobephotoshop,
  SiCloudflare,
  SiExpo,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReactquery,
  SiRedux,
  SiSanity,
  SiSass,
  SiSocketdotio,
  SiStrapi,
  SiSupabase,
  SiSymfony,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export const socialLinks = [
  {
    id: 5,
    priority: 1,
    title: "GitHub",
    url: "https://github.com/dashboard", // ⚠️ À remplacer par votre lien de profil GitHub (ex: https://github.com/votre-username)
  },
  {
    id: 6,
    priority: 2,
    title: "LinkedIn",
    url: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit", // ⚠️ À remplacer par votre lien de profil LinkedIn (ex: https://www.linkedin.com/in/votre-nom)
  },
  {
    id: 7,
    priority: 3,
    title: "Twitter",
    url: "https://x.com/home?lang=fr", // ⚠️ À remplacer par votre lien de profil X/Twitter (ex: https://x.com/votre-username)
  },
  {
    id: 8,
    priority: 4,
    title: "Instagram",
    url: "https://www.instagram.com", // ⚠️ À remplacer par votre lien de profil Instagram (ex: https://www.instagram.com/votre-username)
  },
];

export const personalInfo = {
  name: "Mohamed DOUKOURE",
  title: "Full Stack Developer — Web & Mobile | UI/UX Designer",
  avatar: "/images/about/Doukoures.webp",
  email: "", // À remplir avec votre email
  location: "Abidjan, Côte d'Ivoire",
  description:
    "Développeur Full Stack passionné par la création d'expériences numériques exceptionnelles. Spécialisé dans le développement web et mobile avec TypeScript, Node.js, Next.js, React et les technologies modernes, je combine expertise technique et sens du design pour concevoir des applications performantes, intuitives et esthétiques. Toujours à l'affût des dernières tendances en développement et en design UI/UX.",
};

export const heroSection = {
  personalInfo: personalInfo,
  socialLinks: socialLinks,
};

export const workExperience = [
  {
    company: "HUAWEI",
    position: "Front Office – Global Network Operation Center (GNOC)",
    period: "Août 2023 - Octobre 2024",
    shortDesc:
      "Front Office au Global Network Operation Center (GNOC) chez HUAWEI à Abidjan. Responsable de la supervision et de la gestion opérationnelle des réseaux télécoms pour plusieurs pays d'Afrique.",
    bulletPoints: [
      "Supervision du réseau Orange pour plusieurs pays d'Afrique (Côte d'Ivoire, Sénégal, Cameroun...)",
      "Gestion d'incidents et suivi opérationnel",
      "Coordination entre équipes techniques locales et internationales",
    ],
  },
  {
    company: "Arnio - Startup ivoirienne de mobilité électrique",
    position: "UI/UX Designer - Projet Freelance",
    period: "Novembre 2023 - Avril 2024",
    shortDesc:
      "UI/UX Designer freelance pour Arnio, une startup ivoirienne spécialisée dans la mobilité électrique. Conception d'interfaces utilisateur centrées sur l'expérience utilisateur et l'ergonomie.",
    bulletPoints: [
      "Conception de maquettes haute-fidélité",
      "Design orienté utilisateur : recherche de bornes, suivi de recharge, précommandes de véhicules",
      "Travail centré sur l'ergonomie et la simplicité d'utilisation",
    ],
  },
  {
    company: "Nugo",
    position: "Data Manager / Développeur Web",
    period: "Octobre 2021 - Juillet 2023",
    shortDesc:
      "Data Manager et Développeur Web chez Nugo à Abidjan. Responsable de la gestion des données, du développement web et de l'optimisation des processus internes.",
    bulletPoints: [
      "Création et maintenance du site web de Nugo",
      "Gestion de la base de données Mode : articles, commandes, paiements, livraisons",
      "Optimisation des processus internes",
      "Analyses pour la prise de décision stratégique",
      "Automatisation de certaines tâches internes",
    ],
  },
];

export const techStack = [
  // === FRONTEND ===
  {
    name: "HTML",
    icon: FaHtml5,
    color: "text-orange-500",
    type: "Frontend",
  },
  {
    name: "CSS",
    icon: FaCss3Alt,
    color: "text-blue-500",
    type: "Frontend",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400",
    type: "Frontend",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-500",
    type: "Frontend",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "text-cyan-400",
    type: "Frontend",
  },
  {
    name: "SCSS",
    icon: SiSass,
    color: "text-pink-600",
    type: "Frontend",
  },
  {
    name: "Material UI",
    icon: SiMui,
    color: "text-blue-400",
    type: "Frontend",
  },
  {
    name: "Framer",
    icon: SiFramer,
    color: "text-pink-500",
    type: "Frontend",
  },
  { name: "React", icon: FaReact, color: "text-blue-400", type: "Frontend" },
  {
    name: "React Native",
    icon: FaReact,
    color: "text-cyan-400",
    type: "Frontend",
  },
  {
    name: "Redux",
    icon: SiRedux,
    color: "text-purple-700",
    type: "Frontend",
  },
  {
    name: "React Query",
    icon: SiReactquery,
    color: "text-red-500",
    type: "Frontend",
  },
  {
    name: "Zustand",
    icon: FaCube,
    color: "text-orange-500",
    type: "Frontend",
  },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white", type: "Frontend" },
  {
    name: "Expo",
    icon: SiExpo,
    color: "text-gray-800",
    type: "Frontend",
  },

  // === BACKEND & DATABASES ===
  {
    name: "Python",
    icon: FaPython,
    color: "text-yellow-300",
    type: "Backend & Databases",
  },
  {
    name: "PHP",
    icon: SiPhp,
    color: "text-indigo-400",
    type: "Backend & Databases",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "text-green-500",
    type: "Backend & Databases",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "text-gray-500",
    type: "Backend & Databases",
  },
  {
    name: "Socket.IO",
    icon: SiSocketdotio,
    color: "text-white",
    type: "Backend & Databases",
  },
  {
    name: "Symfony",
    icon: SiSymfony,
    color: "text-black",
    type: "Backend & Databases",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-600",
    type: "Backend & Databases",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "text-blue-600",
    type: "Backend & Databases",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "text-orange-400",
    type: "Backend & Databases",
  },
  {
    name: "Supabase",
    icon: SiSupabase,
    color: "text-green-400",
    type: "Backend & Databases",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "text-teal-400",
    type: "Backend & Databases",
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    color: "text-pink-500",
    type: "Backend & Databases",
  },

  // === CMS ===
  {
    name: "Sanity",
    icon: SiSanity,
    color: "text-red-500",
    type: "CMS",
  },
  {
    name: "Strapi",
    icon: SiStrapi,
    color: "text-purple-500",
    type: "CMS",
  },

  // === TOOLS & DEVOPS ===
  {
    name: "Docker",
    icon: FaDocker,
    color: "text-blue-500",
    type: "Tools & DevOps",
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
    color: "text-blue-400",
    type: "Tools & DevOps",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "text-white",
    type: "Tools & DevOps",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "text-orange-500",
    type: "Tools & DevOps",
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "text-orange-600",
    type: "Tools & DevOps",
  },
  {
    name: "Cloudflare",
    icon: SiCloudflare,
    color: "text-orange-400",
    type: "Tools & DevOps",
  },

  // === DESIGN ===
  {
    name: "Figma",
    icon: FaFigma,
    color: "text-purple-400",
    type: "Design",
  },
  {
    name: "Photoshop",
    icon: SiAdobephotoshop,
    color: "text-blue-500",
    type: "Design",
  },
];

export const projects = [
  {
    title: "Chrono Livraison",
    description:
      "Plateforme de livraison en temps réel connectant clients, chauffeurs et administrateurs. Monorepo complet avec 4 applications : API REST + Socket.IO (Node.js/Express), dashboard web admin (Next.js 16), app mobile client (Expo/React Native), et app mobile chauffeur. Communication temps réel via WebSocket, géolocalisation avec Google Maps, authentification OTP, suivi de livraisons en direct, et gestion complète des commandes. Backend PostgreSQL/Supabase avec migrations SQL et sécurité JWT.",
    image: "/images/projects/chrono_livraison/chrono2.png",
    // liveUrl: "", // Pas de déploiement pour l'instant
    githubUrl: "https://github.com/Doukourem02/app_chrono",
    galleryImages: [
      "/images/projects/chrono_livraison/chrono1.png",
      "/images/projects/chrono_livraison/chrono2.png",
      "/images/projects/chrono_livraison/chrono6.png",
    ],
    techStack: techStack.filter((item) =>
      [
        "React",
        "React Native",
        "TypeScript",
        "Node.js",
        "Express",
        "Socket.IO",
        "PostgreSQL",
        "Supabase",
        "Next.js",
        "Expo",
        "Zustand",
        "React Query",
      ].includes(item.name)
    ),
  },
  {
    title: "Projet Sainain",
    description:
      "Plateforme de marketplace agricole connectant producteurs, acheteurs et transporteurs. Application mobile React Native/Expo avec backend Node.js/Express et PostgreSQL. Fonctionnalités complètes : gestion de commandes, système de notation, tracking GPS en temps réel via Socket.io, notifications push, géolocalisation, et interface complète pour les 3 rôles. Architecture solide avec Prisma ORM, validation Joi, logging Winston, documentation Swagger, et CI/CD pipeline.",
    image: "/images/projects/projet_sainain/sainain1.png",
    // liveUrl: "", // Pas de déploiement pour l'instant
    githubUrl: "https://github.com/Doukourem02/PROJET_SAINAIN",
    galleryImages: [
      "/images/projects/projet_sainain/sainain1.png",
      "/images/projects/projet_sainain/sainain2.jpg",
      "/images/projects/projet_sainain/sainain3.jpg",
    ],
    techStack: techStack.filter((item) =>
      [
        "React",
        "React Native",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express",
        "Socket.IO",
        "PostgreSQL",
        "Prisma",
        "Expo",
        "Zustand",
        "Firebase",
        "Supabase",
      ].includes(item.name)
    ),
  },
  {
    title: "Nike Reimagined",
    description:
      "A sleek and modern Nike website redesign showcasing fully responsive design with smooth animations and clean UI inspired by Nike's iconic branding. Built with mobile-first approach and deployed on Vercel for lightning-fast performance.",
    image: "/images/projects/nike-reimagined.webp",
    liveUrl: "https://nike-reimagined-mu.vercel.app/",
    githubUrl: "https://github.com/Doukourem02",
    techStack: techStack.filter((item) =>
      ["React", "Tailwind"].includes(item.name)
    ),
  },
  {
    title: "News Hub",
    description:
      "Real-time news application integrating News API to deliver headlines across various categories. Features a modern interface with TypeScript for type safety and shadcn-ui components for a polished user experience.",
    image: "/images/projects/news-hub.webp",
    liveUrl: "https://news-hub-seven-chi.vercel.app/",
    githubUrl: "https://github.com/Doukourem02",
    techStack: techStack.filter((item) =>
      ["React", "TypeScript", "Tailwind"].includes(item.name)
    ),
  },
];

export const certifications: Array<{
  title: string;
  image: string;
  url: string;
}> = [
  // Certifications commentées - à remplacer par vos propres certifications
  // {
  //   title: "Full Stack + DevOps",
  //   image: "/images/certifications/cert1.webp",
  //   url: "/images/certifications/cert1.webp",
  // },
  // {
  //   title: "JavaScript (HackerRank)",
  //   image: "/images/certifications/cert2.webp",
  //   url: "https://www.hackerrank.com/certificates/bd2d5b312338",
  // },
  // {
  //   title: "React (HackerRank)",
  //   image: "/images/certifications/cert3.webp",
  //   url: "https://www.hackerrank.com/certificates/b3100e423bf5",
  // },
  // {
  //   title: "JavaScript (Udemy)",
  //   image: "/images/certifications/cert4.webp",
  //   url: "https://www.udemy.com/certificate/UC-d2bcd2a3-c3de-42d5-8a71-826432170ce1/",
  // },
  // Add more certifications here
];

export const githubSection = {
  username: "Doukourem02",
  title: "GitHub Contributions",
};

export const socialStats = {
  twitter: {
    followers: 25,
    following: 573,
  },
  instagram: {
    followers: 215,
    following: 628,
  },
};
