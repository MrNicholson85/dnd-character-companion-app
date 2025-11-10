import { Tabs } from 'expo-router';
import { User, Dices, Sparkles, ScrollText } from 'lucide-react-native';
import { colors } from '@/constants/design';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Characters',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dice"
        options={{
          title: 'Dice',
          tabBarIcon: ({ color, size }) => <Dices size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="spells"
        options={{
          title: 'Spells',
          tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color, size }) => <ScrollText size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
