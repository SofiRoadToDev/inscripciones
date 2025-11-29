import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PublicCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "hover" | "border" | "shadow" | "primary"
}

export const PublicCard = ({
  children,
  className,
  variant = "default"
}: PublicCardProps) => {
  const variants = {
    default: "",
    hover: "hover:shadow-lg transition-shadow",
    border: "border-2 hover:border-primary transition-colors",
    shadow: "shadow-md hover:shadow-lg transition-shadow",
    primary: "bg-primary text-primary-foreground"
  }

  return (
    <Card className={cn(variants[variant], className)}>
      {children}
    </Card>
  )
}

export const PublicCardHeader = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <CardHeader className={className}>
      {children}
    </CardHeader>
  )
}

export const PublicCardTitle = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <CardTitle className={className}>
      {children}
    </CardTitle>
  )
}

export const PublicCardContent = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <CardContent className={className}>
      {children}
    </CardContent>
  )
}
