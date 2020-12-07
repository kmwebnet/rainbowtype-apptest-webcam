/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef, createRef } from 'react';

function SubComponent2() {
  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));
  ws.current.binaryType = 'arraybuffer';
  const imgref = useRef<Array<React.RefObject<HTMLImageElement>>>([]);
  const serial: string[] = [];

  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
      if (ev.data) {
        const tserial: string = ev.data.slice(-18).toString();
        console.log(tserial);
        if (tserial.slice(0, 4) === '0123') {
          if (!serial.some((e) => e === tserial)) {
            serial.push(tserial);
            imgref.current.push(createRef());
          }
          const idx = serial.indexOf(tserial);
          console.log(idx);
          if (imgref.current[idx]) {
            console.log(imgref.current[idx].current?.complete);
          }
          /*
          if (imgref.current[idx] === null) return;
          if (!imgref.current[idx]) return;
          if (!imgref.current[idx].src) return;
          if (!imgref.current[idx].complete) return;

          if (imgref.current[idx] && imgref.current[idx].complete) {
            imgref.current[idx].src =
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

  useEffect(() => {
    imgref.current = Array(serial.length)
      .fill(0)
      .map((_, i) => imgref.current[i] || createRef());
  }, [serial]);

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
