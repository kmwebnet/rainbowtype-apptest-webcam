/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef, createRef } from 'react';

function SubComponent2() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  ws.current.binaryType = 'arraybuffer';
  const imgref = useRef<Array<React.RefObject<HTMLImageElement>>>([]);
  const serial: string[] = [];
  const [slen, setslen] = useState<number>(0);

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data) {
        const tserial: string = ev.data.slice(-18).toString();
        console.log(tserial);
        if (tserial.slice(0, 4) === '0123') {
          if (!serial.some((e) => e === tserial)) {
            serial.push(tserial);
            setslen(serial.length);
            //imgref.current.push(createRef());
          }
          const idx = serial.indexOf(tserial);
          console.log(idx);
          const cref = imgref.current[idx].current;
          if (cref && cref.complete) {
            cref.src =
              'data:image/jpg;base64,' +
              window.btoa(
                String.fromCharCode(...new Uint8Array(ev.data.slice(0, -18)))
              );
          }
        }
      }
    };
  }, []);
  useEffect(() => () => ws.current.close(), [ws]);

  useEffect(() => {
    imgref.current = Array(slen)
      .fill(0)
      .map((_, i) => imgref.current[i] || createRef());
  }, [slen]);

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
