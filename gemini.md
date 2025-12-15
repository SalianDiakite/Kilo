# Documentation de l'Architecture des Données - Kilo

Ce document décrit comment l'application gère les données, en particulier le mécanisme permettant de basculer entre un mode "mock" (données fictives) et un mode "base de données" (données réelles via Supabase).

## 1. Vue d'ensemble

L'architecture des données est conçue pour être centralisée autour de deux fichiers principaux :

1.  `lib/services/data-service.ts` : Un service qui agit comme une couche d'abstraction pour toutes les opérations de lecture et d'écriture de données.
2.  `lib/data-provider.tsx` : Un `React Context Provider` qui utilise le `data-service` pour récupérer les données et les met à disposition de l'ensemble de l'application via le hook `useData()`.

## 2. Le Mécanisme de Basculement (Le "Flag")

Le passage des données mockées à la base de données réelle est contrôlé par une simple constante booléenne :

-   **Fichier** : `lib/services/data-service.ts`
-   **Constante** : `USE_MOCK_DATA`

```typescript
// lib/services/data-service.ts

// Flag global pour basculer entre mock et DB
// Mettre à false quand la base de données sera peuplée
export const USE_MOCK_DATA = true; // <--- C'EST LE FLAG
```

### Fonctionnement

-   Si `USE_MOCK_DATA` est `true` : Toutes les fonctions du `data-service` (comme `fetchTrips`, `fetchUser`, etc.) retournent immédiatement les données fictives importées depuis `lib/mock-data.ts`.
-   Si `USE_MOCK_DATA` est `false` : Les fonctions tentent de récupérer les données depuis la base de données Supabase en appelant les fonctions correspondantes dans `lib/db/`. En cas d'échec de la requête à la base de données, le service est conçu pour se rabattre (fallback) sur les données mockées afin d'éviter que l'application ne plante.

## 3. État Actuel de l'Implémentation

L'intention de cette architecture centralisée est bonne, mais **l'implémentation est incomplète**.

-   **Le point fort** : La logique de basculement est bien présente dans le `data-service`, ce qui est une excellente pratique. Les opérations CRUD et l'authentification sont prévues pour fonctionner avec ce système. Le "Realtime" semble géré séparément (probablement via des hooks Supabase directs comme `use-realtime-messages`), mais bénéficiera de la connexion active à la base de données.

-   **Le point faible** : De nombreux composants et pages de l'application **ignorent le `DataProvider`** et importent les données directement depuis `lib/mock-data.ts`.

    *Exemples :* `app/dashboard/trips/page.tsx`, `app/user/[id]/page.tsx`, `components/home/recent-trips.tsx`, etc.

    **Conséquence** : Même si vous changez le flag `USE_MOCK_DATA` à `false`, une grande partie de l'interface utilisateur continuera d'afficher les données fictives.

## 4. Comment Passer à la Base de Données

### Étape 1 : Activer la connexion (le changement simple)

Pour commencer à tester l'intégration avec votre base de données (authentification, CRUD, realtime) sur les parties de l'application qui respectent l'architecture :

-   **Ouvrez le fichier** : `lib/services/data-service.ts`
-   **Modifiez la ligne 25** : changez la valeur de `USE_MOCK_DATA` de `true` à `false`.

```typescript
// Ligne 25
export const USE_MOCK_DATA = false; // Mettez false ici
```

### Étape 2 : Rendre le changement global (le vrai travail)

Pour que toute l'application utilise la base de données, vous devrez refactoriser les composants qui importent directement les données mockées.

**Action requise :**
Pour chaque fichier qui contient `import { ... } from "@/lib/mock-data"`, vous devez :
1.  Supprimer cette ligne d'import.
2.  Récupérer les données via le hook `useData()` fourni par `DataProvider`.

**Exemple de refactorisation pour `app/dashboard/trips/page.tsx` :**

```tsx
// AVANT (incorrect)
import { mockTrips, mockBookings } from "@/lib/mock-data";
// ...
const userTrips = mockTrips.filter((t) => t.userId === currentUserId);


// APRÈS (correct)
import { useData } from "@/lib/data-provider";
// ...
const { trips } = useData(); // Récupère les trajets depuis le provider
const userTrips = trips.filter((t) => t.userId === currentUserId);
```
