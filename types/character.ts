export interface Character {
  id: string;
  userId?: string; // For Firebase multi-user support
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  
  // Images
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
  
  // Other Stats
  proficiencyBonus: number;
  inspiration: boolean;
  
  // Skills (proficiency)
  skills: {
    [key: string]: boolean;
  };
  
  // Equipment
  equipment: string[];
  
  // Notes
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  
  createdAt: number;
  updatedAt: number;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  higherLevel?: string;
  classes: string[];
}

export interface InitiativeEntry {
  id: string;
  name: string;
  initiative: number;
  hp: number;
  maxHp: number;
  isPlayer: boolean;
}
