"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
import { useLanguage } from "@/lib/language-context"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MobileNav } from "@/components/ui/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, ArrowLeft, Check, X, Plus, Loader2 } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

export default function EditProfilePage() {
  const { currentUser, updateUserProfile, uploadProfileAvatar } = useData()
  const { t } = useLanguage()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    languages: [] as string[],
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (currentUser && !isInitialized) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        bio: currentUser.bio || "",
        languages: currentUser.languages || [],
      })
      setIsInitialized(true)
    }
  }, [currentUser, isInitialized])

  const [newLanguage, setNewLanguage] = useState("")

  const handleAddLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage],
      })
      setNewLanguage("")
    }
  }

  const handleRemoveLanguage = (lang: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== lang),
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = await updateUserProfile({
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
        languages: formData.languages,
      })
      if (success) {
        router.push("/profile")
      } else {
        // Handle error with a toast or message
        console.error("Failed to update profile")
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      await uploadProfileAvatar(file)
      // The DataProvider will update the currentUser, and the component will re-render
    } catch (error) {
      console.error("Failed to upload avatar:", error)
      // Handle error with a toast or message
    } finally {
      setIsUploading(false)
    }
  }

  if (!currentUser) {
    // Optional: show a loading state while currentUser is being fetched
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>{t("profile.edit.loadingProfile")}</p>
        </main>
        <Footer />
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0 bg-secondary/20">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{t("profile.edit.title")}</h1>
              <p className="text-muted-foreground">{t("profile.edit.subtitle")}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("profile.edit.profilePicture")}</CardTitle>
                <CardDescription>{t("profile.edit.profilePictureDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden group">
                      <Image
                        src={currentUser.avatar || "/placeholder.svg?height=96&width=96&query=user"}
                        alt={currentUser.name || "Avatar"}
                        fill
                        className="object-cover"
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAvatarClick}
                      disabled={isUploading}
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg, image/gif"
                      className="hidden"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" onClick={handleAvatarClick} disabled={isUploading}>
                      {isUploading ? t("profile.edit.uploading") : t("profile.edit.changePicture")}
                    </Button>
                    <p className="text-xs text-muted-foreground">{t("profile.edit.pictureFormat")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("profile.edit.personalInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("profile.edit.fullName")}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("profile.edit.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled // Email is not editable for now
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("profile.edit.phone")}</Label>
                  <div className="phone-input-container">
                    <PhoneInput
                      placeholder={t("profile.edit.phoneNumber")}
                      value={formData.phone}
                      onChange={(value: string | undefined) => setFormData({ ...formData, phone: value || "" })}
                      defaultCountry="FR"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">{t("profile.edit.bio")}</Label>
                  <Textarea
                    id="bio"
                    placeholder={t("profile.edit.bioPlaceholder")}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.bio.length}/500 {t("profile.edit.characters")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("profile.edit.spokenLanguages")}</CardTitle>
                <CardDescription>{t("profile.edit.spokenLanguagesDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="gap-1 pr-1">
                      {lang}
                      <button onClick={() => handleRemoveLanguage(lang)} className="ml-1 hover:bg-muted rounded p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Select value={newLanguage} onValueChange={setNewLanguage}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder={t("profile.edit.addLanguage")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Français">{t("languages.french")}</SelectItem>
                      <SelectItem value="Anglais">{t("languages.english")}</SelectItem>
                      <SelectItem value="Espagnol">{t("languages.spanish")}</SelectItem>
                      <SelectItem value="Arabe">{t("languages.arabic")}</SelectItem>
                      <SelectItem value="Portugais">{t("languages.portuguese")}</SelectItem>
                      <SelectItem value="Allemand">{t("languages.german")}</SelectItem>
                      <SelectItem value="Italien">{t("languages.italian")}</SelectItem>
                      <SelectItem value="Wolof">{t("languages.wolof")}</SelectItem>
                      <SelectItem value="Bambara">{t("languages.bambara")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={handleAddLanguage} disabled={!newLanguage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex gap-3">
              <Link href="/profile" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  {t("common.cancel")}
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={isSaving || isUploading} className="flex-1 gap-2">
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {isSaving ? t("profile.edit.saving") : t("profile.edit.save")}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
