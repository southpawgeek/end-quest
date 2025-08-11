# Grid Size Examples

The game now supports dynamic grid sizes configured in the cartridge data! Here's how to use different grid configurations.

## Current Setup (3x3 Grid)

The game currently uses a 3x3 grid by default:

```javascript
// In src/data.js - gameConfig object
const gameConfig = {
  // ... other config
  grid: {
    width: 3, // Number of columns (A, B, C)
    height: 3  // Number of rows (1, 2, 3)
  },
  // ... rest of config
}
```

This generates coordinates: A1, A2, A3, B1, B2, B3, C1, C2, C3

## Changing to 5x5 Grid

To change to a 5x5 grid, simply update the grid dimensions in the cartridge:

```javascript
// In src/data.js - gameConfig object
const gameConfig = {
  // ... other config
  grid: {
    width: 5, // Number of columns (A, B, C, D, E)
    height: 5  // Number of rows (1, 2, 3, 4, 5)
  },
  // ... rest of config
}
```

This will automatically generate coordinates: A1-A5, B1-B5, C1-C5, D1-D5, E1-E5

## Changing to 4x4 Grid

```javascript
// In src/data.js - gameConfig object
const gameConfig = {
  // ... other config
  grid: {
    width: 4, // Number of columns (A, B, C, D)
    height: 4  // Number of rows (1, 2, 3, 4)
  },
  // ... rest of config
}
```

This generates coordinates: A1-A4, B1-B4, C1-C4, D1-D4

## Using the Dynamic Functions

You can also use the functions directly for custom grid sizes:

```javascript
import { GAME_CONSTANTS } from './constants/game'

// Generate coordinates for a 6x4 grid
const coordinates = GAME_CONSTANTS.generateGridCoordinates(6, 4)
// Result: A1-A6, B1-B6, C1-C6, D1-D6

// Generate layout for a 5x3 grid
const layout = GAME_CONSTANTS.generateGridLayout(5, 3)
// Result: [['a1', 'a2', 'a3', 'a4', 'a5'], ['b1', 'b2', 'b3', 'b4', 'b5'], ['c1', 'c2', 'c3', 'c4', 'c5']]
```

## Supported Grid Sizes

The system supports:
- **Width**: 1-26 columns (A-Z)
- **Height**: 1-26 rows (A-Z)
- **Maximum**: 26x26 grid (676 cells)

## Important Notes

1. **Room Data**: When changing grid sizes, you'll need to update your room data in `src/data.js` to include exits for the new coordinates.

2. **CSS**: The grid styling in your CSS may need adjustments for different grid sizes.

3. **Accessibility**: The system automatically handles accessibility labels for different grid sizes.

4. **Dynamic Generation**: Grid coordinates are now generated dynamically based on the cartridge configuration.

## Example: 5x5 Grid Setup

```javascript
// 1. Update the grid dimensions in cartridge config
const gameConfig = {
  // ... other config
  grid: {
    width: 5, // Number of columns (A, B, C, D, E)
    height: 5  // Number of rows (1, 2, 3, 4, 5)
  },
  // ... rest of config
}

// 2. Update room exits in data.js
const rooms = {
  foyer: {
    exits: {
      a1: 'kitchen',
      a3: 'bathroom',
      c1: 'basement',
      e3: 'upstairs',
      // ... add exits for the new coordinates
    }
  }
}
```

The MovementGrid component will automatically adapt to the new grid dimensions!

## Rectangular Grids

You can also create rectangular grids by specifying different width and height:

```javascript
// 4x3 grid (4 columns, 3 rows)
const gameConfig = {
  grid: {
    width: 4, // Number of columns (A, B, C, D)
    height: 3  // Number of rows (1, 2, 3)
  }
}
```

This generates coordinates: A1-A4, B1-B4, C1-C4
