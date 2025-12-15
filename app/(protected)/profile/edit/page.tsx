"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
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
          <p>Chargement du profil...</p>
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
              <h1 className="text-2xl font-bold">Modifier le profil</h1>
              <p className="text-muted-foreground">Mettez à jour vos informations</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Photo de profil</CardTitle>
                <CardDescription>Votre photo sera visible par tous les utilisateurs</CardDescription>
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
                      {isUploading ? "Chargement..." : "Changer la photo"}
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG ou GIF. Max 5MB.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled // Email is not editable for now
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="phone-input-container">
                    <PhoneInput
                      placeholder="Numéro de téléphone"
                      value={formData.phone}
                      onChange={(value: string | undefined) => setFormData({ ...formData, phone: value || "" })}
                      defaultCountry="FR"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Parlez un peu de vous..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">{formData.bio.length}/500 caractères</p>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Langues parlées</CardTitle>
                <CardDescription>Indiquez les langues que vous parlez</CardDescription>
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
                      <SelectValue placeholder="Ajouter une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Français">Français</SelectItem>
                      <SelectItem value="Anglais">Anglais</SelectItem>
                      <SelectItem value="Espagnol">Espagnol</SelectItem>
                      <SelectItem value="Arabe">Arabe</SelectItem>
                      <SelectItem value="Portugais">Portugais</SelectItem>
                      <SelectItem value="Allemand">Allemand</SelectItem>
                      <SelectItem value="Italien">Italien</SelectItem>
                      <SelectItem value="Wolof">Wolof</SelectItem>
                      <SelectItem value="Bambara">Bambara</SelectItem>
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
                  Annuler
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={isSaving || isUploading} className="flex-1 gap-2">
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {isSaving ? "Sauvegarde..." : "Enregistrer"}
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
