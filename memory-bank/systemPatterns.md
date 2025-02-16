# System Patterns

## Architecture Overview
Monorepo structure using Turborepo with:
- Backend: NestJS application
- Frontend: Next.js application
- Shared packages:
  - Core business logic
  - UI components
  - TypeScript configs
  - ESLint configs

## Key Technical Decisions
1. Monorepo structure for shared code
2. TypeScript across all packages
3. Prisma ORM for database access
4. Modular architecture with:
   - Domain-driven design
   - Dependency injection
   - Clear separation of concerns

## Component Relationships
- Backend depends on core package
- Frontend depends on core and ui packages
- Shared packages are independent

## Design Patterns
- Repository pattern for data access
- Dependency injection for services
- Decorators for authentication
- DTOs for API contracts
- Middleware for request processing
