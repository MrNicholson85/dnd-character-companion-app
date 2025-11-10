import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/constants/design';
import { InitiativeEntry } from '@/types/character';
import { getInitiativeEntries, saveInitiativeEntries } from '@/utils/storage';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ToolsScreen() {
  const [initiatives, setInitiatives] = useState<InitiativeEntry[]>([]);
  const [newName, setNewName] = useState('');
  const [newInitiative, setNewInitiative] = useState('');
  const [newHp, setNewHp] = useState('');
  const [newMaxHp, setNewMaxHp] = useState('');

  useEffect(() => {
    loadInitiatives();
  }, []);

  const loadInitiatives = async () => {
    const data = await getInitiativeEntries();
    const sorted = data.sort((a, b) => b.initiative - a.initiative);
    setInitiatives(sorted);
  };

  const addEntry = () => {
    if (!newName || !newInitiative) {
      Alert.alert('Error', 'Please enter name and initiative');
      return;
    }

    const entry: InitiativeEntry = {
      id: Date.now().toString(),
      name: newName,
      initiative: parseInt(newInitiative) || 0,
      hp: parseInt(newHp) || 0,
      maxHp: parseInt(newMaxHp) || 0,
      isPlayer: false,
    };

    const updated = [...initiatives, entry].sort((a, b) => b.initiative - a.initiative);
    setInitiatives(updated);
    saveInitiativeEntries(updated);

    // Clear inputs
    setNewName('');
    setNewInitiative('');
    setNewHp('');
    setNewMaxHp('');
  };

  const removeEntry = (id: string) => {
    const updated = initiatives.filter((e) => e.id !== id);
    setInitiatives(updated);
    saveInitiativeEntries(updated);
  };

  const updateHp = (id: string, change: number) => {
    const updated = initiatives.map((entry) =>
      entry.id === id
        ? { ...entry, hp: Math.max(0, Math.min(entry.maxHp, entry.hp + change)) }
        : entry
    );
    setInitiatives(updated);
    saveInitiativeEntries(updated);
  };

  const clearAll = () => {
    Alert.alert('Clear Initiative', 'Remove all entries?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          setInitiatives([]);
          saveInitiativeEntries([]);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Initiative Tracker</Text>

        {/* Add Entry Form */}
        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Add Combatant</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={colors.textMuted}
            value={newName}
            onChangeText={setNewName}
          />
          
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="Initiative"
              placeholderTextColor={colors.textMuted}
              value={newInitiative}
              onChangeText={setNewInitiative}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="HP"
              placeholderTextColor={colors.textMuted}
              value={newHp}
              onChangeText={setNewHp}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.inputSmall]}
              placeholder="Max HP"
              placeholderTextColor={colors.textMuted}
              value={newMaxHp}
              onChangeText={setNewMaxHp}
              keyboardType="numeric"
            />
          </View>

          <Button title="Add" onPress={addEntry} variant="primary" />
        </Card>

        {/* Initiative List */}
        {initiatives.length > 0 && (
          <Card style={styles.initiativeCard}>
            <View style={styles.initiativeHeader}>
              <Text style={styles.formTitle}>Combat Order</Text>
              <TouchableOpacity onPress={clearAll} activeOpacity={0.7}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            </View>

            {initiatives.map((entry, index) => (
              <View key={entry.id} style={styles.initiativeEntry}>
                <View style={styles.initiativeLeft}>
                  <View style={styles.initiativeBadge}>
                    <Text style={styles.initiativeNumber}>{entry.initiative}</Text>
                  </View>
                  <View style={styles.entryInfo}>
                    <Text style={styles.entryName}>{entry.name}</Text>
                    {entry.maxHp > 0 && (
                      <View style={styles.hpContainer}>
                        <View style={styles.hpBar}>
                          <View
                            style={[
                              styles.hpFill,
                              { width: `${(entry.hp / entry.maxHp) * 100}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.hpText}>
                          {entry.hp}/{entry.maxHp}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.entryActions}>
                  {entry.maxHp > 0 && (
                    <>
                      <TouchableOpacity
                        style={styles.hpButton}
                        onPress={() => updateHp(entry.id, -1)}
                        activeOpacity={0.7}
                      >
                        <ArrowDown size={16} color={colors.error} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.hpButton}
                        onPress={() => updateHp(entry.id, 1)}
                        activeOpacity={0.7}
                      >
                        <ArrowUp size={16} color={colors.success} />
                      </TouchableOpacity>
                    </>
                  )}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeEntry(entry.id)}
                    activeOpacity={0.7}
                  >
                    <Trash2 size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Card>
        )}

        {initiatives.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No combatants in initiative order</Text>
          </View>
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
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  formCard: {
    marginBottom: spacing.md,
  },
  formTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  inputSmall: {
    flex: 1,
  },
  initiativeCard: {
    marginBottom: spacing.md,
  },
  initiativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  clearText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '600',
  },
  initiativeEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  initiativeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  initiativeBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  initiativeNumber: {
    ...typography.h3,
    color: colors.background,
    fontWeight: '700',
  },
  entryInfo: {
    flex: 1,
  },
  entryName: {
    ...typography.h4,
    color: colors.text,
    marginBottom: 4,
  },
  hpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  hpBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  hpFill: {
    height: '100%',
    backgroundColor: colors.hp,
  },
  hpText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '600',
    minWidth: 50,
  },
  entryActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  hpButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
