# Third Party Code & Technology Stack

This document lists all external dependencies and third-party code used in the Local-First To-Do Application.

## Core Framework & Runtime

### Node.js
- **Version**: 20.0.0 or higher
- **Purpose**: JavaScript runtime environment
- **License**: MIT
- **Repository**: https://github.com/nodejs/node
- **Usage**: Application server runtime

### Next.js
- **Version**: 14.2.15
- **Purpose**: React framework with server-side rendering, API routes, and optimization
- **License**: MIT
- **Repository**: https://github.com/vercel/next.js
- **Features Used**:
  - App Router with file-based routing
  - Server Components (default)
  - Server Actions for form mutations
  - Static rendering and optimization
  - Built-in CSS support

### React
- **Version**: 18.3.1
- **Purpose**: UI component framework
- **License**: MIT
- **Repository**: https://github.com/facebook/react
- **Features Used**:
  - Functional components
  - Hooks (useState, etc.)
  - Client-side interactivity

## Language & Type Safety

### TypeScript
- **Version**: 5.6.3
- **Purpose**: Static type checking for JavaScript
- **License**: Apache 2.0
- **Repository**: https://github.com/microsoft/TypeScript
- **Configuration**: [tsconfig.json](../tsconfig.json)
- **Target**: ES2022

## Database & Data Layer

### SQLite 3
- **Purpose**: Embedded relational database
- **License**: Public Domain
- **Website**: https://www.sqlite.org
- **Features**:
  - Zero-configuration setup
  - Single-file database
  - ACID compliance
  - Suitable for local-first applications

### better-sqlite3
- **Version**: 11.3.0
- **Purpose**: Fast synchronous SQLite3 bindings for Node.js
- **License**: MIT
- **Repository**: https://github.com/WiseLibs/better-sqlite3
- **Features Used**:
  - Synchronous database operations
  - SQL statement preparation
  - Query optimization
  - Connection pooling

## Styling

### Tailwind CSS
- **Version**: 3.4.14
- **Purpose**: Utility-first CSS framework
- **License**: MIT
- **Repository**: https://github.com/tailwindlabs/tailwindcss
- **Configuration**: [tailwind.config.js](../tailwind.config.js)
- **Features**:
  - Responsive design utilities
  - Color system
  - Dark mode support
  - Custom theme configuration

### PostCSS
- **Version**: (latest compatible)
- **Purpose**: CSS transformation tool (required by Tailwind)
- **License**: MIT
- **Configuration**: [postcss.config.js](../postcss.config.js)

## Testing Framework

### Vitest
- **Version**: 2.1.3
- **Purpose**: Unit and integration testing framework
- **License**: MIT
- **Repository**: https://github.com/vitest-dev/vitest
- **Configuration**: [vitest.config.ts](../vitest.config.ts)
- **Features**:
  - Jest-compatible API
  - Fast execution
  - Global test utils
  - Node.js environment support

## Code Quality

### ESLint
- **Purpose**: JavaScript/TypeScript linter
- **License**: MIT
- **Repository**: https://github.com/eslint/eslint
- **Configuration**: [.eslintrc.json](../.eslintrc.json)
- **Preset**: next/core-web-vitals

### next/eslint-plugin-next
- **Version**: Bundled with Next.js
- **Purpose**: Next.js-specific ESLint rules
- **License**: MIT

## Build Tools

### Webpack
- **Purpose**: Module bundler (used by Next.js internally)
- **License**: MIT
- **Note**: Abstracted by Next.js - not directly configured

### Babel
- **Purpose**: JavaScript transpiler (used by Next.js internally)
- **License**: MIT
- **Note**: Abstracted by Next.js - not directly configured

## Package Manager

### npm
- **Version**: Bundled with Node.js
- **Purpose**: Package dependency management
- **Repository**: https://github.com/npm/cli
- **Lock File**: package-lock.json (ensures reproducible builds)

## Development Dependencies

All dev dependencies are listed in [package.json](../package.json). Key development tools:

- TypeScript compiler
- ESLint with Next.js plugin
- Vitest test runner
- Build optimization tools

## NPM Scripts

The application provides the following npm scripts:

```json
{
  "dev": "next dev",           // Development server with hot reload
  "build": "next build",       // Production build
  "start": "next start",       // Production server
  "lint": "next lint",         // Code quality check
  "test": "vitest run"         // Run test suite
}
```

## Dependency Tree Summary

```
Node.js (runtime)
├── Next.js 14.2.15
│   ├── React 18.3.1
│   ├── TypeScript 5.6.3
│   ├── Webpack (bundler)
│   ├── Babel (transpiler)
│   └── ESLint (linter)
├── Tailwind CSS 3.4.14
│   └── PostCSS
├── better-sqlite3 11.3.0
│   └── SQLite 3
└── Vitest 2.1.3
    └── Node.js test runner
```

## Security Considerations

### Dependency Scanning
- All production dependencies are carefully vetted
- No known security vulnerabilities (as of last update)
- Regular updates recommended for security patches

### License Compliance
All dependencies use permissive open-source licenses:
- **MIT**: Most dependencies
- **Apache 2.0**: TypeScript
- **Public Domain**: SQLite

### Data Security
- No sensitive data transmitted to external services
- All data stored locally in SQLite
- Suitable for personal/local-first applications

## Version Management

### Production Dependencies
Locked to specific versions in `package-lock.json` for reproducible builds.

### Update Strategy
Regular updates recommended for:
- Security patches
- Bug fixes
- Performance improvements

Update command:
```bash
npm update
npm audit fix  # Fix known vulnerabilities
```

## References

- [Node.js Documentation](https://nodejs.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)

## Alternative Technologies Considered

### Database
- PostgreSQL - Overkill for local-first application
- MongoDB - NoSQL, not needed for structured task data
- Chosen: SQLite ✅ (lightweight, zero-config, perfect fit)

### Frontend Framework
- Vue.js - Good alternative, but less ecosystem support
- Svelte - Lightweight but less mature
- Chosen: React + Next.js ✅ (large ecosystem, proven, excellent TypeScript support)

### CSS Framework
- Bootstrap - Heavyweight, more complex
- Material-UI - Component library with more overhead
- Chosen: Tailwind CSS ✅ (utility-first, lightweight, highly customizable)

### Testing Framework
- Jest - Good but slower than Vitest
- Mocha - Less integrated, more setup required
- Chosen: Vitest ✅ (Jest-compatible, fast, Vite-native)

## Contributing

When adding new dependencies:
1. Check license compatibility
2. Verify security audit: `npm audit`
3. Review bundle size impact
4. Document in this file
5. Update package.json and package-lock.json
6. Run full test suite: `npm run test`

## License

All third-party dependencies retain their original licenses. See individual repositories for detailed license information.
