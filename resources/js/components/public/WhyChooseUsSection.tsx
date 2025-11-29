import { PublicCard, PublicCardContent } from "@/components/public/partials/PublicCard"
import { CheckCircle, Clock, BookOpen, Users2 } from "lucide-react"

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Formación Práctica",
      description: "Más del 70% de nuestra currícula es práctica, con talleres completamente equipados y proyectos reales."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Certificación Oficial",
      description: "Títulos reconocidos oficialmente, con validez nacional y registro ministerial."
    },
    {
      icon: <Users2 className="h-6 w-6 text-primary" />,
      title: "Inserción Laboral",
      description: "Convenios con empresas del sector y seguimiento de nuestros egresados para facilitar su inserción laboral."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Horarios Flexibles",
      description: "Turnos mañana y tarde para que puedas estudiar y trabajar, adaptándonos a tus necesidades."
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nuestra propuesta educativa está orientada a la empleabilidad y el desarrollo
            profesional, combinando tradición y modernidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <PublicCard key={index} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
              <PublicCardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
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

export default WhyChooseUsSection
