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
import React, { useEffect, useRef } from 'react';

function SubComponent() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  const imgref = useRef<HTMLImageElement>(null);
  ws.current.binaryType = 'arraybuffer';

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data != '') {
        if (imgref.current && imgref.current.complete) {
          imgref.current.src =
            'data:image/jpg;base64,' +
            window.btoa(
              String.fromCharCode(...new Uint8Array(ev.data.slice(0, -18)))
            );
        }
      }
    };
  }, []);
  useEffect(() => () => ws.current.close(), [ws]);

  return (
    <div>
      <h2>{window.location.host}</h2>
      <h2>Single Camera Demo</h2>
      <img ref={imgref} src="" />
    </div>
  );
}

export default SubComponent;
