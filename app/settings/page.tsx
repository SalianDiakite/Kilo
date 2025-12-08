"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Lock,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Trash2,
  Download,
  LogOut,
} from "@/components/icons"
import { useTheme } from "@/lib/theme-context"
import type { UserSettings } from "@/lib/types"

const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    newBookings: true,
    messages: true,
    reviews: true,
    promotions: false,
    reminders: true,
  },
  privacy: {
    showPhone: false,
    showEmail: false,
    showLastSeen: true,
    allowSearchEngines: true,
  },
  preferences: {
    language: "fr",
    currency: "EUR",
    timezone: "Europe/Paris",
    darkMode: false,
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [showPassword, setShowPassword] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const updateNotification = (key: keyof UserSettings["notifications"], value: boolean) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value },
    })
  }

  const updatePrivacy = (key: keyof UserSettings["privacy"], value: boolean) => {
    setSettings({
      ...settings,
      privacy: { ...settings.privacy, [key]: value },
    })
  }

  const updatePreference = (key: keyof UserSettings["preferences"], value: string | boolean) => {
    setSettings({
      ...settings,
      preferences: { ...settings.preferences, [key]: value },
    })
  }

  const handleDarkModeToggle = (checked: boolean) => {
    updatePreference("darkMode", checked)
    toggleTheme()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
            <p className="text-muted-foreground">Gérez vos préférences et votre compte</p>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="w-full flex-wrap h-auto gap-1 p-1 bg-secondary">
              <TabsTrigger value="notifications" className="gap-2 flex-1 min-w-[120px]">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2 flex-1 min-w-[120px]">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Confidentialité</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2 flex-1 min-w-[120px]">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Préférences</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 flex-1 min-w-[120px]">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Sécurité</span>
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Canaux de notification</CardTitle>
                  <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Email</Label>
                        <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateNotification("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">Push</Label>
                        <p className="text-sm text-muted-foreground">Notifications push sur mobile</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateNotification("push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">SMS</Label>
                        <p className="text-sm text-muted-foreground">Notifications par SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => updateNotification("sms", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Types de notifications</CardTitle>
                  <CardDescription>Personnalisez les notifications que vous recevez</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "newBookings", label: "Nouvelles réservations", desc: "Quand quelqu'un réserve vos kilos" },
                    { key: "messages", label: "Messages", desc: "Nouveaux messages reçus" },
                    { key: "reviews", label: "Avis", desc: "Nouveaux avis sur votre profil" },
                    { key: "reminders", label: "Rappels", desc: "Rappels de trajets à venir" },
                    { key: "promotions", label: "Promotions", desc: "Offres et actualités KiloShare" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                        onCheckedChange={(checked) =>
                          updateNotification(item.key as keyof typeof settings.notifications, checked)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Visibilité du profil</CardTitle>
                  <CardDescription>Contrôlez ce que les autres peuvent voir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Afficher mon téléphone</Label>
                      <p className="text-sm text-muted-foreground">Visible sur votre profil public</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showPhone}
                      onCheckedChange={(checked) => updatePrivacy("showPhone", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Afficher mon email</Label>
                      <p className="text-sm text-muted-foreground">Visible sur votre profil public</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => updatePrivacy("showEmail", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Dernière connexion</Label>
                      <p className="text-sm text-muted-foreground">Afficher quand vous étiez en ligne</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showLastSeen}
                      onCheckedChange={(checked) => updatePrivacy("showLastSeen", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Indexation moteurs de recherche</Label>
                      <p className="text-sm text-muted-foreground">Permettre à Google de référencer votre profil</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowSearchEngines}
                      onCheckedChange={(checked) => updatePrivacy("allowSearchEngines", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Données personnelles</CardTitle>
                  <CardDescription>Gérez vos données</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                    <Download className="h-4 w-4" />
                    Télécharger mes données
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer mon compte
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Langue et région</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Langue</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) => updatePreference("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Devise</Label>
                    <Select
                      value={settings.preferences.currency}
                      onValueChange={(value) => updatePreference("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">Dollar US ($)</SelectItem>
                        <SelectItem value="XOF">Franc CFA (XOF)</SelectItem>
                        <SelectItem value="MAD">Dirham (MAD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fuseau horaire</Label>
                    <Select
                      value={settings.preferences.timezone}
                      onValueChange={(value) => updatePreference("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Paris">Paris (UTC+1)</SelectItem>
                        <SelectItem value="Africa/Dakar">Dakar (UTC+0)</SelectItem>
                        <SelectItem value="Africa/Casablanca">Casablanca (UTC+1)</SelectItem>
                        <SelectItem value="Africa/Abidjan">Abidjan (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Apparence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {theme === "dark" ? (
                        <Moon className="h-5 w-5 text-accent" />
                      ) : (
                        <Sun className="h-5 w-5 text-warning" />
                      )}
                      <div>
                        <Label className="font-medium">Mode sombre</Label>
                        <p className="text-sm text-muted-foreground">
                          {theme === "dark" ? "Thème sombre activé" : "Thème clair activé"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={theme === "dark"} onCheckedChange={handleDarkModeToggle} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mot de passe</CardTitle>
                  <CardDescription>Modifiez votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Mot de passe actuel</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Nouveau mot de passe</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmer le mot de passe</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button>Mettre à jour le mot de passe</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Authentification à deux facteurs</CardTitle>
                  <CardDescription>Ajoutez une couche de sécurité supplémentaire</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">2FA désactivé</p>
                      <p className="text-sm text-muted-foreground">
                        Protégez votre compte avec l'authentification à deux facteurs
                      </p>
                    </div>
                    <Button variant="outline">Activer</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sessions actives</CardTitle>
                  <CardDescription>Gérez vos connexions actives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">iPhone 15 Pro - Paris</p>
                        <p className="text-xs text-muted-foreground">Session actuelle</p>
                      </div>
                    </div>
                    <span className="text-xs text-success font-medium">Active</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2 text-destructive hover:text-destructive bg-transparent"
                  >
                    <LogOut className="h-4 w-4" />
                    Déconnecter toutes les sessions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <Button size="lg">Enregistrer les modifications</Button>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
