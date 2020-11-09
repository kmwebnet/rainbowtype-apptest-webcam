/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import GenericTemplate from "./GenericTemplate";


const Home: React.FC = () => {
  const [count, setcount] = useState<number>(0);
  const handleClick = () => {
    console.log('クリックされました');

    setcount( count + 1);
  }

    return (
      <GenericTemplate>
      <div>
        <h2>Home</h2>
        <div>{count}</div>
        <button onClick={handleClick}>Add +1</button>
      </div>
      </GenericTemplate>
    );

}

export default Home;
