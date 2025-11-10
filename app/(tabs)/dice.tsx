import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/design';
import { rollDice, rollMultipleDice } from '@/utils/dnd';
import Card from '@/components/ui/Card';

type DiceType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

interface DiceRoll {
  type: DiceType;
  results: number[];
  total: number;
  timestamp: number;
}

const DICE_COLORS = {
  4: colors.d4,
  6: colors.d6,
  8: colors.d8,
  10: colors.d10,
  12: colors.d12,
  20: colors.d20,
  100: colors.accent,
};

export default function DiceScreen() {
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedModifier, setSelectedModifier] = useState(0);

  const handleRoll = (diceType: DiceType) => {
    const results = rollMultipleDice(selectedCount, diceType);
    const total = results.reduce((sum, val) => sum + val, 0) + selectedModifier;
    
    const newRoll: DiceRoll = {
      type: diceType,
      results,
      total,
      timestamp: Date.now(),
    };
    
    setRollHistory([newRoll, ...rollHistory.slice(0, 19)]);
  };

  const clearHistory = () => {
    setRollHistory([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Dice Count Selector */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Dice</Text>
          <View style={styles.countSelector}>
            {[1, 2, 3, 4].map((count) => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.countButton,
                  selectedCount === count && styles.countButtonActive,
                ]}
                onPress={() => setSelectedCount(count)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.countText,
                    selectedCount === count && styles.countTextActive,
                  ]}
                >
                  {count}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Modifier Selector */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Modifier</Text>
          <View style={styles.modifierSelector}>
            <TouchableOpacity
              style={styles.modifierButton}
              onPress={() => setSelectedModifier(Math.max(-10, selectedModifier - 1))}
              activeOpacity={0.7}
            >
              <Text style={styles.modifierButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.modifierValue}>
              {selectedModifier >= 0 ? '+' : ''}{selectedModifier}
            </Text>
            <TouchableOpacity
              style={styles.modifierButton}
              onPress={() => setSelectedModifier(Math.min(10, selectedModifier + 1))}
              activeOpacity={0.7}
            >
              <Text style={styles.modifierButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Dice Buttons */}
        <View style={styles.diceGrid}>
          {([4, 6, 8, 10, 12, 20, 100] as DiceType[]).map((dice) => (
            <TouchableOpacity
              key={dice}
              style={[styles.diceButton, { backgroundColor: DICE_COLORS[dice] }]}
              onPress={() => handleRoll(dice)}
              activeOpacity={0.8}
            >
              <Text style={styles.diceLabel}>d{dice}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Roll History */}
        {rollHistory.length > 0 && (
          <Card style={styles.section}>
            <View style={styles.historyHeader}>
              <Text style={styles.sectionTitle}>Roll History</Text>
              <TouchableOpacity onPress={clearHistory} activeOpacity={0.7}>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>
            </View>
            
            {rollHistory.slice(0, 10).map((roll, index) => (
              <View key={roll.timestamp} style={styles.historyItem}>
                <View style={styles.historyLeft}>
                  <View
                    style={[
                      styles.historyDice,
                      { backgroundColor: DICE_COLORS[roll.type] },
                    ]}
                  >
                    <Text style={styles.historyDiceText}>d{roll.type}</Text>
                  </View>
                  <Text style={styles.historyRolls}>
                    {roll.results.join(', ')}
                    {selectedModifier !== 0 && ` ${selectedModifier >= 0 ? '+' : ''}${selectedModifier}`}
                  </Text>
                </View>
                <Text style={styles.historyTotal}>{roll.total}</Text>
              </View>
            ))}
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
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  countSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  countButton: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  countButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accentDark,
  },
  countText: {
    ...typography.h3,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  countTextActive: {
    color: colors.background,
  },
  modifierSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  modifierButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifierButtonText: {
    ...typography.h2,
    color: colors.accent,
    fontWeight: '700',
  },
  modifierValue: {
    ...typography.h1,
    color: colors.text,
    fontWeight: '700',
    minWidth: 80,
    textAlign: 'center',
  },
  diceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  diceButton: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  diceLabel: {
    ...typography.h1,
    color: colors.text,
    fontWeight: '700',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  clearButton: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyDice: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  historyDiceText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '700',
  },
  historyRolls: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  historyTotal: {
    ...typography.h3,
    color: colors.accent,
    fontWeight: '700',
  },
});
