import React, { useState } from 'react';
import './index.scss';

import getTestObj from "../../api/test";

function App() {
  const [id, setId] = useState();
  const [isFetching, setIsFetching] = useState();
  const [result, setResult] = useState();

  async function submit() {
    setIsFetching(true);
    try {
      const r = await getTestObj(id);
      setResult(r);
    } catch(e) {
      setResult("Error: " + e.message);
    }
    setIsFetching(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter an id to get an item from the database
        </p>
        <div>
          <input type="text" onChange={ (e) => setId(e.target.value) } placeholder="id" />
          <button disabled={ !Boolean(id) || isFetching } onClick={submit}> Submit </button>
          <div>
            <pre>{ JSON.stringify(result, null, 2) }</pre>
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
