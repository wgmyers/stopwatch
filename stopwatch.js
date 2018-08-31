var stopwatch = function stopwatch() {

	var time = {
		minutes: 0,
		seconds: 0,
		cseconds: 0,
		running: false,
		start: -1
	};
	
	var toggleButton;
	var resetButton;
	var timeDisplay;
	var counter;
	
	function initTime() {
		time.minutes = 0;
		time.seconds = 0;
		time.cseconds = 0;
		time.running = false;
		time.start = -1;
	}
	
	function initDisplay() {
		timeDisplay = document.querySelector("#timer");
		toggleButton = document.querySelector("#toggle");
		resetButton = document.querySelector("#reset");
		setToggleButton();
		displayTime();
	}
	
	function initHandlers() {
		toggleButton.addEventListener("click", toggle);
		resetButton.addEventListener("click", reset);
	}
	
	function init() {
		initTime();
		initDisplay();
		initHandlers();
	}
	
	function setToggleButton() {
		if(time.running === false) {
			toggleButton.textContent = "Start";
		} else {
			toggleButton.textContent = "Stop";
		}
	}
	
	function reset() {
		if(time.running === true) {
			toggle();
		}
		initTime();
		displayTime();
		setToggleButton();
	}
	
	function displayTime() {
		var timeStr;
		
		timeStr = 
				  ("00" + time.minutes).slice(-2) + ":" +
				  ("00" + time.seconds).slice(-2) + ":" + 
				  ("00" + time.cseconds).slice(-2);
				  
		timeDisplay.textContent = timeStr;
	
	}

	function incTime() {
		var elapsed = Date.now() - time.start;
		time.cseconds = Math.floor(elapsed / 10) % 100;
		time.seconds = Math.floor(elapsed / 1000) % 60;
		time.minutes = Math.floor(elapsed / (1000 * 60));
		displayTime();
	}

	function toggle() {
		time.running = !time.running;
		setToggleButton();
		if(time.running) {
			time.start = Date.now();
			counter = setInterval(incTime, 10);
		} else {
			clearInterval(counter);
		}
	}

	return {
		init: init,
		toggle: toggle,
		reset: reset
	};

}();

stopwatch.init();
var keys = function() {

	var pressed = false;

	function press(e) {
		if(!pressed) {
			pressed = true;
			if (e.key === " ") {
				stopwatch.toggle();
			} else if (e.key === "Escape") {
				stopwatch.reset();
			}
		}
	}

	function unpress(e) {
		pressed = false;
	}
	
	return {
		press: press,
		unpress: unpress
	};
	
}();

document.addEventListener("keydown", keys.press);
document.addEventListener("keyup", keys.unpress);
