import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character, InitiativeEntry } from '@/types/character';

const CHARACTERS_KEY = '@dnd_characters';
const INITIATIVE_KEY = '@dnd_initiative';

// Characters Storage
export const getCharacters = async (): Promise<Character[]> => {
  try {
    const data = await AsyncStorage.getItem(CHARACTERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading characters:', error);
    return [];
  }
};

export const saveCharacters = async (characters: Character[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CHARACTERS_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error('Error saving characters:', error);
  }
};

export const getCharacterById = async (id: string): Promise<Character | null> => {
  try {
    const characters = await getCharacters();
    const character = characters.find(c => c.id === id);
    return character || null;
  } catch (error) {
    console.error('Error loading character:', error);
    return null;
  }
};

export const addCharacter = async (character: Character): Promise<void> => {
  const characters = await getCharacters();
  characters.push(character);
  await saveCharacters(characters);
};

export const updateCharacter = async (updatedCharacter: Character): Promise<void> => {
  const characters = await getCharacters();
  const index = characters.findIndex(c => c.id === updatedCharacter.id);
  if (index !== -1) {
    characters[index] = updatedCharacter;
    await saveCharacters(characters);
  }
};

export const deleteCharacter = async (id: string): Promise<boolean> => {
  try {
    console.log('[Storage] Attempting to delete character with id:', id);
    const characters = await getCharacters();
    console.log('[Storage] Current characters:', characters.length, characters.map(c => ({ id: c.id, name: c.name })));
    
    const filtered = characters.filter(c => c.id !== id);
    console.log('[Storage] After filter:', filtered.length);
    
    if (filtered.length === characters.length) {
      console.warn('[Storage] Character with id', id, 'not found - no deletion occurred');
      return false;
    }
    
    await saveCharacters(filtered);
    console.log('[Storage] Character deleted successfully');
    return true;
  } catch (error) {
    console.error('[Storage] Error deleting character:', error);
    throw error;
  }
};

// Initiative Tracker Storage
export const getInitiativeEntries = async (): Promise<InitiativeEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(INITIATIVE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading initiative:', error);
    return [];
  }
};

export const saveInitiativeEntries = async (entries: InitiativeEntry[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(INITIATIVE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving initiative:', error);
  }
};
