let longestPath = [];
let currentPath = [];
let maxPathLength = 0;

function setup() {
  createCanvas(1000, 1000);
  randomSeed(999);
  background("#434343");
  let rootX = width / 2;
  let rootY = height/2;
  stroke("#F8F8F8");
  strokeWeight(2);
  drawRandomTree(rootX, rootY, 40, -PI / 2, 18, 0); // Generate the tree
  drawLongestPath(); // Highlight the longest path
}

function drawRandomTree(x, y, length, angle, depth, currentLength) {
  if (depth === 0) return;

  let xEnd = x + cos(angle) * length;
  let yEnd = y + sin(angle) * length;

  line(x, y, xEnd, yEnd); // Draw each branch in black

  currentPath.push({x, y, xEnd, yEnd, length}); // Add current segment to path

  if (depth === 1 || floor(random(1, depth)) === 1) { // Check if we stop branching
    let pathTotalLength = currentLength + length;
    if (pathTotalLength > maxPathLength) {
      maxPathLength = pathTotalLength;
      longestPath = currentPath.slice(); // Copy the current path
    }
  } else {
    let branches = 2; // Continue with two branches
    let spread = PI / (4 + (15 - depth)); // Adjust spread based on the depth
    for (let i = 0; i < branches; i++) {
      let newAngle = angle - spread / 2 + spread * i + random(-PI/18, PI/18); // Small random adjustment to angle
      let newLength = length * random(0.7, 1.1);
      drawRandomTree(xEnd, yEnd, newLength, newAngle, depth - 1, currentLength + length);
    }
  }

  currentPath.pop(); // Remove the last segment as we backtrack
}


function drawLongestPath() {
  stroke('#F7C873');
  strokeWeight(2.5); // Make the golden path slightly thicker
  longestPath.forEach(segment => {
    line(segment.x, segment.y, segment.xEnd, segment.yEnd);
  });
}

function draw() {
  // Keep the draw function empty to stop the looping
}
