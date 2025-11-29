# Documentación Frontend - Sistema de Inscripciones

## 📁 Estructura de Directorios - Frontend

```
/resources/js/
├── components/
│   ├── Inscripciones/
│   │   ├── AlumnoForm.tsx          # Formulario datos del alumno
│   │   ├── DomicilioFields.tsx     # Campos de dirección
│   │   ├── FichaSaludForm.tsx      # Formulario médico
│   │   ├── InscripcionForm.tsx     # Formulario principal
│   │   ├── TutoresForm.tsx         # Formulario tutores
│   │   └── Hero.tsx                # Sección hero
│   ├── public/
│   │   ├── AboutSection.tsx        # Sección acerca de
│   │   ├── LocationSection.tsx     # Información ubicación
│   │   ├── ProgramsSection.tsx     # Programas académicos
│   │   ├── StatsSection.tsx        # Estadísticas
│   │   ├── WhyChooseUsSection.tsx  # Beneficios
│   │   └── PublicCard.tsx          # Card genérico
│   ├── ui/
│   │   ├── alert.tsx              # Alertas
│   │   ├── avatar.tsx             # Avatar usuario
│   │   ├── badge.tsx              # Badges y etiquetas
│   │   ├── breadcrumb.tsx         # Breadcrumbs
│   │   ├── button.tsx             # Botones
│   │   ├── card.tsx               # Cards
│   │   ├── checkbox.tsx           # Checkbox
│   │   ├── dialog.tsx             # Modal
│   │   ├── input.tsx              # Input base
│   │   ├── select.tsx             # Select
│   │   └── [otros componentes UI] # Dropdown, Toggle, Tooltip, etc.
│   └── base/ [componentes base]    # AppHeader, AppSidebar, etc.
├── pages/
│   ├── auth/                      # Páginas autenticación
│   │   ├── login.tsx              # Login
│   │   ├── register.tsx           # Registro
│   │   ├── forgot-password.tsx    # Recuperar contraseña
│   │   ├── two-factor-challenge.tsx # Desafío 2FA
│   │   └── [otros auth]
│   ├── Inscripciones/             # Páginas inscripciones
│   │   ├── Create.tsx             # Crear inscripción
│   │   └── Show.tsx               # Ver inscripción
│   ├── admin/
│   │   └── dashboard.tsx          # Dashboard admin
│   ├── settings/
│   │   ├── profile.tsx            # Perfil usuario
│   │   ├── password.tsx           # Cambiar contraseña
│   │   ├── appearance.tsx         # Configuración tema
│   │   └── two-factor.tsx         # Configuración 2FA
│   └── public/
│       └── home.tsx               # Homepage
├── layouts/                       # Layouts principales
│   ├── app-layout.tsx             # Layout app principal
│   ├── auth-layout.tsx            # Layout autenticación
│   └── public/
│       └── PublicLayout.tsx       # Layout público
├── hooks/                         # Custom hooks
│   ├── use-appearance.tsx         # Manejo tema
│   ├── use-two-factor-auth.ts     # Hook 2FA
│   └── [otros hooks]
└── types/                         # TypeScript definitions
    ├── inscripcion.ts             # Tipos inscripciones
    └── index.d.ts                 # Tipos globales

/catalogo-frontend/               # Catálogo componentes UI
├── buttons.html                   # Botones
├── modals.html                    # Modales
├── tables.html                    # Tablas
├── badges.html                    # Badges
├── cards.html                     # Cards
├── form-styles.html               # Formularios
├── navbars.html                   # Navbars
└── parallax.html                  # Efectos parallax
```

## Stack Tecnológico Frontend

### Core Framework
- **React**: ^19.0.0 (Latest React with concurrent features)
- **TypeScript**: ^5.7.2 (Strict type checking)
- **Vite**: ^7.0.4 (Build tool and dev server)

### SPA Integration
- **@inertiajs/react**: ^2.1.4 (Inertia.js for React)

### UI Framework & Styling
- **Tailwind CSS**: ^4.0.0 (Utility-first CSS framework)
- **@tailwindcss/vite**: ^4.1.11 (Vite integration for Tailwind)
- **tailwindcss-animate**: ^1.0.7 (Animation utilities)
- **tailwind-merge**: ^3.0.1 (Utility for merging Tailwind classes)

### Component Library
- **Radix UI**: Multiple packages for accessible components
  - @radix-ui/react-avatar: ^1.1.3
  - @radix-ui/react-checkbox: ^1.1.4
  - @radix-ui/react-collapsible: ^1.1.3
  - @radix-ui/react-dialog: ^1.1.6
  - @radix-ui/react-dropdown-menu: ^2.1.6
  - @radix-ui/react-label: ^2.1.2
  - @radix-ui/react-navigation-menu: ^1.2.5
  - @radix-ui/react-select: ^2.1.6
  - @radix-ui/react-separator: ^1.1.2
  - @radix-ui/react-slot: ^1.2.3
  - @radix-ui/react-toggle: ^1.1.2
  - @radix-ui/react-toggle-group: ^1.1.2
  - @radix-ui/react-tooltip: ^1.1.8

### Additional Libraries
- **Lucide React**: ^0.475.0 (Icon library)
- **class-variance-authority**: ^0.7.1 (Utility for component variants)
- **clsx**: ^2.1.1 (Utility for conditional classes)
- **@headlessui/react**: ^2.2.0 (Headless UI components)
- **input-otp**: ^1.4.2 (OTP input component)

### Development Tools
- **@vitejs/plugin-react**: ^4.6.0 (React plugin for Vite)
- **eslint**: ^9.17.0 (Linting)
- **prettier**: ^3.4.2 (Code formatting)
- **concurrently**: ^9.0.1 (Run multiple commands simultaneously)

---

## Estructura de Directorios Detallada

### 📁 `/resources/js/`

#### 📁 Components (`js/components/`)

**Components Base:**
- `alert-error.tsx` - Componente para mostrar alertas de error
- `app-content.tsx` - Contenedor principal de contenido
- `app-header.tsx` - Header principal de la aplicación
- `app-logo-icon.tsx` - Icono del logo
- `app-logo.tsx` - Logo completo de la aplicación
- `app-shell.tsx` - Estructura shell principal
- `app-sidebar-header.tsx` - Header del sidebar
- `app-sidebar.tsx` - Barra lateral de navegación
- `appearance-dropdown.tsx` - Dropdown para cambio de tema
- `appearance-tabs.tsx` - Tabs para configuraciones
- `breadcrumbs.tsx` - Navegación de migas de pan
- `delete-user.tsx` - Componente para eliminar usuario
- `heading.tsx` - Componente de títulos
- `heading-small.tsx` - Títulos pequeños
- `icon.tsx` - Componente wrapper para iconos
- `input-error.tsx` - Validación y errores de input
- `nav-footer.tsx` - Footer de navegación
- `nav-main.tsx` - Navegación principal
- `nav-user.tsx` - Navegación de usuario
- `text-link.tsx` - Enlaces de texto estilizados
- `ThemeToggle.tsx` - Toggle para cambio de tema

**Two-Factor Authentication:**
- `two-factor-recovery-codes.tsx` - Códigos de recuperación 2FA
- `two-factor-setup-modal.tsx` - Modal de configuración 2FA

**Inscripciones (`Inscripciones/`):**
- `AlumnoForm.tsx` - Formulario para datos del alumno
- `DomicilioFields.tsx` - Campos de dirección/domicilio
- `FichaSaludForm.tsx` - Formulario de información médica
- `InscripcionForm.tsx` - Formulario principal de inscripción
- `TutoresForm.tsx` - Formulario para tutores/responsables
- `Hero.tsx` - Sección hero para inscripciones

**Public Components (`public/`):**
- `AboutSection.tsx` - Sección "Acerca de" para homepage
- `LocationSection.tsx` - Información de ubicación
- `ProgramsSection.tsx` - Programas académicos
- `StatsSection.tsx` - Estadísticas del colegio
- `WhyChooseUsSection.tsx` - Sección de beneficios
- `PublicCard.tsx` - Card genérico para sección pública

**UI Components (`ui/`):**
- `alert.tsx` - Componente alert básico
- `avatar.tsx` - Avatar de usuario
- `badge.tsx` - Badges y etiquetas
- `breadcrumb.tsx` - Breadcrumbs componentes
- `button.tsx` - Botones base
- `card.tsx` - Card base
- `checkbox.tsx` - Checkbox input
- `collapsible.tsx` - Componente collapsible
- `dialog.tsx` - Modal/dialog component
- `dropdown-menu.tsx` - Menú dropdown
- `icon.tsx` - Icono reutilizable
- `input-otp.tsx` - Input OTP para verificación
- `input.tsx` - Input base
- `label.tsx` - Label component
- `navigation-menu.tsx` - Menu de navegación
- `placeholder-pattern.tsx` - Patrones de placeholder
- `select.tsx` - Select dropdown
- `separator.tsx` - Separador visual
- `sheet.tsx` - Sheet/Drawer component
- `sidebar.tsx` - Sidebar component
- `skeleton.tsx` - Skeleton loader
- `toggle-group.tsx` - Toggle group
- `toggle.tsx` - Toggle switch
- `tooltip.tsx` - Tooltip component

#### 📁 Layouts (`js/layouts/`)

**Layouts Principales:**
- `app-layout.tsx` - Layout principal de la aplicación
- `auth-layout.tsx` - Layout para páginas de autenticación

**App Layouts (`app/`):**
- `app-header-layout.tsx` - Layout con header
- `app-sidebar-layout.tsx` - Layout con sidebar

**Auth Layouts (`auth/`):**
- `auth-card-layout.tsx` - Layout con card central
- `auth-simple-layout.tsx` - Layout simple de auth
- `auth-split-layout.tsx` - Layout dividido para auth

**Public Layouts (`public/`):**
- `PublicLayout.tsx` - Layout para páginas públicas

**Settings Layouts (`settings/`):**
- `layout.tsx` - Layout específico para configuraciones

#### 📁 Pages (`js/pages/`)

**Dashboard:**
- `dashboard.tsx` - Dashboard principal

**Admin Pages (`admin/`):**
- `dashboard.tsx` - Dashboard administrativo

**Auth Pages (`auth/`):**
- `confirm-password.tsx` - Confirmación de contraseña
- `forgot-password.tsx` - Recuperación de contraseña
- `login.tsx` - Página de login
- `register.tsx` - Página de registro
- `reset-password.tsx` - Reset de contraseña
- `two-factor-challenge.tsx` - Desafío de 2FA
- `verify-email.tsx` - Verificación de email

**Inscripciones Pages (`Inscripciones/`):**
- `Create.tsx` - Página de creación de inscripción
- `Show.tsx` - Página de visualización de inscripción

**Public Pages (`public/`):**
- `home.tsx` - Homepage pública

**Settings Pages (`settings/`):**
- `appearance.tsx` - Configuración de apariencia
- `password.tsx` - Cambio de contraseña
- `profile.tsx` - Perfil de usuario
- `two-factor.tsx` - Configuración 2FA

#### 📁 Hooks (`js/hooks/`)

**Custom Hooks:**
- `use-appearance.tsx` - Hook para manejo de tema
- `use-clipboard.ts` - Hook para copiar al portapapeles
- `use-initials.tsx` - Hook para generar iniciales
- `use-mobile-navigation.ts` - Hook para navegación móvil
- `use-mobile.tsx` - Hook para detectar móvil
- `use-two-factor-auth.ts` - Hook para 2FA

#### 📁 Contexts (`js/contexts/`)

**React Contexts:**
- `ThemeContext.tsx` - Context para manejo de tema global

#### 📁 Layouts (Cont.)

**UI Layouts (`ui/`):**
- `button.tsx` - Layout para botones
- `card.tsx` - Layout para cards
- `dialog.tsx` - Layout para modales
- `input.tsx` - Layout para inputs
- `select.tsx` - Layout para selects

#### 📁 Routes (`js/routes/`)

**Route Definitions:**
- `index.ts` - Rutas principales
- `appearance/index.ts` - Rutas de apariencia
- `inscripciones/index.ts` - Rutas de inscripciones
- `login/index.ts` - Rutas de login
- `password/index.ts` - Rutas de contraseña
- `password/confirm/index.ts` - Rutas de confirmación
- `profile/index.ts` - Rutas de perfil
- `register/index.ts` - Rutas de registro
- `storage/index.ts` - Rutas de storage
- `two-factor/index.ts` - Rutas de 2FA
- `two-factor/login/index.ts` - Rutas 2FA login
- `verification/index.ts` - Rutas de verificación

#### 📁 Types (`js/types/`)

**TypeScript Definitions:**
- `index.d.ts` - Tipos globales principales
- `inscripcion.ts` - Tipos específicos para inscripciones
- `vite-env.d.ts` - Tipos para Vite

#### 📁 Lib (`js/lib/`)

**Utilities:**
- `utils.ts` - Utilidades generales del proyecto

#### 📁 Actions (`js/actions/`)

**HTTP Actions (Typed Routes):**
- `App/Http/Controllers/` - Tipado para controladores de Inscripción y Auth
- `Illuminate/Routing/RedirectController.ts` - Redirect controller
- `Laravel/Fortify/Http/Controllers/` - Controladores de Fortify

#### 📁 Wayfinder (`js/wayfinder/`)

**URL Generation:**
- `index.ts` - Utilidades para generación de URLs

---

### 📁 `/resources/css/`

**Stylesheets:**
- `app.css` - Archivo principal de estilos con Tailwind

---

### 📁 `/resources/views/`

**Blade Templates:**
- `app.blade.php` - Template principal para Inertia

---

### 📁 `/public/`

**Static Assets:**
- `favicon.ico`, `favicon.svg` - Iconos de la aplicación
- `logo.svg` - Logo en formato vectorial
- `img/escudo.png` - Escudo del colegio
- `img/fachada-escalada.png` - Imagen de la fachada

---

## Catálogo de Componentes UI

### 📁 `/catalogo-frontend/`

**Colección de Componentes Reutilizables:**

**Buttons (`buttons.html`):**
- Botones primarios con gradientes
- Outline y ghost buttons
- Diferentes tamaños (XS a XL)
- Con iconos izquierda/derecha
- Estados loading y disabled
- Button groups horizontales/verticales

**Modals (`modals.html`):**
- Modales básicos y centrados
- Formularios de login/registro
- Modales de confirmación (success/error/warning)
- Efectos slide-in y glassmorphism
- Diferentes tamaños (small/large/fullscreen)

**Tables (`tables.html`):**
- Tablas simples y con bordes
- Hover effects y striped rows
- Compactas y espaciosas
- Datos complejos con métricas
- Responsive con cards en móvil

**Badges (`badges.html`):**
- Estados básicos (activo/inactivo/pendiente)
- Con iconos y sin iconos
- Contadores y notificaciones
- Efectos pulse, glow, gradientes
- Contextuales (e-commerce, tareas, prioridades)

**Cards (`cards.html`):**
- Animaciones fade, flip, hover
- Formas circulares, hexagonales, diamante
- Efectos glassmorphism
- Múltiples tamaños y estilos

**Form Styles (`form-styles.html`):**
- Formularios minimalistas
- Estilo glassmorphism
- Estilo corporativo
- Todos los tipos de input

**Navbars (`navbars.html`):**
- Transparentes y sólidos
- Sticky con efectos
- Mobile-first con hamburger
- Glassmorphism

**Parallax (`parallax.html`):**
- Efectos parallax con Tailwind
- Glassmorphism integrado
- Animaciones suaves

---

## Arquitectura de Componentes

### Component Hierarchy
```
AppLayout
├── AppHeaderLayout
│   ├── AppHeader
│   └── AppContent
│       └── Pages (Dashboard, Inscripciones, etc.)
└── AuthLayout
    ├── AuthCardLayout
    └── Auth Pages (Login, Register, etc.)
```

### State Management
- **React Context** para temas globales
- **Inertia** para state compartido con backend
- **Local State** con hooks personalizados
- **Server State** con Inertia forms

### TypeScript Integration
- Tipado estricto en todos los componentes
- Definiciones de tipos para inscripciones
- Tipos de utilidades y helpers
- Props tipadas en componentes UI

### Styling Architecture
- **Tailwind CSS** como framework principal
- **Utility classes** para estilos consistentes
- **Component variants** con class-variance-authority
- **Dark mode** con ThemeContext
- **Responsive design** mobile-first

### Build & Development
- **Vite** como bundler y dev server
- **Hot Module Replacement** para desarrollo rápido
- **TypeScript** compilation
- **ESLint** y **Prettier** para code quality
- **Concurrent** scripts para desarrollo simultáneo

### Performance Optimizations
- **Code splitting** por rutas
- **Lazy loading** de componentes
- **Optimized images** en public/
- **Tree shaking** automático con Vite
- **Component memoization** donde sea necesario

### Accessibility Features
- **Radix UI** para componentes accesibles
- **ARIA attributes** en componentes custom
- **Keyboard navigation** completa
- **Screen reader** compatible
- **High contrast** support

### Testing & Quality
- **TypeScript** para type safety
- **ESLint** para linting automático
- **Prettier** para formateo consistente
- **Playwright** para E2E testing
- **Component testing** preparado

### Deployment
- **Vite build** para producción
- **Asset optimization** automática
- **Static asset** serving
- **Production config** optimizada
