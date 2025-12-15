(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/theme-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            setMounted(true);
            const savedTheme = localStorage.getItem("kiloshare-theme");
            if (savedTheme) {
                setTheme(savedTheme);
                document.documentElement.classList.toggle("dark", savedTheme === "dark");
            }
        }
    }["ThemeProvider.useEffect"], []);
    const handleSetTheme = (newTheme)=>{
        setTheme(newTheme);
        localStorage.setItem("kiloshare-theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    const toggleTheme = ()=>{
        handleSetTheme(theme === "light" ? "dark" : "light");
    };
    // Prevent hydration mismatch by waiting for mount, 
    // BUT we must still provide the context so useTheme doesn't throw.
    // We can just render the provider. The theme value will default to "light" 
    // until the effect runs, which is acceptable or can be handled by consumers checking strict equality if needed.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme: handleSetTheme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/theme-context.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "yJRom449FMCLHbV8U85fR4UAvks=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTranslation",
    ()=>getTranslation,
    "translations",
    ()=>translations
]);
const translations = {
    // Navigation
    "nav.home": {
        fr: "Accueil",
        en: "Home"
    },
    "nav.trips": {
        fr: "Trajets",
        en: "Trips"
    },
    "nav.publish": {
        fr: "Publier",
        en: "Publish"
    },
    "nav.messages": {
        fr: "Messages",
        en: "Messages"
    },
    "login": {
        fr: "Connexion",
        en: "Login"
    },
    "register": {
        fr: "Inscription",
        en: "Register"
    },
    "nav.dashboard": {
        fr: "Dashboard",
        en: "Dashboard"
    },
    "nav.availableTrips": {
        fr: "Trajets disponibles",
        en: "Available Trips"
    },
    "nav.howItWorks": {
        fr: "Comment ça marche",
        en: "How it works"
    },
    "nav.notifications": {
        fr: "Notifications",
        en: "Notifications"
    },
    "nav.settings": {
        fr: "Paramètres",
        en: "Settings"
    },
    "nav.profile": {
        fr: "Mon profil",
        en: "My Profile"
    },
    "nav.logout": {
        fr: "Déconnexion",
        en: "Log out"
    },
    "nav.publishAd": {
        fr: "Publier une annonce",
        en: "Post an ad"
    },
    // Hero Section
    "hero.title": {
        fr: "Envoyez vos colis partout dans le monde",
        en: "Send your packages anywhere in the world"
    },
    "hero.subtitle": {
        fr: "Connectez-vous avec des voyageurs qui ont des kilos disponibles dans leur valise. Simple, économique et sécurisé.",
        en: "Connect with travelers who have available kilos in their luggage. Simple, affordable and secure."
    },
    "hero.searchTrips": {
        fr: "Rechercher des trajets",
        en: "Search trips"
    },
    "hero.becomeTraveler": {
        fr: "Devenir voyageur",
        en: "Become a traveler"
    },
    "hero.departure": {
        fr: "Départ",
        en: "Departure"
    },
    "hero.arrival": {
        fr: "Arrivée",
        en: "Arrival"
    },
    "hero.date": {
        fr: "Date",
        en: "Date"
    },
    "hero.search": {
        fr: "Rechercher",
        en: "Search"
    },
    // Search Form
    "searchForm.chooseCountry": {
        fr: "Choisir un pays",
        en: "Choose a country"
    },
    // RecentTrips Section
    "home.recentTrips.title": {
        fr: "Trajets récents",
        en: "Recent Trips"
    },
    "home.recentTrips.subtitle": {
        fr: "Les dernières annonces publiées par nos voyageurs",
        en: "The latest ads published by our travelers"
    },
    "home.recentTrips.seeAll": {
        fr: "Voir tous les trajets",
        en: "See all trips"
    },
    // Stats Section
    "stats.activeTrips": {
        fr: "Trajets actifs",
        en: "Active trips"
    },
    "stats.deliveredPackages": {
        fr: "Colis livrés",
        en: "Delivered packages"
    },
    "stats.countries": {
        fr: "Pays desservis",
        en: "Countries served"
    },
    "stats.users": {
        fr: "Utilisateurs actifs",
        en: "Active users"
    },
    // How It Works
    "howItWorks.title": {
        fr: "Comment ça marche",
        en: "How it works"
    },
    "howItWorks.subtitle": {
        fr: "En 3 étapes simples, envoyez vos colis avec des voyageurs de confiance",
        en: "In 3 simple steps, send your packages with trusted travelers"
    },
    "howItWorks.step1.title": {
        fr: "Trouvez un voyageur",
        en: "Find a traveler"
    },
    "howItWorks.step1.desc": {
        fr: "Parcourez les trajets disponibles et trouvez un voyageur qui correspond à votre besoin.",
        en: "Browse available trips and find a traveler that matches your needs."
    },
    "howItWorks.step2.title": {
        fr: "Contactez et réservez",
        en: "Contact and book"
    },
    "howItWorks.step2.desc": {
        fr: "Discutez avec le voyageur, convenez des détails et réservez vos kilos en toute sécurité.",
        en: "Chat with the traveler, agree on details and book your kilos securely."
    },
    "howItWorks.step3.title": {
        fr: "Envoyez votre colis",
        en: "Send your package"
    },
    "howItWorks.step3.desc": {
        fr: "Remettez votre colis au voyageur et suivez sa livraison jusqu'à destination.",
        en: "Hand over your package to the traveler and track its delivery to destination."
    },
    // Trust Section
    "trust.title": {
        fr: "Voyagez et envoyez en toute confiance",
        en: "Travel and send with confidence"
    },
    "trust.subtitle": {
        fr: "Notre plateforme garantit sécurité et transparence à chaque étape",
        en: "Our platform guarantees security and transparency at every step"
    },
    "trust.verified.title": {
        fr: "Utilisateurs vérifiés",
        en: "Verified users"
    },
    "trust.verified.desc": {
        fr: "Tous nos utilisateurs passent par un processus de vérification d'identité strict.",
        en: "All our users go through a strict identity verification process."
    },
    "trust.payment.title": {
        fr: "Paiement sécurisé",
        en: "Secure payment"
    },
    "trust.payment.desc": {
        fr: "Vos paiements sont protégés et libérés uniquement après la livraison confirmée.",
        en: "Your payments are protected and released only after confirmed delivery."
    },
    "trust.support.title": {
        fr: "Support 24/7",
        en: "24/7 Support"
    },
    "trust.support.desc": {
        fr: "Notre équipe est disponible à tout moment pour vous assister.",
        en: "Our team is available at all times to assist you."
    },
    "trust.insurance.title": {
        fr: "Assurance incluse",
        en: "Insurance included"
    },
    "trust.insurance.desc": {
        fr: "Chaque envoi est couvert par notre assurance en cas de problème.",
        en: "Each shipment is covered by our insurance in case of issues."
    },
    // Testimonials
    "testimonials.title": {
        fr: "Ce que disent nos utilisateurs",
        en: "What our users say"
    },
    "testimonials.subtitle": {
        fr: "Des milliers de personnes font confiance à KiloShare pour leurs envois",
        en: "Thousands of people trust KiloShare for their shipments"
    },
    // CTA Section
    "cta.title": {
        fr: "Prêt à commencer ?",
        en: "Ready to get started?"
    },
    "cta.subtitle": {
        fr: "Rejoignez des milliers d'utilisateurs qui font confiance à KiloShare",
        en: "Join thousands of users who trust KiloShare"
    },
    "cta.createAccount": {
        fr: "Créer un compte gratuit",
        en: "Create free account"
    },
    "cta.learnMore": {
        fr: "En savoir plus",
        en: "Learn more"
    },
    // Sponsors
    "sponsors.title": {
        fr: "Ils nous font confiance",
        en: "They trust us"
    },
    // Footer
    "footer.description": {
        fr: "La plateforme de confiance pour envoyer vos colis avec des voyageurs du monde entier.",
        en: "The trusted platform to send your packages with travelers from around the world."
    },
    "footer.company": {
        fr: "Entreprise",
        en: "Company"
    },
    "footer.about": {
        fr: "À propos",
        en: "About"
    },
    "footer.careers": {
        fr: "Carrières",
        en: "Careers"
    },
    "footer.press": {
        fr: "Presse",
        en: "Press"
    },
    "footer.support": {
        fr: "Support",
        en: "Support"
    },
    "footer.help": {
        fr: "Centre d'aide",
        en: "Help Center"
    },
    "footer.contact": {
        fr: "Contact",
        en: "Contact"
    },
    "footer.faq": {
        fr: "FAQ",
        en: "FAQ"
    },
    "footer.legal": {
        fr: "Légal",
        en: "Legal"
    },
    "footer.privacy": {
        fr: "Confidentialité",
        en: "Privacy"
    },
    "footer.terms": {
        fr: "CGU",
        en: "Terms"
    },
    "footer.cookies": {
        fr: "Cookies",
        en: "Cookies"
    },
    "footer.rights": {
        fr: "Tous droits réservés.",
        en: "All rights reserved."
    },
    // Trip Card & Details
    "trip.availableKg": {
        fr: "kg disponibles",
        en: "kg available"
    },
    "trip.perKg": {
        fr: "/kg",
        en: "/kg"
    },
    "trip.verified": {
        fr: "Vérifié",
        en: "Verified"
    },
    "trip.seeDetails": {
        fr: "Voir les détails",
        en: "See details"
    },
    "trip.contact": {
        fr: "Contacter",
        en: "Contact"
    },
    "trip.contactWhatsApp": {
        fr: "Contacter sur WhatsApp",
        en: "Contact on WhatsApp"
    },
    "trip.bookKilos": {
        fr: "Réserver des kilos",
        en: "Book kilos"
    },
    "trip.departureDate": {
        fr: "Date de départ",
        en: "Departure date"
    },
    "trip.availableWeight": {
        fr: "Poids disponible",
        en: "Available weight"
    },
    "trip.pricePerKg": {
        fr: "Prix par kilo",
        en: "Price per kilo"
    },
    "trip.acceptedItems": {
        fr: "Articles acceptés",
        en: "Accepted items"
    },
    "trip.aboutTraveler": {
        fr: "À propos du voyageur",
        en: "About the traveler"
    },
    "trip.memberSince": {
        fr: "Membre depuis",
        en: "Member since"
    },
    "trip.completedTrips": {
        fr: "trajets effectués",
        en: "completed trips"
    },
    "trip.reviews": {
        fr: "avis",
        en: "reviews"
    },
    "trip.viewProfile": {
        fr: "Voir le profil complet",
        en: "View full profile"
    },
    // Trip Card
    "trip.card.available": {
        fr: "Disponible",
        en: "Available"
    },
    "trip.card.reviews": {
        fr: "avis",
        en: "reviews"
    },
    "trip.card.view": {
        fr: "Voir",
        en: "View"
    },
    // Trip List
    "trip.list.availableTrips": {
        fr: "trajets disponibles",
        en: "available trips"
    },
    "trip.list.filters": {
        fr: "Filtres",
        en: "Filters"
    },
    "trip.list.noTripsFound": {
        fr: "Aucun trajet trouvé",
        en: "No trips found"
    },
    "trip.list.noTripsFoundDesc": {
        fr: "Essayez de modifier vos critères de recherche",
        en: "Try changing your search criteria"
    },
    // Trip Filters
    "trip.filters.title": {
        fr: "Filtrer les trajets",
        en: "Filter trips"
    },
    "trip.filters.departure": {
        fr: "Départ",
        en: "Departure"
    },
    "trip.filters.arrival": {
        fr: "Arrivée",
        en: "Arrival"
    },
    "trip.filters.allCountries": {
        fr: "Tous les pays",
        en: "All countries"
    },
    "trip.filters.minKg": {
        fr: "Kilos minimum",
        en: "Minimum kilos"
    },
    "trip.filters.minKgPlaceholder": {
        fr: "Ex: 5",
        en: "e.g., 5"
    },
    "trip.filters.maxPrice": {
        fr: "Prix max (€/kg)",
        en: "Max price (€/kg)"
    },
    "trip.filters.maxPricePlaceholder": {
        fr: "Ex: 15",
        en: "e.g., 15"
    },
    "trip.filters.reset": {
        fr: "Réinitialiser",
        en: "Reset"
    },
    "trip.filters.apply": {
        fr: "Appliquer",
        en: "Apply"
    },
    // Messages
    "messages.title": {
        fr: "Messages",
        en: "Messages"
    },
    "messages.search": {
        fr: "Rechercher une conversation",
        en: "Search a conversation"
    },
    "messages.noConversation": {
        fr: "Sélectionnez une conversation pour commencer",
        en: "Select a conversation to start"
    },
    "messages.typeMessage": {
        fr: "Écrivez votre message...",
        en: "Write your message..."
    },
    "messages.tripInfo": {
        fr: "Infos trajet",
        en: "Trip info"
    },
    "messages.archive": {
        fr: "Archiver",
        en: "Archive"
    },
    "messages.delete": {
        fr: "Supprimer",
        en: "Delete"
    },
    // Dashboard
    "dashboard.title": {
        fr: "Tableau de bord",
        en: "Dashboard"
    },
    "dashboard.welcome": {
        fr: "Bienvenue",
        en: "Welcome"
    },
    "dashboard.overview": {
        fr: "Vue d'ensemble",
        en: "Overview"
    },
    "dashboard.myTrips": {
        fr: "Mes trajets",
        en: "My trips"
    },
    "dashboard.bookings": {
        fr: "Réservations",
        en: "Bookings"
    },
    "dashboard.analytics": {
        fr: "Statistiques",
        en: "Analytics"
    },
    "dashboard.earnings": {
        fr: "Revenus",
        en: "Earnings"
    },
    "dashboard.activeTrips": {
        fr: "Trajets actifs",
        en: "Active trips"
    },
    "dashboard.totalBookings": {
        fr: "Réservations totales",
        en: "Total bookings"
    },
    "dashboard.totalRevenue": {
        fr: "Revenus totaux",
        en: "Total revenue"
    },
    "dashboard.rating": {
        fr: "Note moyenne",
        en: "Average rating"
    },
    "dashboard.recentActivity": {
        fr: "Activité récente",
        en: "Recent activity"
    },
    "dashboard.seeAll": {
        fr: "Voir tout",
        en: "See all"
    },
    "dashboard.noTrips": {
        fr: "Aucun trajet actif",
        en: "No active trips"
    },
    "dashboard.createTrip": {
        fr: "Créer un trajet",
        en: "Create a trip"
    },
    // Dashboard Client
    "dashboard.client.hello": {
        fr: "Bonjour",
        en: "Hello"
    },
    "dashboard.client.welcome": {
        fr: "Voici un aperçu de votre activité",
        en: "Here is an overview of your activity"
    },
    "dashboard.client.publishTrip": {
        fr: "Publier un trajet",
        en: "Publish a trip"
    },
    "dashboard.client.activeTrips": {
        fr: "Trajets actifs",
        en: "Active trips"
    },
    "dashboard.client.totalBookings": {
        fr: "Réservations totales",
        en: "Total bookings"
    },
    "dashboard.client.seeAll": {
        fr: "Voir tout",
        en: "See all"
    },
    "dashboard.client.noActiveTrips": {
        fr: "Aucun trajet actif",
        en: "No active trips"
    },
    "dashboard.client.publishFirstTrip": {
        fr: "Publiez votre premier trajet pour commencer",
        en: "Post your first trip to get started"
    },
    "dashboard.client.quickSummary": {
        fr: "Résumé rapide",
        en: "Quick summary"
    },
    "dashboard.client.pending": {
        fr: "En attente",
        en: "Pending"
    },
    "dashboard.client.confirmed": {
        fr: "Confirmés",
        en: "Confirmed"
    },
    "dashboard.client.growth": {
        fr: "Croissance",
        en: "Growth"
    },
    "dashboard.client.notifications": {
        fr: "Notifications",
        en: "Notifications"
    },
    // Dashboard Analytics
    "dashboard.analytics.title": {
        fr: "Statistiques",
        en: "Analytics"
    },
    "dashboard.analytics.subtitle": {
        fr: "Analysez les performances de vos trajets",
        en: "Analyze the performance of your trips"
    },
    "dashboard.analytics.totalViews": {
        fr: "Vues totales",
        en: "Total views"
    },
    "dashboard.analytics.inquiries": {
        fr: "Demandes reçues",
        en: "Inquiries received"
    },
    "dashboard.analytics.bookings": {
        fr: "Réservations",
        en: "Bookings"
    },
    "dashboard.analytics.revenue": {
        fr: "Revenus",
        en: "Revenue"
    },
    "dashboard.analytics.monthlyRevenue": {
        fr: "Revenus mensuels",
        en: "Monthly revenue"
    },
    "dashboard.analytics.monthlyRevenueDesc": {
        fr: "Évolution de vos gains sur les 6 derniers mois",
        en: "Your earnings trend over the last 6 months"
    },
    "dashboard.analytics.conversionMetrics": {
        fr: "Métriques de conversion",
        en: "Conversion metrics"
    },
    "dashboard.analytics.adPerformance": {
        fr: "Performance de vos annonces",
        en: "Your ad performance"
    },
    "dashboard.analytics.conversionRate": {
        fr: "Taux de conversion",
        en: "Conversion rate"
    },
    "dashboard.analytics.avgRating": {
        fr: "Note moyenne",
        en: "Average rating"
    },
    "dashboard.analytics.viewsToInquiries": {
        fr: "Vues → Demandes",
        en: "Views → Inquiries"
    },
    "dashboard.analytics.inquiriesToBookings": {
        fr: "Demandes → Réservations",
        en: "Inquiries → Bookings"
    },
    "dashboard.analytics.tripPerformance": {
        fr: "Performance par trajet",
        en: "Performance by trip"
    },
    "dashboard.analytics.tripPerformanceDesc": {
        fr: "Détail des statistiques pour chaque trajet",
        en: "Detailed statistics for each trip"
    },
    "dashboard.analytics.trip": {
        fr: "Trajet",
        en: "Trip"
    },
    "dashboard.analytics.views": {
        fr: "Vues",
        en: "Views"
    },
    "dashboard.analytics.conversion": {
        fr: "Conversion",
        en: "Conversion"
    },
    // Dashboard Sidebar
    "dashboard.sidebar.help": {
        fr: "Aide",
        en: "Help"
    },
    "dashboard.sidebar.newTrip": {
        fr: "Nouveau trajet",
        en: "New trip"
    },
    // Dashboard > My Trips
    "dashboard.trips.title": {
        fr: "Mes trajets",
        en: "My Trips"
    },
    "dashboard.trips.subtitle": {
        fr: "Gérez tous vos trajets publiés",
        en: "Manage all your published trips"
    },
    "dashboard.trips.new": {
        fr: "Nouveau trajet",
        en: "New Trip"
    },
    "dashboard.trips.active": {
        fr: "Actifs",
        en: "Active"
    },
    "dashboard.trips.completed": {
        fr: "Terminés",
        en: "Completed"
    },
    "dashboard.trips.cancelled": {
        fr: "Annulés",
        en: "Cancelled"
    },
    "dashboard.trips.noActive": {
        fr: "Aucun trajet actif",
        en: "No active trips"
    },
    "dashboard.trips.noActiveDesc": {
        fr: "Publiez un trajet pour commencer à recevoir des demandes",
        en: "Post a trip to start receiving requests"
    },
    "dashboard.trips.publish": {
        fr: "Publier un trajet",
        en: "Publish a trip"
    },
    "dashboard.trips.noCompleted": {
        fr: "Aucun trajet terminé",
        en: "No completed trips"
    },
    "dashboard.trips.noCompletedDesc": {
        fr: "Vos trajets terminés apparaîtront ici",
        en: "Your completed trips will appear here"
    },
    "dashboard.trips.noCancelled": {
        fr: "Aucun trajet annulé",
        en: "No cancelled trips"
    },
    "dashboard.trips.noCancelledDesc": {
        fr: "Vos trajets annulés apparaîtront ici",
        en: "Your cancelled trips will appear here"
    },
    // Dashboard > Bookings
    "dashboard.bookings.title": {
        fr: "Réservations",
        en: "Bookings"
    },
    "dashboard.bookings.subtitleReceived": {
        fr: "Gérez les demandes de réservation sur vos trajets",
        en: "Manage booking requests on your trips"
    },
    "dashboard.bookings.subtitleSent": {
        fr: "Suivez vos demandes d'envoi de colis",
        en: "Track your package sending requests"
    },
    "dashboard.bookings.mySales": {
        fr: "Mes Ventes",
        en: "My Sales"
    },
    "dashboard.bookings.myPurchases": {
        fr: "Mes Achats",
        en: "My Purchases"
    },
    "dashboard.bookings.search": {
        fr: "Rechercher...",
        en: "Search..."
    },
    "dashboard.bookings.all": {
        fr: "Toutes",
        en: "All"
    },
    "dashboard.bookings.pending": {
        fr: "En attente",
        en: "Pending"
    },
    "dashboard.bookings.active": {
        fr: "Actives",
        en: "Active"
    },
    "dashboard.bookings.completed": {
        fr: "Terminées",
        en: "Completed"
    },
    "dashboard.bookings.status.pending": {
        fr: "En attente",
        en: "Pending"
    },
    "dashboard.bookings.status.confirmed": {
        fr: "Confirmé",
        en: "Confirmed"
    },
    "dashboard.bookings.status.in_transit": {
        fr: "En transit",
        en: "In transit"
    },
    "dashboard.bookings.status.delivered": {
        fr: "Livré",
        en: "Delivered"
    },
    "dashboard.bookings.status.cancelled": {
        fr: "Annulé",
        en: "Cancelled"
    },
    "dashboard.bookings.reviews": {
        fr: "avis",
        en: "reviews"
    },
    "dashboard.bookings.trip": {
        fr: "Trajet",
        en: "Trip"
    },
    "dashboard.bookings.unknownTrip": {
        fr: "Trajet inconnu",
        en: "Unknown trip"
    },
    "dashboard.bookings.viewDetails": {
        fr: "Voir les détails",
        en: "View details"
    },
    "dashboard.bookings.sendMessage": {
        fr: "Envoyer un message",
        en: "Send message"
    },
    "dashboard.bookings.accept": {
        fr: "Accepter",
        en: "Accept"
    },
    "dashboard.bookings.reject": {
        fr: "Refuser",
        en: "Reject"
    },
    "dashboard.bookings.packageContent": {
        fr: "Contenu du colis",
        en: "Package content"
    },
    "dashboard.bookings.yourRequest": {
        fr: "Votre demande",
        en: "Your request"
    },
    "dashboard.bookings.kgRequested": {
        fr: "Kilos demandés",
        en: "Kilos requested"
    },
    "dashboard.bookings.kgConfirmed": {
        fr: "Kilos confirmés",
        en: "Kilos confirmed"
    },
    "dashboard.bookings.totalPrice": {
        fr: "Prix total",
        en: "Total price"
    },
    "dashboard.bookings.contact": {
        fr: "Contacter",
        en: "Contact"
    },
    "dashboard.bookings.noBookings": {
        fr: "Aucune réservation",
        en: "No bookings"
    },
    "dashboard.bookings.noMatch": {
        fr: "Aucune réservation ne correspond à votre recherche",
        en: "No bookings match your search"
    },
    "dashboard.bookings.noReceived": {
        fr: "Vous n'avez pas reçu de demandes de réservation",
        en: "You have not received any booking requests"
    },
    "dashboard.bookings.noSent": {
        fr: "Vous n'avez pas encore fait de réservation",
        en: "You have not made any bookings yet"
    },
    // Dashboard > Earnings
    "dashboard.earnings.title": {
        fr: "Revenus",
        en: "Earnings"
    },
    "dashboard.earnings.subtitle": {
        fr: "Gérez vos gains et retraits",
        en: "Manage your earnings and withdrawals"
    },
    "dashboard.earnings.withdraw": {
        fr: "Retirer des fonds",
        en: "Withdraw funds"
    },
    "dashboard.earnings.available": {
        fr: "Disponible",
        en: "Available"
    },
    "dashboard.earnings.availableDesc": {
        fr: "Solde disponible pour retrait",
        en: "Balance available for withdrawal"
    },
    "dashboard.earnings.pendingDelivery": {
        fr: "En attente de livraison",
        en: "Pending delivery"
    },
    "dashboard.earnings.totalEarnings": {
        fr: "Total des gains",
        en: "Total earnings"
    },
    "dashboard.earnings.history": {
        fr: "Historique des transactions",
        en: "Transaction history"
    },
    "dashboard.earnings.historyDesc": {
        fr: "Vos dernières transactions",
        en: "Your latest transactions"
    },
    "dashboard.earnings.export": {
        fr: "Exporter",
        en: "Export"
    },
    "dashboard.earnings.delivery": {
        fr: "Livraison",
        en: "Delivery"
    },
    "dashboard.earnings.statusCompleted": {
        fr: "Complété",
        en: "Completed"
    },
    "dashboard.earnings.statusPending": {
        fr: "En cours",
        en: "Pending"
    },
    "dashboard.earnings.paymentMethods": {
        fr: "Méthodes de paiement",
        en: "Payment methods"
    },
    "dashboard.earnings.paymentMethodsDesc": {
        fr: "Gérez vos moyens de retrait",
        en: "Manage your withdrawal methods"
    },
    "dashboard.earnings.visaCard": {
        fr: "Carte Visa",
        en: "Visa Card"
    },
    "dashboard.earnings.default": {
        fr: "Par défaut",
        en: "Default"
    },
    "dashboard.earnings.bankAccount": {
        fr: "Compte bancaire",
        en: "Bank account"
    },
    "dashboard.earnings.addMethod": {
        fr: "Ajouter une méthode",
        en: "Add method"
    },
    // Messages
    "messages.title": {
        fr: "Messages",
        en: "Messages"
    },
    "messages.search": {
        fr: "Rechercher une conversation...",
        en: "Search for a conversation..."
    },
    "messages.loading": {
        fr: "Chargement...",
        en: "Loading..."
    },
    "messages.noConversationFound": {
        fr: "Aucune conversation trouvée",
        en: "No conversation found"
    },
    "messages.noConversations": {
        fr: "Aucune conversation",
        en: "No conversations"
    },
    "messages.you": {
        fr: "Vous :",
        en: "You:"
    },
    "messages.mute": {
        fr: "Mettre en sourdine",
        en: "Mute"
    },
    "messages.archive": {
        fr: "Archiver",
        en: "Archive"
    },
    "messages.delete": {
        fr: "Supprimer",
        en: "Delete"
    },
    "messages.kgAvailable": {
        fr: "kg dispo",
        en: "kg avail."
    },
    "messages.noMessages": {
        fr: "Aucun message",
        en: "No messages"
    },
    "messages.startConversation": {
        fr: "Commencez la conversation !",
        en: "Start the conversation!"
    },
    "messages.writeMessage": {
        fr: "Écrivez votre message...",
        en: "Write your message..."
    },
    "messages.yourMessages": {
        fr: "Vos messages",
        en: "Your messages"
    },
    "messages.selectConversation": {
        fr: "Sélectionnez une conversation pour commencer à discuter avec un voyageur ou un expéditeur",
        en: "Select a conversation to start chatting with a traveler or a sender"
    },
    "messages.online": {
        fr: "En ligne",
        en: "Online"
    },
    // Profile
    "profile.title": {
        fr: "Mon profil",
        en: "My Profile"
    },
    "profile.edit": {
        fr: "Modifier le profil",
        en: "Edit profile"
    },
    "profile.verification": {
        fr: "Vérification",
        en: "Verification"
    },
    "profile.stats": {
        fr: "Statistiques",
        en: "Statistics"
    },
    "profile.trips": {
        fr: "Trajets",
        en: "Trips"
    },
    "profile.reviews": {
        fr: "Avis",
        en: "Reviews"
    },
    "profile.badges": {
        fr: "Badges",
        en: "Badges"
    },
    "profile.about": {
        fr: "À propos",
        en: "About"
    },
    "profile.languages": {
        fr: "Langues parlées",
        en: "Languages spoken"
    },
    "profile.verifiedProfile": {
        fr: "Profil vérifié",
        en: "Verified profile"
    },
    "profile.leaveReview": {
        fr: "Laisser un avis",
        en: "Leave a review"
    },
    "profile.contactUser": {
        fr: "Contacter",
        en: "Contact"
    },
    // Reviews
    "reviews.title": {
        fr: "Avis",
        en: "Reviews"
    },
    "reviews.received": {
        fr: "Avis reçus",
        en: "Reviews received"
    },
    "reviews.given": {
        fr: "Avis donnés",
        en: "Reviews given"
    },
    "reviews.leaveReview": {
        fr: "Laisser un avis",
        en: "Leave a review"
    },
    "reviews.selectUser": {
        fr: "Sélectionner un utilisateur",
        en: "Select a user"
    },
    "reviews.writeReview": {
        fr: "Écrivez votre avis...",
        en: "Write your review..."
    },
    "reviews.submit": {
        fr: "Envoyer l'avis",
        en: "Submit review"
    },
    "reviews.thankYou": {
        fr: "Merci pour votre avis !",
        en: "Thank you for your review!"
    },
    "reviews.asBuyer": {
        fr: "En tant qu'expéditeur",
        en: "As a sender"
    },
    "reviews.asSeller": {
        fr: "En tant que voyageur",
        en: "As a traveler"
    },
    // Notifications
    "notifications.title": {
        fr: "Notifications",
        en: "Notifications"
    },
    "notifications.all": {
        fr: "Toutes",
        en: "All"
    },
    "notifications.unread": {
        fr: "Non lues",
        en: "Unread"
    },
    "notifications.markAllRead": {
        fr: "Tout marquer comme lu",
        en: "Mark all as read"
    },
    "notifications.empty": {
        fr: "Aucune notification",
        en: "No notifications"
    },
    // Settings
    "settings.title": {
        fr: "Paramètres",
        en: "Settings"
    },
    "settings.subtitle": {
        fr: "Gérez vos préférences et votre compte",
        en: "Manage your preferences and account"
    },
    "settings.notifications": {
        fr: "Notifications",
        en: "Notifications"
    },
    "settings.privacy": {
        fr: "Confidentialité",
        en: "Privacy"
    },
    "settings.preferences": {
        fr: "Préférences",
        en: "Preferences"
    },
    "settings.security": {
        fr: "Sécurité",
        en: "Security"
    },
    "settings.feedback": {
        fr: "Feedback",
        en: "Feedback"
    },
    "settings.notificationChannels": {
        fr: "Canaux de notification",
        en: "Notification channels"
    },
    "settings.notificationChannelsDesc": {
        fr: "Choisissez comment vous souhaitez être notifié",
        en: "Choose how you want to be notified"
    },
    "settings.email": {
        fr: "Email",
        en: "Email"
    },
    "settings.emailNotif": {
        fr: "Recevoir les notifications par email",
        en: "Receive notifications by email"
    },
    "settings.push": {
        fr: "Push",
        en: "Push"
    },
    "settings.pushNotif": {
        fr: "Notifications push sur mobile",
        en: "Push notifications on mobile"
    },
    "settings.sms": {
        fr: "SMS",
        en: "SMS"
    },
    "settings.smsNotif": {
        fr: "Notifications par SMS",
        en: "Notifications by SMS"
    },
    "settings.notificationTypes": {
        fr: "Types de notifications",
        en: "Notification types"
    },
    "settings.notificationTypesDesc": {
        fr: "Personnalisez les notifications que vous recevez",
        en: "Customize the notifications you receive"
    },
    "settings.newBookings": {
        fr: "Nouvelles réservations",
        en: "New bookings"
    },
    "settings.newBookingsDesc": {
        fr: "Quand quelqu'un réserve vos kilos",
        en: "When someone books your kilos"
    },
    "settings.messagesNotif": {
        fr: "Messages",
        en: "Messages"
    },
    "settings.messagesNotifDesc": {
        fr: "Nouveaux messages reçus",
        en: "New messages received"
    },
    "settings.reviewsNotif": {
        fr: "Avis",
        en: "Reviews"
    },
    "settings.reviewsNotifDesc": {
        fr: "Nouveaux avis sur votre profil",
        en: "New reviews on your profile"
    },
    "settings.reminders": {
        fr: "Rappels",
        en: "Reminders"
    },
    "settings.remindersDesc": {
        fr: "Rappels de trajets à venir",
        en: "Upcoming trip reminders"
    },
    "settings.promotions": {
        fr: "Promotions",
        en: "Promotions"
    },
    "settings.promotionsDesc": {
        fr: "Offres et actualités KiloShare",
        en: "KiloShare offers and news"
    },
    "settings.profileVisibility": {
        fr: "Visibilité du profil",
        en: "Profile visibility"
    },
    "settings.profileVisibilityDesc": {
        fr: "Contrôlez ce que les autres peuvent voir",
        en: "Control what others can see"
    },
    "settings.showPhone": {
        fr: "Afficher mon téléphone",
        en: "Show my phone"
    },
    "settings.showPhoneDesc": {
        fr: "Visible sur votre profil public",
        en: "Visible on your public profile"
    },
    "settings.showEmail": {
        fr: "Afficher mon email",
        en: "Show my email"
    },
    "settings.showEmailDesc": {
        fr: "Visible sur votre profil public",
        en: "Visible on your public profile"
    },
    "settings.lastSeen": {
        fr: "Dernière connexion",
        en: "Last seen"
    },
    "settings.lastSeenDesc": {
        fr: "Afficher quand vous étiez en ligne",
        en: "Show when you were online"
    },
    "settings.searchEngines": {
        fr: "Indexation moteurs de recherche",
        en: "Search engine indexing"
    },
    "settings.searchEnginesDesc": {
        fr: "Permettre à Google de référencer votre profil",
        en: "Allow Google to index your profile"
    },
    "settings.personalData": {
        fr: "Données personnelles",
        en: "Personal data"
    },
    "settings.personalDataDesc": {
        fr: "Gérez vos données",
        en: "Manage your data"
    },
    "settings.downloadData": {
        fr: "Télécharger mes données",
        en: "Download my data"
    },
    "settings.deleteAccount": {
        fr: "Supprimer mon compte",
        en: "Delete my account"
    },
    "settings.languageRegion": {
        fr: "Langue et région",
        en: "Language and region"
    },
    "settings.language": {
        fr: "Langue",
        en: "Language"
    },
    "settings.currency": {
        fr: "Devise",
        en: "Currency"
    },
    "settings.timezone": {
        fr: "Fuseau horaire",
        en: "Timezone"
    },
    "settings.appearance": {
        fr: "Apparence",
        en: "Appearance"
    },
    "settings.darkMode": {
        fr: "Mode sombre",
        en: "Dark mode"
    },
    "settings.darkModeOn": {
        fr: "Thème sombre activé",
        en: "Dark theme enabled"
    },
    "settings.darkModeOff": {
        fr: "Thème clair activé",
        en: "Light theme enabled"
    },
    "settings.password": {
        fr: "Mot de passe",
        en: "Password"
    },
    "settings.passwordDesc": {
        fr: "Modifiez votre mot de passe",
        en: "Change your password"
    },
    "settings.currentPassword": {
        fr: "Mot de passe actuel",
        en: "Current password"
    },
    "settings.newPassword": {
        fr: "Nouveau mot de passe",
        en: "New password"
    },
    "settings.confirmPassword": {
        fr: "Confirmer le mot de passe",
        en: "Confirm password"
    },
    "settings.updatePassword": {
        fr: "Mettre à jour le mot de passe",
        en: "Update password"
    },
    "settings.twoFactor": {
        fr: "Authentification à deux facteurs",
        en: "Two-factor authentication"
    },
    "settings.twoFactorDesc": {
        fr: "Ajoutez une couche de sécurité supplémentaire",
        en: "Add an extra layer of security"
    },
    "settings.twoFactorDisabled": {
        fr: "2FA désactivé",
        en: "2FA disabled"
    },
    "settings.twoFactorEnable": {
        fr: "Activer",
        en: "Enable"
    },
    "settings.activeSessions": {
        fr: "Sessions actives",
        en: "Active sessions"
    },
    "settings.activeSessionsDesc": {
        fr: "Gérez vos connexions actives",
        en: "Manage your active sessions"
    },
    "settings.currentSession": {
        fr: "Session actuelle",
        en: "Current session"
    },
    "settings.logoutAll": {
        fr: "Déconnecter toutes les autres sessions",
        en: "Log out all other sessions"
    },
    "settings.feedbackTitle": {
        fr: "Votre avis sur KiloShare",
        en: "Your feedback on KiloShare"
    },
    "settings.feedbackDesc": {
        fr: "Aidez-nous à améliorer votre expérience",
        en: "Help us improve your experience"
    },
    "settings.rateApp": {
        fr: "Notez l'application",
        en: "Rate the app"
    },
    "settings.feedbackCategory": {
        fr: "Catégorie",
        en: "Category"
    },
    "settings.categoryGeneral": {
        fr: "Général",
        en: "General"
    },
    "settings.categoryBug": {
        fr: "Bug / Problème",
        en: "Bug / Issue"
    },
    "settings.categorySuggestion": {
        fr: "Suggestion",
        en: "Suggestion"
    },
    "settings.categoryComplaint": {
        fr: "Réclamation",
        en: "Complaint"
    },
    "settings.feedbackPlaceholder": {
        fr: "Partagez vos idées, suggestions ou problèmes rencontrés...",
        en: "Share your ideas, suggestions or issues..."
    },
    "settings.submitFeedback": {
        fr: "Envoyer le feedback",
        en: "Submit feedback"
    },
    "settings.feedbackThanks": {
        fr: "Merci pour votre feedback !",
        en: "Thank you for your feedback!"
    },
    "settings.feedbackReceived": {
        fr: "Votre avis nous aide à améliorer KiloShare.",
        en: "Your feedback helps us improve KiloShare."
    },
    // Publish
    "publish.title": {
        fr: "Publier un trajet",
        en: "Publish a trip"
    },
    "publish.subtitle": {
        fr: "Partagez vos kilos disponibles avec la communauté",
        en: "Share your available kilos with the community"
    },
    "publish.step.route": {
        fr: "Trajet",
        en: "Route"
    },
    "publish.step.details": {
        fr: "Détails",
        en: "Details"
    },
    "publish.step.confirmation": {
        fr: "Confirmation",
        en: "Confirmation"
    },
    "publish.departure": {
        fr: "Départ",
        en: "Departure"
    },
    "publish.arrival": {
        fr: "Arrivée",
        en: "Arrival"
    },
    "publish.country": {
        fr: "Pays",
        en: "Country"
    },
    "publish.city": {
        fr: "Ville",
        en: "City"
    },
    "publish.select": {
        fr: "Sélectionner",
        en: "Select"
    },
    "publish.departureDate": {
        fr: "Date de départ",
        en: "Departure date"
    },
    "publish.availableKg": {
        fr: "Kilos disponibles",
        en: "Available Kilos"
    },
    "publish.exampleKg": {
        fr: "Ex: 15",
        en: "e.g., 15"
    },
    "publish.pricePerKg": {
        fr: "Prix par kilo (€)",
        en: "Price per kilo (€)"
    },
    "publish.examplePrice": {
        fr: "Ex: 10",
        en: "e.g., 10"
    },
    "publish.description": {
        fr: "Description (optionnel)",
        en: "Description (optional)"
    },
    "publish.descriptionPlaceholder": {
        fr: "Décrivez votre trajet, les conditions de remise, etc.",
        en: "Describe your trip, drop-off conditions, etc."
    },
    "publish.acceptedItems": {
        fr: "Colis généralement acceptés (optionnel)",
        en: "Generally accepted items (optional)"
    },
    "publish.acceptedItemsPlaceholder": {
        fr: "Ex: Vêtements, livres, documents, ...",
        en: "e.g., Clothes, books, documents, ..."
    },
    "publish.rejectedItems": {
        fr: "Colis refusés (optionnel)",
        en: "Rejected items (optional)"
    },
    "publish.rejectedItemsPlaceholder": {
        fr: "Ex: Alcool, produits illégaux, animaux, ...",
        en: "e.g., Alcohol, illegal products, animals, ..."
    },
    "publish.commaSeparated": {
        fr: "Séparez les éléments par une virgule.",
        en: "Separate items with a comma."
    },
    "publish.infoBox": {
        fr: "Soyez précis dans votre description pour attirer plus de demandes. Indiquez les types de colis acceptés et refusés.",
        en: "Be specific in your description to attract more requests. Indicate the types of packages accepted and refused."
    },
    "publish.summary.title": {
        fr: "Récapitulatif",
        en: "Summary"
    },
    "publish.summary.subtitle": {
        fr: "Vérifiez les informations de votre trajet",
        en: "Check your trip information"
    },
    "publish.summary.departureCity": {
        fr: "Ville de départ",
        en: "Departure city"
    },
    "publish.summary.arrivalCity": {
        fr: "Ville d'arrivée",
        en: "Arrival city"
    },
    "publish.summary.date": {
        fr: "Date",
        en: "Date"
    },
    "publish.summary.kilos": {
        fr: "Kilos",
        en: "Kilos"
    },
    "publish.summary.price": {
        fr: "Prix",
        en: "Price"
    },
    "publish.publishButton": {
        fr: "Publier",
        en: "Publish"
    },
    "publish.accessDenied.title": {
        fr: "Accès refusé",
        en: "Access Denied"
    },
    "publish.accessDenied.subtitle": {
        fr: "Vous devez être connecté pour publier un trajet.",
        en: "You must be logged in to publish a trip."
    },
    "publish.error.mustBeLoggedIn": {
        fr: "Vous devez être connecté pour publier un trajet.",
        en: "You must be logged in to publish a trip."
    },
    "publish.error.generic": {
        fr: "Une erreur est survenue lors de la publication.",
        en: "An error occurred during publication."
    },
    "publish.success.tripPublished": {
        fr: "Trajet publié avec succès !",
        en: "Trip published successfully!"
    },
    // Auth
    "auth.login": {
        fr: "Connexion",
        en: "Login"
    },
    "auth.register": {
        fr: "Inscription",
        en: "Register"
    },
    "auth.email": {
        fr: "Email",
        en: "Email"
    },
    "auth.password": {
        fr: "Mot de passe",
        en: "Password"
    },
    "auth.forgotPassword": {
        fr: "Mot de passe oublié ?",
        en: "Forgot password?"
    },
    "auth.noAccount": {
        fr: "Pas encore de compte ?",
        en: "Don't have an account?"
    },
    "auth.hasAccount": {
        fr: "Déjà un compte ?",
        en: "Already have an account?"
    },
    "auth.signUp": {
        fr: "S'inscrire",
        en: "Sign up"
    },
    "auth.signIn": {
        fr: "Se connecter",
        en: "Sign in"
    },
    "auth.orContinueWith": {
        fr: "Ou continuer avec",
        en: "Or continue with"
    },
    // Common
    "common.search": {
        fr: "Rechercher",
        en: "Search"
    },
    "common.cancel": {
        fr: "Annuler",
        en: "Cancel"
    },
    "common.save": {
        fr: "Enregistrer",
        en: "Save"
    },
    "common.delete": {
        fr: "Supprimer",
        en: "Delete"
    },
    "common.edit": {
        fr: "Modifier",
        en: "Edit"
    },
    "common.confirm": {
        fr: "Confirmer",
        en: "Confirm"
    },
    "common.back": {
        fr: "Retour",
        en: "Back"
    },
    "common.next": {
        fr: "Suivant",
        en: "Next"
    },
    "common.loading": {
        fr: "Chargement...",
        en: "Loading..."
    },
    "common.seeMore": {
        fr: "Voir plus",
        en: "See more"
    },
    "common.seeLess": {
        fr: "Voir moins",
        en: "See less"
    },
    "common.from": {
        fr: "De",
        en: "From"
    },
    "common.to": {
        fr: "À",
        en: "To"
    },
    "common.date": {
        fr: "Date",
        en: "Date"
    },
    "common.price": {
        fr: "Prix",
        en: "Price"
    },
    "common.status": {
        fr: "Statut",
        en: "Status"
    },
    "common.pending": {
        fr: "En attente",
        en: "Pending"
    },
    "common.confirmed": {
        fr: "Confirmé",
        en: "Confirmed"
    },
    "common.completed": {
        fr: "Terminé",
        en: "Completed"
    },
    "common.cancelled": {
        fr: "Annulé",
        en: "Cancelled"
    },
    "common.inTransit": {
        fr: "En transit",
        en: "In transit"
    }
};
function getTranslation(key, lang) {
    const translation = translations[key];
    return translation ? translation[lang] : key;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const defaultContext = {
    language: "fr",
    setLanguage: ()=>{},
    t: (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(key, "fr")
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultContext);
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("fr");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            setMounted(true);
            const savedLanguage = localStorage.getItem("kiloshare-language");
            if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
                setLanguageState(savedLanguage);
            }
        }
    }["LanguageProvider.useEffect"], []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("kiloshare-language", lang);
        document.documentElement.lang = lang;
    };
    const t = (key)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(key, language);
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
            value: defaultContext,
            children: children
        }, void 0, false, {
            fileName: "[project]/lib/language-context.tsx",
            lineNumber: 43,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/language-context.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "QpmDt0gKLbHhi2kJbq3hLpMcsNs=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
let client = null;
function createClient() {
    if (!client) {
        client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://vnghkdxyurxdlvrvuttn.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZ2hrZHh5dXJ4ZGx2cnZ1dHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjIxNTUsImV4cCI6MjA4MDc5ODE1NX0.WAGi5Lw7unVvZ2ExAb921Ad-jJOekfP5PGG7WNDhaSg"));
    }
    return client;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useAuth() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[fetchProfile]": async (userId)=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
            if (error) {
                console.error("Error fetching profile:", error);
                return;
            }
            setProfile(data);
        }
    }["useAuth.useCallback[fetchProfile]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            let mounted = true;
            const initializeAuth = {
                "useAuth.useEffect.initializeAuth": async ()=>{
                    try {
                        const { data: { session }, error } = await supabase.auth.getSession();
                        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                        ;
                        if (error) {
                            console.error("Error getting session:", error);
                            setLoading(false);
                            return;
                        }
                        const currentUser = session?.user ?? null;
                        setUser(currentUser);
                        if (currentUser) {
                            // Fire and forget profile fetch - don't await it to block loading state
                            fetchProfile(currentUser.id).catch({
                                "useAuth.useEffect.initializeAuth": (err)=>console.error("Background profile fetch failed:", err)
                            }["useAuth.useEffect.initializeAuth"]);
                        } else {
                            setProfile(null);
                        }
                    } catch (err) {
                        console.error("Error initializing auth:", err);
                    } finally{
                        // Always unblock UI immediately after initial session check
                        if ("TURBOPACK compile-time truthy", 1) setLoading(false);
                    }
                }
            }["useAuth.useEffect.initializeAuth"];
            initializeAuth();
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "useAuth.useEffect": async (event, session)=>{
                    console.log('useAuth - Auth state changed:', event);
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    ;
                    const currentUser = session?.user ?? null;
                    setUser(currentUser);
                    // Immediate UI unblock on auth change
                    setLoading(false);
                    if (currentUser) {
                        // For SIGNED_IN or TOKEN_REFRESHED, refresh profile asynchronously
                        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION' || !profile) {
                            fetchProfile(currentUser.id).catch({
                                "useAuth.useEffect": (err)=>console.error("Background profile fetch failed:", err)
                            }["useAuth.useEffect"]);
                        }
                    } else {
                        setProfile(null);
                    }
                }
            }["useAuth.useEffect"]);
            return ({
                "useAuth.useEffect": ()=>{
                    subscription.unsubscribe();
                }
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], [
        fetchProfile
    ]); // Removed profile from dependency array to prevent infinite loops
    const refreshProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAuth.useCallback[refreshProfile]": async ()=>{
            if (user) {
                await fetchProfile(user.id);
            }
        }
    }["useAuth.useCallback[refreshProfile]"], [
        user,
        fetchProfile
    ]);
    return {
        user,
        profile,
        loading,
        isAuthenticated: !!user,
        refreshProfile
    };
}
_s(useAuth, "I5HJpofLNR9MEDGFZTOvtOQkKdg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-realtime-messages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRealtimeConversations",
    ()=>useRealtimeConversations,
    "useRealtimeMessages",
    ()=>useRealtimeMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function useRealtimeMessages({ conversationId, userId, onNewMessage }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const channelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const supabaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])());
    // Fetch initial messages
    const fetchMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtimeMessages.useCallback[fetchMessages]": async ()=>{
            if (!conversationId) {
                setMessages([]);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const { data, error: fetchError } = await supabaseRef.current.from("messages").select(`
          *,
          sender:profiles(id, name, avatar)
        `).eq("conversation_id", conversationId).order("created_at", {
                    ascending: true
                });
                if (fetchError) throw fetchError;
                setMessages(data || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Failed to fetch messages"));
            } finally{
                setIsLoading(false);
            }
        }
    }["useRealtimeMessages.useCallback[fetchMessages]"], [
        conversationId
    ]);
    // Send a message
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtimeMessages.useCallback[sendMessage]": async (content)=>{
            if (!conversationId || !userId || !content.trim()) return null;
            try {
                const { data, error: sendError } = await supabaseRef.current.from("messages").insert({
                    conversation_id: conversationId,
                    sender_id: userId,
                    content: content.trim(),
                    type: "text"
                }).select(`
          *,
          sender:profiles(id, name, avatar)
        `).single();
                if (sendError) throw sendError;
                // Add the new message to the local state immediately
                if (data) {
                    setMessages({
                        "useRealtimeMessages.useCallback[sendMessage]": (prev)=>[
                                ...prev,
                                data
                            ]
                    }["useRealtimeMessages.useCallback[sendMessage]"]);
                }
                // Update conversation timestamp
                await supabaseRef.current.from("conversations").update({
                    updated_at: new Date().toISOString()
                }).eq("id", conversationId);
                // Mark the message as read by the sender
                await supabaseRef.current.from("conversation_participants").update({
                    last_read_at: new Date().toISOString()
                }).eq("conversation_id", conversationId).eq("user_id", userId);
                return data;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Failed to send message"));
                return null;
            }
        }
    }["useRealtimeMessages.useCallback[sendMessage]"], [
        conversationId,
        userId
    ]);
    // Mark messages as read
    const markAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtimeMessages.useCallback[markAsRead]": async ()=>{
            if (!conversationId || !userId) return;
            try {
                // Update participant's last_read_at
                await supabaseRef.current.from("conversation_participants").update({
                    last_read_at: new Date().toISOString()
                }).eq("conversation_id", conversationId).eq("user_id", userId);
            // No need to update 'read' column on messages anymore as it's removed.
            // The unread status is now solely derived from last_read_at in RPC.
            } catch (err) {
                console.error("Failed to mark messages as read:", err);
            }
        }
    }["useRealtimeMessages.useCallback[markAsRead]"], [
        conversationId,
        userId
    ]);
    // Setup realtime subscription
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRealtimeMessages.useEffect": ()=>{
            if (!conversationId) return;
            // Fetch initial messages
            fetchMessages();
            // Create realtime channel for this conversation
            const channel = supabaseRef.current.channel(`messages:${conversationId}`).on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages",
                filter: `conversation_id=eq.${conversationId}`
            }, {
                "useRealtimeMessages.useEffect.channel": async (payload)=>{
                    const newMessage = payload.new;
                    // Fetch sender info if not included
                    if (!newMessage.sender) {
                        const { data: sender } = await supabaseRef.current.from("profiles").select("id, name, avatar").eq("id", newMessage.sender_id).single();
                        if (sender) {
                            newMessage.sender = sender;
                        }
                    }
                    // Add message to state (avoid duplicates)
                    setMessages({
                        "useRealtimeMessages.useEffect.channel": (prev)=>{
                            const exists = prev.some({
                                "useRealtimeMessages.useEffect.channel.exists": (m)=>m.id === newMessage.id
                            }["useRealtimeMessages.useEffect.channel.exists"]);
                            if (exists) return prev;
                            return [
                                ...prev,
                                newMessage
                            ];
                        }
                    }["useRealtimeMessages.useEffect.channel"]);
                    // Trigger callback
                    onNewMessage?.(newMessage);
                }
            }["useRealtimeMessages.useEffect.channel"]).on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "messages",
                filter: `conversation_id=eq.${conversationId}`
            }, {
                "useRealtimeMessages.useEffect.channel": (payload)=>{
                    const updatedMessage = payload.new;
                    setMessages({
                        "useRealtimeMessages.useEffect.channel": (prev)=>prev.map({
                                "useRealtimeMessages.useEffect.channel": (msg)=>msg.id === updatedMessage.id ? {
                                        ...msg,
                                        ...updatedMessage
                                    } : msg
                            }["useRealtimeMessages.useEffect.channel"])
                    }["useRealtimeMessages.useEffect.channel"]);
                }
            }["useRealtimeMessages.useEffect.channel"]).subscribe();
            channelRef.current = channel;
            // Cleanup on unmount or conversation change
            return ({
                "useRealtimeMessages.useEffect": ()=>{
                    if (channelRef.current) {
                        supabaseRef.current.removeChannel(channelRef.current);
                        channelRef.current = null;
                    }
                }
            })["useRealtimeMessages.useEffect"];
        }
    }["useRealtimeMessages.useEffect"], [
        conversationId,
        fetchMessages,
        onNewMessage
    ]);
    return {
        messages,
        isLoading,
        error,
        sendMessage,
        markAsRead,
        refetch: fetchMessages
    };
}
_s(useRealtimeMessages, "jahEquA8eGbtsNMtZn+u1o9jtPA=");
function useRealtimeConversations(userId) {
    _s1();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const channelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const supabaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])());
    const fetchConversations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useRealtimeConversations.useCallback[fetchConversations]": async ()=>{
            if (!userId) {
                setConversations([]);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                // Call the RPC function
                const { data, error } = await supabaseRef.current.rpc("get_conversations_for_user", {
                    p_user_id: userId
                });
                if (error) throw error;
                // Transform the data to match the component's expected structure
                const transformedConversations = (data || []).map({
                    "useRealtimeConversations.useCallback[fetchConversations].transformedConversations": (c)=>({
                            id: c.id,
                            created_at: c.created_at,
                            updated_at: c.updated_at,
                            unreadCount: c.unread_count,
                            trip: {
                                id: c.trip_id,
                                departure_city: c.trip_departure_city,
                                arrival_city: c.trip_arrival_city,
                                available_kg: c.trip_available_kg,
                                price_per_kg: c.trip_price_per_kg
                            },
                            lastMessage: c.last_message_content ? {
                                content: c.last_message_content,
                                created_at: c.last_message_created_at,
                                sender_id: c.last_message_sender_id
                            } : null,
                            participants: c.participants
                        })
                }["useRealtimeConversations.useCallback[fetchConversations].transformedConversations"]);
                setConversations(transformedConversations);
            } catch (err) {
                console.error("Failed to fetch conversations via RPC:", err);
            } finally{
                setIsLoading(false);
            }
        }
    }["useRealtimeConversations.useCallback[fetchConversations]"], [
        userId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRealtimeConversations.useEffect": ()=>{
            if (!userId) {
                setIsLoading(false);
                return;
            }
            fetchConversations();
            // Setup a single, stable channel for all updates related to this user's conversations
            const channel = supabaseRef.current.channel(`user-conversations-updates:${userId}`).on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages"
            }, {
                "useRealtimeConversations.useEffect.channel": ()=>{
                    fetchConversations();
                }
            }["useRealtimeConversations.useEffect.channel"]).on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "conversation_participants",
                filter: `user_id=eq.${userId}`
            }, {
                "useRealtimeConversations.useEffect.channel": ()=>{
                    fetchConversations();
                }
            }["useRealtimeConversations.useEffect.channel"]).subscribe().on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "conversation_participants",
                filter: `user_id=eq.${userId}`
            }, {
                "useRealtimeConversations.useEffect.channel": ()=>{
                    // The user was added to a new conversation. Refetch the list.
                    fetchConversations();
                }
            }["useRealtimeConversations.useEffect.channel"]).subscribe();
            channelRef.current = channel;
            // Cleanup on unmount or user change
            return ({
                "useRealtimeConversations.useEffect": ()=>{
                    if (channelRef.current) {
                        supabaseRef.current.removeChannel(channelRef.current);
                        channelRef.current = null;
                    }
                }
            })["useRealtimeConversations.useEffect"];
        }
    }["useRealtimeConversations.useEffect"], [
        userId,
        fetchConversations
    ]);
    return {
        conversations,
        isLoading,
        refetch: fetchConversations
    };
}
_s1(useRealtimeConversations, "W3iJpN2k40LHOIXkpLELVdHqvAE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cities",
    ()=>cities,
    "countries",
    ()=>countries,
    "mockBookings",
    ()=>mockBookings,
    "mockConversations",
    ()=>mockConversations,
    "mockCountriesList",
    ()=>mockCountriesList,
    "mockCurrencies",
    ()=>mockCurrencies,
    "mockNotifications",
    ()=>mockNotifications,
    "mockReviews",
    ()=>mockReviews,
    "mockTrips",
    ()=>mockTrips,
    "mockUsers",
    ()=>mockUsers,
    "popularRoutes",
    ()=>popularRoutes
]);
const mockUsers = [
    {
        id: "1",
        name: "Marie Dupont",
        email: "marie.dupont@email.com",
        phone: "+33 6 12 34 56 78",
        whatsapp: "33612345678",
        avatar: "/professional-woman-portrait.png",
        bio: "Voyageuse régulière entre Paris et Dakar. Fiable et ponctuelle.",
        rating: 4.8,
        reviewCount: 24,
        verified: true,
        createdAt: new Date("2023-06-15"),
        languages: [
            "Français",
            "Anglais"
        ],
        responseRate: 98,
        responseTime: "< 1h"
    },
    {
        id: "2",
        name: "Ahmed Ben Ali",
        email: "ahmed.benali@email.com",
        phone: "+33 7 98 76 54 32",
        whatsapp: "33798765432",
        avatar: "/professional-man-portrait.png",
        bio: "Plus de 100 livraisons réussies. Service premium garanti.",
        rating: 4.9,
        reviewCount: 56,
        verified: true,
        createdAt: new Date("2022-03-20"),
        languages: [
            "Français",
            "Arabe",
            "Anglais"
        ],
        responseRate: 100,
        responseTime: "< 30min"
    },
    {
        id: "3",
        name: "Sophie Martin",
        avatar: "/young-woman-smiling-portrait.png",
        whatsapp: "33655443322",
        rating: 4.6,
        reviewCount: 12,
        verified: false,
        createdAt: new Date("2024-01-10"),
        languages: [
            "Français"
        ],
        responseRate: 85,
        responseTime: "< 2h"
    },
    {
        id: "4",
        name: "Karim Ouedraogo",
        avatar: "/african-man-professional-portrait.png",
        bio: "Voyageur expérimenté. Plus de 100 livraisons réussies.",
        whatsapp: "22670112233",
        rating: 5.0,
        reviewCount: 89,
        verified: true,
        createdAt: new Date("2021-09-05"),
        languages: [
            "Français",
            "Mooré"
        ],
        responseRate: 99,
        responseTime: "< 1h"
    },
    {
        id: "5",
        name: "Elena Rodriguez",
        avatar: "/latina-woman-portrait.png",
        whatsapp: "34612345678",
        rating: 4.7,
        reviewCount: 31,
        verified: true,
        createdAt: new Date("2023-11-22"),
        languages: [
            "Français",
            "Espagnol"
        ],
        responseRate: 92,
        responseTime: "< 1h"
    }
];
const mockBookings = [
    {
        id: "b1",
        tripId: "1",
        senderId: "2",
        sender: mockUsers[1],
        kgRequested: 5,
        kgConfirmed: 5,
        totalPrice: 60,
        status: "confirmed",
        itemDescription: "Vêtements et chaussures",
        createdAt: new Date("2024-12-28"),
        updatedAt: new Date("2024-12-29")
    },
    {
        id: "b2",
        tripId: "1",
        senderId: "3",
        sender: mockUsers[2],
        kgRequested: 3,
        totalPrice: 36,
        status: "pending",
        itemDescription: "Documents importants",
        createdAt: new Date("2024-12-30"),
        updatedAt: new Date("2024-12-30")
    },
    {
        id: "b3",
        tripId: "1",
        senderId: "4",
        sender: mockUsers[3],
        kgRequested: 7,
        kgConfirmed: 7,
        totalPrice: 84,
        status: "in_transit",
        itemDescription: "Électronique (téléphones)",
        createdAt: new Date("2024-12-25"),
        updatedAt: new Date("2025-01-02")
    },
    {
        id: "b4",
        tripId: "2",
        senderId: "1",
        sender: mockUsers[0],
        kgRequested: 10,
        kgConfirmed: 10,
        totalPrice: 100,
        status: "delivered",
        itemDescription: "Colis divers",
        createdAt: new Date("2024-12-20"),
        updatedAt: new Date("2025-01-05")
    }
];
const mockTrips = [
    {
        id: "1",
        userId: "1",
        user: mockUsers[0],
        departure: "Paris",
        departureCountry: "France",
        arrival: "Dakar",
        arrivalCountry: "Sénégal",
        departureDate: new Date("2025-01-15"),
        availableKg: 15,
        totalKg: 30,
        pricePerKg: 12,
        currency: "€",
        description: "Voyage régulier. J'accepte les colis bien emballés. Remise en main propre à Dakar centre.",
        acceptedItems: [
            "Vêtements",
            "Électronique",
            "Documents",
            "Médicaments"
        ],
        rejectedItems: [
            "Liquides",
            "Nourriture périssable"
        ],
        createdAt: new Date("2024-12-20"),
        status: "active",
        bookings: mockBookings.filter((b)=>b.tripId === "1"),
        views: 234,
        inquiries: 12
    },
    {
        id: "2",
        userId: "2",
        user: mockUsers[1],
        departure: "Casablanca",
        departureCountry: "Maroc",
        arrival: "Paris",
        arrivalCountry: "France",
        departureDate: new Date("2025-01-20"),
        availableKg: 23,
        totalKg: 30,
        pricePerKg: 10,
        currency: "€",
        description: "Vol direct Royal Air Maroc. Disponible pour récupération à Casablanca ou Rabat.",
        acceptedItems: [
            "Vêtements",
            "Chaussures",
            "Accessoires",
            "Livres"
        ],
        rejectedItems: [
            "Objets de valeur non déclarés"
        ],
        createdAt: new Date("2024-12-22"),
        status: "active",
        views: 189,
        inquiries: 8
    },
    {
        id: "3",
        userId: "1",
        user: mockUsers[0],
        departure: "Lyon",
        departureCountry: "France",
        arrival: "Abidjan",
        arrivalCountry: "Côte d'Ivoire",
        departureDate: new Date("2025-01-25"),
        availableKg: 8,
        totalKg: 20,
        pricePerKg: 15,
        currency: "€",
        description: "Premier voyage vers Abidjan. Petit espace disponible.",
        acceptedItems: [
            "Documents",
            "Petits colis"
        ],
        rejectedItems: [
            "Colis volumineux",
            "Liquides"
        ],
        createdAt: new Date("2024-12-25"),
        status: "active",
        views: 67,
        inquiries: 3
    },
    {
        id: "4",
        userId: "4",
        user: mockUsers[3],
        departure: "Bruxelles",
        departureCountry: "Belgique",
        arrival: "Ouagadougou",
        arrivalCountry: "Burkina Faso",
        departureDate: new Date("2025-02-01"),
        availableKg: 30,
        totalKg: 30,
        pricePerKg: 8,
        currency: "€",
        description: "Voyageur expérimenté. Plus de 100 livraisons réussies. Service fiable et ponctuel.",
        acceptedItems: [
            "Tout type de colis légaux",
            "Électronique",
            "Vêtements",
            "Médicaments"
        ],
        rejectedItems: [
            "Produits illégaux"
        ],
        createdAt: new Date("2024-12-28"),
        status: "active",
        views: 312,
        inquiries: 18
    },
    {
        id: "5",
        userId: "1",
        user: mockUsers[0],
        departure: "Madrid",
        departureCountry: "Espagne",
        arrival: "Bamako",
        arrivalCountry: "Mali",
        departureDate: new Date("2024-12-01"),
        availableKg: 0,
        totalKg: 20,
        pricePerKg: 11,
        currency: "€",
        description: "Voyage terminé avec succès.",
        acceptedItems: [
            "Vêtements",
            "Électronique",
            "Cosmétiques"
        ],
        rejectedItems: [
            "Nourriture",
            "Liquides"
        ],
        createdAt: new Date("2024-11-15"),
        status: "completed",
        views: 456,
        inquiries: 25
    }
];
const mockNotifications = [
    {
        id: "n1",
        userId: "1",
        type: "booking",
        title: "Nouvelle réservation",
        message: "Sophie Martin souhaite réserver 3 kg sur votre trajet Paris → Dakar",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        link: "/dashboard/bookings/b2",
        metadata: {
            tripId: "1",
            bookingId: "b2",
            senderName: "Sophie Martin",
            senderAvatar: "/young-woman-smiling.png"
        }
    },
    {
        id: "n2",
        userId: "1",
        type: "message",
        title: "Nouveau message",
        message: "Ahmed Ben Ali vous a envoyé un message",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        link: "/messages",
        metadata: {
            senderId: "2",
            senderName: "Ahmed Ben Ali",
            senderAvatar: "/professional-man.jpg"
        }
    },
    {
        id: "n3",
        userId: "1",
        type: "review",
        title: "Nouvel avis",
        message: "Karim Ouedraogo vous a laissé un avis 5 étoiles",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        link: "/profile/reviews",
        metadata: {
            senderName: "Karim Ouedraogo",
            senderAvatar: "/thoughtful-african-man.png"
        }
    },
    {
        id: "n4",
        userId: "1",
        type: "payment",
        title: "Paiement reçu",
        message: "Vous avez reçu 84€ pour votre livraison",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        link: "/profile/payments"
    },
    {
        id: "n5",
        userId: "1",
        type: "reminder",
        title: "Rappel de voyage",
        message: "Votre trajet Paris → Dakar est prévu dans 3 jours",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        link: "/trips/1",
        metadata: {
            tripId: "1"
        }
    },
    {
        id: "n6",
        userId: "1",
        type: "system",
        title: "Profil vérifié",
        message: "Félicitations ! Votre profil a été vérifié avec succès",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72)
    }
];
const mockReviews = [
    {
        id: "r1",
        tripId: "5",
        reviewerId: "4",
        reviewer: mockUsers[3],
        reviewedId: "1",
        rating: 5,
        comment: "Service impeccable ! Marie est très professionnelle et ponctuelle. Je recommande vivement.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
        id: "r2",
        tripId: "5",
        reviewerId: "2",
        reviewer: mockUsers[1],
        reviewedId: "1",
        rating: 5,
        comment: "Excellent service, communication parfaite. Colis livré dans les temps.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    {
        id: "r3",
        tripId: "5",
        reviewerId: "5",
        reviewer: mockUsers[4],
        reviewedId: "1",
        rating: 4,
        comment: "Très bon service. Petit retard à la livraison mais tout s'est bien passé.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72)
    },
    {
        id: "r4",
        tripId: "5",
        reviewerId: "1",
        reviewer: mockUsers[0],
        reviewedId: "4",
        rating: 5,
        comment: "Client très sérieux, colis bien préparé et à l'heure au point de rendez-vous. Parfait !",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20)
    },
    {
        id: "r5",
        tripId: "2",
        reviewerId: "1",
        reviewer: mockUsers[0],
        reviewedId: "2",
        rating: 5,
        comment: "Ahmed est un expéditeur exemplaire. Communication claire et colis impeccable.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96)
    }
];
const mockMessages = [
    {
        id: "m1",
        senderId: "2",
        receiverId: "1",
        tripId: "1",
        content: "Bonjour ! Je suis intéressé par votre offre de kilos vers Dakar.",
        createdAt: new Date("2024-12-29T14:30:00"),
        read: true,
        type: "text"
    },
    {
        id: "m2",
        senderId: "1",
        receiverId: "2",
        tripId: "1",
        content: "Bonjour Ahmed ! Oui, j'ai encore 15kg de disponibles. Quel type de colis souhaitez-vous envoyer ?",
        createdAt: new Date("2024-12-29T14:32:00"),
        read: true,
        type: "text"
    },
    {
        id: "m3",
        senderId: "2",
        receiverId: "1",
        tripId: "1",
        content: "Ce sont des vêtements et quelques appareils électroniques, environ 5kg au total. C'est possible ?",
        createdAt: new Date("2024-12-29T14:35:00"),
        read: true,
        type: "text"
    },
    {
        id: "m4",
        senderId: "1",
        receiverId: "2",
        tripId: "1",
        content: "Parfait, c'est tout à fait possible ! Pour l'électronique, assurez-vous que tout soit bien emballé.",
        createdAt: new Date("2024-12-29T14:38:00"),
        read: true,
        type: "text"
    },
    {
        id: "m5",
        senderId: "2",
        receiverId: "1",
        tripId: "1",
        content: "Super ! Comment procède-t-on pour la remise du colis ?",
        createdAt: new Date("2024-12-29T14:40:00"),
        read: false,
        type: "text"
    }
];
const mockConversations = [
    {
        id: "1",
        tripId: "1",
        trip: mockTrips[0],
        participants: [
            mockUsers[1],
            mockUsers[0]
        ],
        messages: mockMessages,
        lastMessage: mockMessages[mockMessages.length - 1],
        unreadCount: 1,
        createdAt: new Date("2024-12-29")
    },
    {
        id: "2",
        tripId: "2",
        trip: mockTrips[1],
        participants: [
            mockUsers[2],
            mockUsers[0]
        ],
        messages: [
            {
                id: "m10",
                senderId: "3",
                receiverId: "1",
                tripId: "2",
                content: "Bonjour, vous acceptez les documents administratifs ?",
                createdAt: new Date("2024-12-28T10:00:00"),
                read: true,
                type: "text"
            },
            {
                id: "m11",
                senderId: "1",
                receiverId: "3",
                tripId: "2",
                content: "Oui bien sûr ! Pas de problème pour les documents.",
                createdAt: new Date("2024-12-28T10:15:00"),
                read: true,
                type: "text"
            }
        ],
        lastMessage: {
            id: "m11",
            senderId: "1",
            receiverId: "3",
            tripId: "2",
            content: "Oui bien sûr ! Pas de problème pour les documents.",
            createdAt: new Date("2024-12-28T10:15:00"),
            read: true,
            type: "text"
        },
        unreadCount: 0,
        createdAt: new Date("2024-12-28")
    },
    {
        id: "3",
        tripId: "3",
        trip: mockTrips[2],
        participants: [
            mockUsers[4],
            mockUsers[0]
        ],
        messages: [
            {
                id: "m20",
                senderId: "5",
                receiverId: "1",
                tripId: "3",
                content: "Salut ! Il te reste combien de kg disponibles ?",
                createdAt: new Date("2024-12-30T16:00:00"),
                read: false,
                type: "text"
            }
        ],
        lastMessage: {
            id: "m20",
            senderId: "5",
            receiverId: "1",
            tripId: "3",
            content: "Salut ! Il te reste combien de kg disponibles ?",
            createdAt: new Date("2024-12-30T16:00:00"),
            read: false,
            type: "text"
        },
        unreadCount: 1,
        createdAt: new Date("2024-12-30")
    }
];
const popularRoutes = [
    {
        from: "Paris",
        to: "Dakar",
        count: 156
    },
    {
        from: "Paris",
        to: "Abidjan",
        count: 124
    },
    {
        from: "Bruxelles",
        to: "Kinshasa",
        count: 98
    },
    {
        from: "Lyon",
        to: "Casablanca",
        count: 87
    },
    {
        from: "Paris",
        to: "Bamako",
        count: 76
    }
];
const mockCountriesList = [
    {
        id: "1",
        code: "FR",
        name: "France",
        flag: "🇫🇷",
        currencyCode: "EUR",
        continent: "Europe"
    },
    {
        id: "2",
        code: "SN",
        name: "Sénégal",
        flag: "🇸🇳",
        currencyCode: "XOF",
        continent: "Afrique"
    },
    {
        id: "3",
        code: "MA",
        name: "Maroc",
        flag: "🇲🇦",
        currencyCode: "MAD",
        continent: "Afrique"
    },
    {
        id: "4",
        code: "CI",
        name: "Côte d'Ivoire",
        flag: "🇨🇮",
        currencyCode: "XOF",
        continent: "Afrique"
    },
    {
        id: "5",
        code: "ML",
        name: "Mali",
        flag: "🇲🇱",
        currencyCode: "XOF",
        continent: "Afrique"
    },
    {
        id: "6",
        code: "BF",
        name: "Burkina Faso",
        flag: "🇧🇫",
        currencyCode: "XOF",
        continent: "Afrique"
    },
    {
        id: "7",
        code: "BE",
        name: "Belgique",
        flag: "🇧🇪",
        currencyCode: "EUR",
        continent: "Europe"
    },
    {
        id: "8",
        code: "ES",
        name: "Espagne",
        flag: "🇪🇸",
        currencyCode: "EUR",
        continent: "Europe"
    }
];
const countries = [
    "France",
    "Sénégal",
    "Maroc",
    "Côte d'Ivoire",
    "Mali",
    "Burkina Faso",
    "Belgique",
    "Espagne",
    "Cameroun",
    "RD Congo",
    "Tunisie",
    "Algérie",
    "Guinée",
    "Togo",
    "Bénin",
    "Niger",
    "Mauritanie",
    "Gabon"
];
const cities = {
    France: [
        "Paris",
        "Lyon",
        "Marseille",
        "Toulouse",
        "Nice",
        "Bordeaux"
    ],
    Sénégal: [
        "Dakar",
        "Thiès",
        "Saint-Louis",
        "Ziguinchor"
    ],
    Maroc: [
        "Casablanca",
        "Rabat",
        "Marrakech",
        "Fès",
        "Tanger"
    ],
    "Côte d'Ivoire": [
        "Abidjan",
        "Bouaké",
        "Yamoussoukro"
    ],
    Mali: [
        "Bamako",
        "Sikasso",
        "Mopti"
    ],
    "Burkina Faso": [
        "Ouagadougou",
        "Bobo-Dioulasso"
    ],
    Belgique: [
        "Bruxelles",
        "Anvers",
        "Liège"
    ],
    Espagne: [
        "Madrid",
        "Barcelone",
        "Valence"
    ]
};
const mockCurrencies = [
    {
        code: "EUR",
        name: "Euro",
        symbol: "€",
        rateToEur: 1,
        updatedAt: new Date()
    },
    {
        code: "USD",
        name: "US Dollar",
        symbol: "$",
        rateToEur: 0.95,
        updatedAt: new Date()
    },
    {
        code: "XOF",
        name: "CFA BCEAO",
        symbol: "CFA",
        rateToEur: 655.957,
        updatedAt: new Date()
    },
    {
        code: "MAD",
        name: "Dirham Marocain",
        symbol: "DH",
        rateToEur: 10.8,
        updatedAt: new Date()
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/data-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Service de données unifié
 * Gère le basculement entre données mock et données Supabase
 * 
 * Pour activer les données réelles, mettre USE_MOCK_DATA = false
 */ __turbopack_context__.s([
    "USE_MOCK_DATA",
    ()=>USE_MOCK_DATA,
    "createNewBooking",
    ()=>createNewBooking,
    "createNewReview",
    ()=>createNewReview,
    "createNewTrip",
    ()=>createNewTrip,
    "dbBookingToBooking",
    ()=>dbBookingToBooking,
    "dbNotificationToNotification",
    ()=>dbNotificationToNotification,
    "dbProfileToUser",
    ()=>dbProfileToUser,
    "dbReviewToReview",
    ()=>dbReviewToReview,
    "dbTripToTrip",
    ()=>dbTripToTrip,
    "dbUserSettingsToUserSettings",
    ()=>dbUserSettingsToUserSettings,
    "fetchCities",
    ()=>fetchCities,
    "fetchConversations",
    ()=>fetchConversations,
    "fetchCountries",
    ()=>fetchCountries,
    "fetchCurrencies",
    ()=>fetchCurrencies,
    "fetchNotifications",
    ()=>fetchNotifications,
    "fetchPublicProfile",
    ()=>fetchPublicProfile,
    "fetchTrip",
    ()=>fetchTrip,
    "fetchTripBookings",
    ()=>fetchTripBookings,
    "fetchTrips",
    ()=>fetchTrips,
    "fetchUser",
    ()=>fetchUser,
    "fetchUserBookings",
    ()=>fetchUserBookings,
    "fetchUserReviews",
    ()=>fetchUserReviews,
    "fetchUserSettings",
    ()=>fetchUserSettings,
    "fetchUserTrips",
    ()=>fetchUserTrips,
    "markAllNotificationsRead",
    ()=>markAllNotificationsRead,
    "markNotificationRead",
    ()=>markNotificationRead,
    "updateUserProfile",
    ()=>updateUserProfile,
    "updateUserSettings",
    ()=>updateUserSettings,
    "uploadUserAvatar",
    ()=>uploadUserAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-client] (ecmascript)");
;
const USE_MOCK_DATA = false;
function dbProfileToUser(profile) {
    return {
        id: profile.id,
        name: profile.name,
        email: profile.email || undefined,
        phone: profile.phone || undefined,
        whatsapp: profile.whatsapp || undefined,
        avatar: profile.avatar || undefined,
        bio: profile.bio || undefined,
        rating: profile.rating,
        reviewCount: profile.review_count,
        verified: profile.verified,
        createdAt: new Date(profile.created_at),
        languages: profile.languages,
        responseRate: profile.response_rate,
        responseTime: profile.response_time || undefined
    };
}
function dbTripToTrip(dbTrip) {
    return {
        id: dbTrip.id,
        userId: dbTrip.user_id,
        user: dbTrip.user ? dbProfileToUser(dbTrip.user) : {},
        departure: dbTrip.departure,
        departureCountry: dbTrip.departure_country,
        arrival: dbTrip.arrival,
        arrivalCountry: dbTrip.arrival_country,
        departureDate: new Date(dbTrip.departure_date),
        availableKg: dbTrip.available_kg,
        totalKg: dbTrip.total_kg,
        pricePerKg: dbTrip.price_per_kg,
        currency: dbTrip.currency,
        description: dbTrip.description || undefined,
        acceptedItems: dbTrip.accepted_items,
        rejectedItems: dbTrip.rejected_items,
        createdAt: new Date(dbTrip.created_at),
        status: dbTrip.status,
        views: dbTrip.views,
        inquiries: dbTrip.inquiries
    };
}
function dbBookingToBooking(dbBooking) {
    return {
        id: dbBooking.id,
        tripId: dbBooking.trip_id,
        senderId: dbBooking.sender_id,
        sender: dbBooking.sender ? dbProfileToUser(dbBooking.sender) : {},
        kgRequested: dbBooking.kg_requested,
        kgConfirmed: dbBooking.kg_confirmed || undefined,
        totalPrice: dbBooking.total_price,
        status: dbBooking.status,
        itemDescription: dbBooking.item_description,
        createdAt: new Date(dbBooking.created_at),
        updatedAt: new Date(dbBooking.updated_at),
        notes: dbBooking.notes || undefined
    };
}
function dbNotificationToNotification(dbNotif) {
    return {
        id: dbNotif.id,
        userId: dbNotif.user_id,
        type: dbNotif.type,
        title: dbNotif.title,
        message: dbNotif.message,
        read: dbNotif.read,
        createdAt: new Date(dbNotif.created_at),
        link: dbNotif.link || undefined,
        metadata: dbNotif.metadata
    };
}
function dbReviewToReview(dbReview) {
    return {
        id: dbReview.id,
        tripId: dbReview.trip_id || "",
        reviewerId: dbReview.reviewer_id,
        reviewer: dbReview.reviewer ? dbProfileToUser(dbReview.reviewer) : {},
        reviewedId: dbReview.reviewed_id,
        rating: dbReview.rating,
        comment: dbReview.comment || "",
        createdAt: new Date(dbReview.created_at)
    };
}
async function fetchTrips() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getTrips } = await __turbopack_context__.A("[project]/lib/db/trips.ts [app-client] (ecmascript, async loader)");
    try {
        const { trips } = await getTrips({
            status: "active"
        }, 1, 100);
        return trips.map(dbTripToTrip);
    } catch  {
        console.warn("DB fetch failed, falling back to mock data");
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTrips"];
    }
}
async function fetchTrip(tripId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getTrip } = await __turbopack_context__.A("[project]/lib/db/trips.ts [app-client] (ecmascript, async loader)");
    try {
        const trip = await getTrip(tripId);
        return dbTripToTrip(trip);
    } catch  {
        // Fallback sur mock
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTrips"].find((t)=>t.id === tripId) || null;
    }
}
async function fetchUserTrips(userId, filters) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getUserTrips } = await __turbopack_context__.A("[project]/lib/db/trips.ts [app-client] (ecmascript, async loader)");
    try {
        const trips = await getUserTrips(userId, filters);
        return trips.map(dbTripToTrip);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTrips"].filter((t)=>t.userId === userId);
    }
}
async function fetchUser(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getProfile } = await __turbopack_context__.A("[project]/lib/db/profiles.ts [app-client] (ecmascript, async loader)");
    try {
        const profile = await getProfile(userId);
        return dbProfileToUser(profile);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === userId) || null;
    }
}
async function fetchTripBookings(tripId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getTripBookings } = await __turbopack_context__.A("[project]/lib/db/bookings.ts [app-client] (ecmascript, async loader)");
    try {
        const bookings = await getTripBookings(tripId);
        return bookings.map(dbBookingToBooking);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockBookings"].filter((b)=>b.tripId === tripId);
    }
}
async function fetchUserBookings(userId, role, filters) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getUserBookings } = await __turbopack_context__.A("[project]/lib/db/bookings.ts [app-client] (ecmascript, async loader)");
    try {
        const bookings = await getUserBookings(userId, role, filters);
        return bookings.map(dbBookingToBooking);
    } catch  {
        if (role === "sender") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockBookings"].filter((b)=>b.senderId === userId);
        }
        const userTripIds = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTrips"].filter((t)=>t.userId === userId).map((t)=>t.id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockBookings"].filter((b)=>userTripIds.includes(b.tripId));
    }
}
async function fetchNotifications(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getNotifications } = await __turbopack_context__.A("[project]/lib/db/notifications.ts [app-client] (ecmascript, async loader)");
    try {
        const notifs = await getNotifications(userId);
        return notifs.map(dbNotificationToNotification);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockNotifications"].filter((n)=>n.userId === userId);
    }
}
async function fetchUserReviews(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getReviews } = await __turbopack_context__.A("[project]/lib/db/reviews.ts [app-client] (ecmascript, async loader)");
    try {
        const reviews = await getReviews(userId, "received");
        return reviews.map(dbReviewToReview);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockReviews"].filter((r)=>r.reviewedId === userId);
    }
}
async function fetchConversations(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Pour les conversations, on utilise déjà le hook realtime
    // Cette fonction est principalement pour le fallback mock
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockConversations"].filter((c)=>c.participants.some((p)=>p.id === userId));
}
async function createNewTrip(input) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { createTrip } = await __turbopack_context__.A("[project]/lib/db/trips.ts [app-client] (ecmascript, async loader)");
    try {
        const trip = await createTrip({
            user_id: input.userId,
            departure: input.departure,
            departure_country: input.departureCountry,
            departure_city_id: input.departureCityId,
            arrival: input.arrival,
            arrival_country: input.arrivalCountry,
            arrival_city_id: input.arrivalCityId,
            departure_date: input.departureDate,
            available_kg: input.availableKg,
            total_kg: input.availableKg,
            price_per_kg: input.pricePerKg,
            currency: "€",
            description: input.description || null,
            accepted_items: input.acceptedItems || [],
            rejected_items: input.rejectedItems || [],
            status: "active"
        });
        return dbTripToTrip(trip);
    } catch (error) {
        console.error("Failed to create trip:", error);
        return null;
    }
}
async function createNewBooking(input) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { createBooking } = await __turbopack_context__.A("[project]/lib/db/bookings.ts [app-client] (ecmascript, async loader)");
    try {
        const booking = await createBooking({
            trip_id: input.tripId,
            sender_id: input.senderId,
            kg_requested: input.kgRequested,
            kg_confirmed: null,
            total_price: input.totalPrice,
            status: "pending",
            item_description: input.itemDescription,
            notes: null
        });
        return dbBookingToBooking(booking);
    } catch (error) {
        console.error("Failed to create booking:", error);
        return null;
    }
}
async function markNotificationRead(notificationId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { markNotificationAsRead } = await __turbopack_context__.A("[project]/lib/db/notifications.ts [app-client] (ecmascript, async loader)");
    try {
        await markNotificationAsRead(notificationId);
    } catch (error) {
        console.error("Failed to mark notification as read:", error);
    }
}
async function markAllNotificationsRead(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { markAllNotificationsAsRead } = await __turbopack_context__.A("[project]/lib/db/notifications.ts [app-client] (ecmascript, async loader)");
    try {
        await markAllNotificationsAsRead(userId);
    } catch (error) {
        console.error("Failed to mark all notifications as read:", error);
    }
}
async function createNewReview(input) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { createReview } = await __turbopack_context__.A("[project]/lib/db/reviews.ts [app-client] (ecmascript, async loader)");
    try {
        const review = await createReview({
            trip_id: input.tripId || null,
            reviewer_id: input.reviewerId,
            reviewed_id: input.reviewedId,
            rating: input.rating,
            comment: input.comment
        });
        return dbReviewToReview(review);
    } catch (error) {
        console.error("Failed to create review:", error);
        return null;
    }
}
async function fetchCountries() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getCountries } = await __turbopack_context__.A("[project]/lib/db/countries.ts [app-client] (ecmascript, async loader)");
    try {
        return await getCountries();
    } catch (error) {
        console.warn("DB fetch failed for countries, falling back to mock data");
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockCountriesList"];
    }
}
async function fetchCurrencies() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getCurrencies } = await __turbopack_context__.A("[project]/lib/db/currencies.ts [app-client] (ecmascript, async loader)");
    try {
        return await getCurrencies();
    } catch (error) {
        console.warn("DB fetch failed for currencies, falling back to mock data");
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockCurrencies"];
    }
}
async function fetchCities(countryId) {
    const { getCitiesByCountry } = await __turbopack_context__.A("[project]/lib/db/countries.ts [app-client] (ecmascript, async loader)");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return await getCitiesByCountry(countryId);
    } catch (error) {
        console.warn("DB fetch failed for cities", error);
        return [];
    }
}
function dbUserSettingsToUserSettings(dbSettings) {
    return {
        notifications: {
            email: dbSettings.notifications_email,
            push: dbSettings.notifications_push,
            sms: dbSettings.notifications_sms,
            newBookings: dbSettings.notifications_new_bookings,
            messages: dbSettings.notifications_messages,
            reviews: dbSettings.notifications_reviews,
            promotions: dbSettings.notifications_promotions,
            reminders: dbSettings.notifications_reminders
        },
        privacy: {
            showPhone: dbSettings.privacy_show_phone,
            showEmail: dbSettings.privacy_show_email,
            showLastSeen: dbSettings.privacy_show_last_seen,
            allowSearchEngines: dbSettings.privacy_allow_search_engines
        },
        preferences: {
            language: dbSettings.preferences_language,
            currency: dbSettings.preferences_currency,
            timezone: dbSettings.preferences_timezone,
            darkMode: dbSettings.preferences_dark_mode
        }
    };
}
async function fetchUserSettings(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getUserSettings } = await __turbopack_context__.A("[project]/lib/db/settings.ts [app-client] (ecmascript, async loader)");
    try {
        const dbSettings = await getUserSettings(userId);
        return dbUserSettingsToUserSettings(dbSettings);
    } catch (error) {
        console.error("Failed to fetch user settings:", error);
        throw error;
    }
}
async function updateUserSettings(userId, settings) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { updateUserSettings } = await __turbopack_context__.A("[project]/lib/db/settings.ts [app-client] (ecmascript, async loader)");
    try {
        // Convert app types back to flat DB structure
        const updates = {
            notifications_email: settings.notifications.email,
            notifications_push: settings.notifications.push,
            notifications_sms: settings.notifications.sms,
            notifications_new_bookings: settings.notifications.newBookings,
            notifications_messages: settings.notifications.messages,
            notifications_reviews: settings.notifications.reviews,
            notifications_promotions: settings.notifications.promotions,
            notifications_reminders: settings.notifications.reminders,
            privacy_show_phone: settings.privacy.showPhone,
            privacy_show_email: settings.privacy.showEmail,
            privacy_show_last_seen: settings.privacy.showLastSeen,
            privacy_allow_search_engines: settings.privacy.allowSearchEngines,
            preferences_language: settings.preferences.language,
            preferences_currency: settings.preferences.currency,
            preferences_timezone: settings.preferences.timezone,
            preferences_dark_mode: settings.preferences.darkMode
        };
        const updatedDbSettings = await updateUserSettings(userId, updates);
        return dbUserSettingsToUserSettings(updatedDbSettings);
    } catch (error) {
        console.error("Failed to update user settings:", error);
        throw error;
    }
}
async function updateUserProfile(userId, updates) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { updateProfile } = await __turbopack_context__.A("[project]/lib/db/profiles.ts [app-client] (ecmascript, async loader)");
    try {
        // Convert App User Partial to DbProfileUpdate
        const dbUpdates = {} // Using any to simplify mapping Partial<User> to DbProfileUpdate
        ;
        if (updates.name !== undefined) dbUpdates.name = updates.name;
        if (updates.email !== undefined) dbUpdates.email = updates.email;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.whatsapp !== undefined) dbUpdates.whatsapp = updates.whatsapp;
        if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
        if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar;
        if (updates.languages !== undefined) dbUpdates.languages = updates.languages;
        if (updates.responseRate !== undefined) dbUpdates.response_rate = updates.responseRate;
        if (updates.responseTime !== undefined) dbUpdates.response_time = updates.responseTime;
        const updatedProfile = await updateProfile(userId, dbUpdates);
        return dbProfileToUser(updatedProfile);
    } catch (error) {
        console.error("Failed to update user profile:", error);
        throw error;
    }
}
async function uploadUserAvatar(userId, file) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { uploadAvatar } = await __turbopack_context__.A("[project]/lib/db/storage.ts [app-client] (ecmascript, async loader)");
    try {
        const updatedProfile = await uploadAvatar(userId, file);
        return updatedProfile.avatar || "";
    } catch (error) {
        console.error("Failed to upload avatar:", error);
        throw error;
    }
}
async function fetchPublicProfile(userId) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const { getPublicProfileById } = await __turbopack_context__.A("[project]/lib/db/profiles.ts [app-client] (ecmascript, async loader)");
    try {
        const profile = await getPublicProfileById(userId);
        if (!profile) return null;
        // Manually map the public profile data to the User type
        return {
            id: profile.id,
            name: profile.name,
            email: undefined,
            phone: undefined,
            whatsapp: undefined,
            avatar: profile.avatar,
            bio: profile.bio,
            rating: profile.rating,
            reviewCount: profile.review_count,
            verified: profile.verified,
            createdAt: new Date(profile.created_at),
            languages: profile.languages,
            responseRate: profile.response_rate,
            responseTime: profile.response_time
        };
    } catch  {
        // Fallback on mock data
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === userId) || null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataProvider",
    ()=>DataProvider,
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2d$messages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-realtime-messages.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/data-service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const DataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function DataProvider({ children }) {
    _s();
    const { user, profile, loading: authLoading, isAuthenticated: authIsAuthenticated, refreshProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // State pour les données
    const [trips, setTrips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockTrips"] : []);
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockBookings"] : []);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockNotifications"] : []);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockReviews"] : []);
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currencies, setCurrencies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Realtime conversations
    const { conversations } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2d$messages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealtimeConversations"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? "1" : user?.id ?? null);
    const totalUnreadMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataProvider.useMemo[totalUnreadMessages]": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"]) return 2 // Mock value
            ;
            return conversations.reduce({
                "DataProvider.useMemo[totalUnreadMessages]": (acc, c)=>acc + (c.unread_count || 0)
            }["DataProvider.useMemo[totalUnreadMessages]"], 0);
        }
    }["DataProvider.useMemo[totalUnreadMessages]"], [
        conversations
    ]);
    const totalUnreadNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataProvider.useMemo[totalUnreadNotifications]": ()=>{
            return notifications.filter({
                "DataProvider.useMemo[totalUnreadNotifications]": (n)=>!n.read
            }["DataProvider.useMemo[totalUnreadNotifications]"]).length;
        }
    }["DataProvider.useMemo[totalUnreadNotifications]"], [
        notifications
    ]);
    // Utilisateur courant
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataProvider.useMemo[currentUser]": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"]) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"][0] // Mock current user
                ;
            }
            if (profile) {
                console.log("DataProvider - Derived currentUser from profile:", profile.id);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dbProfileToUser"])(profile);
            }
            // Fallback: Use auth user data if profile is still loading (prevents empty UI)
            if (user && !__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"]) {
                console.log("DataProvider - Using auth user fallback while profile loads");
                return {
                    id: user.id,
                    name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
                    email: user.email,
                    rating: 0,
                    reviewCount: 0,
                    verified: false,
                    createdAt: new Date(user.created_at),
                    languages: [],
                    responseRate: 0
                };
            }
            console.log("DataProvider - No profile available to derive currentUser");
            return null;
        }
    }["DataProvider.useMemo[currentUser]"], [
        profile,
        user
    ]);
    const currentUserId = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? "1" : user?.id;
    // Charger les données au montage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DataProvider.useEffect": ()=>{
            const loadData = {
                "DataProvider.useEffect.loadData": async ()=>{
                    if (!currentUserId) return;
                    setDataLoading(true);
                    try {
                        const [tripsData, ownerBookings, senderBookings, notifsData, reviewsData, countriesData, currenciesData] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTrips"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserBookings"])(currentUserId, "owner"),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserBookings"])(currentUserId, "sender"),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNotifications"])(currentUserId),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserReviews"])(currentUserId),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCountries"])(),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCurrencies"])()
                        ]);
                        // Merge bookings and remove duplicates if any
                        const allBookings = [
                            ...ownerBookings
                        ];
                        senderBookings.forEach({
                            "DataProvider.useEffect.loadData": (sb)=>{
                                if (!allBookings.some({
                                    "DataProvider.useEffect.loadData": (b)=>b.id === sb.id
                                }["DataProvider.useEffect.loadData"])) {
                                    allBookings.push(sb);
                                }
                            }
                        }["DataProvider.useEffect.loadData"]);
                        setTrips(tripsData);
                        setBookings(allBookings);
                        setNotifications(notifsData);
                        setReviews(reviewsData);
                        setCountries(countriesData);
                        setCurrencies(currenciesData);
                    } catch (error) {
                        console.error("Error loading data:", error);
                    // En cas d'erreur, on garde les données mock si activé
                    } finally{
                        setDataLoading(false);
                    }
                }
            }["DataProvider.useEffect.loadData"];
            // Charger les données si on est en mode réel ou pour recharger
            // Note: Si USE_MOCK_DATA est true, on a déjà les données via useState
            // mais on laisse loadData potentiellement faire autre chose si besoin
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"]) {
                loadData();
            } else {
                // Load mock countries and currencies if using mock data
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCountries"])().then(setCountries);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCurrencies"])().then(setCurrencies);
            }
        }
    }["DataProvider.useEffect"], [
        currentUserId
    ]);
    // Actions
    const refreshTrips = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[refreshTrips]": async ()=>{
            try {
                const tripsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTrips"])();
                setTrips(tripsData);
            } catch (error) {
                console.error("Error refreshing trips:", error);
            }
        }
    }["DataProvider.useCallback[refreshTrips]"], []);
    const refreshNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[refreshNotifications]": async ()=>{
            if (!currentUserId) return;
            try {
                const notifsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNotifications"])(currentUserId);
                setNotifications(notifsData);
            } catch (error) {
                console.error("Error refreshing notifications:", error);
            }
        }
    }["DataProvider.useCallback[refreshNotifications]"], [
        currentUserId
    ]);
    const refreshBookings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[refreshBookings]": async ()=>{
            if (!currentUserId) return;
            try {
                const [ownerBookings, senderBookings] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserBookings"])(currentUserId, "owner"),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchUserBookings"])(currentUserId, "sender")
                ]);
                const allBookings = [
                    ...ownerBookings
                ];
                senderBookings.forEach({
                    "DataProvider.useCallback[refreshBookings]": (sb)=>{
                        if (!allBookings.some({
                            "DataProvider.useCallback[refreshBookings]": (b)=>b.id === sb.id
                        }["DataProvider.useCallback[refreshBookings]"])) {
                            allBookings.push(sb);
                        }
                    }
                }["DataProvider.useCallback[refreshBookings]"]);
                setBookings(allBookings);
            } catch (error) {
                console.error("Error refreshing bookings:", error);
            }
        }
    }["DataProvider.useCallback[refreshBookings]"], [
        currentUserId
    ]);
    const handleCreateTrip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[handleCreateTrip]": async (input)=>{
            const trip = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNewTrip"])(input);
            if (trip) {
                setTrips({
                    "DataProvider.useCallback[handleCreateTrip]": (prev)=>[
                            trip,
                            ...prev
                        ]
                }["DataProvider.useCallback[handleCreateTrip]"]);
            }
            return trip;
        }
    }["DataProvider.useCallback[handleCreateTrip]"], []);
    const handleCreateReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[handleCreateReview]": async (input)=>{
            const review = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNewReview"])(input);
            if (review) {
                setReviews({
                    "DataProvider.useCallback[handleCreateReview]": (prev)=>[
                            review,
                            ...prev
                        ]
                }["DataProvider.useCallback[handleCreateReview]"]);
            // Update local user rating if needed, but easier to just refresh reviews or rely on optimistic update
            }
            return review;
        }
    }["DataProvider.useCallback[handleCreateReview]"], []);
    const handleUpdateProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[handleUpdateProfile]": async (updates)=>{
            if (!currentUserId || !profile) return false;
            try {
                // Optimistic update done in DataService for mock, but here we can force refresh auth profile
                // For now, assume success and maybe refresh auth?
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateUserProfile"])(currentUserId, updates);
                await refreshProfile();
                return true;
            } catch (error) {
                console.error("Error updating profile:", error);
                return false;
            }
        }
    }["DataProvider.useCallback[handleUpdateProfile]"], [
        currentUserId,
        profile
    ]);
    const handleUploadAvatar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DataProvider.useCallback[handleUploadAvatar]": async (file)=>{
            if (!currentUserId) return false;
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadUserAvatar"])(currentUserId, file);
                await refreshProfile();
                return true;
            } catch (error) {
                console.error("Error uploading avatar:", error);
                return false;
            }
        }
    }["DataProvider.useCallback[handleUploadAvatar]"], [
        currentUserId
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DataProvider.useMemo[value]": ()=>({
                currentUser,
                isAuthenticated: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? true : authIsAuthenticated,
                loading: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"] ? false : authLoading || dataLoading,
                trips,
                users: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"],
                conversations,
                bookings,
                notifications,
                reviews,
                countries,
                currencies,
                totalUnreadMessages,
                totalUnreadNotifications,
                refreshTrips,
                refreshNotifications,
                refreshBookings,
                createTrip: handleCreateTrip,
                createReview: handleCreateReview,
                updateUserProfile: handleUpdateProfile,
                uploadProfileAvatar: handleUploadAvatar,
                useMockData: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$data$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USE_MOCK_DATA"]
            })
    }["DataProvider.useMemo[value]"], [
        currentUser,
        authIsAuthenticated,
        authLoading,
        dataLoading,
        trips,
        conversations,
        bookings,
        notifications,
        reviews,
        countries,
        currencies,
        totalUnreadMessages,
        totalUnreadNotifications,
        refreshTrips,
        refreshNotifications,
        refreshBookings,
        handleCreateTrip,
        handleCreateReview,
        handleUpdateProfile,
        handleUploadAvatar,
        refreshProfile
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DataContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/data-provider.tsx",
        lineNumber: 286,
        columnNumber: 10
    }, this);
}
_s(DataProvider, "UPN8HKPDtTPNUKxMshrjIWH5A6M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$realtime$2d$messages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRealtimeConversations"]
    ];
});
_c = DataProvider;
function useData() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
_s1(useData, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "DataProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_ce165c43._.js.map