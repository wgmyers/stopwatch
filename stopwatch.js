var stopwatch = function stopwatch() {

	var time = {
		minutes: 0,
		seconds: 0,
		cseconds: 0,
		running: false
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
		time.cseconds += 1;
		if(time.cseconds === 100) {
			time.seconds += 1;
			time.cseconds = 0;
		}
		if(time.seconds === 60) {
			time.minutes += 1;
			time.seconds = 0;
		}
		displayTime();
	}

	function toggle() {
		time.running = !time.running;
		setToggleButton();
		if(time.running) {
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
document.addEventListener("keypress", function (e) {
	if (e.key === " ") {
		stopwatch.toggle();
	} else if (e.key === "Escape") {
		stopwatch.reset();
	}
});
