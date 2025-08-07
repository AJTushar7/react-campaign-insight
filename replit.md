# Campaign Manager Dashboard

## Overview

A comprehensive multi-channel campaign analytics dashboard for managing and tracking marketing communications across SMS, WhatsApp, Email, Push notifications, and RCS. The application provides real-time monitoring, performance analytics, budget optimization, and customer engagement insights through an integrated dashboard interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application has been **migrated to Angular 15** with TypeScript and follows a modern component-based architecture:

- **UI Framework**: Angular 15.2 with TypeScript for robust enterprise-grade development
- **Styling**: SCSS with responsive design system for consistent UI components
- **State Management**: Angular services with RxJS observables for reactive data flow
- **Routing**: Angular Router for client-side navigation and route management
- **Build Tool**: Angular CLI for development and optimized production builds
- **Data Source**: Angular services with comprehensive mock data for all dashboard functionality

The frontend follows Angular's modular component structure with:
- Angular components in `/src/app/components/`
- Dashboard-specific components including real-time monitoring, engagement heatmaps, BSP performance
- Service layer in `/src/app/services/` for data management
- TypeScript models in `/src/app/models/` for type safety
- Comprehensive mock data system integrated into services

### Data Storage Solutions
The application now uses **client-side mock data only**:

- **Data Source**: Comprehensive mock data in `client/src/data/mock-data.ts`
- **No Backend**: Server folder completely removed for pure client-side operation
- **No Database**: All data is generated client-side for demonstration purposes
- **Campaign Analytics**: Real-time mock data for all dashboard sections including performance metrics, engagement heatmaps, budget calculations, and BSP comparisons

### Authentication and Authorization
Basic user management structure is in place:
- User schema with username/password fields
- Storage interface for user CRUD operations
- Extensible for session management and authentication middleware

### Design System
The application uses a comprehensive design system:
- **Component Library**: shadcn/ui with Radix UI primitives
- **Theming**: CSS custom properties for light/dark mode support
- **Typography**: Consistent font scaling and spacing
- **Colors**: Semantic color system with channel-specific colors (WhatsApp green, SMS blue, etc.)
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### Database and ORM
- **PostgreSQL**: Primary database via Neon Database serverless
- **Drizzle ORM**: Type-safe database operations and schema management
- **Drizzle Kit**: Database migrations and schema synchronization

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Icon library for consistent iconography
- **class-variance-authority**: Utility for component variant management

### Development and Build Tools
- **Vite**: Development server and build tool
- **TypeScript**: Type checking and enhanced developer experience
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind

### Data Visualization
- **Recharts**: Chart library for analytics dashboards
- **date-fns**: Date manipulation and formatting

### State Management and API
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for forms and API data

### Additional Libraries
- **cmdk**: Command palette component
- **wouter**: Lightweight routing
- **nanoid**: Unique ID generation
- **embla-carousel**: Carousel/slider component

The architecture prioritizes type safety, developer experience, and maintainability while providing a scalable foundation for multi-channel campaign management and analytics.