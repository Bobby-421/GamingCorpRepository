A TypeScript-based slot machine demo showcasing iframe communication, state management, and TypeScript interfaces.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

Node version v20.15.0

## Codebase Navigation

### Core Components

1. **Slot Machine Logic** (`src/models/SlotMachine.ts`)
   - Contains game mechanics and betting logic
   - Modify `spin()` method to adjust win/loss probabilities
   - Change `placeBet()` to alter betting validation

2. **Balance Management** (`src/services/BalanceService.ts`)
   - Handles user balance and transaction history
   - Starting balance can be modified in the constructor
   - Transaction history formatting in `updateTransactionHistory()`

3. **API Get Response** (`src/services/MockSlotMachineService.ts`)
  - simulates fetching slot machine data and returns an array of SlotMachine objects.
  - Response commented out and returning Promise<SlotMachine[]>

4. **Game Interface** (`src/pages/iframe-game.ts`)
   - Controls game UI and interactions
   - Bet selection and spin button logic
   - Result display and balance updates

### Key Files for Common Changes

#### Modifying Game Rules
1. To change win probabilities:
```typescript
typescript:src/models/SlotMachine.ts
```

#### Communication Flow
1. Main app (`src/app.ts`): Handles iframe communication
2. Machine selection: `iframe-main.ts` → `app.ts` → `iframe-game.ts`
3. Balance updates: `iframe-game.ts` → `app.ts` → `iframe-main.ts`

### File Structure Quick Reference

- **Models**: `src/models/`
- **Services**: `src/services/`
- **Pages**: `src/pages/`
- **Styles**: `src/styles/`
- **App**: `src/app.ts`
