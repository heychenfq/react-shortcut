import { useContext } from 'react';
import { ReactShortcutContext, ReactShortcutContextValue } from './shortcut-context';

export const useShortcut = () => {
  return useContext<ReactShortcutContextValue>(ReactShortcutContext);
};
