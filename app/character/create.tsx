import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { X, Camera, User } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography, borderRadius } from '@/constants/design';
import { Character } from '@/types/character';
import { addCharacter } from '@/utils/storage';
import { DND_CLASSES, DND_RACES, DND_ALIGNMENTS, DND_SKILLS, calculateProficiencyBonus } from '@/utils/dnd';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CreateCharacterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedRace, setSelectedRace] = useState('Human');
  const [selectedClass, setSelectedClass] = useState('Fighter');
  const [level, setLevel] = useState('1');
  const [background, setBackground] = useState('');
  const [alignment, setAlignment] = useState('True Neutral');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  // Ability Scores
  const [strength, setStrength] = useState('10');
  const [dexterity, setDexterity] = useState('10');
  const [constitution, setConstitution] = useState('10');
  const [intelligence, setIntelligence] = useState('10');
  const [wisdom, setWisdom] = useState('10');
  const [charisma, setCharisma] = useState('10');

  // Combat Stats
  const [armorClass, setArmorClass] = useState('10');
  const [speed, setSpeed] = useState('30');
  const [maxHp, setMaxHp] = useState('10');

  const [skills, setSkills] = useState<{ [key: string]: boolean }>({});

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      // For web, use HTML file input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setImageUri(event.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
      return;
    }

    // Request permissions for mobile
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to select an image.');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (Platform.OS === 'web') {
      // Camera not typically available on web, just use file picker
      pickImage();
      return;
    }

    // Request permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera permissions to take a photo.');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleImagePress = () => {
    if (Platform.OS === 'web') {
      // On web, directly open file picker
      pickImage();
    } else {
      // On mobile, show options
      Alert.alert(
        'Add Character Image',
        'Choose an option',
        [
          { text: 'Take Photo', onPress: takePhoto },
          { text: 'Choose from Library', onPress: pickImage },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a character name');
      return;
    }

    const levelNum = parseInt(level) || 1;
    const maxHpNum = parseInt(maxHp) || 10;

    const character: Character = {
      id: Date.now().toString(),
      name: name.trim(),
      race: selectedRace,
      class: selectedClass,
      level: levelNum,
      background: background.trim(),
      alignment,
      imageUri,
      strength: parseInt(strength) || 10,
      dexterity: parseInt(dexterity) || 10,
      constitution: parseInt(constitution) || 10,
      intelligence: parseInt(intelligence) || 10,
      wisdom: parseInt(wisdom) || 10,
      charisma: parseInt(charisma) || 10,
      armorClass: parseInt(armorClass) || 10,
      initiative: 0,
      speed: parseInt(speed) || 30,
      currentHp: maxHpNum,
      maxHp: maxHpNum,
      temporaryHp: 0,
      hitDice: `1d${selectedClass === 'Wizard' || selectedClass === 'Sorcerer' ? '6' : '8'}`,
      proficiencyBonus: calculateProficiencyBonus(levelNum),
      inspiration: false,
      skills,
      equipment: [],
      personality: '',
      ideals: '',
      bonds: '',
      flaws: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addCharacter(character);
    router.back();
  };

  const toggleSkill = (skillName: string) => {
    setSkills((prev) => ({
      ...prev,
      [skillName]: !prev[skillName],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Character</Text>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Character Image */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Character Image</Text>
          <TouchableOpacity 
            style={styles.imagePicker}
            onPress={handleImagePress}
            activeOpacity={0.7}
          >
            {imageUri ? (
              <Image 
                source={{ uri: imageUri }} 
                style={styles.selectedImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePickerPlaceholder}>
                <Camera size={48} color={colors.textMuted} />
                <Text style={styles.imagePickerText}>Tap to add image</Text>
              </View>
            )}
          </TouchableOpacity>
          {imageUri && (
            <Button
              title="Remove Image"
              onPress={() => setImageUri(undefined)}
              variant="secondary"
              size="small"
            />
          )}
        </Card>

        {/* Basic Info */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <Text style={styles.label}>Character Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Race</Text>
          <View style={styles.chipContainer}>
            {DND_RACES.map((race) => (
              <TouchableOpacity
                key={race}
                style={[styles.chip, selectedRace === race && styles.chipActive]}
                onPress={() => setSelectedRace(race)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, selectedRace === race && styles.chipTextActive]}>
                  {race}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Class</Text>
          <View style={styles.chipContainer}>
            {DND_CLASSES.map((cls) => (
              <TouchableOpacity
                key={cls}
                style={[styles.chip, selectedClass === cls && styles.chipActive]}
                onPress={() => setSelectedClass(cls)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, selectedClass === cls && styles.chipTextActive]}>
                  {cls}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Level</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                placeholderTextColor={colors.textMuted}
                value={level}
                onChangeText={setLevel}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Background</Text>
              <TextInput
                style={styles.input}
                placeholder="Folk Hero"
                placeholderTextColor={colors.textMuted}
                value={background}
                onChangeText={setBackground}
              />
            </View>
          </View>

          <Text style={styles.label}>Alignment</Text>
          <View style={styles.chipContainer}>
            {DND_ALIGNMENTS.map((align) => (
              <TouchableOpacity
                key={align}
                style={[styles.chip, alignment === align && styles.chipActive]}
                onPress={() => setAlignment(align)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, alignment === align && styles.chipTextActive]}>
                  {align}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Ability Scores */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Ability Scores</Text>
          
          <View style={styles.abilityGrid}>
            {[
              { label: 'STR', value: strength, setter: setStrength },
              { label: 'DEX', value: dexterity, setter: setDexterity },
              { label: 'CON', value: constitution, setter: setConstitution },
              { label: 'INT', value: intelligence, setter: setIntelligence },
              { label: 'WIS', value: wisdom, setter: setWisdom },
              { label: 'CHA', value: charisma, setter: setCharisma },
            ].map((ability) => (
              <View key={ability.label} style={styles.abilityInput}>
                <Text style={styles.abilityLabel}>{ability.label}</Text>
                <TextInput
                  style={styles.abilityValue}
                  placeholder="10"
                  placeholderTextColor={colors.textMuted}
                  value={ability.value}
                  onChangeText={ability.setter}
                  keyboardType="numeric"
                />
              </View>
            ))}
          </View>
        </Card>

        {/* Combat Stats */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Combat Stats</Text>
          
          <View style={styles.row}>
            <View style={styles.thirdInput}>
              <Text style={styles.label}>AC</Text>
              <TextInput
                style={styles.input}
                placeholder="10"
                placeholderTextColor={colors.textMuted}
                value={armorClass}
                onChangeText={setArmorClass}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.thirdInput}>
              <Text style={styles.label}>Speed</Text>
              <TextInput
                style={styles.input}
                placeholder="30"
                placeholderTextColor={colors.textMuted}
                value={speed}
                onChangeText={setSpeed}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.thirdInput}>
              <Text style={styles.label}>Max HP</Text>
              <TextInput
                style={styles.input}
                placeholder="10"
                placeholderTextColor={colors.textMuted}
                value={maxHp}
                onChangeText={setMaxHp}
                keyboardType="numeric"
              />
            </View>
          </View>
        </Card>

        {/* Skills */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Proficiencies</Text>
          <Text style={styles.subtitle}>Select skills you are proficient in</Text>
          
          <View style={styles.skillsContainer}>
            {DND_SKILLS.map((skill) => (
              <TouchableOpacity
                key={skill.name}
                style={[styles.skillChip, skills[skill.name] && styles.skillChipActive]}
                onPress={() => toggleSkill(skill.name)}
                activeOpacity={0.7}
              >
                <Text style={[styles.skillChipText, skills[skill.name] && styles.skillChipTextActive]}>
                  {skill.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={styles.footer}>
          <Button title="Cancel" onPress={() => router.back()} variant="outline" />
          <Button title="Create Character" onPress={handleSave} variant="primary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  imagePickerPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  imagePickerText: {
    ...typography.body,
    color: colors.textMuted,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  thirdInput: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  chip: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accentDark,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.background,
  },
  abilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  abilityInput: {
    width: '30%',
    alignItems: 'center',
  },
  abilityLabel: {
    ...typography.label,
    color: colors.accent,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  abilityValue: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillChip: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  skillChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  skillChipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  skillChipTextActive: {
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
