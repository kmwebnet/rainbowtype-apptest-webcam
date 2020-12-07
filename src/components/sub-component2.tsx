/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';

function SubComponent2() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  ws.current.binaryType = 'arraybuffer';
  const imgref = useRef<Array<HTMLImageElement>>([]);
  const serial: string[] = [];
  const [ser, setser] = useState<string[]>([]);
  const [slen, setslen] = useState<number>(0);

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data) {
        const tserial: string = String.fromCharCode(
          ...new Uint8Array(ev.data.slice(-18))
        );
        console.log(tserial);
        if (tserial.slice(0, 4) === '0123') {
          if (!serial.some((e) => e === tserial)) {
            serial.push(tserial);
            setslen(serial.length);
            const nserial = serial;
            setser(nserial);

            //imgref.current.push(createRef());
          }
          const idx = serial.indexOf(tserial);
          console.log(idx);
          console.log(imgref.current);
          const cref = imgref.current[idx];
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
    imgref.current = new Array(slen);
    console.log('slen:' + slen);
  }, [slen]);

  return (
    <div>
      <h2>{window.location.host}</h2>
      {ser.map((v, i) => (
        <div key={v}>
          <img
            key={v}
            ref={(el) => (imgref.current[i] = el as HTMLImageElement)}
            src=""
          />
          CAMERA{i} {v}
        </div>
      ))}
    </div>
  );
}

export default SubComponent2;
