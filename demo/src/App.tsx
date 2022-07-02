import { useEffect } from 'react';
import { ReactShortcutProvider, useShortcut } from '../../src';
import './App.css';

function App() {
  return (
    <ReactShortcutProvider options={{ debug: true }}>
      <Main />
    </ReactShortcutProvider>
  );
}

function Main() {
  const { registerShortcut, unregisterShortcut } = useShortcut();

  useEffect(() => {
    const result = registerShortcut('ControlOrCommand+Shift+o+o', (e) => {
      console.log(e);
    });
    console.log('register result', result);
    return () => {
      const result = unregisterShortcut('ControlOrCommand+Shift+o+o');
      console.log('unregister result', result);
    };
  }, []);

  return <main>Hello ReactShortCut!!</main>;
}

export default App;
