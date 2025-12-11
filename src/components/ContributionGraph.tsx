"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FiGithub,
  FiUsers,
  FiUserCheck,
  FiHeart,
  FiEye,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";
import { githubSection, socialStats } from "@/config/data";

// 🧠 Lazy-load GitHubCalendar for performance
const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => (
    <div className="text-center text-gray-400 py-10">Loading graph...</div>
  ),
});

// 🎯 Import server actions
import {
  getLoveCountServerAction,
  setLoveCountServerAction,
} from "@/app/api/loveActions";
import {
  getViewsServerAction,
  setViewsServerAction,
} from "@/app/api/viewsActions";

const githubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function ContributionGraph() {
  const username = githubSection.username;
  const { title } = githubSection;

  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>();
  const [views, setViews] = useState(0);
  const [love, setLove] = useState(0);
  const [hasLoved, setHasLoved] = useState(false);

  const { theme, systemTheme } = useTheme();
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  const graphRef = useRef<HTMLDivElement>(null);

  // ✅ Auto-scroll contribution graph
  useEffect(() => {
    const scrollToRight = () => {
      graphRef.current?.scrollTo({
        left: graphRef.current.scrollWidth,
        behavior: "smooth",
      });
    };
    const timer = setTimeout(scrollToRight, 1200);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Handle theme
  useEffect(() => {
    setServerTheme(scheme);
  }, [scheme]);

  // Les stats Twitter et Instagram sont maintenant dans la configuration

  // ✅ Unique view logic (one per device)
  useEffect(() => {
    async function fetchCounts() {
      try {
        const [viewRes, loveRes] = await Promise.all([
          getViewsServerAction(),
          getLoveCountServerAction(),
        ]);
        setViews(viewRes.views || 0);
        setLove(loveRes.count || 0);

        // count one unique view
        const viewed = localStorage.getItem("uniqueUserViewed");
        if (!viewed) {
          await setViewsServerAction();
          localStorage.setItem("uniqueUserViewed", "true");
        }
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    }
    fetchCounts();
  }, []);

  // 🎉 Confetti animation
  const celebrate = async () => {
    try {
      const { default: confetti } = await import("canvas-confetti");
      const audio = new Audio("/sounds/song1.mp3");
      audio.volume = 0.75;
      audio.play().catch(() => {});
      const colors =
        scheme === "dark"
          ? ["#ff4d6d", "#00bbf9", "#38bdf8", "#a855f7", "#f472b6"]
          : ["#facc15", "#ef4444", "#3b82f6", "#10b981", "#a855f7"];
      const defaults = {
        spread: 70,
        startVelocity: 45,
        gravity: 0.9,
        scalar: 1.1,
        ticks: 100,
        colors,
      };
      const shoot = () => {
        confetti({ ...defaults, particleCount: 45, origin: { x: 0.5, y: 0.5 } });
      };
      shoot();
      [200, 400, 600, 800].forEach((t) => setTimeout(shoot, t));
    } catch (e) {
      console.error("Confetti error:", e);
    }
  };

  // ❤️ Handle love (once per reload)
  const handleLoveClick = async () => {
    if (hasLoved) return;
    celebrate();
    setHasLoved(true);
    setLove((prev) => prev + 1);
    localStorage.setItem("hasLoved", "true");
    try {
      const res = await setLoveCountServerAction();
      setLove(res.count);
    } catch (error) {
      console.error("Love count error:", error);
    }
  };

  const socialInfo = [
    { 
      icon: <FiTwitter />, 
      label: "Twitter Followers", 
      value: socialStats.twitter.followers,
      color: "text-blue-400"
    },
    { 
      icon: <FiInstagram />, 
      label: "Instagram Followers", 
      value: socialStats.instagram.followers,
      color: "text-pink-400"
    },
    { icon: <FiHeart />, label: "Love Count", value: love, isLove: true },
    { icon: <FiEye />, label: "Views", value: views },
  ];

  return (
    <div className="mb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
            <FiGithub className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </motion.div>

      {/* Graph */}
      <motion.div
        ref={graphRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          w-full md:w-[90%] lg:w-[80%] xl:w-[78%]
          mx-auto overflow-x-auto border border-blue-500/30
          rounded-xl p-3 md:p-5 dark:bg-primary-bg bg-secondary-bg
          shadow-md scrollbar-none
        "
      >
        <GitHubCalendar
          username={username}
          colorScheme={serverTheme}
          theme={{ light: githubTheme.light, dark: githubTheme.dark }}
          blockSize={11}
          blockMargin={3}
          fontSize={13}
        />
      </motion.div>

      {/* Info Cards */}
      <div
        className="
          grid grid-cols-2 md:grid-cols-4 gap-4 
          w-full md:w-[90%] lg:w-[80%] xl:w-[78%]
          mx-auto mt-6
        "
      >
        {socialInfo.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            onClick={item.isLove ? handleLoveClick : undefined}
            className={`bg-gray-900/30 border border-blue-500/30 hover:bg-gray-800/50 
              transition-all duration-300 flex flex-col items-center justify-center 
              p-3 rounded-lg text-center h-[70px] md:h-[80px] lg:h-[85px]
              w-[90%] md:w-[85%] lg:w-[80%] mx-auto 
              ${item.isLove ? "cursor-pointer hover:border-pink-400/60" : ""}`}
          >
            <div
              className={`mb-1 ${
                item.isLove
                  ? "text-pink-400 group-hover:text-pink-300"
                  : item.color || "text-blue-400"
              }`}
            >
              {item.icon}
            </div>
            <p className="text-[11px] md:text-[12px] font-medium text-gray-400 leading-tight">
              {item.label}
            </p>
            <p
              className={`text-[13px] md:text-[14px] font-semibold ${
                item.isLove ? "text-pink-400" : "text-white"
              }`}
            >
              {item.isLove ? `❤️ ${item.value}` : item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
