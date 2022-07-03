import React from 'react';
import { Accelerator } from './accelerator-parser';

export type ShortcutCallback = (event: KeyboardEvent) => void;
export type Dispose = () => void;

export interface ReactShortcutContextValue {
  registerShortcut(accelerator: Accelerator, callback: ShortcutCallback): boolean;
  unregisterShortcut(accelerator: Accelerator): boolean;
  enableShortcut(accelerator: Accelerator): boolean;
  disableShortcut(accelerator: Accelerator): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  getElement(): HTMLElement | Window | undefined;
}

export const ReactShortcutContext = React.createContext<ReactShortcutContextValue>({
  registerShortcut: () => throwProviderNotFoundError(),
  unregisterShortcut: () => throwProviderNotFoundError(),
  enableShortcut: () => throwProviderNotFoundError(),
  disableShortcut: () => throwProviderNotFoundError(),
  isShortcutRegistered: () => throwProviderNotFoundError(),
  getCurrentKeyPressed: () => throwProviderNotFoundError(),
  getElement: () => throwProviderNotFoundError(),
});

function throwProviderNotFoundError(): never {
  throw new Error('ShortcutProvider is not found!');
}
