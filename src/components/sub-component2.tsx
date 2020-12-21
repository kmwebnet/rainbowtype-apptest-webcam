/*
MIT License
Copyright (c) 2020 kmwebnet
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';

function SubComponent2() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  ws.current.binaryType = 'arraybuffer';
  const imgref = useRef<Array<HTMLImageElement>>([]);
  const serial: string[] = [];
  const [ser, setser] = useState<string[]>([]);

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data) {
        const tserial: string = String.fromCharCode(
          ...new Uint8Array(ev.data.slice(-18))
        );
        if (tserial.slice(0, 4) === '0123') {
          if (!serial.some((e) => e === tserial)) {
            serial.push(tserial);
            imgref.current.push(new Image());
            setser((ser) => [...ser, tserial]);
          }
          const idx = serial.indexOf(tserial);
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

  return (
    <div>
      <h2>{window.location.host}</h2>
      <h2>Multi Camera Demo</h2>
      {ser.map((v, i) => (
        <div key={v}>
          <img
            key={v}
            ref={(el) => (imgref.current[i] = el as HTMLImageElement)}
            src=""
          />
          <h2 key={v}>
            CAMERA{i} {v}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default SubComponent2;
