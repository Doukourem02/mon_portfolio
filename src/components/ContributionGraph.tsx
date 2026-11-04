"use client";

import { useState, useEffect, useRef, cloneElement } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  FiGithub,
  FiUsers,
  FiUserCheck,
  FiHeart,
  FiEye,
} from "react-icons/fi";
import type { Profile } from "@/content/types";
import { dictionaries, type Dictionary } from "@/i18n/dictionary";
import { useLocale, useT } from "@/i18n/LocaleProvider";

// 🧠 Lazy-load GitHubCalendar for performance
const GitHubCalendar = dynamic(() => import("react-github-calendar"), {
  ssr: false,
  loading: () => <GraphLoading />,
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

function GraphLoading() {
  return <div className="text-center text-gray-400 py-10">{dictionaries[useLocale().locale].github.loading}</div>;
}

type Year = "last" | number;
type Tooltip = { text: string; x: number; y: number } | null;

/** « 3 contributions le mardi 12 mai 2026 » / « 3 contributions on Tuesday, May 12, 2026 » */
function tooltipText(g: Dictionary["github"], date: string, count: number) {
  const label = new Date(`${date}T12:00:00`).toLocaleDateString(g.dateLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return g.on(g.contributions(count), label);
}

const githubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function ContributionGraph({
  username,
  title,
  socialStats,
}: {
  username: string;
  title: string;
  socialStats: Profile["socialStats"];
}) {

  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>();
  const g = useT().github;
  const [views, setViews] = useState(0);
  const [love, setLove] = useState(0);
  const [hasLoved, setHasLoved] = useState(false);

  const { theme, systemTheme } = useTheme();
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  const graphRef = useRef<HTMLDivElement>(null);

  // 📅 Année affichée (comme sur GitHub) + totaux par année
  const [year, setYear] = useState<Year>("last");
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [lastYearTotal, setLastYearTotal] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=all`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { total: Record<string, number>; contributions: { date: string; count: number }[] }) => {
        if (cancelled) return;
        setTotals(data.total ?? {});
        // Total des 12 derniers mois (même calcul que GitHub)
        const since = new Date();
        since.setFullYear(since.getFullYear() - 1);
        const sinceStr = since.toISOString().slice(0, 10);
        const today = new Date().toISOString().slice(0, 10);
        setLastYearTotal(
          data.contributions
            .filter((c) => c.date > sinceStr && c.date <= today)
            .reduce((sum, c) => sum + c.count, 0)
        );
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [username]);

  const years = Object.keys(totals)
    .map(Number)
    .sort((a, b) => b - a);
  const currentCount = year === "last" ? lastYearTotal : totals[String(year)];
  const countTitle =
    currentCount == null
      ? null
      : g.total(currentCount, year);

  // ✅ Auto-scroll : fin du graphique pour l'année en cours, début sinon
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = graphRef.current;
      if (!el) return;
      el.scrollTo({ left: year === "last" ? el.scrollWidth : 0, behavior: "smooth" });
    }, 1200);
    return () => clearTimeout(timer);
  }, [year]);

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
      if (typeof res.count === "number") setLove(res.count);
    } catch (error) {
      console.error("Love count error:", error);
    }
  };

  const totalFollowers = socialStats.twitter.followers + socialStats.instagram.followers;
  const totalFollowing = socialStats.twitter.following + socialStats.instagram.following;

  const socialInfo = [
    { icon: <FiUsers />, label: g.followers, value: totalFollowers },
    { icon: <FiUserCheck />, label: g.following, value: totalFollowing },
    { icon: <FiHeart />, label: g.likes, value: love, isLove: true },
    { icon: <FiEye />, label: g.views, value: views },
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

      {/* Graph (modèle GitHub : total, années, jours, dates au survol) */}
      <div className="w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <p className="text-lg md:text-xl font-semibold text-white min-h-[1.75rem]">
            {countTitle}
          </p>

          {/* Sélecteur d'année */}
          {years.length > 0 && (
            <div className="flex gap-1 overflow-x-auto scrollbar-none -mx-1 px-1">
              {(["last", ...years] as Year[]).map((y) => (
                <button
                  key={String(y)}
                  type="button"
                  onClick={() => setYear(y)}
                  aria-pressed={year === y}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    year === y
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                  }`}
                >
                  {y === "last" ? g.lastYear : y}
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          ref={graphRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="
            overflow-x-auto border border-blue-500/30
            rounded-xl p-3 md:p-5 dark:bg-primary-bg bg-secondary-bg
            shadow-md scrollbar-none
          "
          onMouseLeave={() => setTooltip(null)}
        >
          <GitHubCalendar
            username={username}
            year={year}
            colorScheme={serverTheme}
            theme={{ light: githubTheme.light, dark: githubTheme.dark }}
            blockSize={11}
            blockMargin={3}
            fontSize={13}
            showWeekdayLabels
            hideTotalCount
            labels={{
              months: g.months,
              weekdays: g.weekdays,
              legend: { less: g.less, more: g.more },
            }}
            renderBlock={(block, activity) =>
              cloneElement(block, {
                onMouseEnter: (e: React.MouseEvent<SVGRectElement>) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setTooltip({
                    text: tooltipText(g, activity.date, activity.count),
                    x: r.left + r.width / 2,
                    y: r.top,
                  });
                },
                onMouseLeave: () => setTooltip(null),
              })
            }
          />
        </motion.div>
      </div>

      {/* Infobulle de date */}
      {tooltip && (
        <div
          role="tooltip"
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-2 px-2.5 py-1.5 rounded-md bg-gray-800 text-white text-xs whitespace-nowrap shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y - 6 }}
        >
          {tooltip.text}
        </div>
      )}

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
                  : "text-blue-400"
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
