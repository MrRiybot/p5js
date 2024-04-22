let longestPath = [];
let currentPath = [];
let maxPathLength = 0;
let totalOperations = 0; // Total number of operations expected
let completedOperations = 0; // Operations completed so far

function setup() {
  createCanvas(1000, 1000);
 // randomSeed(322332232323);
  background("#434343");
  let rootX = width / 2;
  let rootY = height / 2;
  stroke("#F8F8F8");
  strokeWeight(0.5);

  // Calculate total operations by estimating the maximum branching factor
  totalOperations = calculateTotalOperations(18); // assuming maximum depth from your setup
  // Asynchronously draw the tree
  drawRandomTreeAsync(rootX, rootY, 40, -PI / 2, 17, 0,2).then(() => {
    console.log("Tree drawing completed!");
    drawLongestPath(); // Optionally, draw the longest path after the tree is complete
  }).catch(error => {
    console.error("An error occurred while drawing the tree:", error);
  });
  //drawRandomTreeIterative(rootX, rootY, 10, -PI / 2,18, 0); // Generate the tree
  drawLongestPath(); // Highlight the longest path
  // saveCanvas('tree_with_longest_path', 'png'); // Save the canvas as PNG
}

function drawLongestPath() {
  stroke('#F8F8F8');
  strokeWeight(0.5); // Make the golden path slightly thicker
  longestPath.forEach(segment => {
    line(segment.x, segment.y, segment.xEnd, segment.yEnd);
  });
}

async function drawRandomTreeAsync(x, y, length, angle, depth, currentLength, branchCount) {
  if (depth === 0) return;

  let xEnd = x + Math.cos(angle) * length;
  let yEnd = y + Math.sin(angle) * length;

  line(x, y, xEnd, yEnd);

  currentPath.push({ x, y, xEnd, yEnd, length });

  if (depth === 1 || Math.floor(Math.random() * depth) === 1) {
    let pathTotalLength = currentLength + length;
    if (pathTotalLength > maxPathLength) {
      maxPathLength = pathTotalLength;
      longestPath = currentPath.slice();
    }
    completedOperations++;
    updateProgress();
  } else {
    let spread = Math.PI / (4 + (15 - depth));
    for (let i = 0; i < branchCount; i++) {
      let newAngle = angle - spread / 2 + spread * i + (Math.random() * (Math.PI/9) - Math.PI/18);
      let newLength = length * (0.7 + Math.random() * 0.4);
      // Await a zero delay to yield control and prevent freezing
      await new Promise(resolve => setTimeout(resolve, 0));
      drawRandomTreeAsync(xEnd, yEnd, newLength, newAngle, depth - 1, currentLength + length, branchCount);
    }
    completedOperations += branchCount;
    updateProgress();
  }

  currentPath.pop();
}


function calculateTotalOperations(depth) {
  if (depth === 0) return 0;
  return Math.pow(2, depth) + calculateTotalOperations(depth - 1);
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
