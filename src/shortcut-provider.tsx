import { ReactNode, FC, useRef, useEffect, useMemo } from 'react';
import { ReactShortcutContext, ReactShortcutContextValue } from './shortcut-context';
import { ShortcutRegistry } from './shortcut-registry';

export interface ReactShortcutOptions {
  strict?: boolean;
  debug?: boolean;
}

export interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

export const ReactShortcutProvider: FC<ReactShortcutProviderProps> = function ReactShortcutProvider(props) {
  const { children, options: { strict = false, debug = false } = {} } = props;
  const ref = useRef<HTMLElement>(null);

  const shortcutRegistry = useMemo(() => {
    return new ShortcutRegistry({ strict, debug });
  }, []);

  const contextValue = useMemo<ReactShortcutContextValue>(() => {
    return {
      registerShortcut: shortcutRegistry.registerShortcut.bind(shortcutRegistry),
      unregisterShortcut: shortcutRegistry.unregisterShortcut.bind(shortcutRegistry),
      isShortcutRegistered: shortcutRegistry.isShortcutRegistered.bind(shortcutRegistry),
      getCurrentKeyPressed: shortcutRegistry.getCurrentKeyPressed.bind(shortcutRegistry),
      onKeyPressedChange: shortcutRegistry.onKeyPressedChange.bind(shortcutRegistry),
      ref,
    };
  }, []);

  useEffect(() => {
    return shortcutRegistry.attachElement(ref.current ?? window);
  }, []);

  return <ReactShortcutContext.Provider value={contextValue}>{children}</ReactShortcutContext.Provider>;
};

ReactShortcutProvider.displayName = 'ReactShortcutProvider';
