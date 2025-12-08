import { Package, Users, Plane, Globe } from "@/components/icons"

const stats = [
  { icon: Package, value: "10,000+", label: "Colis livrés" },
  { icon: Users, value: "5,000+", label: "Utilisateurs" },
  { icon: Plane, value: "150+", label: "Destinations" },
  { icon: Globe, value: "45+", label: "Pays couverts" },
]

export function StatsSection() {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 mx-auto mb-3">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
