var layers = document.getElementsByClassName("background__layer");
var character = document.getElementById("character");

var backPos = 0;
var speed = 8;
var swrddrw = 3000;

var keys = {
  left: false,
  right: false
}

var condition = {
  _position: "idle",
  prevpos: "",
  requested: "",
  status: 0
}

Object.defineProperty(condition, "position", {
  set: function(value) {
    this.requested = "";
    this.prevpos = this._position;
    this._position = value;
  },
  get: function() {
    return this._position;
  }
});

var allConditions = {
  "idle": {
    max: 3
  },
  "run": {
    max: 5
  },
  "idle-2": {
    max: 3
  },
  "swrd-drw": {
    max: 3,
    exclude: ["run"],
    next: function() {
      setCondition("idle-2");
    }
  },
  "swrd-shte": {
    max: 3,
    next: function() {
      setCondition("idle");
    }
  },
  "attack1": {
    max: 4,
    next: function() {
      if (condition.requested) {
        condition.position = condition.requested;
      } else if (condition.prevpos == "run")
        condition.position = "run";
      else 
        condition.position = "idle-2";
    },
    unavoidable: true
  },
  "attack2": {
    max: 5,
    next: function() {
      if (condition.requested) {
        condition.position = condition.requested;
      } else if (condition.prevpos == "run")
        condition.position = "run";
      else 
        condition.position = "idle-2";
    },
    unavoidable: true
  },
  "attack3": {
    max: 5,
    next: function() {
      if (condition.requested) {
        condition.position = condition.requested;
      } else if (condition.prevpos == "run")
        condition.position = "run";
      else 
        condition.position = "idle-2";
    },
    unavoidable: true
  }
}

function setCondition(pos) {
  if (allConditions[condition.position].unavoidable) {
    condition.requested = pos;
    return;
  }
  condition.status = 0;
  condition.position = pos;
}

function hitEnemy() {
  console.log("OOOCH!");
}

function attack() {
  if (condition.position == "attack1") {
    setCondition("attack2");
  } else if (condition.position == "attack2") {
    setCondition("attack3");
  } else {
    setCondition("attack1");
  }
}

document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37:
      if (keys.left)
        break;
      character.style.transform = "rotateY(180deg)";
      setCondition("run");
      keys = {
        left: true,
        right: false
      }
      break;
    case 39:
      if (keys.right)
        break;
      character.style.transform = "rotateY(0deg)";
      setCondition("run");
      keys = {
        left: false,
        right: true
      }
      break;
    case 65:
      attack();
      break;
    case 81:
      if (condition.position == "idle-2")
        setCondition("swrd-shte");
      else {
        if (!allConditions["swrd-drw"].exclude.includes(condition.position))
          setCondition("swrd-drw");
      }
      break;
  }
});

document.addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 37:
      setCondition("idle");
      keys.left = false;
      break;
    case 39:
      setCondition("idle");
      keys.right = false;
      break;
  }
});

var backMove = setInterval(function() {
  if (keys.left) {
    if (backPos == 0) {
      setCondition("idle");
      return;
    }
    backPos += speed;
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.left = (parseInt(layers[i].getAttribute("data-index")) + 1) * backPos + "px";
    }
  } else if (keys.right) {
    backPos -= speed;
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.left = (parseInt(layers[i].getAttribute("data-index")) + 1) * backPos + "px";
    }
  }
}, 150);

var conditionLoop = setInterval(function() {
  if (condition.status >= allConditions[condition.position].max) {
    condition.status = 0;
    if (allConditions[condition.position].next) {
      allConditions[condition.position].next();
    }
  } else {
    condition.status++;
  }
  character.setAttribute("src", "character/adventurer-" + condition.position + "-0" + condition.status + ".png");
}, 1200 / speed);