# TODO_DATA.md - Plan d'Harmonisation des Données KiloShare

## Vue d'ensemble

Ce document détaille toutes les tâches nécessaires pour :

1. Harmoniser l'accès aux données (suppression des mocks directs)
2. Implémenter le rôle admin
3. Sécuriser via RLS Supabase
4. Créer le système de devises avec taux de change

---

## 📌 Phase 1 : Audit des Données Mock

### Fichiers utilisant directement les mocks

| Fichier                             | Usage Mock                        | Action Requise                      |
| ----------------------------------- | --------------------------------- | ----------------------------------- |
| `lib/mock-data.ts`                  | Source de toutes les données mock | Conserver comme fallback            |
| `lib/data-service.ts`               | Import et fallback sur mocks      | ✅ Correct - utilise USE_MOCK_DATA  |
| `lib/data-provider.tsx`             | Initialise state avec mocks       | ⚠️ À corriger - initialiser avec [] |
| `app/(protected)/publish/page.tsx`  | Import `countries` directement    | ⚠️ À migrer vers table DB           |
| `app/(protected)/messages/page.tsx` | Utilise `mockConversations`       | ⚠️ À corriger - utiliser service    |

### Données mock par type

| Type          | Mock Variable       | Service Supabase                         | État          |
| ------------- | ------------------- | ---------------------------------------- | ------------- |
| Trips         | `mockTrips`         | `lib/db/trips.ts`                        | ✅ Implémenté |
| Users         | `mockUsers`         | `lib/db/profiles.ts`                     | ✅ Implémenté |
| Bookings      | `mockBookings`      | `lib/db/bookings.ts`                     | ✅ Implémenté |
| Notifications | `mockNotifications` | `lib/db/notifications.ts`                | ✅ Implémenté |
| Reviews       | `mockReviews`       | `lib/db/reviews.ts`                      | ✅ Implémenté |
| Conversations | `mockConversations` | `lib/db/messages.ts`                     | ✅ Implémenté |
| Countries     | `countries`         | ❌ Non implémenté                        | 🔴 À créer    |
| Currency      | ❌ N/A              | `scripts/010_create_currency.sql` (vide) | 🔴 À créer    |

---

## 📌 Phase 2 : Refactoring Data Provider

### Tâches

- [ ] **2.1** Modifier `data-provider.tsx` pour initialiser avec des tableaux vides au lieu de mocks

  ```tsx
  // AVANT
  const [trips, setTrips] = useState<Trip[]>(mockTrips);

  // APRÈS
  const [trips, setTrips] = useState<Trip[]>([]);
  ```

- [ ] **2.2** Supprimer l'import direct des mocks dans `data-provider.tsx`

- [ ] **2.3** Ajouter un état de chargement initial dans le contexte pour afficher des skeletons

- [ ] **2.4** Gérer le cas où `USE_MOCK_DATA = false` mais les données Supabase sont vides

### Fichier concerné : `lib/data-provider.tsx`

Lignes à modifier :

- L7 : Import des mocks → supprimer les imports non nécessaires
- L69-72 : Initialisation state → utiliser `[]` au lieu de `mockXxx`
- L79 : `mockUsers[0]` → supprimer cette ligne

---

## 📌 Phase 3 : Migration des Données Statiques

### 3.1 Table `countries` (Pays)

- [ ] Créer script SQL `011_create_countries.sql`
- [ ] Ajouter RLS (lecture publique)
- [ ] Créer service `lib/db/countries.ts`
- [ ] Migrer `app/(protected)/publish/page.tsx` pour utiliser le service

**Structure proposée :**

```sql
CREATE TABLE public.countries (
  code VARCHAR(2) PRIMARY KEY,
  name TEXT NOT NULL,
  flag TEXT,
  phone_code TEXT,
  currency VARCHAR(3)
);

-- RLS: lecture publique
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "countries_select_all" ON public.countries FOR SELECT USING (true);
```

### 3.2 Table `currencies` (Devises)

- [ ] Compléter script SQL `010_create_currency.sql`
- [ ] Ajouter RLS (lecture publique, écriture admin)
- [ ] Créer service `lib/db/currencies.ts`
- [ ] Créer Edge Function pour mise à jour des taux

**Structure proposée :**

```sql
CREATE TABLE public.currencies (
  code VARCHAR(3) PRIMARY KEY,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  rate_to_eur DECIMAL(10,6) NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.currencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "currencies_select_all" ON public.currencies FOR SELECT USING (true);
CREATE POLICY "currencies_admin_all" ON public.currencies
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Données initiales
INSERT INTO public.currencies VALUES
  ('EUR', 'Euro', '€', 1.0, NOW()),
  ('USD', 'Dollar US', '$', 1.08, NOW()),
  ('XOF', 'Franc CFA', 'CFA', 655.957, NOW()),
  ('MAD', 'Dirham marocain', 'DH', 10.85, NOW());
```

---

## 📌 Phase 4 : Système Admin

### 4.1 Modification du schéma profiles

- [ ] Ajouter colonne `role` dans `profiles`

```sql
ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
```

- [ ] Mettre à jour les RLS pour permettre aux admins de tout voir/modifier

### 4.2 Pages Admin

- [ ] Créer route `app/admin/layout.tsx` avec protection admin
- [ ] Créer dashboard admin `app/admin/page.tsx`
- [ ] Créer gestion utilisateurs `app/admin/users/page.tsx`
- [ ] Créer gestion trajets `app/admin/trips/page.tsx`
- [ ] Créer gestion devises `app/admin/currencies/page.tsx`

### 4.3 Hook useAdmin

- [ ] Créer `lib/hooks/use-admin.ts`

---

## 📌 Phase 5 : Sécurité RLS

### Audit des tables existantes

| Table         | RLS Activé | Policies                                       | État             |
| ------------- | ---------- | ---------------------------------------------- | ---------------- |
| profiles      | ✅         | select_all, insert_own, update_own, delete_own | ⚠️ Ajouter admin |
| trips         | À vérifier | À vérifier                                     | 🔴 À auditer     |
| bookings      | À vérifier | À vérifier                                     | 🔴 À auditer     |
| messages      | À vérifier | À vérifier                                     | 🔴 À auditer     |
| reviews       | À vérifier | À vérifier                                     | 🔴 À auditer     |
| notifications | À vérifier | À vérifier                                     | 🔴 À auditer     |

### Tâches RLS

- [ ] **5.1** Auditer toutes les tables pour vérifier RLS activé
- [ ] **5.2** Ajouter policies admin sur toutes les tables
- [ ] **5.3** Vérifier que les policies respectent le principe du moindre privilège

---

## 📌 Phase 6 : Système de Devises

### 6.1 Edge Function pour taux de change

- [ ] Créer `supabase/functions/update-currency-rates/index.ts`
- [ ] Intégrer API de taux (ex: exchangerate-api.com)
- [ ] Configurer cron job (1x/jour)

### 6.2 Hook useCurrency

- [ ] Créer `lib/hooks/use-currency.ts`

### 6.3 Intégration UI

- [ ] Ajouter sélecteur de devise dans settings
- [ ] Modifier tous les affichages de prix pour utiliser `formatPrice()`
- [ ] Sauvegarder préférence utilisateur dans `user_settings`

---

## 📌 Phase 7 : Nettoyage Final

- [ ] Supprimer les imports inutilisés de mock-data
- [ ] Supprimer les commentaires TODO obsolètes
- [ ] Mettre à jour la documentation
- [ ] Tester avec `USE_MOCK_DATA = false`
- [ ] Vérifier tous les console.log de debug

---

## 📅 Priorités

1. 🔴 **Critique** : Phase 2 (Data Provider) - Bloque l'utilisation réelle
2. 🟠 **Haute** : Phase 5 (RLS) - Sécurité
3. 🟡 **Moyenne** : Phase 3 (Tables statiques) + Phase 4 (Admin)
4. 🟢 **Basse** : Phase 6 (Devises) + Phase 7 (Nettoyage)
