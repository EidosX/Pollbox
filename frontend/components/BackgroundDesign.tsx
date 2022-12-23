import { useEffect, useState } from 'react';

let idCounter = 1000;
const nextId = () => {
  idCounter += 1;
  return idCounter;
};

type BarState = { pos: number; id: number };

const genBar = () => {
  return [{ pos: -50 - 25 * Math.random(), id: nextId() }];
};

export default () => {
  const bars1 = [
    { pos: 180 },
    { pos: 140 },
    { pos: 130 },
    { pos: 92 },
    { pos: 80 },
    { pos: 48 },
    { pos: 30 },
  ];
  const bars2 = [
    { pos: 192 },
    { pos: 170 },
    { pos: 110 },
    { pos: 82 },
    { pos: 68 },
    { pos: 36 },
    { pos: 25 },
  ];

  return (
    <div className="select-none pointer-events-none absolute overflow-hidden top-0 w-full h-full -z-50">
      <div
        style={{
          height: '100%',
          position: 'absolute',
          animation: `bgDesignMove 90s linear infinite`,
          opacity: 0.3,
        }}
      >
        {bars2.map((p, i) => (
          <Bar key={i} xPos={p.pos} />
        ))}
        {bars2.map((p, i) => (
          <Bar key={i} xPos={p.pos - 200} />
        ))}
        {bars2.slice(0, 2).map((p, i) => (
          <Bar key={i} xPos={p.pos - 400} />
        ))}
      </div>
      <div
        style={{
          height: '100%',
          position: 'absolute',
          animation: `bgDesignMove 60s linear infinite`,
          opacity: 0.6,
        }}
      >
        {bars1.map((p, i) => (
          <Bar key={i} xPos={p.pos} />
        ))}
        {bars1.map((p, i) => (
          <Bar key={i} xPos={p.pos - 200} />
        ))}
        {bars1.slice(0, 2).map((p, i) => (
          <Bar key={i} xPos={p.pos - 400} />
        ))}
      </div>
    </div>
  );
};

const Bar = (props: { xPos: number }) => (
  <div
    className="absolute -rotate-45 w-96 h-full scale-y-[300%]"
    style={{
      background: 'linear-gradient(to top, #1A33C7 5%, #1A20C700 70%)',
      left: `${props.xPos}rem`,
    }}
  />
);
