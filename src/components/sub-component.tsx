/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useRef } from 'react';

function SubComponent() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  const imgref = useRef<HTMLImageElement>(null);
  ws.current.binaryType = 'arraybuffer';

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data != '') {
        console.log(ev.data.length);
        if (imgref.current && imgref.current.complete) {
          imgref.current.src =
            'data:image/jpg;base64,' +
            window.btoa(String.fromCharCode(...new Uint8Array(ev.data)));
        }
      }
    };
  }, []);
  useEffect(() => () => ws.current.close(), [ws]);

  return (
    <div>
      <h2>{window.location.host}</h2>
      <img ref={imgref} src="" />
    </div>
  );
}

export default SubComponent;
