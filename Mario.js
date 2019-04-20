var hero = document.getElementById("hero"),
	level = document.getElementById("level"),
	arms = document.getElementsByClassName("part1"),
	legs = document.getElementsByClassName("part2");
var play = document.getElementById("play"),
	replayBtn = document.getElementById("replay"),
	banner = document.getElementById("banner"),
	deathBanner = document.getElementById("deathBanner"),
	resume = document.getElementById("resume"),
	amount = document.getElementById("amount");
var coin = document.getElementsByClassName("coin"),
	diamond = document.getElementsByClassName("diamond");
var pauseData = 0,
	moveData = 0,
	backData = 150,
	stepData = 150,
	motionData = -1,
	blockData = 0,
	jumped = 0,
	dropData = 0,
	sum = 0,
	j = 0;
var keys = {},
	stop = [true];
var moves,
	jumpPhase,
	dropPhase,
	fallingPhase;

function goForward() {
	if (backData >= 150) {
		moveData --;
		stepData ++;
		level.style.left = moveData + "px";
		hero.style.left = stepData + "px";
	} else if (backData < 150) {
		backData ++;
		stepData ++;
		hero.style.left = stepData + "px";
	};
}
function goBack() {
	hero.style.transform = "rotateY(180deg)";
	if (backData > 0) {
		backData --;
		stepData --;
		hero.style.left = stepData + "px";
	};
}
function bonusOpener(index) {
	sum++;
	amount.textContent = sum;
	stop[index] = false;
	coin[index].style.transform = "translateY(-75px)";
	setTimeout(function() {
		coin[index].style.opacity = 0;
		diamond[index].style.opacity = 0;
	}, 200);
	setTimeout(function() {
		coin[index].style.transform = "";
	}, 1000);
}
function jumpStart(where, startJ, finishJ) {
	j = startJ;
	console.log(where);
	jumpPhase = setInterval(function () {
		j -= 2;
		jumper.style.top = j + "px";
		if (j == finishJ) {
			clearInterval(jumpPhase);
			jumped = 1;
		};
	}, 1);
}
function drop(stop) {
	if (dropData == 1 && jumped == 0) {
		jumped = 1;
		dropPhase = setInterval(function() {
			console.log ("falling");
			j += 2;
			jumper.style.top = j + "px";
			if (parseInt(hero.style.left) >= 958 && parseInt(hero.style.left) <= 998) {
				if (j == -40) {
					jumped = 0;
					clearInterval(dropPhase);
					if (j == 0) {
						dropData = 0;
					}
				}
			} else if (j == stop) {
				jumped = 0;
				clearInterval(dropPhase);
				if (j == 0) {
					dropData = 0;
				}
			};
		},2);
	};
}

setInterval(function motion() {
	if (keys[68] || keys[65]) {
		if (motionData == -1) {
			motionData = 1;
		} else if (motionData == 1) {
			motionData = -1
		};
		arms[0].style.transform = "rotateZ(" + motionData * 45 + "deg)";
		arms[1].style.transform = "rotateZ(" + motionData * (-45) + "deg)";
		legs[0].style.transform = "rotateZ(" + motionData * 45 + "deg)";
		legs[1].style.transform = "rotateZ(" + motionData * (-45) + "deg)";
	}
}, 300);

var walk = function(event) {
	if (keys[68]) {
	 	hero.style.transform = "rotateY(0deg)";
		if (parseInt(hero.style.left) >= 374 && parseInt(hero.style.left) < 485) {
			if (parseInt(jumper.style.top) <= -146) {
				goForward();
			};
		} else if (parseInt(hero.style.left) >= 647 && parseInt(hero.style.left) < 901) {
			if (!(parseInt(jumper.style.top) <= -102 && parseInt(jumper.style.top) >= -219)) {
				goForward();
			}
		} else if (parseInt(hero.style.left) >= 958 && parseInt(hero.style.left) < 998) {
			if (parseInt(jumper.style.top) <= -40) {
				goForward();
				if (parseInt(jumper.style.top) < -40) {
					drop(-40);
				}
			}
		} else if (parseInt(hero.style.left) >= 998 && parseInt(hero.style.left) < 1038) {
			if (parseInt(jumper.style.top) <= -80) {
				goForward();
				if (parseInt(jumper.style.top) < -80) {
					drop(-80);
				}
			}
		} else if (parseInt(hero.style.left) >= 1038 && parseInt(hero.style.left) < 1093) {
			if (parseInt(jumper.style.top) <= -120) {
				goForward();
			}
		} else {
			goForward();
			drop(0);
		};
	};
	if (keys[65]) {
		if (parseInt(hero.style.left) > 374 && parseInt(hero.style.left) <= 485) {
			if (parseInt(jumper.style.top) <= -146) {
				goBack();
			};
		} else if (parseInt(hero.style.left) > 647 && parseInt(hero.style.left) <= 901) {
			if (!(parseInt(jumper.style.top) <= -102 && parseInt(jumper.style.top) >= -219)) {
				goBack();
			}
		} else if (parseInt(hero.style.left) > 958 && parseInt(hero.style.left) <= 998) {
			if (parseInt(jumper.style.top) <= -40) {
				goBack();
				if (parseInt(jumper.style.top) < -40) {
					drop(-40);
				}
			}
		} else if (parseInt(hero.style.left) > 998 && parseInt(hero.style.left) <= 1038) {
			if (parseInt(jumper.style.top) <= -80) {
				goBack();
				if (parseInt(jumper.style.top) < -80) {
					drop(-80);
				}
			}
		} else if (parseInt(hero.style.left) > 1038 && parseInt(hero.style.left) <= 1093) {
			if (parseInt(jumper.style.top) <= -120) {
				goBack();
			}
		} else {
			goBack();
			drop(0);
		};
	};
	if (keys[87] && jumped == 0) {
		jumped = 2;
		dropData = 0;
		if (parseInt(hero.style.left) >= 375 && parseInt(hero.style.left) <= 484) {
			jumpStart("pipe", -146, -346);
		} else if (parseInt(hero.style.left) >= 648 && parseInt(hero.style.left) <= 900 && parseInt(jumper.style.top) <= -220) {
			jumpStart("blocks", -220, -440);
		} else if (parseInt(hero.style.left) >= 959 && parseInt(hero.style.left) <= 998) {
			jumpStart("stair1", -40, -240);
		} else if (parseInt(hero.style.left) >= 999 && parseInt(hero.style.left) <= 1038) {
			jumpStart("stair2", -80, -280);
		} else if (parseInt(hero.style.left) >= 1039 && parseInt(hero.style.left) <= 1092) {
			jumpStart("stair3", -120, -320);
		} else {
			j = 0;
			console.log("ground");
			jumpPhase = setInterval(function () {
				j -= 2;
				jumper.style.top = j + "px";
				if (parseInt(hero.style.left) >= 648 && parseInt(hero.style.left) <= 900) {
					if (j == -102) {
						clearInterval(jumpPhase);
						jumped = 1;	
					};
				} else {
					if (j == -200) {
						clearInterval(jumpPhase);
						jumped = 1;
					};
				}
			}, 1);
		};
		fallingPhase = setInterval(function() {
			if (jumped == 1) {
				if (parseInt(hero.style.left) >= 760 && parseInt(hero.style.left) <= 793 && parseInt(jumper.style.top) == -102 && stop[0]) {
					bonusOpener(0);
				};
				jumpPhase = setInterval(function () {
					j += 2;
					jumper.style.top = j + "px";
					if (parseInt(hero.style.left) >= 375 && parseInt(hero.style.left) <= 484) {
						if (j == -146) {
							clearInterval(jumpPhase);
							console.log("on pipe \n---");
							jumped = 0;
							dropData = 1;
						};
					} else if (parseInt(hero.style.left) >= 959 && parseInt(hero.style.left) <= 998) {
						if (j == -40) {
							clearInterval(jumpPhase);
							console.log("on stair1 \n---");
							jumped = 0;
							dropData = 1;
						};
					} else if (parseInt(hero.style.left) >= 998 && parseInt(hero.style.left) <= 1038) {
						if (j == -80) {
							clearInterval(jumpPhase);
							console.log("on stair2 \n---");
							jumped = 0;
							dropData = 1;
						};
					} else if (parseInt(hero.style.left) >= 1038 && parseInt(hero.style.left) <= 1092) {
						if (j == -120) {
							clearInterval(jumpPhase);
							console.log("on stair3 \n---");
							jumped = 0;
							dropData = 1;
						};
					} else if (parseInt(hero.style.left) >= 648 && parseInt(hero.style.left) < 900 && j <= -220) {
						if (j == -220) {
							clearInterval(jumpPhase);
							console.log("on blocks \n---");
							jumped = 0;
							dropData = 1;
						};
					} else {
						if (j == 0) {
							clearInterval(jumpPhase);
							console.log("on ground \n---");
							jumped = 0;
							dropData = 0;
						};
					}
				}, 1);
			clearInterval(fallingPhase);
			};
		}, 1);
	};
}

var game = setInterval(walk, 5);

function pause(event) {
	if (event.keyCode == 27 && pauseData == 0) {
		resume.style.display = "block";
		replayBtn.style.display = "block";
		banner.style.opacity = 1;
		resume.style.opacity = 1;
		replayBtn.style.opacity = 1;
		pauseData = 1;
		keys = {};
	} else if (event.keyCode == 27 && pauseData == 1) {
		banner.style.opacity = 0;
		resume.style.opacity = 0;
		replayBtn.style.opacity = 0;
		pauseData = 0;
		setTimeout(function() {
			resume.style.display = "none";
			replayBtn.style.display = "none";
		}, 200);
	};
}

var replay = function() {
	banner.style.opacity = 0;
	pauseData = 0;
	level.style.cssText = "";
	hero.style.cssText = "";
	jumper.style.cssText = "";
	moveData = 0;
	backData = 150,
	stepData = 150;
	dropData = 0;
	sum = 0;
	amount.textContent = "--";
	setTimeout(function() {
		resume.style.display = "none";
		replayBtn.style.display = "none";
	}, 200);
	for (var i = 0; i < stop.length; i++) {
		stop[i] = true;
		coin[i].style.cssText = 1;
		diamond[i].style.opacity = 1;
	}
}

var ending = setInterval(function lose() {
	if (parseInt(hero.style.left) >= 1093 && parseInt(hero.style.left) <= 1223 && j == 0) {
		clearInterval(ending);
		clearInterval(game);
		var endingFalling = setInterval(function() {
			j += 2;
			jumper.style.top = j + "px";
			if (parseInt(jumper.style.top) == 182) {
				clearInterval(endingFalling);
				deathBanner.style.display = "block";
				setTimeout(function() {
					deathBanner.style.opacity = 1;
					deathBanner.style.fontSize = 100 + "px";
					setTimeout(function() {
						deathBanner.style.opacity = 0;
						replay();
						game = setInterval(walk, 5);
						ending = setInterval(lose, 1);
						setTimeout(function() {
							deathBanner.style.display = "none";
							deathBanner.style.fontSize = 80 + "px";
						}, 3000)
					}, 5000);
				}, 1000);
			}
		}, 2);
	}
}, 1);

play.addEventListener("click", function() {
	banner.style.opacity = 0;
	play.style.opacity = 0;
	play.style.display = "none";
	play.style.zIndex = 10;
	setTimeout(function() {
		resume.style.zIndex = 11;
		replayBtn.style.zIndex = 11;
	}, 200);
	document.addEventListener("keydown", function(event) {
		if (pauseData == 0) {
			keys[event.keyCode] = true;
		};
		pause(event);
	});
	document.addEventListener("keyup", function (event) {
		for (var i = 0; i < 2; i++) {
			arms[i].style.transform = "";
			legs[i].style.transform = "";
		};
		delete keys[event.keyCode];
		clearInterval(moves);
	});
	resume.addEventListener("click", function() {
		if (resume.style.opacity == 1) {
			banner.style.opacity = 0;
			resume.style.opacity = 0;
			replayBtn.style.opacity = 0;
			pauseData = 0;
		}
		setTimeout(function() {
			resume.style.display = "none";
			replayBtn.style.display = "none";
		}, 200);
	});
	replayBtn.addEventListener("click", replay);
});