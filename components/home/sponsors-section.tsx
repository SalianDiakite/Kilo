import Image from "next/image"

const sponsors = [
  { name: "Air France", logo: "/air-france-logo-simple.jpg" },
  { name: "Royal Air Maroc", logo: "/ram-logo-simple.jpg" },
  { name: "Brussels Airlines", logo: "/brussels-airlines-logo-simple.jpg" },
  { name: "Ethiopian Airlines", logo: "/ethiopian-airlines-logo-simple.jpg" },
  { name: "Turkish Airlines", logo: "/turkish-airlines-logo-simple.jpg" },
  { name: "Emirates", logo: "/emirates-logo-simple.jpg" },
]

export function SponsorsSection() {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Nos voyageurs voyagent avec les meilleures compagnies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="relative h-8 w-24 md:w-28 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <Image src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
