import debug from 'debug';
import {
  KeyCode,
  KeyCodesSupported,
  ModifierKeyCode,
  NormalKeyCode,
  keyCode2KeyCodeName,
  ModifierKeyCodeName,
  KeyCodeName,
} from './key-codes';
import { Dispose, ShortcutCallback } from './shortcut-context';
import { AcceleratorParser, type Accelerator } from './accelerator-parser';
import { noop } from './utils';

interface ShortcutRegister {
  accelerator: Accelerator;
  modifiers: Array<Accelerator>;
  normalKeys: Array<Accelerator>;
  callback: ShortcutCallback;
}

interface ShortcutRegisterOptions {
  strict?: boolean;
  debug?: boolean;
}

export class ShortcutRegistry {
  private static KeyCodeModifiers = new Set<ModifierKeyCode>([
    'ControlLeft',
    'ControlRight',
    'ShiftLeft',
    'ShiftRight',
    'AltLeft',
    'AltRight',
    'MetaLeft',
    'MetaRight',
  ]);
  private static LooseModifiersName = new Map<ModifierKeyCode, ModifierKeyCodeName>([
    ['ControlLeft', 'Ctrl'],
    ['ControlRight', 'Ctrl'],
    ['AltLeft', 'Alt'],
    ['AltRight', 'Alt'],
    ['ShiftLeft', 'Shift'],
    ['ShiftRight', 'Shift'],
    ['MetaLeft', 'Meta'],
    ['MetaRight', 'Meta'],
  ]);

  private static keyCodeIsModifiers(keycode: string): keycode is ModifierKeyCode {
    return ShortcutRegistry.KeyCodeModifiers.has(keycode as ModifierKeyCode);
  }

  private readonly debug: (...args: any[]) => void;
  private readonly options: ShortcutRegisterOptions;
  private readonly parser = new AcceleratorParser();
  private shortcutRegistered: Array<ShortcutRegister> = [];
  private modifiersPressed: Array<ModifierKeyCode> = [];
  private normalKeysPressed: Array<NormalKeyCode> = [];

  constructor(options?: ShortcutRegisterOptions) {
    this.options = options ?? {};
    this.options.strict = this.options.strict ?? true;
    if (this.options.debug) {
      if (typeof this.options.debug === 'function') {
        this.debug = this.options.debug;
      } else {
        this.debug = debug('ReactShortcut');
        debug.enable('ReactShortcut');
      }
    } else {
      this.debug = noop;
    }
  }

  registerShortcut(accelerator: Accelerator, callback: ShortcutCallback): boolean {
    try {
      const [modifiers, normalKeys] = this.parser.parseAccelerator(accelerator);
      const matchShortcut = this.matchShortcut(modifiers, normalKeys);
      if (matchShortcut) {
        this.debug(`Shortcut ${accelerator} conflict with ${matchShortcut.accelerator}`);
        return false;
      }
      this.shortcutRegistered.push({
        accelerator,
        modifiers,
        normalKeys,
        callback,
      });
      return true;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  unregisterShortcut(accelerator: Accelerator): boolean {
    try {
      const shortcutRegister = this.matchShortcut(...this.parser.parseAccelerator(accelerator));
      if (!shortcutRegister) {
        this.debug(`Shortcut ${accelerator} is not register yet.`);
        return false;
      }
      this.shortcutRegistered = this.shortcutRegistered.filter((item) => item !== shortcutRegister);
      return true;
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  isShortcutRegistered(accelerator: Accelerator): boolean {
    try {
      return !!this.matchShortcut(...this.parser.parseAccelerator(accelerator));
    } catch (e: any) {
      this.debug(e.message);
      return false;
    }
  }

  getCurrentKeyPressed(): Accelerator {
    return [
      ...this.modifiersPressed
        .map((item) => {
          if (!this.options.strict && ShortcutRegistry.keyCodeIsModifiers(item)) {
            return ShortcutRegistry.LooseModifiersName.get(item)!;
          }
          return keyCode2KeyCodeName.get(item)!;
        })
        .reduce<Array<KeyCodeName>>((memo, item) => {
          if (memo.includes(item)) {
            return memo;
          }
          memo.push(item);
          return memo;
        }, []),
      ...this.normalKeysPressed.map((item) => keyCode2KeyCodeName.get(item)!),
    ].join(AcceleratorParser.separator);
  }

  private matchShortcut(modifiers: Array<Accelerator>, normalKeys: Array<Accelerator>): ShortcutRegister | undefined {
    return this.shortcutRegistered.find((item) => {
      const modifiersSet = new Set([...item.modifiers, ...modifiers]);
      const isModifierMatch = modifiersSet.size < item.modifiers.length + modifiers.length;
      const isNormalKeyMatch = normalKeys.find((normalKey) => {
        return item.normalKeys.find((itemNormalKey) => {
          return itemNormalKey.includes(normalKey) || normalKey.includes(itemNormalKey);
        });
      });
      return isModifierMatch && isNormalKeyMatch;
    });
  }

  attachElement(ele: Window | HTMLElement): Dispose {
    const handleKeydown = this.handleKeydown.bind(this);
    const handleKeyup = this.handleKeyup.bind(this);
    const clear = this.clear.bind(this);
    ele.addEventListener('keydown', handleKeydown as any);
    ele.addEventListener('keyup', handleKeyup as any);
    // window will unfocus when some system global shortcut triggered.
    ele.addEventListener('blur', clear);
    return () => {
      ele.removeEventListener('keydown', handleKeydown as any);
      ele.removeEventListener('keyup', handleKeyup as any);
      ele.removeEventListener('blur', clear);
      this.clear();
      this.shortcutRegistered = [];
    };
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.repeat) return;
    const keycode = event.code as KeyCode;
    if (!KeyCodesSupported.includes(keycode)) {
      this.debug(`Unsupported keyCode: ${event.code}!`);
      return;
    }
    if (ShortcutRegistry.keyCodeIsModifiers(keycode)) {
      this.modifiersPressed.push(keycode);
      // reset keycode record when modifiers change
      this.normalKeysPressed = [];
    } else {
      this.normalKeysPressed.push(keycode);
    }
    this.triggerShortcutEventIfHandlerFound(event);
  }

  private handleKeyup(event: KeyboardEvent) {
    const keycode = event.code as KeyCode;
    if (ShortcutRegistry.keyCodeIsModifiers(keycode)) {
      this.modifiersPressed = this.modifiersPressed.filter((code) => {
        return keycode !== code;
      });
      // reset keycode record when modifiers change
      this.normalKeysPressed = [];
    }
  }

  private clear() {
    this.modifiersPressed = [];
    this.normalKeysPressed = [];
  }

  private triggerShortcutEventIfHandlerFound(event: KeyboardEvent) {
    const modifier = [...this.modifiersPressed].sort().join(AcceleratorParser.separator);
    const normalKey = this.normalKeysPressed.join(AcceleratorParser.separator);
    const shortcutRegister = this.shortcutRegistered.find((item) => {
      return (
        item.modifiers.includes(modifier) && item.normalKeys.find((itemNormalKey) => normalKey.endsWith(itemNormalKey))
      );
    });
    if (shortcutRegister) {
      shortcutRegister.callback(event);
      this.normalKeysPressed = [];
    }
  }
}
