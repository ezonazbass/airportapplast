// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';
import { SFSymbols6_0 } from 'sf-symbols-typescript';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'person.fill': 'person',
  'airplane': 'flight',
  'moon.fill': 'dark-mode',
  'sun.max.fill': 'light-mode',
  'person.crop.circle': 'account-circle',
  'person.crop.circle.fill': 'account-circle',
  'ticket.fill': 'confirmation-number',
  'clock.fill': 'history',
  'creditcard.fill': 'credit-card',
  'crown.fill': 'star',
  'car.fill': 'directions-car',
  'suitcase.fill': 'work',
  'bell.fill': 'notifications',
  'globe': 'language',
  'lock.fill': 'lock',
  'questionmark.circle.fill': 'help',
  'chevron.right': 'chevron-right',
  'arrow.triangle.2.circlepath': 'swap-horiz',
  'airplane.departure': 'flight-takeoff',
  'airplane.arrival': 'flight-land',
  'calendar': 'calendar-today',
  'xmark.circle.fill': 'cancel',
  'magnifyingglass': 'search',
} as IconMapping;

interface IconSymbolProps {
  name: SFSymbols6_0;
  size: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ name, size, color, style, weight }: IconSymbolProps) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
