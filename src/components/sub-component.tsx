/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';
import 'xterm/css/xterm.css';


function SubComponent() {

  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  const imgref = useRef<HTMLImageElement>(null);
  ws.current.binaryType = 'arraybuffer';

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
        if (ev.data != '') {
          if (imgref.current) {
            imgref.current.src = 'data:image/jpg;base64,' + window.btoa(String.fromCharCode(...new Uint8Array(ev.data)));
          }
        };
    }
  }, [imgref]);
  useEffect(() => () => ws.current.close(), [ws]) ; 
  
    return (
      <div>
        <h2>{window.location.host}</h2>
        <img ref={imgref} src=""/>
      </div>
    );
}

export default SubComponent;