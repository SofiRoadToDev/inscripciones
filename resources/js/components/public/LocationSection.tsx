import { PublicCard, PublicCardHeader, PublicCardTitle, PublicCardContent } from "@/components/public/partials/PublicCard"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const LocationSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ubicación y Contacto
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Visitanos para conocer nuestras instalaciones. Estamos aquí para resolver
            todas tus dudas sobre las carreras y el proceso de inscripción.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <PublicCard>
            <PublicCardHeader>
              <PublicCardTitle className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                Ubicación
              </PublicCardTitle>
            </PublicCardHeader>
            <PublicCardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Mapa Interactivo</p>
                    <p className="text-sm">Av. Educación Técnica 3107</p>
                    <p className="text-sm">Ciudad Autónoma de Buenos Aires</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Av. Educación Técnica 3107, CABA</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A 5 cuadras de la estación de tren, con fácil acceso en transporte público.
                  </p>
                </div>
              </div>
            </PublicCardContent>
          </PublicCard>

          <PublicCard>
            <PublicCardHeader>
              <PublicCardTitle>Información de Contacto</PublicCardTitle>
            </PublicCardHeader>
            <PublicCardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+54 11 4567-8900</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@et3107.edu.ar</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Horarios de Atención</p>
                    <div className="text-sm text-muted-foreground space-y-1 mt-1">
                      <p>Lunes a Viernes: 8:00 - 18:00</p>
                      <p>Sábados: 9:00 - 12:00</p>
                      <p className="text-xs text-primary font-medium">Período de inscripciones: Agosto a Noviembre</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    ¿Tenés consultas sobre las carreras?
                    <span className="font-medium text-foreground"> ¡Contactanos!</span>
                    Nuestro equipo está disponible para asesorarte.
                  </p>
                </div>
              </div>
            </PublicCardContent>
          </PublicCard>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
