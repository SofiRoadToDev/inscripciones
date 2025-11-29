import { PublicCard, PublicCardContent } from "@/components/public/partials/PublicCard"

const StatsSection = () => {
  const stats = [
    {
      number: "30+",
      label: "Años de experiencia",
      description: "Formando técnicos especializados"
    },
    {
      number: "1000+",
      label: "Egresados",
      description: "Profesionales trabajando en el sector"
    },
    {
      number: "95%",
      label: "Empleabilidad",
      description: "De nuestros graduados"
    },
    {
      number: "100%",
      label: "Prácticas",
      description: "En talleres equipados"
    }
  ]

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Números que Nos Respaldan
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            La confianza de cientos de familias y el reconocimiento del sector
            constructor nos posicionan como una institución líder.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <PublicCard key={index} className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
              <PublicCardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm opacity-80">
                    {stat.description}
                  </div>
                </div>
              </PublicCardContent>
            </PublicCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
