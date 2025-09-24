# Fenova — Plateforme sociale pour artistes engagés

## 🧭 Introduction

**Fenova** est une plateforme sociale pensée pour les artistes qui résistent et défendent des causes humanitaires — en particulier la Palestine — à travers des pièces d'art. Les créateurs peuvent publier librement leurs œuvres, collaborer et mobiliser leur communauté dans un cadre respectueux et sécurisé.

> Objectif : offrir un espace sûr, esthétique et technique pour amplifier la voix des artistes engagés et faciliter l’organisation et la diffusion de messages humanitaires.

---

## ⚙️ Tech Stack recommandé

* Frontend : React.js (Vite) + TypeScript
* Styling : Tailwind CSS + Shadcn UI
* State & Data Fetching : React Query (TanStack Query)
* Backend (BaaS) : Appwrite (auth, database, storage)
* Stockage d’assets : Appwrite Storage 
* Authentification : Appwrite Auth (email / OAuth)
---

## 🔋 Fonctionnalités principales

* **Système d’authentification**
* **Page Explore / Fil d’actualité**
* **Publications artistiques**
* **Likes / Saves**
* **Tags** : organiser des posts par cause (#Palestine,#HumanityArt)
* **Edition de post**
* **Responsive UI** avec une barre inférieure style mobile
---

## 📁 Structure de code (Fenova-App)

```
fenova-app/
├─ node_modules/
├─ public/
├─ src/
│  ├─ _auth/
│  │  ├─ forms/
│  │  └─ AuthLayout.tsx
│  ├─ _root/
│  │  ├─ pages/
│  │  └─ RootLayout.tsx
│  ├─ components/
│  │  ├─ forms/
│  │  ├─ shared/
│  │  └─ ui/
│  ├─ constants/
│  │  └─ index.ts
│  ├─ context/
│  │  └─ AuthContext.tsx
│  ├─ hooks/
│  │  └─ useDebounce.ts
│  ├─ lib/
│  │  └─ appwrite/
│  │     ├─ api.ts
│  │     ├─ config.ts
│  ├─ react-query/
│  ├─ validation/
│  ├─ utils.ts
│  ├─ types/
│  │  └─ index.ts
│  ├─ App.tsx
│  ├─ globals.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ .env.local
├─ package.json
```

---

## 📸 Gestion des médias & guidelines pour les images

* Stocker les fichiers originaux dans Appwrite Storage.
* Générer des URLs signées pour l’affichage côté client.
* Prévoir des versions optimisées (webp, avif) pour mobile.
---

## 🔧 Variables d'environnement (exemple `.env.local`)

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_POST_COLLECTION_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=
```

---

## 🚀 Quick start

1. `npm install`
2. Créez `.env.local` avec les variables ci-dessus
3. `npm run dev`
4. Ouvrez `http://localhost:3000`
---

*Fenova — Un espace pour l’art engagé.*
