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
  const [bars1, setBars1] = useState<BarState[]>([
    { pos: 200, id: 1 },
    { pos: 180, id: 2 },
    { pos: 140, id: 3 },
    { pos: 130, id: 4 },
    { pos: 92, id: 5 },
    { pos: 80, id: 6 },
    { pos: 48, id: 7 },
    { pos: 30, id: 8 },
    { pos: -10, id: 9 },
    { pos: -28, id: 10 },
    { pos: -60, id: 11 },
  ]);
  const [bars2, setBars2] = useState<BarState[]>([
    { pos: 192, id: 1 },
    { pos: 170, id: 2 },
    { pos: 135, id: 3 },
    { pos: 110, id: 4 },
    { pos: 82, id: 5 },
    { pos: 68, id: 6 },
    { pos: 36, id: 7 },
    { pos: 25, id: 8 },
    { pos: -20, id: 9 },
    { pos: -38, id: 10 },
  ]);

  useEffect(() => {
    setTimeout(() => setBars1([...bars1.slice(-12), ...genBar()]), 9000);
  }, [bars1]);

  useEffect(() => {
    setTimeout(() => setBars2([...bars2.slice(-16), ...genBar()]), 3500);
  }, [bars2]);

  return (
    <div className="select-none pointer-events-none absolute overflow-hidden top-0 w-full h-full max-h-[42rem] -z-50">
      {bars2.map((p) => (
        <Bar key={p.id} xPos={p.pos} opacity={0.3} speed="slow" />
      ))}
      {bars1.map((p) => (
        <Bar key={p.id} xPos={p.pos} opacity={0.7} speed="fast" />
      ))}
    </div>
  );
};

const Bar = (props: {
  xPos: number;
  speed: 'slow' | 'fast';
  opacity: number;
}) => (
  <div
    className="absolute -rotate-45 from-transparent w-96 h-full scale-y-[200%]"
    style={{
      background: 'linear-gradient(to top, #1A33C7 -120%, #1A20C700 90%)',
      left: `${props.xPos}rem`,
      animation: `bgDesignMove ${
        props.speed == 'fast' ? '60s' : '120s'
      } linear forwards`,
      opacity: `${props.opacity}`,
    }}
  />
);
