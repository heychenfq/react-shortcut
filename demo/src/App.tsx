import { FC, useEffect, useState } from 'react';
import { ReactShortcutProvider, useShortcut } from '../../src';
import './App.css';

function App() {
  return (
    <>
      <header className="header">
        <h1>Click below area start to try!</h1>
      </header>
      <main className="body">
        <ReactShortcutProvider options={{ debug: true, strict: true }}>
          <Main title="Strict Mode" />
        </ReactShortcutProvider>
        <ReactShortcutProvider options={{ debug: true, strict: false }}>
          <Main title="Loose Mode" />
        </ReactShortcutProvider>
      </main>
    </>
  );
}

interface MainProps {
  title: string;
}

const Main: FC<MainProps> = function Main(props) {
  const [keyPressed, setKeyPressed] = useState<string>('');

  const { onKeyPressedChange, ref } = useShortcut();

  useEffect(() => {
    return onKeyPressedChange(setKeyPressed);
  }, []);

  return (
    <div className="main" ref={ref} tabIndex={-1}>
      <h2>{props.title}</h2>
      <div className="display-area">
        <h3>You Pressed: {keyPressed}.</h3>
      </div>
    </div>
  );
};

export default App;
