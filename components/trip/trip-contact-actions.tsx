"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useData } from "@/lib/data-provider"
import { createNewBooking } from "@/lib/services/data-service"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppIcon, MessageCircle, ShoppingBag, Loader2, Check } from "@/components/icons"
import { toast } from "sonner"

interface TripContactActionsProps {
  tripId: string
  supplierId: string
  whatsappLink: string | null
  pricePerKg: number
  currency: string
  availableKg: number
  variant: "desktop" | "mobile"
}

export function TripContactActions({ 
  tripId,
  supplierId,
  whatsappLink, 
  pricePerKg,
  currency,
  availableKg,
  variant 
}: TripContactActionsProps) {
  const { isAuthenticated, currentUser } = useData()
  const router = useRouter()
  const supabase = createClient()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isStartingChat, setIsStartingChat] = useState(false)
  
  // Reservation state
  const [showReserveDialog, setShowReserveDialog] = useState(false)
  const [kgRequested, setKgRequested] = useState<number>(1)
  const [itemDescription, setItemDescription] = useState("")
  const [isReserving, setIsReserving] = useState(false)
  const [reserveSuccess, setReserveSuccess] = useState(false)

  const handleStartChat = async () => {
    if (!currentUser || currentUser.id === supplierId) {
        toast.info("Vous ne pouvez pas démarrer une conversation avec vous-même.")
        return
    }

    setIsStartingChat(true)
    try {
        const { data: conversationId, error } = await supabase.rpc("get_or_create_conversation", {
            p_other_user_id: supplierId,
            p_trip_id: tripId,
        })

        if (error) throw error

        if (conversationId) {
            router.push(`/messages?conversation=${conversationId}`)
        } else {
            throw new Error("Could not create or find conversation.")
        }
    } catch (err) {
        console.error("Failed to start chat:", err)
        toast.error("Impossible de démarrer la conversation.")
    } finally {
        setIsStartingChat(false)
    }
  }

  const handleContact = (action: "chat" | "whatsapp" | "reserve") => {
    if (!isAuthenticated) {
      setShowLoginDialog(true)
      return
    }

    if (action === "chat") {
      handleStartChat()
    } else if (action === "whatsapp" && whatsappLink) {
      window.open(whatsappLink, "_blank", "noopener,noreferrer")
    } else if (action === "reserve") {
      setShowReserveDialog(true)
    }
  }

  const handleReserve = async () => {
    if (!currentUser) return
    
    setIsReserving(true)
    try {
      const totalPrice = kgRequested * pricePerKg
      
      const result = await createNewBooking({
        tripId,
        senderId: currentUser.id,
        kgRequested,
        totalPrice,
        itemDescription
      })

      if (result) {
        setReserveSuccess(true)
        toast.success("Demande de réservation envoyée !")
        setTimeout(() => {
            setShowReserveDialog(false)
            setReserveSuccess(false)
            setKgRequested(1)
            setItemDescription("")
        }, 2000)
      } else {
        toast.error("Échec de la réservation")
      }
    } catch (error) {
      console.error("Booking failed:", error)
      toast.error("Une erreur est survenue")
    } finally {
      setIsReserving(false)
    }
  }

  const LoginDialog = (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Action requise</DialogTitle>
          <DialogDescription>
            Vous devez être connecté pour contacter un utilisateur ou réserver. Créez un compte ou connectez-vous.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start gap-2">
          <Link href="/login" className="flex-1">
            <Button type="button" className="w-full">
              Se connecter
            </Button>
          </Link>
          <Link href="/signup" className="flex-1">
            <Button type="button" variant="secondary" className="w-full">
              Créer un compte
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const ReserveDialog = (
    <Dialog open={showReserveDialog} onOpenChange={setShowReserveDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Réserver des kilos</DialogTitle>
          <DialogDescription>
            Envoyez une demande de réservation au voyageur. Le paiement se fait lors de la remise du colis.
          </DialogDescription>
        </DialogHeader>
        
        {!reserveSuccess ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label>Poids (kg)</Label>
                 <Input 
                    type="number" 
                    min={1} 
                    max={availableKg}
                    value={kgRequested}
                    onChange={(e) => setKgRequested(Math.min(Number(e.target.value), availableKg))}
                 />
                 <p className="text-xs text-muted-foreground">Max: {availableKg} kg</p>
               </div>
               <div className="space-y-2">
                 <Label>Prix total</Label>
                 <div className="flex h-10 items-center rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm font-bold">
                    {kgRequested * pricePerKg} {currency}
                 </div>
               </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description du colis</Label>
              <Textarea 
                placeholder="Ex: Vêtements, documents, électronique..."
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </div>

            <Button onClick={handleReserve} disabled={isReserving || kgRequested < 1 || !itemDescription} className="w-full mt-4">
              {isReserving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
              Confirmer la réservation
            </Button>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
               <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Demande envoyée !</h3>
            <p className="text-muted-foreground">Le voyageur a été notifié de votre demande.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  if (variant === "desktop") {
    return (
      <>
        {LoginDialog}
        {ReserveDialog}
        <div className="space-y-3">
          <Button onClick={() => handleContact("reserve")} className="w-full gap-2" size="lg">
             <ShoppingBag className="h-5 w-5" />
             Réserver
          </Button>

          <Button onClick={() => handleContact("chat")} variant="secondary" className="w-full gap-2" size="lg" disabled={isStartingChat}>
            {isStartingChat ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
            Contacter via l'app
          </Button>

          {whatsappLink && (
            <Button
              onClick={() => handleContact("whatsapp")}
              variant="outline"
              className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white border-[#25D366] hover:border-[#20BD5A]"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Contacter via WhatsApp
            </Button>
          )}
        </div>
      </>
    )
  }

  if (variant === "mobile") {
    return (
      <>
        {LoginDialog}
        {ReserveDialog}
        <div className="flex gap-2 w-full">
           <Button onClick={() => handleContact("reserve")} className="flex-1 gap-2" size="lg">
             <ShoppingBag className="h-5 w-5" />
             Réserver
           </Button>
           
          {whatsappLink && (
            <Button
              onClick={() => handleContact("whatsapp")}
              size="lg"
              variant="outline"
              className="px-3 bg-[#25D366] hover:bg-[#20BD5A] text-white border-[#25D366]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </Button>
          )}
          
          <Button onClick={() => handleContact("chat")} size="lg" variant="secondary" className="px-3" disabled={isStartingChat}>
            {isStartingChat ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
          </Button>
        </div>
      </>
    )
  }

  return null
}
