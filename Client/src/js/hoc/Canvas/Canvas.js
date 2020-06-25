import React, {
  useState, useRef, useLayoutEffect, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import useWindowSize from '../../utils/useWindowSize';
import * as lib from '../../utils/canvasUtils';
import './Canvas.scss';

function Canvas({
  color,
  stroke,
  dots,
  lines,
}) {
  let ctx;
  const size = useWindowSize();
  const allPoints = lib.generate(30, lib.dotInDiv, size, 2, 2, color);
  const [points, setPoints] = useState(allPoints.slice(0, 12));
  const wrapperRef = useRef();
  const rAF = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const newPoints = allPoints.slice(0, dots + 3);
    setPoints(newPoints);
    return () => { };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dots, size]);

  function updateAnimationState() {
    lib.clearCanvas(size, ctx);
    lib.findClosest(points);
    points.forEach((point) => {
      let i;
      for (i = 1; i <= lines; i += 1) {
        if (point.closest[i]) {
          lib.drawLine(ctx, point, points[point.closest[i].index]);
        }
      }
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
Canvas.propTypes = {
  color: PropTypes.string,
  stroke: PropTypes.string,
  dots: PropTypes.number,
  lines: PropTypes.number,
};
Canvas.defaultProps = {
  color: 'rgba(255,0,0, .5)',
  stroke: 'rgba(200,200,200, .5)',
  dots: 12,
  lines: 3,
};

export default Canvas;
