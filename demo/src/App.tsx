import { FC, useEffect, useRef, useState } from 'react';
import { ReactShortcutProvider, useShortcut } from '../../src';
import './App.css';

function App() {
  const scope1 = useRef<HTMLDivElement>(null);
  const scope2 = useRef<HTMLDivElement>(null);
  return (
    <>
      <header className="header">
        <h1>Click below area start to try!</h1>
      </header>
      <main className="body">
        <ReactShortcutProvider options={{ debug: true, strict: true, scope: scope1 }}>
          <div className="main" ref={scope1} tabIndex={-1}>
            <Main title="Strict Mode" />
          </div>
        </ReactShortcutProvider>
        <ReactShortcutProvider options={{ debug: true, strict: false, scope: scope2 }}>
          <div className="main" ref={scope2} tabIndex={-1}>
            <Main title="Loose Mode" />
          </div>
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

  const { getElement, getCurrentKeyPressed } = useShortcut();
  useEffect(() => {
    const cb = () => {
      setKeyPressed(getCurrentKeyPressed());
    };
    getElement()!.addEventListener('keydown', cb);
    return () => {
      getElement()!.removeEventListener('keydown', cb);
    };
  }, []);

  return (
    <div>
      <h2>{props.title}</h2>
      <div className="display-area">
        <h3>You Pressed: {keyPressed}.</h3>
      </div>
    </div>
  );
};

export default App;
