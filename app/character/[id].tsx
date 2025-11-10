import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Shield, 
  Zap, 
  TrendingUp,
  Sword,
  Edit,
  Trash2,
  User
} from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/design';
import { Character } from '@/types/character';
import { getCharacterById, deleteCharacter, updateCharacter } from '@/utils/storage';
import { calculateModifier, formatModifier } from '@/utils/dnd';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CharacterDetailsScreen() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    loadCharacter();
  }, [id]);

  const loadCharacter = async () => {
    if (!id) return;
    setLoading(true);
    const data = await getCharacterById(id);
    setCharacter(data);
    setLoading(false);
  };

  const handleDelete = () => {
    if (!character) return;

    Alert.alert(
      'Delete Character',
      `Are you sure you want to delete ${character.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteCharacter(character.id);
            router.back();
          },
        },
      ]
    );
  };

  const handleUpdateHP = (newHp: number) => {
    if (!character) return;
    
    const updated = {
      ...character,
      currentHp: Math.max(0, Math.min(newHp, character.maxHp)),
      updatedAt: Date.now(),
    };
    
    updateCharacter(updated);
    setCharacter(updated);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!character) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Character not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }

  const abilityScores = [
    { name: 'STR', value: character.strength, label: 'Strength' },
    { name: 'DEX', value: character.dexterity, label: 'Dexterity' },
    { name: 'CON', value: character.constitution, label: 'Constitution' },
    { name: 'INT', value: character.intelligence, label: 'Intelligence' },
    { name: 'WIS', value: character.wisdom, label: 'Wisdom' },
    { name: 'CHA', value: character.charisma, label: 'Charisma' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.characterName}>{character.name}</Text>
          <Text style={styles.characterSubtitle}>
            Level {character.level} {character.race} {character.class}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Trash2 size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Character Image */}
        {character.imageUri && (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: character.imageUri }} 
              style={styles.characterImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Main Stats */}
        <View style={styles.mainStatsRow}>
          <Card style={styles.mainStatCard}>
            <Heart size={24} color={colors.error} />
            <Text style={styles.mainStatLabel}>Hit Points</Text>
            <Text style={styles.mainStatValue}>
              {character.currentHp}/{character.maxHp}
            </Text>
            <View style={styles.hpControls}>
              <TouchableOpacity 
                style={styles.hpButton}
                onPress={() => handleUpdateHP(character.currentHp - 1)}
              >
                <Text style={styles.hpButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.hpButton}
                onPress={() => handleUpdateHP(character.currentHp + 1)}
              >
                <Text style={styles.hpButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.mainStatCard}>
            <Shield size={24} color={colors.accent} />
            <Text style={styles.mainStatLabel}>Armor Class</Text>
            <Text style={styles.mainStatValue}>{character.armorClass}</Text>
          </Card>

          <Card style={styles.mainStatCard}>
            <Zap size={24} color={colors.warning} />
            <Text style={styles.mainStatLabel}>Initiative</Text>
            <Text style={styles.mainStatValue}>
              {formatModifier(character.initiative)}
            </Text>
          </Card>

          <Card style={styles.mainStatCard}>
            <TrendingUp size={24} color={colors.success} />
            <Text style={styles.mainStatLabel}>Speed</Text>
            <Text style={styles.mainStatValue}>{character.speed} ft</Text>
          </Card>
        </View>

        {/* Ability Scores */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Ability Scores</Text>
          <View style={styles.abilityScoresGrid}>
            {abilityScores.map((ability) => {
              const modifier = calculateModifier(ability.value);
              return (
                <View key={ability.name} style={styles.abilityScore}>
                  <Text style={styles.abilityName}>{ability.name}</Text>
                  <Text style={styles.abilityModifier}>
                    {formatModifier(modifier)}
                  </Text>
                  <Text style={styles.abilityValue}>{ability.value}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Combat Info */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Combat Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Proficiency Bonus</Text>
              <Text style={styles.infoValue}>
                {formatModifier(character.proficiencyBonus)}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Hit Dice</Text>
              <Text style={styles.infoValue}>{character.hitDice}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Temporary HP</Text>
              <Text style={styles.infoValue}>{character.temporaryHp}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Inspiration</Text>
              <Text style={styles.infoValue}>
                {character.inspiration ? '★' : '☆'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Character Info */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Character Information</Text>
          <View style={styles.characterInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Background:</Text>
              <Text style={styles.infoText}>{character.background}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Alignment:</Text>
              <Text style={styles.infoText}>{character.alignment}</Text>
            </View>
          </View>
        </Card>

        {/* Personality */}
        {(character.personality || character.ideals || character.bonds || character.flaws) && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Personality</Text>
            
            {character.personality && (
              <View style={styles.personalityItem}>
                <Text style={styles.personalityLabel}>Personality Traits</Text>
                <Text style={styles.personalityText}>{character.personality}</Text>
              </View>
            )}
            
            {character.ideals && (
              <View style={styles.personalityItem}>
                <Text style={styles.personalityLabel}>Ideals</Text>
                <Text style={styles.personalityText}>{character.ideals}</Text>
              </View>
            )}
            
            {character.bonds && (
              <View style={styles.personalityItem}>
                <Text style={styles.personalityLabel}>Bonds</Text>
                <Text style={styles.personalityText}>{character.bonds}</Text>
              </View>
            )}
            
            {character.flaws && (
              <View style={styles.personalityItem}>
                <Text style={styles.personalityLabel}>Flaws</Text>
                <Text style={styles.personalityText}>{character.flaws}</Text>
              </View>
            )}
          </Card>
        )}

        {/* Equipment */}
        {character.equipment.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment</Text>
            <View style={styles.equipmentList}>
              {character.equipment.map((item, index) => (
                <View key={index} style={styles.equipmentItem}>
                  <Sword size={16} color={colors.textSecondary} />
                  <Text style={styles.equipmentText}>{item}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}
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
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    flex: 1,
    marginLeft: spacing.md,
  },
  characterName: {
    ...typography.h2,
    color: colors.text,
  },
  characterSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterImage: {
    width: '100%',
    height: '100%',
  },
  mainStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.md,
  },
  mainStatCard: {
    width: '48%',
    margin: spacing.xs,
    alignItems: 'center',
    padding: spacing.md,
  },
  mainStatLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  mainStatValue: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.xs,
  },
  hpControls: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  hpButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hpButtonText: {
    ...typography.h3,
    color: colors.text,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  abilityScoresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  abilityScore: {
    width: '30%',
    margin: spacing.xs,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  abilityName: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  abilityModifier: {
    ...typography.h2,
    color: colors.accent,
    marginVertical: spacing.xs,
  },
  abilityValue: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  infoItem: {
    width: '48%',
    margin: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.sm,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.h3,
    color: colors.text,
  },
  characterInfo: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  personalityItem: {
    marginBottom: spacing.md,
  },
  personalityLabel: {
    ...typography.bodySmall,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  personalityText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },
  equipmentList: {
    gap: spacing.sm,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  equipmentText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  loadingText: {
    ...typography.h3,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  errorText: {
    ...typography.h3,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
});
