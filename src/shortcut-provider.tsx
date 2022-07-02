import { ReactNode, FC, useRef, useEffect, useMemo } from 'react';
import { ReactShortcutContext, ReactShortcutContextValue } from './shortcut-context';
import { ShortcutRegistry } from './shortcut-registry';

export interface ReactShortcutOptions {
  global?: boolean;
  strict?: boolean;
  debug?: boolean;
}

export interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

export const ReactShortcutProvider: FC<ReactShortcutProviderProps> = function ReactShortcutProvider(props) {
  const { children, options: { global = true, strict = false, debug = false } = {} } = props;
  const ref = useRef<HTMLDivElement>(null);

  const shortcutRegistry = useMemo(() => {
    return new ShortcutRegistry({ strict, debug });
  }, []);

  const contextValue = useMemo<ReactShortcutContextValue>(() => {
    return {
      registerShortcut: shortcutRegistry.registerShortcut.bind(shortcutRegistry),
      unregisterShortcut: shortcutRegistry.unregisterShortcut.bind(shortcutRegistry),
      isShortcutRegistered: shortcutRegistry.isShortcutRegistered.bind(shortcutRegistry),
      getCurrentKeyPressed: shortcutRegistry.getCurrentKeyPressed.bind(shortcutRegistry),
    };
  }, []);

  useEffect(() => {
    return shortcutRegistry.attachElement(global ? window : ref.current!);
  }, []);

  return (
    <ReactShortcutContext.Provider value={contextValue}>
      {global ? (
        children
      ) : (
        <div ref={ref} tabIndex={-1}>
          {children}
        </div>
      )}
    </ReactShortcutContext.Provider>
  );
};

ReactShortcutProvider.displayName = 'ReactShortcutProvider';
