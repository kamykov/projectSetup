import React, {
  useState,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect
} from "react";
import { Context } from "../../App";

import * as lib from "../../utils/canvasUtils";
import "./Canvas.scss";

export default function Canvas(props) {
  const {
    color = "rgba(255,0,0, .5)",
    stroke = "rgba(200,200,200, .5)"
    //dots = props.dots || 12
  } = props;
  let ctx;
  const {
    store: { dots }
  } = useContext(Context);
  console.log(dots);

  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const allPoints = lib.generate(100, lib.dotInDiv, size, 2, 2, color);
  const [points, setPoints] = useState(allPoints.slice(0, 12));
  const wrapperRef = useRef();
  const rAF = useRef();
  const canvasRef = useRef();

  useLayoutEffect(() => {
    ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = size.width;
    canvasRef.current.height = size.height;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();
    let newPoints = allPoints.slice(0, dots);
    setPoints(newPoints);
    updateAnimationState();
    console.log("useLayoutEffect", points.length, size, canvasRef, ctx, rAF);
    return () => {
      setPoints(null);
      cancelAnimationFrame(rAF.current);
    };
  }, [dots]);

  function updateAnimationState() {
    lib.clearCanvas(size, ctx);
    lib.findClosest(points);
    points.forEach(point => {
      lib.drawLine(ctx, point, points[point.closest[1].index]);
      lib.drawLine(ctx, point, points[point.closest[2].index]);
      lib.drawLine(ctx, point, points[point.closest[3].index]);
      lib.drawCircle(ctx, point, 5, color);
      lib.update2(point, size);
    });
    rAF.current = requestAnimationFrame(updateAnimationState);
  }

  function handleResize(e) {
    // if (wrapperRef.current) {
    //   setSize({
    //     width: 6000,
    //     height: 6000
    //   });
    //   console.log(wrapperRef.current);
    //   canvasRef.current.width = size.width;
    //   canvasRef.current.height = size.height;
    //   ctx.fillStyle = color;
    //   ctx.strokeStyle = stroke;
    // }
  }

  return (
    <div className="wrapper" ref={wrapperRef}>
      <canvas className="wrapper__canvas" ref={canvasRef} />
    </div>
  );
}
