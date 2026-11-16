import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>User Posts App</h1>
      <p>React + TypeScript + Material UI + Jest</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Count is {count}
      </button>
    </div>
  );
}

export default App;
