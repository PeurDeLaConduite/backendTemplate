# AGENTS.md

## Installation

- Toujours commencer par `yarn install` pour installer toutes les dépendances.
- Si vous utilisez Yarn v4.x (Berry/PnP), ajoutez ou vérifiez dans `.yarnrc.yml` :

    ```yaml
    nodeLinker: node-modules
    ```

## Scripts

Utilisez les scripts définis dans le `package.json` :

- **`yarn dev`** : lance l’application en mode développement (`next dev`).
- **`yarn build`** : construit la production (`next build`).
- **`yarn start`** : démarre le serveur en production (`next start`).
- **`yarn lint`** : exécute le lint via Next.js (`next lint`).
- **`yarn generate:sitemap`** : génère le sitemap (`node scripts/generate-sitemap.js`).

## Style de code

- Utiliser **Prettier** pour formater le code :

    ```bash
    yarn prettier --write .
    ```

- Respecter les règles **ESLint** intégrées à Next.js :

    ```bash
    yarn lint
    ```

## Dépendances clés

- **Framework** : Next.js v15.0.3
- **AWS & Amplify** : aws-amplify 6.9.0 et @aws-amplify/ui-react

## Tests

- Actuellement, il n’y a pas de script de test défini.
- Si vous ajoutez des tests, créez un script `yarn test` et assurez-vous qu’il passe avant chaque PR.

## Pull Request

- **Titre de la PR** : `[Fix|Feat] courte description`
- **Description** : expliquer l’objectif du changement.
- **Tests effectués** : listez les commandes exécutées (ex. `yarn dev`, `yarn lint`, `yarn build`).

---

# 📖 Codes Agent — Création d’un modèle de blog avec AWS Amplify Gen2

## Index

1. [Pré-requis techniques](#pré-requis-techniques)
2. [Créer un modèle de données blog avec Amplify Data](#créer-un-modèle-de-données-blog-avec-amplify-data)
3. [Gérer les autorisations : lecture publique, admin, etc.](#gérer-les-autorisations--lecture-publique-admin-etc)
4. [Schéma d’exemple à copier-coller](#schéma-dexemple-à-copier-coller)
5. [Bonnes pratiques et références](#bonnes-pratiques-et-références)

---

## Pré-requis techniques

- Node.js v18+
- npm v6+
- Un projet Next.js (`next`, `react`, `typescript`…)
- Dépendances Amplify installées :
    ```bash
    npm add aws-amplify @aws-amplify/backend
    ```
- Déploiement d’un backend Amplify Data en Gen2 :
    ```bash
    npm create amplify@latest
    ```

---

## Créer un modèle de données blog avec Amplify Data

1. **Édite** le fichier `amplify/data/resource.ts`.
2. **Déclare** chaque entité (Post, Author, Section, Tag, etc.) avec le builder TypeScript `a.model()`.
3. **Utilise** les types scalaires, customType, enums, arrays, relations (hasMany, belongsTo, etc.).
4. **Ajoute** les règles d’autorisation directement sur chaque modèle.

---

## Gérer les autorisations : lecture publique, admin, etc.

- `.authorization((allow) => [allow.publicApiKey().to(['read']), allow.group('admin').to(['create', 'update', 'delete', 'read'])])`
    - **Lecture publique** : tout le monde peut lire les données.
    - **CRUD réservé admin** : seul le groupe Cognito "admin" peut créer, éditer ou supprimer.
- Le groupe `admin` doit exister côté Cognito.

---

## Schéma d’exemple à copier-coller

```ts
import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
    Post: a
        .model({
            id: a.id().required(),
            title: a.string().required(),
            content: a.string(),
            excerpt: a.string(),
            publishedAt: a.datetime(),
            authorId: a.id().required(),
            sectionId: a.id(),
            tags: a.string().array(),
            coverImage: a.string(),
        })
        .authorization((allow) => [
            allow.publicApiKey().to(["read"]),
            allow.group("admin").to(["create", "update", "delete", "read"]),
        ]),

    Section: a
        .model({
            id: a.id().required(),
            name: a.string().required(),
            description: a.string(),
            slug: a.string(),
        })
        .authorization((allow) => [
            allow.publicApiKey().to(["read"]),
            allow.group("admin").to(["create", "update", "delete", "read"]),
        ]),

    Author: a
        .model({
            id: a.id().required(),
            displayName: a.string().required(),
            bio: a.string(),
            avatarUrl: a.string(),
        })
        .authorization((allow) => [
            allow.publicApiKey().to(["read"]),
            allow.group("admin").to(["create", "update", "delete", "read"]),
        ]),

    Tag: a
        .model({
            id: a.id().required(),
            name: a.string().required(),
        })
        .authorization((allow) => [
            allow.publicApiKey().to(["read"]),
            allow.group("admin").to(["create", "update", "delete", "read"]),
        ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        apiKeyAuthorizationMode: { expiresInDays: 30 },
    },
});
```

---

## Bonnes pratiques et références

- **Toujours** restreindre le CRUD en production (ne pas laisser `.publicApiKey()` pour tout).
- **Ajouter** des secondaryIndexes pour optimiser les requêtes par auteur, section, tag...
- **Utiliser** `selectionSet` côté front pour limiter la quantité de data échangée.
- **Docs officielles** :
    - [Amplify Data authorization](https://docs.amplify.aws/gen2/build-a-backend/data/authorization/)
    - [Data modeling Amplify Gen2](https://docs.amplify.aws/gen2/build-a-backend/data/model/)

---

