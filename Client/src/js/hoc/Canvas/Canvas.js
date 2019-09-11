import React, {
  useState, useRef, useLayoutEffect, useEffect,
} from 'react';
import useWindowSize from '../../utils/useWindowSize';
import * as lib from '../../utils/canvasUtils';
import './Canvas.scss';

export default function Canvas({
  color = 'rgba(255,0,0, .5)',
  stroke = 'rgba(200,200,200, .5)',
  dots = 12,
}) {
  let ctx;
  const size = useWindowSize();
  const allPoints = lib.generate(30, lib.dotInDiv, size, 2, 2, color);
  const [points, setPoints] = useState(allPoints.slice(0, 12));
  const wrapperRef = useRef();
  const rAF = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const newPoints = allPoints.slice(0, dots);
    setPoints(newPoints);
    return () => { };
  }, [dots, size]);

  function updateAnimationState() {
    lib.clearCanvas(size, ctx);
    lib.findClosest(points);
    points.forEach((point) => {
      lib.drawLine(ctx, point, points[point.closest[1].index]);
      lib.drawLine(ctx, point, points[point.closest[2].index]);
      lib.drawLine(ctx, point, points[point.closest[3].index]);
      lib.drawCircle(ctx, point, 5, color);
      lib.update2(point, size);
    });
    rAF.current = requestAnimationFrame(updateAnimationState);
  }
  useLayoutEffect(() => {
    ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = size.width - 10;
    canvasRef.current.height = size.height - 10;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();
    updateAnimationState();
    return () => {
      setPoints(null);
      cancelAnimationFrame(rAF.current);
    };
  }, [dots, size]);


  return (
    <div className="wrapper" ref={wrapperRef}>
      <canvas className="wrapper__canvas" ref={canvasRef} />
    </div>
  );
}
