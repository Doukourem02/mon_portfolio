import {FaCss3Alt,FaCube,FaDocker,FaFigma,FaGitAlt,FaHtml5,FaNodeJs,FaPython,FaReact,} from "react-icons/fa";
import {SiAdobephotoshop,SiCloudflare,SiExpo,SiExpress,SiFirebase,SiFramer,SiGraphql,SiJavascript,SiKubernetes,SiMongodb,SiMui,SiNextdotjs,SiPhp,SiPostgresql,SiPostman,SiPrisma,SiReactquery,SiRedux,SiSanity,SiSass,SiSocketdotio,SiStrapi,SiSupabase,SiSymfony,SiTailwindcss,SiTypescript,SiVercel,} from "react-icons/si";

export const socialLinks = [
  {
    id: 5,
    priority: 1,
    title: "GitHub",
    url: "https://github.com/dashboard", 
  },
  {
    id: 6,
    priority: 2,
    title: "LinkedIn",
    url: "https://www.linkedin.com/feed/", 
  },
  {
    id: 7,
    priority: 3,
    title: "Twitter",
    url: "https://x.com/home", 
  },
  {
    id: 8,
    priority: 4,
    title: "Instagram",
    url: "https://www.instagram.com", 
  },
];

export const personalInfo = {
  name: "Mohamed DOUKOURE",
  title: "Full Stack Developer — Web & Mobile | UI/UX Designer",
  avatar: "/images/about/Doukoures.webp",
  email: "", 
  location: "Abidjan, Côte d'Ivoire",
  description:
    "Développeur Full Stack passionné par la création d'expériences numériques modernes, utiles et impactantes. Spécialisé dans le développement web et mobile avec TypeScript, Node.js, Next.js, React et les technologies les plus performantes, je conçois des solutions digitales à la fois techniques, élégantes et orientées business. Aujourd’hui, je travaille également en freelance sur des projets pour des particuliers, des entrepreneurs et des organisations qui ont besoin de produits web et mobiles solides, modernes et adaptés à leurs objectifs.",
};

export const heroSection = {
  personalInfo: personalInfo,
  socialLinks: socialLinks,
};

export const workExperience = [
  {
    company: "Freelance / Indépendant",
    position: "Développeur web, mobile et UI/UX Designer",
    period: "Début 2025 à aujourd’hui",
    shortDesc:
      "Aujourd’hui, j’exerce en tant que développeur freelance indépendant en concevant des solutions digitales modernes pour des particuliers, des entrepreneurs et des organisations.",
    bulletPoints: [
      "Création de la plateforme Bella Création, un projet centré sur l’identité digitale, la présentation des services et l’expérience utilisateur.",
      "Développement du projet REPSFECO-CI, une plateforme institutionnelle conçue en collaboration avec une organisation engagée dans le cadre de la CEDEAO.",
      "Réalisation de projets web et mobiles autour de la livraison, de l’agriculture et de la transformation numérique d’activités concrètes.",
      "Conception d’interfaces modernes, intuitives et adaptées aux besoins réels des utilisateurs et des clients.",
    ],
  },
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
    title: "KRONO Livraison",
    description:
      "Plateforme de livraison en temps réel connectant clients, chauffeurs et administrateurs. Monorepo complet avec 4 applications : API REST + Socket.IO (Node.js/Express), dashboard web admin (Next.js 16), application mobile client (Expo/React Native) et application mobile chauffeur. La solution permet un suivi en direct des commandes, une communication instantanée entre les parties, une géolocalisation précise avec Google Maps, une authentification OTP sécurisée, des notifications push en temps réel, ainsi qu’une gestion complète des livraisons, des statuts, des paiements et des opérations administratives. Le backend repose sur PostgreSQL/Supabase avec migrations SQL et sécurité JWT.",
    image: "/images/projects/chrono_livraison/chrono2.png",
    liveUrl: "https://admin.kro-no-delivery.com/login",
    githubUrl: "https://github.com/Doukourem02/app_chrono",
    galleryImages: [
      "/images/projects/chrono_livraison/chrono1.png",
      "/images/projects/chrono_livraison/chrono2.png",
      "/images/projects/chrono_livraison/chrono6.png",
      "/images/projects/chrono_livraison/IMG_9320.jpg",
      "/images/projects/chrono_livraison/IMG_9321.jpg",
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
      "Marketplace agricole mobile mettant en relation producteurs et acheteurs, avec un assistant IA agricole intégré (conseiller virtuel propulsé par GPT-4o-mini, avec historique de conversations) pour aider les producteurs sur la production, la certification et la mise en marché. Chat temps réel via Socket.IO depuis les fiches produits ou les demandes d'achat, workflow de commandes (demande → confirmation producteur), publication d'annonces d'achat avec notification automatique des producteurs concernés, et météo locale intégrée. Application mobile React Native/Expo, backend Node.js/Express et PostgreSQL (Supabase), authentification via Clerk. Architecture soignée avec Prisma ORM, validation Joi, logging Winston, documentation Swagger et pipeline CI/CD.",
    image: "/images/projects/projet_sainain/sainain4.jpg",
    // liveUrl: "", // Pas de déploiement pour l'instant
    githubUrl: "https://github.com/Doukourem02/PROJET_SAINAIN",
    galleryImages: [
      "/images/projects/projet_sainain/sainain4.jpg",
      "/images/projects/projet_sainain/sainain5.png",
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
        "Supabase",
      ].includes(item.name)
    ),
  },
  {
    title: "Bella Création",
    description:
      "Plateforme web dynamique avec panel administrateur complet pour Bellarose création imagination. L'application permet à l'entreprise de gérer elle-même ses prestations, visuels, conseils, témoignages, contenus et informations de contact sans dépendre d'un développeur. Le projet associe une interface publique élégante dédiée à la décoration d'intérieur et à l'apprentissage avec un back-office métier pensé pour donner au client un contrôle total sur son activité digitale.",
    image: "/images/projects/bella-creation/bella-creation-1.png",
    liveUrl: "https://bella-interio-design.vercel.app",
    galleryImages: [
      "/images/projects/bella-creation/bella-creation-1.png",
      "/images/projects/bella-creation/bella-creation-2.png",
      "/images/projects/bella-creation/bella-creation-3.png",
    ],
    techStack: techStack.filter((item) =>
      ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"].includes(
        item.name
      )
    ),
  },
  {
    title: "REPSFECO-CI",
    description:
      "Plateforme institutionnelle dynamique pour le Réseau Paix et Sécurité pour les Femmes de l'Espace CEDEAO - Section Côte d'Ivoire. Le site centralise la présentation de l'organisation, ses missions, ses domaines d'intervention et ses actions terrain autour de la paix, de la gouvernance et de l'autonomisation des femmes. Un espace d'administration permet de publier et gérer les activités, transformant le site en véritable outil de communication autonome pour l'organisation.",
    image: "/images/projects/repsfeco-ci/repsfeco-ci-1.png",
    liveUrl: "https://repsfeco-ci.vercel.app",
    galleryImages: [
      "/images/projects/repsfeco-ci/repsfeco-ci-1.png",
      "/images/projects/repsfeco-ci/repsfeco-ci-2.png",
      "/images/projects/repsfeco-ci/repsfeco-ci-3.png",
    ],
    techStack: techStack.filter((item) =>
      ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"].includes(
        item.name
      )
    ),
  },
  {
    title: "Nike Reimagined",
    description:
      "Refonte moderne et élégante du site Nike : design entièrement responsive, animations fluides et interface épurée inspirée de l'identité Nike. Développé avec une approche mobile-first et déployé sur Vercel pour des performances optimales.",
    image: "/images/projects/nike-reimagined.webp",
    liveUrl: "https://nike-reimagined-mu.vercel.app/",
    githubUrl: "https://github.com/Doukourem02",
    galleryImages: ["/images/projects/nike-reimagined.webp"],
    techStack: techStack.filter((item) =>
      ["React", "Tailwind"].includes(item.name)
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
  title: "Contributions GitHub",
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
