/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';

function SubComponent2() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  ws.current.binaryType = 'arraybuffer';
  const imgref = useRef<React.RefObject<HTMLImageElement>[]>([]);
  const [serial, setserial] = useState<string[]>([]);

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data) {
        const tserial: string = ev.data.slice(-18).toString();
        if (tserial.slice(0, 4) === '0123') {
          if (!serial.some((e) => e === tserial)) {
            const sserial: string[] = [...serial, tserial];
            setserial(sserial);
            imgref.current.push(React.createRef<HTMLImageElement>());
          }
          const idx = serial.indexOf(tserial);
          console.log(idx);
          /*
          if (imgref.current[idx] === null) return;
          if (imgref.current[idx].current === null) return;
          if (imgref.current[idx].current.src === null) return;
          if (imgref.current[idx].current.complete === null) return;

          if (imgref.current[idx].current.complete) {
            imgref.current[idx].current.src =
              'data:image/jpg;base64,' +
              window.btoa(
                String.fromCharCode(...new Uint8Array(ev.data.slice(0, -18)))
              );
          }
          */
        }
      }
    };
  }, []);
  useEffect(() => () => ws.current.close(), [ws]);

  /*
  useEffect(() => {

  }, [serial])
  */

  return (
    <div>
      <h2>{window.location.host}</h2>
      {serial.map((v, i) => (
        <div key={v}>
          <img key={v} ref={imgref.current[i]} src="" />
          CAMERA{i}
        </div>
      ))}
    </div>
  );
}

export default SubComponent2;
