import { PublicCard, PublicCardHeader, PublicCardTitle, PublicCardContent } from "@/components/public/partials/PublicCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Wrench, Hammer, Building } from "lucide-react"

const ProgramsSection = () => {
  const programs = [
    {
      icon: <Building className="h-12 w-12 text-primary" />,
      title: "Maestro Mayor de Obra",
      description: "Formación integral en construcción, supervisión de obras, gestión de equipos y administración de proyectos de construcción.",
      duration: "3 años",
      features: [
        "Construcción de estructuras",
        "Instalaciones sanitarias y eléctricas",
        "Topografía y mensura",
        "Gestión de obras",
        "Dibujo técnico"
      ]
    },
    {
      icon: <Hammer className="h-12 w-12 text-primary" />,
      title: "Técnico en Construcciones",
      description: "Especialización en técnicas constructivas modernas, materiales y procesos de construcción.",
      duration: "2 años",
      features: [
        "Tecnología constructiva",
        "Mampostería y hormigón",
        "Instalaciones básicas",
        "Planos y croquis",
        "Seguridad e higiene"
      ]
    },
    {
      icon: <Wrench className="h-12 w-12 text-primary" />,
      title: "Instalaciones Sanitarias",
      description: "Técnicas especializadas en diseño e instalación de sistemas sanitarios, gas y climatización.",
      duration: "2 años",
      features: [
        "Sistemas de agua potable",
        "Instalaciones de gas",
        "Climatización y refrigeración",
        "Mantenimiento preventivo",
        "Normativas técnicas"
      ]
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestras Carreras
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Desarrolla tu potencial profesional con nuestras carreras técnicas diseñadas
            para el mercado actual. Conoce nuestras especialidades:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <PublicCard key={index} variant="shadow" className="flex flex-col h-full">
              <PublicCardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {program.icon}
                </div>
                <PublicCardTitle className="text-2xl">{program.title}</PublicCardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                  Duración: {program.duration}
                </p>
              </PublicCardHeader>
              <PublicCardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4">
                  {program.description}
                </p>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">Plan de estudio incluye:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Más información
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </PublicCardContent>
            </PublicCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Ver todos los planes de estudio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection
