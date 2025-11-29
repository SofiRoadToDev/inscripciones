import PublicLayout from "@/layouts/public/PublicLayout"
import AboutSection from "@/components/public/AboutSection"
import StatsSection from "@/components/public/StatsSection"
import ProgramsSection from "@/components/public/ProgramsSection"
import WhyChooseUsSection from "@/components/public/WhyChooseUsSection"
import LocationSection from "@/components/public/LocationSection"

const home = () => {
  return (
    <PublicLayout>

        <AboutSection />
        <StatsSection />
        <ProgramsSection />
        <WhyChooseUsSection />
        <LocationSection />

    </PublicLayout>
  )
}

export default home
