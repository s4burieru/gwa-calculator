const courseList = document.getElementById("courseList");
const addBtn = document.getElementById("addBtn");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

let courseCount = 0;

// Add Course Row
function addCourse(courseName = "", grade = "", units = "") {
  courseCount++;

  const row = document.createElement("div");
  row.classList.add("course-row");

  row.innerHTML = `
    <input type="text" class="course-name" placeholder="Course ${courseCount}" value="${courseName}">
    <input type="number" step="0.01" placeholder="0.00" value="${grade}">
    <input type="number" placeholder="0" value="${units}">
    <button class="deleteBtn">X</button>
  `;

  // Delete row
  row.querySelector(".deleteBtn").addEventListener("click", () => {
    row.remove();
    updateCourseNumbers();
  });

  courseList.appendChild(row);
}

// Update course numbering after delete
function updateCourseNumbers() {
  const rows = document.querySelectorAll(".course-row");
  courseCount = 0;
  rows.forEach((row) => {
    courseCount++;
    const input = row.querySelector(".course-name");
    if (input.value === "") {
      input.placeholder = `Course ${courseCount}`;
    }
  });
}

// Calculate GWA
function calculateGWA() {
  const rows = document.querySelectorAll(".course-row");

  let totalWeighted = 0;
  let totalUnits = 0;

  rows.forEach((row) => {
    const grade = parseFloat(row.children[1].value);
    const units = parseFloat(row.children[2].value);

    if (!isNaN(grade) && !isNaN(units)) {
      totalWeighted += grade * units;
      totalUnits += units;
    }
  });

  if (totalUnits === 0) {
    result.textContent = "Please enter valid data.";
    return;
  }

  const gwa = totalWeighted / totalUnits;
  result.textContent = "Your GWA: " + gwa.toFixed(2);
}

// Event Listeners  
addBtn.addEventListener("click", () => addCourse());
calculateBtn.addEventListener("click", calculateGWA);

// Default 5 courses
for (let i = 0; i < 5; i++) {
  addCourse("", 3);
}