let longestPath = [];
let currentPath = [];
let maxPathLength = 0;
let totalOperations = 0; // Total number of operations expected
let completedOperations = 0; // Operations completed so far

function setup() {
  createCanvas(1000, 1000);
  randomSeed(2191292131249284190);
  background("#434343");
  let rootX = width / 2;
  let rootY = height / 2;
  stroke("#F8F8F8");
  strokeWeight(0.5);

  // Calculate total operations by estimating the maximum branching factor
  totalOperations = calculateTotalOperations(50); // assuming maximum depth from your setup

  drawRandomTree(rootX, rootY, 10, -PI / 2, 50, 0); // Generate the tree
  drawLongestPath(); // Highlight the longest path
  saveCanvas('tree_with_longest_path', 'png'); // Save the canvas as PNG
}

function calculateTotalOperations(depth) {
  if (depth === 0) return 0;
  return Math.pow(2, depth) + calculateTotalOperations(depth - 1);
}

function drawRandomTree(x, y, length, angle, depth, currentLength) {
  if (depth === 0) return;

  let xEnd = x + cos(angle) * length;
  let yEnd = y + sin(angle) * length;

  line(x, y, xEnd, yEnd); // Draw each branch

  currentPath.push({x, y, xEnd, yEnd, length}); // Add current segment to path

  if (depth === 1 || floor(random(1, depth)) === 1) { // Check if we stop branching
    let pathTotalLength = currentLength + length;
    if (pathTotalLength > maxPathLength) {
      maxPathLength = pathTotalLength;
      longestPath = currentPath.slice(); // Copy the current path
    }
    completedOperations++;
    updateProgress();
  } else {
    let branches = 2; // Continue with two branches
    let spread = PI / (4 + (15 - depth)); // Adjust spread based on the depth
    for (let i = 0; i < branches; i++) {
      let newAngle = angle - spread / 2 + spread * i + random(-PI/18, PI/18); // Small random adjustment to angle
      let newLength = length * random(0.7, 1.1);
      drawRandomTree(xEnd, yEnd, newLength, newAngle, depth - 1, currentLength + length);
    }
    completedOperations += branches;
    updateProgress();
  }

  currentPath.pop(); // Remove the last segment as we backtrack
}

let lastReportedPercentage = -5; // Initialize to -5 so the first update at 0% will be shown

function updateProgress() {
  let percentageComplete = Math.floor(completedOperations / totalOperations * 100);
  if (percentageComplete >= lastReportedPercentage + 5) {
    console.log(`Progress: ${percentageComplete}%`);
    lastReportedPercentage = percentageComplete; // Update the last reported percentage
  }
}


function draw() {
  // Keep the draw function empty to stop the looping
}
