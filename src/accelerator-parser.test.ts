import { AcceleratorParser } from './accelerator-parser';

const parser = new AcceleratorParser();

describe('parseAccelerator', () => {
  it('parse success', () => {
    expect(parser.parseAccelerator('Ctrl')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft",
          "ControlRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Control')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft",
          "ControlRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ControlLeft')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ControlRight')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ControlOrCommand')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft",
          "ControlRight",
          "MetaLeft",
          "MetaRight",
          "OSLeft",
          "OSRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Shift')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ShiftLeft",
          "ShiftRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ShiftLeft')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ShiftLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ShiftRight')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ShiftRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Alt')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft",
          "AltRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('AltLeft')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('AltRight')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Option')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft",
          "AltRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('OptionLeft')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('OptionRight')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Meta')).toMatchInlineSnapshot(`
      Array [
        Array [
          "MetaLeft",
          "MetaRight",
          "OSLeft",
          "OSRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('MetaLeft')).toMatchInlineSnapshot(`
      Array [
        Array [
          "MetaLeft",
          "OSLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('MetaRight')).toMatchInlineSnapshot(`
      Array [
        Array [
          "MetaRight",
          "OSRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Command')).toMatchInlineSnapshot(`
      Array [
        Array [
          "MetaLeft",
          "MetaRight",
          "OSLeft",
          "OSRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('CommandLeft')).toMatchInlineSnapshot(`
      Array [
        Array [
          "MetaLeft",
          "OSLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('CommandRight')).toMatchInlineSnapshot(`
      Array [
        Array [
          "MetaRight",
          "OSRight",
        ],
        Array [
          "",
        ],
      ]
    `);

    expect(parser.parseAccelerator('Ctrl+i')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft",
          "ControlRight",
        ],
        Array [
          "KeyI",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ControlLeft+Option')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft+ControlLeft",
          "AltRight+ControlLeft",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Command+Option')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft+MetaLeft",
          "AltLeft+MetaRight",
          "AltLeft+OSLeft",
          "AltLeft+OSRight",
          "AltRight+MetaLeft",
          "AltRight+MetaRight",
          "AltRight+OSLeft",
          "AltRight+OSRight",
        ],
        Array [
          "",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Command+Option+Shift++')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft+MetaLeft+ShiftLeft",
          "AltLeft+MetaRight+ShiftLeft",
          "AltLeft+OSLeft+ShiftLeft",
          "AltLeft+OSRight+ShiftLeft",
          "AltRight+MetaLeft+ShiftLeft",
          "AltRight+MetaRight+ShiftLeft",
          "AltRight+OSLeft+ShiftLeft",
          "AltRight+OSRight+ShiftLeft",
          "AltLeft+MetaLeft+ShiftRight",
          "AltLeft+MetaRight+ShiftRight",
          "AltLeft+OSLeft+ShiftRight",
          "AltLeft+OSRight+ShiftRight",
          "AltRight+MetaLeft+ShiftRight",
          "AltRight+MetaRight+ShiftRight",
          "AltRight+OSLeft+ShiftRight",
          "AltRight+OSRight+ShiftRight",
        ],
        Array [
          "Plus",
        ],
      ]
    `);
    expect(parser.parseAccelerator('ControlOrCommand+Option+Shift+i')).toMatchInlineSnapshot(`
      Array [
        Array [
          "AltLeft+ControlLeft+ShiftLeft",
          "AltLeft+ControlRight+ShiftLeft",
          "AltLeft+MetaLeft+ShiftLeft",
          "AltLeft+MetaRight+ShiftLeft",
          "AltLeft+OSLeft+ShiftLeft",
          "AltLeft+OSRight+ShiftLeft",
          "AltRight+ControlLeft+ShiftLeft",
          "AltRight+ControlRight+ShiftLeft",
          "AltRight+MetaLeft+ShiftLeft",
          "AltRight+MetaRight+ShiftLeft",
          "AltRight+OSLeft+ShiftLeft",
          "AltRight+OSRight+ShiftLeft",
          "AltLeft+ControlLeft+ShiftRight",
          "AltLeft+ControlRight+ShiftRight",
          "AltLeft+MetaLeft+ShiftRight",
          "AltLeft+MetaRight+ShiftRight",
          "AltLeft+OSLeft+ShiftRight",
          "AltLeft+OSRight+ShiftRight",
          "AltRight+ControlLeft+ShiftRight",
          "AltRight+ControlRight+ShiftRight",
          "AltRight+MetaLeft+ShiftRight",
          "AltRight+MetaRight+ShiftRight",
          "AltRight+OSLeft+ShiftRight",
          "AltRight+OSRight+ShiftRight",
        ],
        Array [
          "KeyI",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Control+Shift+1+2+3+4+5+6')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft+ShiftLeft",
          "ControlRight+ShiftLeft",
          "ControlLeft+ShiftRight",
          "ControlRight+ShiftRight",
        ],
        Array [
          "Digit1+Digit2+Digit3+Digit4+Digit5+Digit6",
        ],
      ]
    `);
    expect(parser.parseAccelerator('Control+i+i')).toMatchInlineSnapshot(`
      Array [
        Array [
          "ControlLeft",
          "ControlRight",
        ],
        Array [
          "KeyI+KeyI",
        ],
      ]
    `);
  });

  it('parse error', () => {
    expect(() => parser.parseAccelerator('ctrl+i')).toThrowErrorMatchingInlineSnapshot(
      `"parse accelerator failed in position 0."`,
    );
    expect(() => parser.parseAccelerator('Control+i+Option')).toThrowErrorMatchingInlineSnapshot(
      `"parse accelerator failed in position 11."`,
    );
    expect(() => parser.parseAccelerator('Control+')).toThrowErrorMatchingInlineSnapshot(
      `"parse accelerator failed in position 8."`,
    );
  });

  it('shortcut alias', () => {
    expect(parser.parseAccelerator('Meta+Option')).toEqual(parser.parseAccelerator('Command+Alt'));
  });
});
