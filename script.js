const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  // Defines a function that takes a single event (e) as its parameter. "e" represents the mouse move event
  if (!isDrawing) return; // If the mouse is not clicked, then no drawing will occur.
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // This gets the stroke-style to have a saturation of 100% and brightness of 50%
  ctx.beginPath(); // This lets the color stay the same as you are drawing on the canvas. Without this, the color would change throughout the whole canvas.
  ctx.moveTo(lastX, lastY); // This sets the starting point of the line to the lastX and lastY coordinates.
  ctx.lineTo(e.offsetX, e.offsetY); // This sets the end point of the line to the current mouse position.
  ctx.stroke(); // This is what lets the user "draw" on the canvas.
  [lastX, lastY] = [e.offsetX, e.offsetY]; // This updates the lastX and lastY variables with the current mouse position.

  /* Lines 26-29 handle the color change when you move the mouse (when clicked) across the canvas */
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  // The second conditional statement makes sure it stays within range by flipping the direction
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction; // When the line width reaches 100, it gets smaller, and when it reaches 1, it gets larger
  }

  // The second conditional statement follows the direction to make the line thicker or thinner based on which limit it reached
  if (direction) {
    ctx.lineWidth++; // The line width will be increased
  } else {
    ctx.lineWidth--; // The line width will be decressed
  }
}

// When a click occurs, it flips a flag (isDrawing) to indicate that drawing has started and captures the initial mouse coordinates (lastX and lastY) to be used for calculating the line path later
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
// This line makes sure that the mouse does not move beyond the bounds of the canvas
canvas.addEventListener("mouseout", () => (isDrawing = false));