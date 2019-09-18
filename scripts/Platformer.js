var layers = document.getElementsByClassName("background__layer");
var character = document.getElementById("character");

var speed = 8;             // Speed of moving, attack, background move etc.
var swrdshte = 24000;      // Time factor of character staying in idle-2

var littleG = 10           // Gravity constant

var keys = {
  left: false,
  right: false,
  jump: false
}

var condition = {
  _position: "idle",
  prevpos: "",
  requested: "",
  status: 0,
  break: false
}

Object.defineProperty(condition, "position", {
  set: function(pos) {
    if (allConditions[pos].start)
      allConditions[pos].start();
    this.requested = "";
    this.prevpos = this._position;
    this._position = pos;
  },
  get: function() {
    return this._position;
  }
});

var hero = {
  ay: 1.5,
  ax: 1.5,
  vy: 0,
  vx: 0,
  y: 0,
  x: 0
}

var allConditions = {
  "idle": {
    max: 3
  },
  "run": {
    max: 5
  },
  "idle-2": {
    start: function() {
      setTimeout(function() {
        setCondition("swrd-shte");
      }, swrdshte / speed);
    },
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
    start: function() {
      setTimeout(function() {
        hitEnemy();
      }, 1200 / speed * 2);
    },
    max: 4,
    next: function() {
      if (condition.requested)
        condition.position = condition.requested;
      else if (condition.prevpos == "run")
        condition.position = "run";
      else 
        condition.position = "idle-2";
    },
    unavoidable: true
  },
  "attack2": {
    start: function() {
      setTimeout(function() {
        hitEnemy();
      }, 1200 / speed * 3);
    },
    max: 5,
    next: function() {
      if (condition.requested)
        condition.position = condition.requested;
      else if (condition.prevpos == "run")
        condition.position = "run";
      else 
        condition.position = "idle-2";
    },
    unavoidable: true
  },
  "attack3": {
    start: function() {
      setTimeout(function() {
        hitEnemy();
      }, 1200 / speed * 2);
    },
    max: 5,
    next: function() {
      if (condition.requested)
        condition.position = condition.requested;
      else if (condition.prevpos == "run")
        condition.position = "run";
      else 
        condition.position = "idle-2";
    },
    unavoidable: true
  },
  "jump": {
    max: 3,
    next: function() {
      if (condition.requested)
        this.requested = condition.requested;
      if (condition.prevpos != "jump")
        this.prevpos = condition.prevpos;
      if (hero.vy > 0) {
        condition.position = "jump";
        condition.status = 3;
      } else
        condition.position = "fall";
    },
    requested: "",
    prevpos: "",
    back: false,
    unavoidable: true
  },
  "fall": {
    max: 1,
    next: function(){
      if (hero.y == 0) {
        if (condition.requested)
          condition.position = condition.requested;
        else if (allConditions["jump"].requested) {
          condition.position = allConditions["jump"].requested;
          allConditions["jump"].requested = "";
        }
        else if (allConditions["jump"].prevpos) {
          condition.position = allConditions["jump"].prevpos;
          allConditions["jump"].prevpos = "";
        } else
          condition.position = "idle";
      }
    },
    unavoidable: true
  }
}

function setCondition(pos, stat = 0) {
  if (allConditions[condition.position].unavoidable) {
    condition.requested = pos;
    return;
  }
  condition.position = pos;
  condition.status = stat;
}

function hitEnemy() {
  console.log("OUUUCH!");
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

function jump() {
  setCondition("jump");
  setTimeout(function(){
    keys.jump = true;
    hero.vy = 60;
  }, 1200 / speed * 2)
}

document.addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37:
      if (keys.left)
        break;
      hero.vx = 5;
      character.style.transform = "rotateY(180deg)";
      setCondition("run");
      keys.left = true;
      keys.right = false;
      break;
    case 39:
      if (keys.right)
        break;
      hero.vx = -5;
      character.style.transform = "rotateY(0deg)";
      setCondition("run");
      keys.left = false;
      keys.right = true;
      break;
    case 32:
      if (!keys.jump)
        jump();
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
      hero.ax = 1.5;
      break;
    case 39:
      setCondition("idle");
      keys.right = false;
      hero.ax = 1.5;
      break;
  }
});

var backMove = setInterval(function() {
  if (keys.jump) {
    hero.vy -= hero.ay * littleG;
    hero.y += hero.vy;

    if (hero.y > 0) {
      character.style.bottom = hero.y + 28 + "px";
    } else {
      keys.jump = false;
      hero.y = 0;
      character.style.bottom = "28px";
    }
  }

  if (keys.left) {
    if (hero.x > -hero.vx) {
      setCondition("idle");
      return;
    }
    hero.vx += hero.ax;
    hero.ax *= 0.7;
    hero.x += hero.vx;
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.left = (parseInt(layers[i].getAttribute("data-index")) + 1) * hero.x + "px";
    }
  } else if (keys.right) {
    hero.vx -= hero.ax;
    hero.ax *= 0.7;
    hero.x += hero.vx;
    for (var i = 0; i < layers.length; i++) {
      layers[i].style.left = (parseInt(layers[i].getAttribute("data-index")) + 1) * hero.x + "px";
    }
  }
}, 1200 / speed);

var conditionLoop = setInterval(function() {
  if (condition.break)
    return;
  if (condition.status >= allConditions[condition.position].max) {
    condition.status = 0;
    if (allConditions[condition.position].next)
      allConditions[condition.position].next();
  } else
    condition.status++;
  character.setAttribute("src", "character/adventurer-" + condition.position + "-0" + condition.status + ".png");
}, 1200 / speed);