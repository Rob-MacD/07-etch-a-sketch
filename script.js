drawDoodlePad();

//Simply updates the <p> with the latest value from the slider.
function updateValue(value) {
  document.getElementById("sizeValue").textContent = `${value}`;
}

// Delete all nodes, reset slider to 50, redraw.
function resetAll() {
  document.getElementById("padSize").value = 50;
  document.getElementById("colorPicker").value = "#000000";
  updateValue(50);
  drawDoodlePad();
}

var isMouseDown = false; // Tracks status of mouse button
document.getElementById("doodlePad").onmousedown = function () {
  isMouseDown = true;
};
document.getElementById("doodlePad").onmouseup = function () {
  isMouseDown = false;
};

// Delete all nodes, redraw with current value from slider.
function drawDoodlePad() {
  const container = document.getElementById("doodlePad");
  const padSize = document.getElementById("sizeValue").textContent;

  deleteDoodlePad();

  console.log(padSize);
  for (let i = 0; i < padSize; i++) {
    const divHolder = document.createElement("div");
    container.appendChild(divHolder);

    for (let j = 0; j < padSize; j++) {
      let index = i * padSize + j;
      const div = document.createElement("div");
      div.id = `div${index}`;
      div.classList.add("doodleBlock");
      const blockSize = 500 / padSize - 1;
      div.style.width = `${blockSize}px`;
      div.style.height = `${blockSize}px`;
      // This function handles all color changing while the mouse button is
      // held down. However it will not trigger on the first node...
      div.addEventListener("mouseover", function colorBlock(event) {
        if (isMouseDown) {
          const colorValue = document.getElementById("colorPicker").value;
          event.target.style.backgroundColor = colorValue;
        }
      });
      // ... So this second function will color the first node.
      div.addEventListener("mousedown", function (event) {
        const colorValue = document.getElementById("colorPicker").value;
        event.target.style.backgroundColor = colorValue;
      });
      divHolder.appendChild(div);
    }
  }
}

function deleteDoodlePad() {
  const bigDaddy = document.getElementById("doodlePad");
  bigDaddy.replaceChildren();
}

function colorBlock() {}
