"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
import { fetchUserSettings, updateUserSettings } from "@/lib/services/data-service"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  Star,
  MessageSquare,
  Heart,
  Check,
  Loader2,
} from "@/components/icons"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/translations"
import type { UserSettings } from "@/lib/types"
import { useCurrency } from "@/lib/hooks/use-currency"
import { cn } from "@/lib/utils"

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
  const { isAuthenticated, currentUser } = useData()
  const router = useRouter()

  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { currencies, setCurrency } = useCurrency()

  useEffect(() => {
    // ... existing loadSettings effect
    const loadSettings = async () => {
      if (currentUser && isAuthenticated) {
        try {
          const userSettings = await fetchUserSettings(currentUser.id)
          setSettings(userSettings)
          if (userSettings.preferences.language !== language) {
            setLanguage(userSettings.preferences.language as Language)
          }
        } catch (error) {
          console.error("Failed to load user settings:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadSettings()
  }, [currentUser, isAuthenticated, setLanguage])

  const [appRating, setAppRating] = useState(0)
  const [appHoverRating, setAppHoverRating] = useState(0)
  const [feedbackCategory, setFeedbackCategory] = useState("general")
  const [appFeedback, setAppFeedback] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const updateNotification = async (key: keyof UserSettings["notifications"], value: boolean) => {
    const newSettings = {
      ...settings,
      notifications: { ...settings.notifications, [key]: value },
    }
    setSettings(newSettings)
    if (currentUser) {
      try {
        await updateUserSettings(currentUser.id, newSettings)
      } catch (error) {
        console.error("Failed to update notification settings:", error)
      }
    }
  }

  const updatePrivacy = async (key: keyof UserSettings["privacy"], value: boolean) => {
    const newSettings = {
      ...settings,
      privacy: { ...settings.privacy, [key]: value },
    }
    setSettings(newSettings)
    if (currentUser) {
      try {
        await updateUserSettings(currentUser.id, newSettings)
      } catch (error) {
        console.error("Failed to update privacy settings:", error)
      }
    }
  }

  const updatePreference = async (key: keyof UserSettings["preferences"], value: string | boolean) => {
    const newSettings = {
      ...settings,
      preferences: { ...settings.preferences, [key]: value },
    }
    setSettings(newSettings)

    if (currentUser) {
      try {
        await updateUserSettings(currentUser.id, newSettings)
        
        // If currency changed, update global app state (will likely reload page)
        if (key === 'currency' && typeof value === 'string') {
           setCurrency(value) 
        }
      } catch (error) {
        console.error("Failed to save preference setting:", error)
      }
    } else if (key === 'currency' && typeof value === 'string') {
        // Even if not logged in, allow changing currency in settings if exposed (though this page is protected usually)
        setCurrency(value)
    }
  }

  // ... rest of handlers including handleLanguageChange ...
  const handleLanguageChange = (newLang: string) => {
    updatePreference("language", newLang)
    setLanguage(newLang as Language)
  }

  const handleDarkModeToggle = (checked: boolean) => {
    toggleTheme()
    updatePreference("darkMode", checked)
  }

  const handleSubmitFeedback = () => {
    // In a real app, send to backend
    console.log({
      rating: appRating,
      category: feedbackCategory,
      feedback: appFeedback,
      user: currentUser?.id
    })
    
    setFeedbackSubmitted(true)
    
    setTimeout(() => {
      setAppRating(0)
      setFeedbackCategory("general")
      setAppFeedback("")
      setFeedbackSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">{t("settings.title")}</h1>
            <p className="text-muted-foreground">{t("settings.subtitle")}</p>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="w-full flex-wrap h-auto gap-1 p-1 bg-secondary">
              <TabsTrigger value="notifications" className="gap-2 flex-1 min-w-[100px]">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">{t("settings.notifications")}</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2 flex-1 min-w-[100px]">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">{t("settings.privacy")}</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2 flex-1 min-w-[100px]">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{t("settings.preferences")}</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 flex-1 min-w-[100px]">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">{t("settings.security")}</span>
              </TabsTrigger>
              <TabsTrigger value="feedback" className="gap-2 flex-1 min-w-[100px]">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">{t("settings.feedback")}</span>
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("settings.notificationChannels")}</CardTitle>
                  <CardDescription>{t("settings.notificationChannelsDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">{t("settings.email")}</Label>
                        <p className="text-sm text-muted-foreground">{t("settings.emailNotif")}</p>
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
                        <Label className="font-medium">{t("settings.push")}</Label>
                        <p className="text-sm text-muted-foreground">{t("settings.pushNotif")}</p>
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
                        <Label className="font-medium">{t("settings.sms")}</Label>
                        <p className="text-sm text-muted-foreground">{t("settings.smsNotif")}</p>
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
                  <CardTitle className="text-base">{t("settings.notificationTypes")}</CardTitle>
                  <CardDescription>{t("settings.notificationTypesDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "newBookings", labelKey: "settings.newBookings", descKey: "settings.newBookingsDesc" },
                    { key: "messages", labelKey: "settings.messagesNotif", descKey: "settings.messagesNotifDesc" },
                    { key: "reviews", labelKey: "settings.reviewsNotif", descKey: "settings.reviewsNotifDesc" },
                    { key: "reminders", labelKey: "settings.reminders", descKey: "settings.remindersDesc" },
                    { key: "promotions", labelKey: "settings.promotions", descKey: "settings.promotionsDesc" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">{t(item.labelKey as any)}</Label>
                        <p className="text-sm text-muted-foreground">{t(item.descKey as any)}</p>
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
                  <CardTitle className="text-base">{t("settings.profileVisibility")}</CardTitle>
                  <CardDescription>{t("settings.profileVisibilityDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{t("settings.showPhone")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.showPhoneDesc")}</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showPhone}
                      onCheckedChange={(checked) => updatePrivacy("showPhone", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{t("settings.showEmail")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.showEmailDesc")}</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => updatePrivacy("showEmail", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{t("settings.lastSeen")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.lastSeenDesc")}</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showLastSeen}
                      onCheckedChange={(checked) => updatePrivacy("showLastSeen", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">{t("settings.searchEngines")}</Label>
                      <p className="text-sm text-muted-foreground">{t("settings.searchEnginesDesc")}</p>
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
                  <CardTitle className="text-base">{t("settings.personalData")}</CardTitle>
                  <CardDescription>{t("settings.personalDataDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                    <Download className="h-4 w-4" />
                    {t("settings.downloadData")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t("settings.deleteAccount")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("settings.languageRegion")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("settings.language")}</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("settings.currency")}</Label>
                    <Select
                      value={settings.preferences.currency}
                      onValueChange={(value) => updatePreference("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                           <SelectItem key={currency.code} value={currency.code}>
                             {currency.name} ({currency.symbol})
                           </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("settings.timezone")}</Label>
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
                  <CardTitle className="text-base">{t("settings.appearance")}</CardTitle>
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
                        <Label className="font-medium">{t("settings.darkMode")}</Label>
                        <p className="text-sm text-muted-foreground">
                          {theme === "dark" ? t("settings.darkModeOn") : t("settings.darkModeOff")}
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
                  <CardTitle className="text-base">{t("settings.password")}</CardTitle>
                  <CardDescription>{t("settings.passwordDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("settings.currentPassword")}</Label>
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
                    <Label>{t("settings.newPassword")}</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("settings.confirmPassword")}</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button>{t("settings.updatePassword")}</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("settings.twoFactor")}</CardTitle>
                  <CardDescription>{t("settings.twoFactorDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t("settings.twoFactorDisabled")}</p>
                      <p className="text-sm text-muted-foreground">{t("settings.twoFactorDesc")}</p>
                    </div>
                    <Button variant="outline">{t("settings.twoFactorEnable")}</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("settings.activeSessions")}</CardTitle>
                  <CardDescription>{t("settings.activeSessionsDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">iPhone 15 Pro - Paris</p>
                        <p className="text-xs text-muted-foreground">{t("settings.currentSession")}</p>
                      </div>
                    </div>
                    <span className="text-xs text-success font-medium">Active</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("settings.logoutAll")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t("settings.feedbackTitle")}</CardTitle>
                  <CardDescription>{t("settings.feedbackDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* App Rating */}
                  <div className="space-y-3">
                    <Label>{t("settings.rateApp")}</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setAppRating(star)}
                          onMouseEnter={() => setAppHoverRating(star)}
                          onMouseLeave={() => setAppHoverRating(0)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={cn(
                              "h-8 w-8 transition-colors",
                              (appHoverRating || appRating) >= star
                                ? "fill-warning text-warning"
                                : "text-muted-foreground",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Category */}
                  <div className="space-y-2">
                    <Label>{t("settings.feedbackCategory")}</Label>
                    <Select value={feedbackCategory} onValueChange={setFeedbackCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{t("settings.categoryGeneral")}</SelectItem>
                        <SelectItem value="bug">{t("settings.categoryBug")}</SelectItem>
                        <SelectItem value="suggestion">{t("settings.categorySuggestion")}</SelectItem>
                        <SelectItem value="complaint">{t("settings.categoryComplaint")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Feedback Text */}
                  <div className="space-y-2">
                    <Label>{t("settings.feedback")}</Label>
                    <Textarea
                      placeholder={t("settings.feedbackPlaceholder")}
                      value={appFeedback}
                      onChange={(e) => setAppFeedback(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button onClick={handleSubmitFeedback} disabled={appRating === 0 && !appFeedback} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t("settings.submitFeedback")}
                  </Button>
                </CardContent>
              </Card>

              {/* Success Dialog */}
              <Dialog open={feedbackSubmitted} onOpenChange={setFeedbackSubmitted}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="h-5 w-5 text-success" />
                      </div>
                      {t("settings.feedbackThanks")}
                    </DialogTitle>
                    <DialogDescription>{t("settings.feedbackReceived")}</DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
