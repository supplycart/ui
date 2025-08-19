# @supplycart/ui Component Library

A Vue 2.7 component library providing reusable UI components for Supplycart applications (ADAM/HUB/EVA).

## Getting Started

### Installation

```bash
npm install @supplycart/ui
# or
pnpm add @supplycart/ui
```

### Usage

```javascript
import { DatePicker, Money, BaseInput } from '@supplycart/ui'

export default {
  components: {
    DatePicker,
    Money,
    BaseInput
  }
}
```

## Features

- **Vue 2.7 Compatible**: Built with the latest Vue 2.7 features
- **TypeScript Support**: Full TypeScript definitions included
- **Modular Design**: Import only what you need
- **Comprehensive Testing**: Well-tested components
- **Documentation**: Auto-generated documentation from source code

## Architecture

The library is organized into feature-based modules:

- **DateTime**: Date/time picker components with timezone support
- **Form**: Input components with validation and error handling
- **Currency**: Money display and input components using Dinero.js
- **Navigation**: Pagination and navigation components
- **Address**: Location and address form components
- **Button**: Button components with loading states
- **Attachment**: File upload and attachment components

## Dependencies

Key dependencies include:

- **Vue 2.7**: Component framework
- **Dinero.js**: Precise currency calculations
- **Flatpickr**: Date/time picker functionality
- **Vue Select**: Advanced dropdown components
- **Moment.js**: Date manipulation and timezone support