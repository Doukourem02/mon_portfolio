# PortfolioX ❤️

> A fully dynamic, motion-enhanced portfolio built with **Next.js**, **Tailwind CSS**, **Framer Motion**, and **Upstash Redis** — blending clean UI, seamless animations, and real-time interactivity.  

---

### ⚙️ Tech Stack  
**Next.js • TypeScript • Tailwind CSS • Framer Motion • Upstash Redis • shadcn/ui**

---

### ✨ Highlights  
- 🔥 Real-time **View & Love Counter** with Upstash Redis persistence  
- 🎞️ Smooth **Framer Motion** transitions for every section  
- ⚡ Optimized performance with **Next.js App Router**  
- 🧠 Modular architecture with reusable UI components  
- 🌗 Fully **responsive**, minimal, and **SEO-friendly**

---

### 🚀 Setup Upstash Redis

See [SETUP_UPSTASH.md](./SETUP_UPSTASH.md) for detailed instructions on configuring Upstash Redis for this project.  

---

### 📄 License  
MIT © 2025 — Mohamed DOUKOURE  
_Crafted with precision, motion, and caffeine ☕_

## ✏️ Mettre à jour le contenu (sans toucher au code)

Tout le contenu (profil, projets, expériences, compétences, certifications, textes) est géré dans **Sanity**.

1. Aller sur **`https://<ton-site>/studio`** (ou `http://localhost:3000/studio` en local) et se connecter avec GitHub.
2. Modifier / ajouter un élément, glisser-déposer les images, puis cliquer sur **Publish**.
3. Le site se met à jour tout seul en quelques secondes — pas de commit, pas de redéploiement.

Le champ **« Ordre d'affichage »** contrôle l'ordre (1 = en premier).

### Technique
- Schémas du Studio : `src/sanity/schemaTypes/`
- Chargement du contenu : `src/content/getContent.ts` (repli automatique sur `src/config/data.ts` si Sanity est indisponible)
- Icônes et couleurs proposées pour les compétences : `src/lib/icons.tsx`
- Mise à jour instantanée : webhook Sanity → `POST /api/revalidate` (signé avec `SANITY_REVALIDATE_SECRET`)
- Ré-import depuis `data.ts` : `npm run sanity:seed` (ajouter `-- --force` pour écraser)

Variables d'environnement : voir `.env.example`.
