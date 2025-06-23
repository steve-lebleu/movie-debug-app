# Examen ADW - 2CE-X75-B: application Movie-Debug - React & Git

## Déboguer, refactorer une application React qui consomme une API

📅 **Durée totale de l'épreuve :** 3h30

🎯 **Objectif :**
Cet examen évalue votre capacité à déboguer une application React existante, à interagir avec une API RESTful ([TheMovieDB](https://www.themoviedb.org/)) en utilisant l'API fetch native, à implémenter de nouvelles fonctionnalités et à gérer proprement votre historique de versionnement avec Git.

## 🎬 1. Contexte de l'application

Vous disposez d'un dépôt Git contenant une application React incomplète et comportant des bugs, qui est censée afficher des informations sur des films via l'API TheMovieDB. Votre mission est de rendre cette application fonctionnelle, d'y ajouter des fonctionnalités et de démontrer de bonnes pratiques de développement.

### Accès à l'API TheMovieDB (TMDB)

L'application utilise l'API TheMovieDB. Vous devrez :

- Vous inscrire gratuitement sur [TheMovieDB](https://www.themoviedb.org/) (si ce n'est pas déjà fait).
- Obtenir une clé API (v3) depuis votre compte (Settings -> API).
- Vous devrez intégrer cette clé API dans l'application React. Un placeholder est prévu dans le code.

> ⚠️ **Important :** Ne partagez jamais votre clé API dans vos commits Git finaux ou publiquement. Utilisez un fichier `.env` ou une variable d'environnement pour la gérer. Pour cet examen local, vous pouvez créer un fichier `.env` à la racine de votre projet avec `VITE_TMDB_API_KEY=votre_clé_ici` et l'utiliser dans votre code. Assurez-vous d'ajouter `.env` à votre `.gitignore`.

## 📝 2. Instructions détaillées

### 2.1. Préparation (5-10 min)

1. **Commencez par forker le dépôt Git fourni:**

   - URL du dépôt Git

2. **Ajoutez-moi au projet:**

   - Compte Git formateur

3. **Clonez ensuite ce dépôt pour avoir une copie locale:**

   ```bash
   git clone [URL_DU_DEPOT_FOURNI]
   cd [NOM_DU_DEPOT]
   ```

4. **Installez les dépendances:**

   ```bash
   npm install
   ```

5. **Créez une nouvelle branche pour chaque étape de votre travail (debug, feature)**

   C'est sur cette / ces branche(s) que vous effectuerez toutes vos modifications et commits pour les étapes du travail.

   ```bash
   git checkout -b debug/layout-styles
   ```

6. **Démarrez l'application et observez son comportement initial:**

   ```bash
   npm run dev
   ```

### 2.2. Débogage (estimation : 1h15 - 1h30)

L'application contient plusieurs bugs qui l'empêchent de fonctionner correctement. Votre première tâche est d'identifier et de corriger ces bugs. Voici quelques pistes:

- **Problème de chargement initial :** l'application ne semble pas afficher les films populaires au démarrage ou affiche une erreur.
- **Erreur de clé API :** le placeholder de la clé API doit être remplacé par votre propre clé TMDB.
- **Affichage des images :** les affiches de films ne s'affichent pas ou sont cassées.
- **Gestion des états :** il y a des erreurs dans la mise à jour de l'interface utilisateur après certaines actions (ex: recherche, chargement).
- **Gestion des clés de liste React :** des avertissements dans la console du navigateur concernant les clés manquantes ou incorrectes dans les listes.
- **Gestion des erreurs API (avec fetch) :** l'application ne gère pas les cas où l'API renvoie une erreur HTTP (ex: 404, 500) car fetch ne lance pas d'erreur pour ces statuts.

### 2.3. Implémentation de fonctionnalités (estimation : 1h15 - 1h30)

Une fois l'application stable et les bugs majeurs corrigés, ajoutez au moins **deux (2)** des fonctionnalités suivantes:

**A. Recherche de films :** Ajoutez un champ de recherche et un bouton qui permet de rechercher des films par titre via l'API TMDB et d'afficher les résultats.

**B. Pagination :** Implémentez une pagination pour les listes de films (populaires ou de recherche) permettant de naviguer entre les pages de résultats.

**C. Ajout de favoris (stockage local) :** Permettez aux utilisateurs de marquer des films comme "favoris" et de les sauvegarder dans le localStorage du navigateur. Affichez ces favoris sur une page dédiée.

#### Exigences obligatoires pour les fonctionnalités

- ✅ La **recherche de films (A)** est **obligatoire**.
- ✅ Choisissez **une (1)** autre fonctionnalité parmi la **pagination (B)** ou les **l'ajout de favoris (C)**.

### 2.4. Finalisation (15-20 min)

1. Assurez-vous que votre application fonctionne correctement et que toutes les exigences sont remplies.
2. Vérifiez l'état de votre dépôt Git: assurez-vous que toutes vos modifications sont commises.

### Exigences Git

- Effectuez des commits atomiques et descriptifs pour chaque bug corrigé. Ex: `fix: corrige le chargement initial des films`, `fix: affiche les posters de films`.
- Chaque fonctionnalité doit faire l'objet d'un ensemble de commits logiques. Idéalement, une fonctionnalité = une série de commits dédiés.
- Utilisez des messages de commit significatifs : ex: `feat: ajoute la fonctionnalité de recherche de films`, `feat: implémente la pagination`.
- N'hésitez pas à faire plusieurs petits commits.
- Ouvrez une PR par branche lorsque vous pensez en avoir terminé avec un sujet.
