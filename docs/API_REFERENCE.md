# D&D Character Companion - API Reference

## Storage API

All character data is stored locally using AsyncStorage. The storage utilities are located in `utils/storage.ts`.

### Functions

#### `getCharacters(): Promise<Character[]>`

Retrieves all characters from storage.

**Returns**: Promise resolving to an array of Character objects

**Example**:
```typescript
import { getCharacters } from '@/utils/storage';

const characters = await getCharacters();
console.log(characters);
```

---

#### `getCharacterById(id: string): Promise<Character | null>`

Retrieves a single character by ID.

**Parameters**:
- `id` (string): The unique identifier of the character

**Returns**: Promise resolving to a Character object or null if not found

**Example**:
```typescript
import { getCharacterById } from '@/utils/storage';

const character = await getCharacterById('1234567890');
if (character) {
  console.log(character.name);
}
```

---

#### `addCharacter(character: Character): Promise<void>`

Adds a new character to storage.

**Parameters**:
- `character` (Character): The character object to add

**Returns**: Promise that resolves when character is saved

**Example**:
```typescript
import { addCharacter } from '@/utils/storage';

const newCharacter: Character = {
  id: Date.now().toString(),
  name: 'Aragorn',
  race: 'Human',
  class: 'Ranger',
  level: 10,
  // ... other properties
};

await addCharacter(newCharacter);
```

---

#### `updateCharacter(character: Character): Promise<void>`

Updates an existing character in storage.

**Parameters**:
- `character` (Character): The updated character object

**Returns**: Promise that resolves when character is updated

**Example**:
```typescript
import { updateCharacter } from '@/utils/storage';

const updatedCharacter = {
  ...existingCharacter,
  currentHp: 50,
  updatedAt: Date.now(),
};

await updateCharacter(updatedCharacter);
```

---

#### `deleteCharacter(id: string): Promise<void>`

Deletes a character from storage.

**Parameters**:
- `id` (string): The unique identifier of the character to delete

**Returns**: Promise that resolves when character is deleted

**Example**:
```typescript
import { deleteCharacter } from '@/utils/storage';

await deleteCharacter('1234567890');
```

---

## D&D Utilities API

D&D-specific calculations and constants are in `utils/dnd.ts`.

### Functions

#### `calculateModifier(abilityScore: number): number`

Calculates the ability modifier for a given ability score.

**Formula**: `(abilityScore - 10) / 2` (rounded down)

**Parameters**:
- `abilityScore` (number): The ability score value (1-30)

**Returns**: The calculated modifier (-5 to +10)

**Example**:
```typescript
import { calculateModifier } from '@/utils/dnd';

const modifier = calculateModifier(16); // Returns 3
const negModifier = calculateModifier(8); // Returns -1
```

---

#### `formatModifier(modifier: number): string`

Formats a modifier value with proper +/- sign.

**Parameters**:
- `modifier` (number): The modifier value

**Returns**: Formatted string (e.g., "+3", "-1", "+0")

**Example**:
```typescript
import { formatModifier } from '@/utils/dnd';

console.log(formatModifier(3));  // "+3"
console.log(formatModifier(-1)); // "-1"
console.log(formatModifier(0));  // "+0"
```

---

#### `calculateProficiencyBonus(level: number): number`

Calculates the proficiency bonus based on character level.

**Parameters**:
- `level` (number): Character level (1-20)

**Returns**: Proficiency bonus (2-6)

**Level Breakpoints**:
- Levels 1-4: +2
- Levels 5-8: +3
- Levels 9-12: +4
- Levels 13-16: +5
- Levels 17-20: +6

**Example**:
```typescript
import { calculateProficiencyBonus } from '@/utils/dnd';

const bonus = calculateProficiencyBonus(5); // Returns 3
```

---

### Constants

#### `DND_CLASSES: string[]`

Array of available D&D 5e classes.

**Values**:
```typescript
[
  'Barbarian', 'Bard', 'Cleric', 'Druid',
  'Fighter', 'Monk', 'Paladin', 'Ranger',
  'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
]
```

---

#### `DND_RACES: string[]`

Array of available D&D 5e races.

**Values**:
```typescript
[
  'Dragonborn', 'Dwarf', 'Elf', 'Gnome',
  'Half-Elf', 'Half-Orc', 'Halfling', 'Human', 'Tiefling'
]
```

---

#### `DND_ALIGNMENTS: string[]`

Array of all alignment options.

**Values**:
```typescript
[
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
]
```

---

#### `DND_SKILLS: string[]`

Array of all D&D 5e skills.

**Values**:
```typescript
[
  'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics',
  'Deception', 'History', 'Insight', 'Intimidation',
  'Investigation', 'Medicine', 'Nature', 'Perception',
  'Performance', 'Persuasion', 'Religion', 'Sleight of Hand',
  'Stealth', 'Survival'
]
```

---

## Type Definitions

### Character Interface

Located in `types/character.ts`

```typescript
export interface Character {
  // Identity
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  imageUri?: string;

  // Ability Scores
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  // Combat Stats
  armorClass: number;
  initiative: number;
  speed: number;
  currentHp: number;
  maxHp: number;
  temporaryHp: number;
  hitDice: string;

  // Proficiency
  proficiencyBonus: number;
  inspiration: boolean;
  skills: { [key: string]: boolean };

  // Equipment
  equipment: string[];

  // Personality
  personality?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;

  // Metadata
  createdAt: number;
  updatedAt: number;
}
```

---

## Component API

### Button Component

Located in `components/ui/Button.tsx`

**Props**:
```typescript
interface ButtonProps {
  title: string;           // Button text
  onPress: () => void;     // Click handler
  variant?: 'primary' | 'secondary' | 'danger'; // Style variant
  size?: 'small' | 'medium' | 'large';          // Size variant
  disabled?: boolean;      // Disabled state
  fullWidth?: boolean;     // Full width button
}
```

**Example**:
```typescript
<Button
  title="Save Character"
  onPress={handleSave}
  variant="primary"
  size="large"
  fullWidth
/>
```

---

### Card Component

Located in `components/ui/Card.tsx`

**Props**:
```typescript
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}
```

**Example**:
```typescript
<Card variant="elevated" style={{ padding: 20 }}>
  <Text>Card Content</Text>
</Card>
```

---

## Navigation API

The app uses Expo Router for file-based navigation.

### Navigate to a Screen

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to character details
router.push(`/character/${characterId}`);

// Navigate to character creation
router.push('/character/create');

// Go back
router.back();
```

### Get Route Parameters

```typescript
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id: string }>();
```

---

## Design System

Located in `constants/design.ts`

### Colors

```typescript
export const colors = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#3b82f6',
  background: '#0f172a',
  surface: '#1e293b',
  backgroundTertiary: '#334155',
  text: '#ffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  border: '#334155',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#eab308',
};
```

### Spacing

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### Typography

```typescript
export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: 'bold' },
  body: { fontSize: 16 },
  bodySmall: { fontSize: 14 },
  caption: { fontSize: 12 },
};
```

---

## Hooks

### useFrameworkReady

Located in `hooks/useFrameworkReady.ts`

Ensures the app framework is ready before rendering.

**Usage**:
```typescript
import useFrameworkReady from '@/hooks/useFrameworkReady';

export default function App() {
  const isReady = useFrameworkReady();
  
  if (!isReady) {
    return null;
  }
  
  return <YourApp />;
}
```
