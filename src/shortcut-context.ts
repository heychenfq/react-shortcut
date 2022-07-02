import React from 'react';
import { Accelerator } from './accelerator-parser';

export type ShortcutCallback = (event: KeyboardEvent) => void;
export type KeyPressedListener = (accelerator: Accelerator) => void;
export type Dispose = () => void;

export interface ReactShortcutContextValue {
  registerShortcut(accelerator: Accelerator, callback: ShortcutCallback): boolean;
  unregisterShortcut(accelerator: Accelerator): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  onKeyPressedChange(cb: KeyPressedListener): Dispose;
  ref: React.RefObject<any>;
}

export const ReactShortcutContext = React.createContext<ReactShortcutContextValue>({
  registerShortcut: () => throwProviderNotFoundError(),
  unregisterShortcut: () => throwProviderNotFoundError(),
  isShortcutRegistered: () => throwProviderNotFoundError(),
  getCurrentKeyPressed: () => throwProviderNotFoundError(),
  onKeyPressedChange: () => throwProviderNotFoundError(),
  ref: React.createRef(),
});

function throwProviderNotFoundError(): never {
  throw new Error('ShortcutProvider is not found!');
}
