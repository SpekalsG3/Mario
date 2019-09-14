var layers = document.getElementsByClassName("background__layer");
var character = document.getElementById("character");

var backPos = 0;

var keys = {
  left: false,
  right: false
}

var condition = {
  position: "idle",
  status: 0
}

var maxConditions = {
  idle: 3,
  run: 5
}

document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37:
      character.style.transform = "rotateY(180deg)";
      condition.position = "run";
      keys.left = true;
      break;
    case 39:
      character.style.transform = "rotateY(0deg)";
      condition.position = "run";
      keys.right = true;
      break;
  }
});

document.addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 37:
      character.style.transform = "rotateY(180deg)";
      condition.position = "idle";
      keys.left = false;
      break;
    case 39:
      character.style.transform = "rotateY(0deg)";
      condition.position = "idle";
      keys.right = false;
      break;
  }
});

var backMove = setInterval(function() {
  if (keys.left) {
    if (backPos == 0) {
      condition.position = "idle";
      return;
    }
    backPos += 8;
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.left = (parseInt(layers[i].getAttribute("data-index")) + 1) * backPos + "px";
    }
  } else if (keys.right) {
    backPos -= 8;
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.left = (parseInt(layers[i].getAttribute("data-index")) + 1) * backPos + "px";
    }
  }
}, 100);

var conditionChange = setInterval(function() {
  if (condition.status >= maxConditions[condition.position]) {
    condition.status = 0;
  } else {
    condition.status++;
  }
  character.setAttribute("src", "character/adventurer-" + condition.position + "-0" + condition.status + ".png");
}, 200);