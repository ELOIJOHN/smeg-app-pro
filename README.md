# SMEG PRO v2.0 — RED SYSTEM

Application de gestion des collaborateurs et de leur onboarding IT.
Stack : React · Node.js · Docker · Traefik · VPS Debian

---

## Fonctionnalités

- **Dashboard** — Vue d'ensemble des dossiers avec barre de progression
- **CommandMenu** (`Ctrl+K`) — Recherche globale, accès rapide, modifier/supprimer
- **Checklist É5** — 9 tâches IT par collaborateur (Edge, Office, Teams, SkyRemote, ZScaler, Printers, BOX, GLPI, Intune)
- **Gestion complète** — Créer, modifier, supprimer un dossier
- **Progression** — Étape suivante, réinitialisation
- **Impression** — Fiche collaborateur imprimable

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 (CDN), Tailwind CSS, Babel standalone |
| Backend | Node.js, Express, persistance JSON |
| Reverse proxy | Traefik v3 |
| Conteneurs | Docker + Docker Compose |
| Serveur | VPS Debian 13 |

---

## Installation

### Prérequis
- Docker + Docker Compose
- Traefik opérationnel sur les réseaux `traefik-public`

### Déploiement

```bash
git clone https://github.com/ELOIJOHN/smeg-app-pro.git
cd smeg-app-pro
docker compose up -d
```

L'application est accessible sur le port 80 via Traefik.

---

## API

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/collaborators` | Liste tous les dossiers |
| `POST` | `/api/collaborators` | Crée un dossier `{ name, company, ticket }` |
| `PUT` | `/api/collaborators/:id` | Met à jour un dossier |
| `DELETE` | `/api/collaborators/:id` | Supprime un dossier |
| `GET` | `/api/health` | Statut du backend |

---

## Structure

```
smeg-app-pro/
├── frontend/
│   └── index.html        # App React auto-suffisante
├── backend/
│   ├── server.js         # API Express
│   └── package.json
├── docker-compose.yml    # Stack Docker
└── .gitignore
```

---

## Développé avec Claude Code · Anthropic
