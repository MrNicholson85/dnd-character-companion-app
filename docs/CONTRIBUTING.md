# D&D Character Companion - Contributing Guide

Thank you for considering contributing to the D&D Character Companion app! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow:

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive criticism
- Assume good intentions
- Accept responsibility for mistakes

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

1. Node.js (v18+) installed
2. Git installed and configured
3. A GitHub account
4. Basic knowledge of React Native and TypeScript

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/dnd-character-companion-app.git
cd dnd-character-companion-app
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/MrNicholson85/dnd-character-companion-app.git
```

4. Install dependencies:

```bash
npm install
```

---

## Development Process

### Creating a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `style/` - Code style changes (formatting, etc.)

### Making Changes

1. Make your changes in the appropriate files
2. Test your changes thoroughly
3. Ensure code follows the project's style guidelines
4. Add or update documentation as needed
5. Commit your changes with clear, descriptive messages

### Commit Messages

Follow the conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:

```bash
git commit -m "feat(character): add spell slot tracking"
git commit -m "fix(storage): resolve character deletion bug"
git commit -m "docs(readme): update installation instructions"
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream**:

```bash
git fetch upstream
git rebase upstream/main
```

2. **Run tests** (if applicable):

```bash
npm test
```

3. **Lint your code**:

```bash
npm run lint
```

4. **Build the project**:

```bash
npm run build:web
```

### Submitting a Pull Request

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Go to the original repository on GitHub
3. Click "New Pull Request"
4. Select your branch
5. Fill out the PR template with:
   - Clear description of changes
   - Related issue numbers (if applicable)
   - Screenshots (for UI changes)
   - Testing notes

### PR Requirements

- [ ] Code follows project style guidelines
- [ ] Changes are well-documented
- [ ] Commit messages are clear and descriptive
- [ ] No merge conflicts with main branch
- [ ] PR description is complete
- [ ] All checks pass (if CI/CD is configured)

---

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use strict mode

### React Native / Expo

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Handle loading and error states

### Styling

- Use NativeWind (Tailwind) for styling
- Follow the existing design system
- Use consistent spacing and colors
- Support both light and dark modes (if applicable)

### File Organization

```
component-name/
├── index.tsx           # Main component
├── ComponentName.tsx   # Component logic
└── styles.ts          # Styles (if not using Tailwind)
```

### Code Quality

- Keep functions small and focused
- Use descriptive variable names
- Comment complex logic
- Remove commented-out code
- Remove console.logs before committing

---

## Project Structure

```
app/                    # Screens (file-based routing)
├── (tabs)/            # Tab navigation screens
├── character/         # Character-related screens
└── _layout.tsx        # Root layout

components/            # Reusable components
├── ui/               # Core UI components
├── Card.tsx
└── RuleSection.tsx

constants/            # App constants
└── design.ts        # Design system

types/               # TypeScript definitions
└── character.ts    # Character interface

utils/              # Utility functions
├── dnd.ts         # D&D calculations
└── storage.ts     # AsyncStorage helpers

data/              # Static data
└── spells.ts     # Spell database

hooks/            # Custom React hooks

docs/             # Documentation
```

---

## Testing

### Manual Testing

Test your changes on:

- Web browser (Chrome, Firefox, Safari)
- iOS Simulator (if on macOS)
- Android Emulator
- Physical devices (if possible)

### Test Cases

When adding new features, ensure:

1. **Happy path works** - Feature works as expected
2. **Edge cases handled** - Empty states, max values, etc.
3. **Error handling** - Graceful failures
4. **Cross-platform** - Works on web, iOS, and Android

---

## Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex algorithms
- Explain non-obvious code

Example:

```typescript
/**
 * Calculates the ability modifier for a given ability score.
 * Formula: (score - 10) / 2, rounded down
 * 
 * @param abilityScore - The ability score value (1-30)
 * @returns The calculated modifier (-5 to +10)
 */
export function calculateModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}
```

### README Updates

Update README.md if your changes:

- Add new features
- Change setup process
- Modify dependencies
- Affect deployment

---

## Feature Requests

Have an idea for a new feature?

1. Check existing issues to avoid duplicates
2. Create a new issue with the `feature` label
3. Describe the feature and its benefits
4. Discuss with maintainers before implementing

---

## Bug Reports

Found a bug?

1. Check if it's already reported
2. Create a new issue with the `bug` label
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Device/platform information
   - App version

---

## Questions?

- Open a GitHub Discussion
- Check existing documentation
- Ask in the issue comments

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes
- Project documentation

Thank you for contributing! 🎉
