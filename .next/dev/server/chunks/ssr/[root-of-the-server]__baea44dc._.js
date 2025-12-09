module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/theme-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ThemeProvider({ children }) {
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("light");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const savedTheme = localStorage.getItem("kiloshare-theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        }
    }, []);
    const handleSetTheme = (newTheme)=>{
        setTheme(newTheme);
        localStorage.setItem("kiloshare-theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    const toggleTheme = ()=>{
        handleSetTheme(theme === "light" ? "dark" : "light");
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme: handleSetTheme,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/theme-context.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
}),
"[project]/lib/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
        fr: "Publier une annonce",
        en: "Post an ad"
    },
    "publish.subtitle": {
        fr: "Partagez vos kilos disponibles avec des expéditeurs",
        en: "Share your available kilos with senders"
    },
    "publish.fromCity": {
        fr: "Ville de départ",
        en: "Departure city"
    },
    "publish.toCity": {
        fr: "Ville d'arrivée",
        en: "Arrival city"
    },
    "publish.departureDate": {
        fr: "Date de départ",
        en: "Departure date"
    },
    "publish.availableKg": {
        fr: "Kilos disponibles",
        en: "Available kilos"
    },
    "publish.pricePerKg": {
        fr: "Prix par kilo (€)",
        en: "Price per kilo (€)"
    },
    "publish.acceptedItems": {
        fr: "Articles acceptés",
        en: "Accepted items"
    },
    "publish.description": {
        fr: "Description (optionnel)",
        en: "Description (optional)"
    },
    "publish.submit": {
        fr: "Publier l'annonce",
        en: "Post ad"
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
}),
"[project]/lib/language-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const defaultContext = {
    language: "fr",
    setLanguage: ()=>{},
    t: (key)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTranslation"])(key, "fr")
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(defaultContext);
function LanguageProvider({ children }) {
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("fr");
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
        const savedLanguage = localStorage.getItem("kiloshare-language");
        if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
            setLanguageState(savedLanguage);
        }
    }, []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("kiloshare-language", lang);
        document.documentElement.lang = lang;
    };
    const t = (key)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTranslation"])(key, language);
    };
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
            value: defaultContext,
            children: children
        }, void 0, false, {
            fileName: "[project]/lib/language-context.tsx",
            lineNumber: 43,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
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
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    return context;
}
}),
"[project]/lib/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://vnghkdxyurxdlvrvuttn.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZ2hrZHh5dXJ4ZGx2cnZ1dHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjIxNTUsImV4cCI6MjA4MDc5ODE1NX0.WAGi5Lw7unVvZ2ExAb921Ad-jJOekfP5PGG7WNDhaSg"));
}
}),
"[project]/lib/hooks/use-auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useAuth() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (userId)=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
        setProfile(data);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])();
        // Récupérer la session initiale
        supabase.auth.getSession().then(({ data: { session } })=>{
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            }
            setLoading(false);
        });
        // Écouter les changements d'auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session)=>{
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return ()=>subscription.unsubscribe();
    }, [
        fetchProfile
    ]);
    return {
        user,
        profile,
        loading,
        isAuthenticated: !!user
    };
}
}),
"[project]/lib/mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/data-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DataProvider",
    ()=>DataProvider,
    "useData",
    ()=>useData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const DataContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function DataProvider({ children }) {
    const { user, profile, loading, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // Pour l'instant, on utilise les données mock
    // Quand la base sera peuplée, on basculera sur les vraies données
    const useMockData = true;
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"][0] // Mock current user
            ;
        }
        //TURBOPACK unreachable
        ;
    }, [
        profile,
        useMockData
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            currentUser,
            isAuthenticated: ("TURBOPACK compile-time truthy", 1) ? true : "TURBOPACK unreachable",
            loading: ("TURBOPACK compile-time truthy", 1) ? false : "TURBOPACK unreachable",
            trips: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockTrips"],
            users: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockUsers"],
            conversations: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockConversations"],
            bookings: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockBookings"],
            notifications: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockNotifications"],
            reviews: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockReviews"],
            useMockData
        }), [
        currentUser,
        isAuthenticated,
        loading,
        useMockData
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DataContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/data-provider.tsx",
        lineNumber: 81,
        columnNumber: 10
    }, this);
}
function useData() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__baea44dc._.js.map