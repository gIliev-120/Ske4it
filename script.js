document.addEventListener("DOMContentLoaded", init, false);
window.addEventListener("resize", resizeCanvas, false);

var canvas;
var demo;
var context;
var tool;
var option;
var lastClick = [0, 0];
var numOfClicks = 0;


function init() {

  canvas = document.getElementById("canvas");

  context = canvas.getContext('2d');



  resizeCanvas();

  var rectButton = document.getElementById('rectButton');
  var circleButton = document.getElementById('circleButton');
  var lineButton = document.getElementById('lineButton');
  var colorButton = document.getElementById('colorButton');
  var clearButton = document.getElementById('clearButton');
  var saveButton = document.getElementById('saveButton');
  var saveLink = document.getElementById('saveMe');
  var upButton = document.getElementById('uploadimage');



  colorButton.onclick = function() {
    switchColor(context);
  }
  clearButton.onclick = function() {
    canvas.width = canvas.width;
  }
  rectButton.onclick = function() {
    setTool("rect");
  }

  circleButton.onclick = function() {
    setTool("circle");
  }
  lineButton.onclick = function() {
    setTool("line");
  }

  saveButton.onclick = function() {
    saveFile(saveLink, 'canvas', 'canvas.png');

  }

  upButton.addEventListener('change',openImg);


}

function setTool(option) {
  tool = option;

  if (tool == "rect") {
    canvas.onclick = function(event) {
      x = getPosition(event)[0] - canvas.offsetLeft;
      y = getPosition(event)[1] - canvas.offsetTop;

      context.beginPath();
      context.strokeRect(x, y, 30, 30);
      context.stroke();
    }
  };
  if (tool == "circle") {
    canvas.onclick = function(event) {
      x = getPosition(event)[0] - canvas.offsetLeft;
      y = getPosition(event)[1] - canvas.offsetTop;

      context.beginPath();
      context.arc(x, y, 5, 1, 80);
      context.stroke();

    }

  };
  if (tool == "line") {
    canvas.onclick = function(event) {
      x = getPosition(event)[0] - canvas.offsetLeft;
      y = getPosition(event)[1] - canvas.offsetTop;


      //console.log(x);
      //console.log(y);

      if (numOfClicks != 1) {
        numOfClicks++;
      } else {
        context.beginPath();
        context.moveTo(lastClick[0], lastClick[1]);
        context.lineTo(x, y, 6);

        context.stroke();

        numOfClicks = 0;
      }

      lastClick = [x, y];


    }
  };
}

function getPosition(event) {
  var x = new Number();
  var y = new Number();

  x = event.clientX;
  y = event.clientY;

  return [x, y];

}

function switchColor(context) {
  var myPicker = new jscolor.color(document.getElementById('colorButton'));
  var choosedColor = myPicker.toString();
  var convertedColor = "#" + choosedColor + "";

  context.strokeStyle = convertedColor;
}

function resizeCanvas() {

  canvas.width = (window.innerWidth - 13);
  canvas.height = (window.innerHeight - 27);

}

function saveFile(link, idCanvas, filename) {

  link.onclick = function() {
    link.href = document.getElementById(idCanvas).toDataURL();
    link.download = filename;
  }
  link.click();

}

function openImg(event){
 var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);     
}