import { Header } from "@/components/ui/header"
import { MobileNav } from "@/components/ui/mobile-nav"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardClient } from "./dashboard-client"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 pb-20 lg:pb-0">
          <DashboardClient />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
