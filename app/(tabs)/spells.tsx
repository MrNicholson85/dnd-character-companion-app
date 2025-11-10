import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, Sparkles } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/design';
import { Spell } from '@/types/character';
import { SPELLS } from '@/data/spells';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function SpellsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  const filteredSpells = SPELLS.filter((spell) => {
    const matchesSearch = spell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         spell.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === null || spell.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const renderSpell = ({ item }: { item: Spell }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setSelectedSpell(item)}
    >
      <Card style={styles.spellCard}>
        <View style={styles.spellHeader}>
          <View>
            <Text style={styles.spellName}>{item.name}</Text>
            <Text style={styles.spellSchool}>
              {item.level === 0 ? 'Cantrip' : `Level ${item.level}`} • {item.school}
            </Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>
        <Text style={styles.spellDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.spellClasses}>
          {item.classes.map((className) => (
            <View key={className} style={styles.classBadge}>
              <Text style={styles.classText}>{className}</Text>
            </View>
          ))}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search spells..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Level Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedLevel === null && styles.filterButtonActive]}
            onPress={() => setSelectedLevel(null)}
            activeOpacity={0.7}
          >
            <Text style={[styles.filterText, selectedLevel === null && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.filterButton, selectedLevel === level && styles.filterButtonActive]}
              onPress={() => setSelectedLevel(level)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, selectedLevel === level && styles.filterTextActive]}>
                {level === 0 ? 'C' : level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spell List */}
        <FlatList
          data={filteredSpells}
          renderItem={renderSpell}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Sparkles size={64} color={colors.textMuted} />
              <Text style={styles.emptyText}>No spells found</Text>
            </View>
          }
        />
      </View>

      {/* Spell Detail Modal */}
      <Modal
        visible={selectedSpell !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedSpell(null)}
      >
        {selectedSpell && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedSpell.name}</Text>
              <TouchableOpacity onPress={() => setSelectedSpell(null)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <View style={styles.spellMeta}>
                <Text style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Level: </Text>
                  {selectedSpell.level === 0 ? 'Cantrip' : selectedSpell.level}
                </Text>
                <Text style={styles.metaItem}>
                  <Text style={styles.metaLabel}>School: </Text>
                  {selectedSpell.school}
                </Text>
                <Text style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Casting Time: </Text>
                  {selectedSpell.castingTime}
                </Text>
                <Text style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Range: </Text>
                  {selectedSpell.range}
                </Text>
                <Text style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Components: </Text>
                  {selectedSpell.components}
                </Text>
                <Text style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Duration: </Text>
                  {selectedSpell.duration}
                </Text>
              </View>

              <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{selectedSpell.description}</Text>
              </View>

              {selectedSpell.higherLevel && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.sectionTitle}>At Higher Levels</Text>
                  <Text style={styles.descriptionText}>{selectedSpell.higherLevel}</Text>
                </View>
              )}

              <View style={styles.classesSection}>
                <Text style={styles.sectionTitle}>Available To</Text>
                <View style={styles.classesList}>
                  {selectedSpell.classes.map((className) => (
                    <View key={className} style={styles.classTag}>
                      <Text style={styles.classTagText}>{className}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const getLevelColor = (level: number): string => {
  const colors_map: { [key: number]: string } = {
    0: colors.textMuted,
    1: colors.info,
    2: colors.success,
    3: colors.accent,
    4: colors.warning,
    5: colors.primary,
    6: colors.secondary,
    7: colors.d12,
    8: colors.error,
    9: colors.primaryDark,
  };
  return colors_map[level] || colors.textMuted;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    minWidth: 40,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.accent,
  },
  filterText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.background,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  spellCard: {
    marginBottom: spacing.md,
  },
  spellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  spellName: {
    ...typography.h3,
    color: colors.text,
  },
  spellSchool: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  levelBadge: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700',
  },
  spellDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  spellClasses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  classBadge: {
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  classText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    flex: 1,
  },
  modalContent: {
    flex: 1,
    padding: spacing.md,
  },
  spellMeta: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  metaItem: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  metaLabel: {
    fontWeight: '600',
    color: colors.accent,
  },
  descriptionSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  descriptionText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  classesSection: {
    marginBottom: spacing.md,
  },
  classesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  classTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  classTagText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});
