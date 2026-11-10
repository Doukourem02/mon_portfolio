# Tâches restantes : mise en ligne de Sanity

Le code est déjà poussé sur `main` (commit `3d52461`) et le build Vercel a réussi.
En local, tout fonctionne. Il reste ces étapes pour que le Studio marche **en production**.

---

## 1. Retrouver l'adresse publique du site ⚠️ prioritaire

L'adresse enregistrée sur GitHub (`mon-portfolio-blush-nine.vercel.app`) n'existe plus
(Vercel répond `DEPLOYMENT_NOT_FOUND`).

- [ ] Aller sur **vercel.com** → projet `mon-portfolio` → **Settings → Domains**
- [ ] Noter l'adresse publique (ci-dessous `TON-DOMAINE`)
- [ ] Si aucun domaine n'est configuré, en ajouter un (ex. `doukoure-mohamed.vercel.app`)
- [ ] (Optionnel) Mettre à jour le lien du dépôt GitHub : *About → Website*

---

## 2. Autoriser le domaine pour le Studio (obligatoire)

Sans ça, `/studio` en ligne refusera la connexion.

- [ ] Dans le terminal du projet :
  ```bash
  npx sanity cors add https://TON-DOMAINE --credentials
  ```

---

## 3. Mise à jour instantanée (optionnel mais recommandé)

Sans cette étape, une modification apparaît en ligne au bout de **60 secondes max**.
Avec, c'est quasi instantané.

### a) Variable d'environnement sur Vercel
- [ ] Vercel → `mon-portfolio` → **Settings → Environment Variables**
- [ ] Ajouter `SANITY_REVALIDATE_SECRET` = la valeur de la même ligne dans `.env.local`
- [ ] Environnements : Production (+ Preview si voulu)
- [ ] **Redéployer** (Deployments → … → Redeploy)

> ⚠️ Ne PAS ajouter `SANITY_WRITE_TOKEN` sur Vercel : il sert uniquement à l'import en local.

### b) Webhook sur Sanity
- [ ] Aller sur **sanity.io/manage** → projet **Portfolio Mohamed DOUKOURE** → **API** → **Webhooks** → **Create webhook**
  - Name : `Revalidation du portfolio`
  - URL : `https://TON-DOMAINE/api/revalidate`
  - Dataset : `production`
  - Trigger on : **Create**, **Update**, **Delete**
  - Filter : `_type in ["profile","project","experience","skill","certification"]`
  - Projection : `{_type, _id}`
  - HTTP method : `POST`
  - API version : `v2025-10-01`
  - Drafts : décoché
  - Secret : **la même valeur** que `SANITY_REVALIDATE_SECRET`
- [ ] Sauvegarder

---

## 4. Vérifier que tout marche

- [ ] Ouvrir `https://TON-DOMAINE` : le site s'affiche normalement
- [ ] Ouvrir `https://TON-DOMAINE/studio` : connexion avec **GitHub**
- [ ] Modifier un petit texte → **Publish** → recharger le site → la modif apparaît
- [ ] Ajouter `https://TON-DOMAINE/studio` aux **favoris** (ordi + téléphone)

---

## 5. Divers

- [ ] **Libérer de l'espace disque** : il ne reste que ~7 Go (disque à 97 %).
  Réglages Système → Général → Stockage. Objectif : au moins 10 à 20 Go libres.
  (`~/Library/Caches` fait ~14 Go.)
- [ ] (Optionnel) Upstash Redis : les compteurs « Vues » et « J'aime » ne marchent pas en local
  car `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` ne sont pas dans `.env.local`
  (à copier depuis Vercel si besoin).

---

## 📌 Mémo : ajouter un nouveau projet

1. `https://TON-DOMAINE/studio` → **Projets** → bouton **+**
2. Titre, description, image principale, galerie (glisser plusieurs captures d'un coup)
3. Liens démo / GitHub (laisser « démo » vide si pas encore déployé)
4. Technologies : « Add item » → choisir parmi les compétences
5. **Ordre d'affichage** : 1 = en premier
6. **Publish** ✅

Rien n'est en ligne tant que tu n'as pas cliqué sur **Publish**.
