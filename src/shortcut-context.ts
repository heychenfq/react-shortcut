import React from 'react';
import { Accelerator } from './accelerator-parser';

export type ShortcutCallback = (event: KeyboardEvent) => void;

export interface ReactShortcutContextValue {
  registerShortcut(accelerator: Accelerator, callback: ShortcutCallback): boolean;
  unregisterShortcut(accelerator: Accelerator): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
}

export const ReactShortcutContext = React.createContext<ReactShortcutContextValue>({
  registerShortcut: () => throwProviderNotFoundError(),
  unregisterShortcut: () => throwProviderNotFoundError(),
  isShortcutRegistered: () => throwProviderNotFoundError(),
  getCurrentKeyPressed: () => throwProviderNotFoundError(),
});

function throwProviderNotFoundError(): never {
  throw new Error('ShortcutProvider is not found!');
}
