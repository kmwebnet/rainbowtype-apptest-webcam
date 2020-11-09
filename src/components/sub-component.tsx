/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';
import 'xterm/css/xterm.css';


function SubComponent() {

  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  ws.current.binaryType = 'arraybuffer';

  const [frame, setframe] = useState<string> ('');
  const handleClick = () => {
    console.log('クリックされました');
    ws.current.send('data sent.');
  }
  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
        if (ev.data != '') {
          const ab = ev.data; 
          const bytes = new Uint8Array(ab);
            setframe('data:image/jpg;base64,' + window.btoa(String.fromCharCode(...bytes)));
        };
    }
  });
  useEffect(() => () => ws.current.close(), [ws]) ; 
  
    return (
      <div>
        <h2>{window.location.host}</h2>
        <img src={frame}/>
        <button onClick={handleClick}>Add +1</button>
      </div>
    );
}

export default SubComponent;