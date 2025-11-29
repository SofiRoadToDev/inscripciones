import { PublicCard, PublicCardContent } from "@/components/public/partials/PublicCard"
import { GraduationCap, Users, Trophy } from "lucide-react"

const AboutSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre Nuestra Escuela
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Formamos profesionales técnicos especializados con más de 30 años de experiencia
            en la educación técnica, preparando maestros mayores de obra competitivos y capacitados
            para los desafíos del sector constructor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PublicCard variant="border">
            <PublicCardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Formación Técnica</h3>
                <p className="text-muted-foreground">
                  Programas diseñados con estándares actuales del sector, combinando teoría
                  y práctica para una formación integral.
                </p>
              </div>
            </PublicCardContent>
          </PublicCard>

          <PublicCard variant="border">
            <PublicCardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Equipo Docente</h3>
                <p className="text-muted-foreground">
                  Profesores con amplia experiencia profesional en el campo de la construcción
                  y la educación técnica.
                </p>
              </div>
            </PublicCardContent>
          </PublicCard>

          <PublicCard variant="border">
            <PublicCardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
                <p className="text-muted-foreground">
                  Reconocidos por la calidad de nuestros egresados, quienes se destacan
                  en el mercado laboral regional.
                </p>
              </div>
            </PublicCardContent>
          </PublicCard>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
