# Repository Guidelines

All LLMs models are allowed to open and read any file inside this repository but to make any change it must
me authorized by user having previous approval.

## Project Structure & Module Organization
- Laravel backend lives under `app/`, with HTTP routes in `routes/` and database seeds/migrations in `database/`.
- React + Inertia front-end sits in `resources/js`; shared UI components are under `resources/js/components`, with TypeScript types in `resources/js/types/`.
- Static assets and compiled output are served from `public/`.
- Automated tests reside in `tests/` (PHP/Pest) and `resources/js` (for any future Jest/Vitest suites).

## Build, Test, and Development Commands
- `npm run dev` � launches Vite for the front-end; pair with `php artisan serve` for full-stack local development, or run `composer run dev` to start PHP, queue worker, and Vite concurrently.
- `npm run build` / `npm run build:ssr` � produces production bundles (client-only or with SSR output).
- `npm run lint`, `npm run types`, `npm run format:check` � lint TypeScript/React sources, validate type safety, and verify Prettier formatting.
- `php artisan test` (or `composer run test`) � executes the Pest-powered backend test suite.

## Coding Style & Naming Conventions
- Follow PSR-12 for PHP; run `./vendor/bin/pint` before committing backend code.
- Front-end uses TypeScript + React 19; prefer functional components, hooks, and PascalCase filenames inside `components/`.
- Apply Prettier (configured via `.prettierrc`) and ESLint (`eslint.config.js`) to keep formatting consistent; four-space indentation on PHP, two-space in TSX as enforced by tooling.
- Use snake_case for database columns, camelCase for JavaScript variables and functions, PascalCase for React components and TypeScript types.

## Testing Guidelines
- Write Pest tests in `tests/Feature` and `tests/Unit`; mirror namespace and directory structure of the code under test.
- Name test files with the `*Test.php` suffix and describe scenarios in `it('...', function () { ... })` blocks.
- Add realistic seed data via factories in `database/factories/` when scenarios require fixtures.

## Commit & Pull Request Guidelines
- Commit messages should be concise and imperative (e.g., `Add curso filter to InscripcionForm`), grouping related changes together.
- Ensure commits pass `npm run lint`, `npm run types`, and `php artisan test` before pushing.
- Pull requests should summarize the change, list validation steps, and link to related issues or tickets; attach screenshots or GIFs for UI-impacting work.
