import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Plus, User, Trash2 } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/design';
import { Character } from '@/types/character';
import { getCharacters, deleteCharacter } from '@/utils/storage';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CharactersScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadCharacters = useCallback(async () => {
    setLoading(true);
    const data = await getCharacters();
    setCharacters(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCharacters();
    }, [loadCharacters])
  );

  const handleDeleteCharacter = (id: string, name: string) => {
    console.log('[CharactersScreen] Delete requested for:', { id, name });
    
    Alert.alert(
      'Delete Character',
      `Are you sure you want to delete ${name}?`,
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => console.log('[CharactersScreen] Delete cancelled')
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            console.log('[CharactersScreen] Delete confirmed, executing...');
            try {
              // Optimistic update - remove from UI immediately
              setCharacters(prev => prev.filter(c => c.id !== id));
              
              // Then delete from storage
              const deleted = await deleteCharacter(id);
              
              if (deleted) {
                console.log('[CharactersScreen] Character deleted successfully');
              } else {
                console.warn('[CharactersScreen] Character not found in storage');
                // Reload to sync state
                await loadCharacters();
              }
            } catch (error) {
              console.error('[CharactersScreen] Error deleting character:', error);
              Alert.alert('Error', 'Failed to delete character. Please try again.');
              // Reload to restore correct state
              await loadCharacters();
            }
          },
        },
      ]
    );
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <Card style={styles.characterCard}>
      <TouchableOpacity
        style={styles.characterContent}
        activeOpacity={0.7}
        onPress={() => router.push({ pathname: '/character/[id]', params: { id: item.id } })}
      >
        <View style={styles.characterIcon}>
          {item.imageUri ? (
            <Image 
              source={{ uri: item.imageUri }} 
              style={styles.characterImage}
              resizeMode="cover"
            />
          ) : (
            <User size={32} color={colors.accent} />
          )}
        </View>
        
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>{item.name}</Text>
          <Text style={styles.characterDetails}>
            Level {item.level} {item.race} {item.class}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>HP</Text>
              <Text style={styles.statValue}>
                {item.currentHp}/{item.maxHp}
              </Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statLabel}>AC</Text>
              <Text style={styles.statValue}>{item.armorClass}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteCharacter(item.id, item.name)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Trash2 size={20} color={colors.error} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {characters.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <User size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No Characters Yet</Text>
            <Text style={styles.emptyText}>
              Create your first character to begin your adventure
            </Text>
          </View>
        ) : (
          <FlatList
            data={characters}
            renderItem={renderCharacter}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={styles.footer}>
          <Button
            title="Create Character"
            onPress={() => router.push('/character/create')}
            variant="primary"
            size="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  list: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  characterCard: {
    marginBottom: spacing.md,
  },
  characterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    overflow: 'hidden',
  },
  characterImage: {
    width: 56,
    height: 56,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 4,
  },
  characterDetails: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  statValue: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
  },
  deleteButton: {
    padding: spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
