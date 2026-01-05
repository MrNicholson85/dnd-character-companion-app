import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Character } from '@/types/character';

const CHARACTERS_COLLECTION = 'characters';

// Get all characters for the current user
export const getCharacters = async (userId: string): Promise<Character[]> => {
  try {
    const q = query(
      collection(db, CHARACTERS_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Character))
      .filter(char => char.userId === userId); // Filter by user
  } catch (error) {
    console.error('Error loading characters:', error);
    return [];
  }
};

// Get a single character by ID
export const getCharacterById = async (id: string): Promise<Character | null> => {
  try {
    const docRef = doc(db, CHARACTERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Character;
    }
    return null;
  } catch (error) {
    console.error('Error loading character:', error);
    return null;
  }
};

// Add a new character
export const addCharacter = async (character: Omit<Character, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, CHARACTERS_COLLECTION), {
      ...character,
      createdAt: Timestamp.now().toMillis(),
      updatedAt: Timestamp.now().toMillis()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding character:', error);
    throw error;
  }
};

// Update an existing character
export const updateCharacter = async (id: string, character: Partial<Character>): Promise<void> => {
  try {
    const docRef = doc(db, CHARACTERS_COLLECTION, id);
    await updateDoc(docRef, {
      ...character,
      updatedAt: Timestamp.now().toMillis()
    });
  } catch (error) {
    console.error('Error updating character:', error);
    throw error;
  }
};

// Delete a character
export const deleteCharacter = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, CHARACTERS_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting character:', error);
    return false;
  }
};
