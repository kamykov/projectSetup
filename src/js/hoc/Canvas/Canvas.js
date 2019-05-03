import React, { Component, useContext, useEffect } from "react";
import { Context } from "../../App";

import * as lib from "../../utils/canvasUtils";

import "./Canvas.scss";

export default function Canvas(props) {
  const {
    color = "rgba(255,0,0, .5)",
    stroke = "rgba(200,200,200, .5)"
  } = props;
  let size = {},
    ctx,
    points;
  const canvasRef = React.createRef();
  const wrapperRef = React.createRef();
  const {
    store: { dots },
    dispatch
  } = useContext(Context);

  window.addEventListener("resize", handleResize);
  useEffect(() => {
    cancelAnimationFrame(rAF);
    size = lib.dim(wrapperRef.current);
    canvasRef.current.width = size.width;
    canvasRef.current.height = size.height;
    ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke;
    points = lib.generate(dots, lib.dotInDiv, size, 2, 2, color);
    const rAF = requestAnimationFrame(updateAnimationState);
  }, [dots]);

  function updateAnimationState(timestamp) {
    //const { ctx, points, size, time, color } = state;

    lib.clearCanvas(size, ctx);
    lib.findClosest(points);
    points.forEach(point => {
      lib.drawLine(ctx, point, points[point.closest[1].index]);
      lib.drawLine(ctx, point, points[point.closest[2].index]);
      lib.drawLine(ctx, point, points[point.closest[3].index]);
      lib.drawCircle(ctx, point, 5, color);
      lib.update2(point, size);
    });
    // this.setState(({ t, time }) => ({
    //   t: t + 1000 / 60,
    //   time: time + timestamp
    // }));
    requestAnimationFrame(updateAnimationState);
  }

  function handleResize(e) {
    const { color, stroke } = this.state;
    const size = lib.dim(this.wrapperRef.current);
    this.canvasRef.current.width = size.width;
    this.canvasRef.current.height = size.height;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = stroke;
    this.setState({ size });
  }

  // componentWillUnmount() {
  //   cancelAnimationFrame(this.rAF);
  //   window.removeEventListener("resize", this.handleResize);
  // }

  return (
    <div className="wrapper" ref={wrapperRef}>
      <canvas className="wrapper__canvas" ref={canvasRef} />
    </div>
  );
}
