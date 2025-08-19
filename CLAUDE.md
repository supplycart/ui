# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Linting**: `pnpm lint` (check for issues), `pnpm lint-fix` (auto-fix issues)
- **Development server**: `pnpm serve` (runs demo application)
- **Component Documentation**: 
  - `pnpm story:dev` (start Histoire development server)
  - `pnpm story:build` (build static documentation)
  - `pnpm story:preview` (preview built documentation)
- **Setup for local development**:
  1. `pnpm install`
  2. `pnpm link`
  3. `pnpm install-demo`
  4. `pnpm serve` (for demo) or `pnpm story:dev` (for component docs)

## Project Architecture

This is `@supplycart/ui`, a Vue 2.7 component library that provides reusable UI components for Supplycart applications (ADAM/HUB/EVA).

### Module Structure
The library is organized into feature-based modules under `src/`:

- **address/**: Location and address components (Address, AddressForm, BillingAddress, DeliveryAddress)
- **currency/**: Money handling with Dinero.js (Money, MoneyInput, MoneyV2, currency formatting utilities)
- **datetime/**: Date/time components using Flatpickr (DatePicker, DateRangePicker, DateTime, TimePicker)
- **form/**: Form input components (BaseInput, TextInput, DropdownInput, PhoneInput, etc.)
- **attachment/**: File upload components
- **button/**: Button components
- **navigation/**: Navigation components (Paginate, PerPageSelect)

### Export Pattern
Each module follows a consistent structure:
- `components/` - Vue components
- `constants/` - Configuration and constants
- `mixins/` - Reusable logic (where applicable)
- `index.js` - Module exports

The root `index.js` re-exports all modules for easy consumption.

### Key Dependencies
- **Vue 2.7**: Component framework
- **Dinero.js**: Currency handling and formatting
- **Flatpickr**: Date/time picker functionality  
- **vue-select**: Dropdown component base
- **Lodash**: Utility functions
- **Moment.js**: Date manipulation

### Currency System
The currency module provides utilities for money formatting and handling:
- Uses Dinero.js for precise decimal math
- Supports multiple currencies and locales
- Functions: `format()`, `formatCents()`, `currency()`, `isInt()`, `isFloat()`

### Documentation System
The project uses **HistoireJS** for component documentation:
- Story files: `*.story.vue` alongside components
- Automated prop documentation from component source
- Interactive playground for each component
- Built-in documentation with markdown support
- Organized by feature modules (Form, Currency, DateTime, etc.)

### Story File Structure
Each component should have a corresponding `.story.vue` file with:
- Interactive variants showing different use cases
- Props controls for live editing
- Embedded documentation in `<docs>` blocks
- Usage examples and prop tables

### Testing and Quality
- ESLint configuration with Vue and Prettier integration
- Package uses pnpm for dependency management
- HistoireJS for component documentation and visual testing
- No unit test framework currently configured