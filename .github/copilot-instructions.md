# D&D Character Companion - AI Agent Guidelines

## Project Overview
A cross-platform D&D 5e character management app built with **React Native + Expo SDK 54**, using file-based routing (Expo Router), NativeWind (Tailwind), and AsyncStorage for persistence. Targets iOS, Android, and Web simultaneously.

## Critical Architecture Patterns

### File-Based Routing (Expo Router)
- Routes are defined by file structure in `app/` directory
- `(tabs)/` folder creates tab navigation - see `app/(tabs)/_layout.tsx` for tab bar config
- `[id].tsx` = dynamic routes (e.g., `character/[id].tsx` for character detail pages)
- Navigation: Use `useRouter()` from `expo-router`, NOT React Navigation directly
- Example: `router.push({ pathname: '/character/[id]', params: { id: item.id } })`

### Data Persistence Pattern
All character data is stored via AsyncStorage with these utilities:
- **Read**: `getCharacters()`, `getCharacterById(id)` from `utils/storage.ts`
- **Write**: `addCharacter()`, `updateCharacter()`, `deleteCharacter()` 
- **Sync UI**: Use `useFocusEffect()` from `expo-router` to reload data when screens regain focus (see `app/(tabs)/index.tsx:24-28`)
- **Optimistic Updates**: Update UI immediately, then sync with storage (see delete pattern in `index.tsx:44-71`)

### Design System (DO NOT use arbitrary colors)
Import from `constants/design.ts` - NEVER hardcode colors/spacing:
```typescript
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/design';
```
- **Colors**: Dark fantasy theme (`colors.background`, `colors.accent`, `colors.primary`, etc.)
- **D&D-specific colors**: `colors.hp`, `colors.d4`-`colors.d20` for dice
- **Spacing**: Use `spacing.xs` through `spacing.xxl` (4px to 48px increments)
- **Typography**: `typography.h1` through `typography.caption` with predefined sizes

### Styling Convention
Use **StyleSheet.create()** for performance, NOT inline styles:
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
  }
});
```
NativeWind (`className`) is configured but rarely used - prefer StyleSheet for consistency.

### Component Patterns
- **Custom UI**: Use `components/ui/Button.tsx` and `Card.tsx` - these have variants and size props
  - Button variants: `primary | secondary | outline | danger`
  - Button sizes: `small | medium | large`
- **Icons**: Use `lucide-react-native` (imported like `import { User, Dices } from 'lucide-react-native'`)
- **Safe Areas**: Wrap screens in `<SafeAreaView>` from `react-native-safe-area-context`

### D&D Rules Engine
All D&D calculations in `utils/dnd.ts`:
- `calculateModifier(abilityScore)` - converts ability scores to modifiers
- `calculateProficiencyBonus(level)` - determines proficiency by level
- `rollDice(sides)`, `rollMultipleDice(count, sides)` - dice rolling
- Constants: `DND_CLASSES`, `DND_RACES`, `DND_SKILLS`, `DND_ALIGNMENTS`

### Character Type Structure
The `Character` interface in `types/character.ts` is the single source of truth:
- Required fields: `id`, `name`, `race`, `class`, `level`, all 6 ability scores
- HP tracking: `currentHp`, `maxHp`, `temporaryHp`
- Skills stored as object: `skills: { [key: string]: boolean }`
- Timestamps: `createdAt`, `updatedAt` as Unix timestamps

### Image Handling (Cross-Platform)
```typescript
// Web: Use FileReader + base64 (see create.tsx:43-56)
// Mobile: Use expo-image-picker with permissions (see create.tsx:59-77)
```
Always check `Platform.OS === 'web'` for web-specific image handling.

## Development Workflows

### Essential Commands
```bash
bun install              # Fast install (2-10x faster than npm)
npm run dev              # Start dev server on localhost:3000
npm run doctor           # Check setup and diagnose issues
npm run setup            # Run after adding native dependencies (calls expo install)
```

### Performance Note
- **Bun preferred** for dependencies (configured in package.json scripts)
- Run `npm run setup` only after adding packages with native modules

### Web vs Native Differences
- **Web**: File inputs, no camera access, different image picker flow
- **Mobile**: Requires permission requests for camera/media library
- **Platform check**: Always use `Platform.OS === 'web'` for conditional logic

## Key File References
- **Tab Navigation Config**: `app/(tabs)/_layout.tsx` - customize tab bar appearance
- **Character List Screen**: `app/(tabs)/index.tsx` - example of data loading + optimistic updates
- **Character Creation**: `app/character/create.tsx` - form patterns, image picker, validation
- **Design Tokens**: `constants/design.ts` - complete color palette and spacing system
- **Storage Layer**: `utils/storage.ts` - all AsyncStorage abstraction
- **D&D Logic**: `utils/dnd.ts` - game rules and calculations

## Common Pitfalls to Avoid
1. **Don't** use React Navigation hooks - use `expo-router` hooks (`useRouter`, `useLocalSearchParams`)
2. **Don't** hardcode colors/spacing - always import from `constants/design.ts`
3. **Don't** forget `useFocusEffect()` when data might change from other screens
4. **Don't** skip optimistic UI updates - update state first, then sync with storage
5. **Don't** use npm for package installation - prefer `bun install` for speed

## Adding New Features
1. **New screen**: Create file in `app/` or `app/(tabs)/` - routing is automatic
2. **New data type**: Add interface to `types/character.ts`, extend storage in `utils/storage.ts`
3. **New UI component**: Follow Button/Card pattern in `components/ui/` with variants
4. **New D&D rule**: Add calculation function to `utils/dnd.ts`

## Testing Checklist
- [ ] Test on web (localhost:3000) AND mobile simulator/device
- [ ] Verify data persists across app restarts (AsyncStorage)
- [ ] Check navigation with back button/gestures
- [ ] Validate with multiple characters in list
- [ ] Test image picker on both platforms
