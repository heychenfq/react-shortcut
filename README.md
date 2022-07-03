# react-shortcut

![](https://img.shields.io/github/license/heychenfq/react-shortcut)
![](https://img.shields.io/github/issues/heychenfq/react-shortcut)
![](https://img.shields.io/github/stars/heychenfq/react-shortcut)
![](https://img.shields.io/github/forks/heychenfq/react-shortcut)

---

Full shortcut solution for react app.

## Features

- Strict/Loose mode.

- Page scoped register.

- Dynamic register shortcut.

- Dynamic enable/disable shortcut registered.

- Flexible normal key combinations.

- Use modern browser API.

- Full types supported.

- Shortcut validation.

## Installation

```bash
# npm
npm install react-shortcut
# yarn
yarn add react-shortcut
# pnpm
pnpm add react-shortcut
```

## Supported Keys

### Modfiers

| Key            | Alias                                     | Notes                                    |
| -------------- | ----------------------------------------- | ---------------------------------------- |
| `ControlLeft`  | `Ctrl` `Control` `ControlOrCommand`       |                                          |
| `ControlRight` | `Ctrl` `Control` `ControlOrCommand`       |                                          |
| `MetaLeft`     | `Command` `ConmandLeft ControlOrCommand`  | `Windows` on Windows, `Command` on MacOS |
| `MetaRight`    | `Command` `ConmandRight ControlOrCommand` | `Windows` on Windows, `Command` on MacOS |
| `ShiftLeft`    | `Shift`                                   |                                          |
| `ShiftRight`   | `Shift`                                   |                                          |
| `AltLeft`      | `Option` `OptionLeft`                     | `Option` is only available on MacOS.     |
| `AltRight`     | `Option` `OptionRight`                    | `Option` is only available on MacOS.     |

### Normal Keys

| Key          | Notes                                             |
| ------------ | ------------------------------------------------- |
| `0` \~ `9`   | Number keys in keyboard main area or numpad area. |
| `a` \~ `z`   | Alphabet keys                                     |
| `F1`\~`F12`  | Function keys                                     |
| `,`          | Comma                                             |
| `.`          | Period                                            |
| `/`          | Slash                                             |
| `;`          | Semicolon                                         |
| `'`          | Quote                                             |
| `[`          | BracketLeft                                       |
| `]`          | BracketRight                                      |
| `\`          | Backslash                                         |
| `` ` ``      | Backquote                                         |
| `Escape`     | Alias `Esc`                                       |
| `-`          | Minus                                             |
| `=`          | Equal                                             |
| `Backspace`  | Backspace                                         |
| `Delete`     | Alias `Del`                                       |
| `Tab`        | Tab                                               |
| `Capslock`   | Capslock                                          |
| `Enter`      | Enter                                             |
| `ArrowUp`    | ArrowUp                                           |
| `ArrowDown`  | ArrowDown                                         |
| `ArrowLeft`  | ArrowLeft                                         |
| `ArrowRight` | ArrowRight                                        |
| `Home`       | Home                                              |
| `End`        | End                                               |
| `PageUp`     | PageUp                                            |
| `PageDown`   | PageDown                                          |

## Example

### 1. Register single key shortcut.

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from 'react-shortcut';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  // RegisterShortcut should be invoked in useEffect.
  useEffect(() => {
    registerShortcut('a', (event) => {
      // event is the latest emitted keydown event.
      // you can invoke preventDefault to prevent browser default behavior.
      event.preventDefault();
      // invoked whenever key A pressed.
      console.log('You pressed A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 2. Register shortcut combined with modifier and normal key.

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from 'react-shortcut';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      // invoked whenever key Control and key A  pressed.
      console.log('You pressed Ctrl and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 3. Register scoped shortcut.

```tsx
import React, { useEffect, useRef } from 'react';
import { ReactShortcutProvider, useShortcut } from 'react-shortcut';

function App() {
  const scope1 = useRef<HTMLDivElement>(null);
  const scope2 = useRef<HTMLDivElement>(null);
  return (
    <div id="root">
      <ReactShortcutProvider options={{ scope: scope1 }}>
        <div ref={scope1} tabIndex={-1}>
          <Main />
        </div>
      </ReactShortcutProvider>
      <ReactShortcutProvider options={{ scope: scope2 }}>
        <div ref={scope2} tabIndex={-1}>
          <Main />
        </div>
        <Main />
      </ReactShortcutProvider>
    </div>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      // invoked whenever key Control and key A  pressed.
      console.log('You pressed Ctrl and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

‼️ **Important**: Set element tabIndex property to -1 is to make this element to focusable. Scoped shortcut will not work without this.

### 4. Loose mode.

`react-shortcut` work in strict mode by default, if you want to enable loose mode, you can set `strict` to false. it is only affect the `getCurrentKeyPressed` API.

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from 'react-shortcut';

function App() {
  return (
    <ReactShortcutProvider options={{ strict: false }}>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { getElement, getCurrentKeyPressed } = useShortcut();

  useEffect(() => {
    const cb = () => {
      // if you pressed ControlLeft and A.
      // print ControlLeft+a in strict mode.
      // print Control+a in loose mode.
      console.log(getCurrentKeyPressed());
    };
    getElement()!.addEventListener('keydown', cb);
    return () => {
      getElement()!.removeEventListener('keydown', cb);
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 5. Normal keys combinations.

```tsx
import React, { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from 'react-shortcut';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  // RegisterShortcut should be invoked in useEffect.
  useEffect(() => {
    registerShortcut('a+b', (event) => {
      // invoked whenever key A pressed.
      console.log('You pressed A and B');
    });
    registerShortcut('a+a', (event) => {
      // invoked whenever key A pressed twice.
      console.log('You pressed A twice');
    });
    return () => {
      unregisterShortcut('a+b');
      unregisterShortcut('a+a');
    };
  }, []);

  return <h1>Hello World!</h1>;
}
```

### 6. Dynamic enable/disable shortcut.

```tsx
import React, { useEffect, useCallback, useState } from 'react';
import { ReactShortcutProvider, useShortcut } from 'react-shortcut';

function App() {
  return (
    <ReactShortcutProvider>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut, enableShortcut, disableShortcut } = useShortcut();
  const [enable, setEnable] = useState<boolean>(true);

  const handleClick = useCallback(() => {
    setEnable((prev) => {
      if (prev) {
        disableShortcut('Ctrl+a');
      } else {
        enableShortcut('Ctrl+a');
      }
      return !prev;
    });
  }, []);

  // RegisterShortcut should be invoked in useEffect.
  useEffect(() => {
    registerShortcut('Ctrl+a', (event) => {
      // invoked when key Control and key A pressed and enable is true.
      console.log('You pressed Control and A');
    });
    return () => {
      unregisterShortcut('Ctrl+a');
    };
  }, []);

  return <button onClick={handleClick}>{enable ? 'disable' : 'enable'}</button>;
}
```

### Some shortcut match rules example.

| **Actions**                                                                                                                                 | **Accelerator**      | **Matched** |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| press `ControlLeft` press `AltLeft` release `AltLeft` press `A`                                                                             | `Control+a`          | ✅          |
| press `ControlLeft` press `AltLeft` press `A`                                                                                               | `Control+a`          | ❌          |
| press `ControlRight` press `A`                                                                                                              | `Control+a`          | ✅          |
| press `ControlRight` press `B` release `B` press `A`                                                                                        | `Control+a`          | ✅          |
| press `ControlLeft` press `A`                                                                                                               | `ControlOrCommand+a` | ✅          |
| press `MetaLeft` press `A`                                                                                                                  | `ControlOrCommand+a` | ✅          |
| press `ControlLeft` press `1` press `2` release `1` release `2` press `A` release `A` press `B` release `B` press `C` release `C` press `D` | `Control+a+b+c+d`    | ✅          |
| press `ControlLeft` press `A` release `A` press `1` release `1` press `B` release `B` press `C` release `C` press `D`                       | `Control+a+b+c+d`    | ❌          |
| press `ControlLeft` press `A` release `A` press `A` release `A`                                                                             | `Control+a+a`        | ✅          |

## API Reference

### Interface Definition

```typescript
interface ReactShortcutOptions {
  // work mode, default to true.
  strict?: boolean;
  // print the debug message, default to false.
  debug?: boolean;
  // the element to listen keyboard event. fallback to window if this options is not set.
  scope?: React.RefObject<HTMLElement>;
}

interface ReactShortcutProviderProps {
  options?: ReactShortcutOptions;
  children?: ReactNode;
}

type Accelerator = string;

type ShortcutCallback = (event: KeyboardEvent) => void;

interface ReactShortcutContextValue {
  registerShortcut(accelerator: Accelerator, callback: ShortcutCallback): boolean;
  unregisterShortcut(accelerator: Accelerator): boolean;
  enableShortcut(accelerator: Accelerator): boolean;
  disableShortcut(accelerator: Accelerator): boolean;
  isShortcutRegistered(accelerator: Accelerator): boolean;
  getCurrentKeyPressed(): Accelerator;
  getElement(): HTMLElement | Window | undefined;
}
```

### `Accelerator: string;`

Shortcut description, consist of multiple modifiers or normal keys join with `+`,for example `Ctrl+Alt+a`. All supported keys have list above. The order of modifiers does not affect, so the `Ctrl+Alt+a` and `Alt+Ctrl+a` are exact the same. But `Ctrl+Alt+a+b` is not equal to `Ctrl+Alt+b+a`. Modifiers must preceding normal keys, `a+Ctrl` is invalid.

### `ReactShortcutProvider: React.FC<ReactShortcutProviderProps>;`

React Context Provider of `react-shortcut`. The most common used case is wrap in the root react component. You can also apply multiple `ReactShortcutProvider` to different part of your page to achieve scoped shortcut register.

### `useShortcut: () => ReactShortcutContextValue;`

React Hook, used to get `react-shortcut` API.

### `ReactShortcutContextValue.registerShortcut: (accelerator: Accelerator, callback: ShortcutCallback) => boolean`

Register shortcut handler, return false if current shortcut has registered or current shortcut is invalid.

### `ReactShortcutContextValue.unregisterShortcut: (accelerator: Accelerator) => boolean;`

Unregister shortcut handler, return false if current shortcut has not registered or shortcut is invalid.

### `ReactShortcutContextValue.enableShortcut: (accelerator: Accelerator) => boolean;`

enable shortcut, return false if current shortcut has not registered or shortcut is invalid.

### `ReactShortcutContextValue.disableShortcut: (accelerator: Accelerator) => boolean;`

disable shortcut, return false if current shortcut has not registered or shortcut is invalid.

### `ReactShortcutContextValue.isShortcutRegistered: (accelerator: Accelerator) => boolean;`

Return true is current short has registered.

### `ReactShortcutContextValue.getCurrentKeyPressed: () => Accelerator;`

Return current keys pressed.

### `ReactShortcutContextValue.getElement: () => HTMLElement | Window | undefined;`

Get the current element which keyboard event listened. Should be invoked in `useEffect` callback only. This method will return undefined when dom has not rendered.

## Browser Compatibility

- Chrome ≥ 48

- Firefox ≥ 38

- Safari ≥ 10.1

- Edge ≥ 79

## Alternatives

- [react-hotkeys-hook](https://www.npmjs.com/package/react-hotkeys-hook 'react-hotkeys-hook')

- [react-hot-keys](https://www.npmjs.com/package/react-hot-keys 'react-hot-keys')

## Comparisons

| **Features**                               | **react-shortcut** | **react-hotkeys-hook** | **react-hot-keys** |
| ------------------------------------------ | ------------------ | ---------------------- | ------------------ |
| Dynamic register                           | ✅                 | ✅                     | ❌                 |
| Page scoped register                       | ✅                 | ✅                     | ❌                 |
| Strict/Loose mode                          | ✅                 | ❌                     | ❌                 |
| Dynamic enable/disable shortcut regsitered | ✅                 | ✅ (use namespace)     | ✅(use namespace)  |
| Normal key combinations                    | ✅                 | ✅                     | ❌                 |
| Namespace                                  | ❌                 | ✅                     | ✅                 |
| Shortcuts validation                       | ✅                 | ❌                     | ❌                 |
| Used React ≤ 16                            | ❌                 | ❌                     | ✅                 |

## License

Distributed under the MIT License. See `LICENSE` for more information.
