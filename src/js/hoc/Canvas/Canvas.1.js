import React, { Component, useContext } from "react";
import { Context } from "../../App";

import * as lib from "../../utils/canvasUtils";

import "./Canvas.scss";

export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      t: 0,
      time: 0,
      points: [],
      size: { width: 0, height: 0 },
      color: props.color || "rgba(255,0,0, .5)",
      dots: props.dots || 5,
      stroke: props.stroke || "rgba(200,200,200, .5)"
    };
    this.canvasRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    const { dots, color, stroke } = this.state;
    const size = lib.dim(this.wrapperRef.current);
    this.setState({ size });
    this.canvasRef.current.width = size.width;
    this.canvasRef.current.height = size.height;
    this.ctx = this.canvasRef.current.getContext("2d");
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = stroke;
    const genereadedPoints = lib.generate(
      dots,
      lib.dotInDiv,
      size,
      2,
      2,
      color
    );
    this.setState({ points: genereadedPoints });
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState(timestamp) {
    const { points, size, time, color } = this.state;
    const ctx = this.ctx;

    lib.clearCanvas(size, this.ctx);
    lib.findClosest(points);
    points.forEach(point => {
      lib.drawLine(ctx, point, points[point.closest[1].index]);
      lib.drawLine(ctx, point, points[point.closest[2].index]);
      lib.drawLine(ctx, point, points[point.closest[3].index]);
      lib.drawCircle(ctx, point, 5, color);
      lib.update2(point, size, time);
    });
    this.setState(({ t, time }) => ({
      t: t + 1000 / 60,
      time: time + timestamp
    }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUpdate() {
    console.log("Canvas | componentWillUpdate", this.state.dots);
  }

  handleResize(e) {
    const { color, stroke } = this.state;
    const size = lib.dim(this.wrapperRef.current);
    this.canvasRef.current.width = size.width;
    this.canvasRef.current.height = size.height;
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = stroke;
    this.setState({ size });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { size } = this.state;
    console.log("Canvas | render", this.state.dots);
    return (
      <div className="wrapper" ref={this.wrapperRef}>
        <canvas className="wrapper__canvas" ref={this.canvasRef} />
      </div>
    );
  }
}
