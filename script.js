document.addEventListener("DOMContentLoaded", init, false);
window.addEventListener("resize",resizeCanvas,false);

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
  //var saveButton= document.getElementById('saveButton');

  var saveLink = document.getElementById('saveMe');


  
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

  saveLink.onclick = function(){
   saveFile(this,'canvas','canvas.png');

  }


  
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

  function resizeCanvas(){
  
  canvas.width = (window.innerWidth - 13);
  canvas.height = (window.innerHeight - 27);
  
  }

  function saveFile(link,idCanvas,filename){
    
    link.href = document.getElementById(idCanvas).toDataURL();
    link.download = filename;
    
  }
