export function animation(points, ctx, size, t = 0, time = 0) {
  return (function loop(timestamp) {
    clearCanvas(size, ctx);
    points.forEach(point => {
      drawCircle(ctx, point);
      drawLine(ctx, point, points[point.closest[1].index]);
      drawLine(ctx, point, points[point.closest[2].index]);
      drawLine(ctx, point, points[point.closest[3].index]);
      update3(point, time);
    });

    findClosest(points);

    t += 1000 / 60;
    time = +timestamp;
    requestAnimationFrame(loop);
  })();
}

export function update(point, time) {
  let x = point.destination.x - point.x;
  let y = point.destination.y - point.y;
  let m = y / x;
  let b = point.y - m * point.x;

  point.x =
    point.destination.x > point.x
      ? point.x + point.speed * point.acceleration
      : point.x - point.speed * point.acceleration;
  point.y = m * point.x + b;
  return point;
}

export function update2(point, size, time) {
  let delta = point.speed * point.acceleration;

  // point.x = point.destination.x > point.x ? point.x + delta : point.x - delta;
  // point.y = point.destination.y > point.y ? point.y + delta : point.y - delta;
  point.x = point.destination.x > point.x ? point.x + delta : point.x - delta;
  point.y = point.destination.y > point.y ? point.y + delta : point.y - delta;

  if (distance(point.destination, point) < 5) {
    point.markDestination(randomPoint(size));
  }
  return point;
}
export function update3(point, time) {
  point.x = Number.parseInt(point.x + point.speed * point.acceleration);
  point.y = Number.parseInt(
    point.destination.y > point.y
      ? point.y + point.speed * point.acceleration
      : point.y - point.speed * point.acceleration
  );
  return point;
}

export function generate(n, fn, div, speed, radius, color) {
  const result = [];
  while (n--) {
    result.push(fn(div, speed, radius, color));
  }
  return result;
}

export function dotInDiv(dimentions, speed, radius, color) {
  const point = randomPoint(dimentions);
  Object.assign(point, { markDestination });

  return {
    ...point,
    speed: randomOf(speed, 1),
    radius: randomOf(radius, 1),
    acceleration: 0.5,
    destination: randomPoint(dimentions),
    color
  };
}

export function randomPoint(dimentions) {
  return {
    x: Math.floor(randomOf(dimentions.width)),
    y: Math.floor(randomOf(dimentions.height))
  };
}
export const dim = ({ clientHeight, clientWidth }) => ({
  width: clientWidth,
  height: clientHeight
});

export function randomOf(value, start = 0) {
  return Math.floor(Math.random() * (value - start + 1)) + start;
}

export function markDestination(destination) {
  Object.assign(this, { destination });
}

export function findClosest(points) {
  const distances = points.map(point => {
    let distanceValues = [];
    points.forEach(pointB => distanceValues.push(distance(point, pointB)));
    return distanceValues;
  });

  const closest = distances.map(distanceArr =>
    distanceArr
      .map((distance, index) => {
        return {
          distance,
          index
        };
      })
      .sort((a, b) => a.distance - b.distance)
  );

  return points.reduce((aggregator, point, index) => {
    const updatedPoint = Object.assign(point, {
      distances: distances[index],
      closest: closest[index]
    });
    aggregator.push(updatedPoint);
    return aggregator;
  }, []);
}

export const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)).toFixed(2);

export const clearCanvas = ({ width, height }, ctx) =>
  ctx.clearRect(0, 0, width, height);

export function drawCircle(ctx, center, radius = 3, color) {
  let defaultColor = ctx.fillStyle;
  ctx.fillStyle = color || ctx.fillStyle;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = defaultColor;
}

export function drawLine(ctx, a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}
