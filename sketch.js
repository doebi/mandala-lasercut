let symmetry = 6;

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;
let canvas;
let time;

function setup() {
  stage = createCanvas(700, 700);
  angleMode(DEGREES);
  background(255);

  btn = document.getElementById('clear')
  btn.onclick = clearScreen;

  btn = document.getElementById('save')
  btn.onclick = saveSketch;

  // Setting up the slider for the thickness of the brush
  sizeSlider = createSlider(1, 32, 4, 0.1);
}

function saveSketch() {
  let name = prompt('Name');

  if (name) {
    let data = stage.canvas.toDataURL();
    let file = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90mm" height="90mm" viewBox="0 0 210 297"><image width="264" height="264" preserveAspectRatio="none" xlink:href="${data}" x="-27" y="16.5"/><circle cy="148.5" cx="105" r="131.849" fill="none" stroke="red" stroke-width=".303" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    time = new Date().getTime();
    download(file, `${name}-${time}.svg`, "text/svg");
  } else {
    console.log("Action aborted by user");
  }
}

function clearScreen() {
  background(255);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}
