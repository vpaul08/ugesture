
function MouseProcessor() {
	var that = this;
	var circleCondition = {x1: 0, y1:0, x2: 0, y2:0, x3: 0, y3:0, x4: 0, y4:0};
	var cPointer = 0;
	var cRadius = 5;
	var trackingDirection = "";
	var startTime = 0;
	var scrollUpEvent, scrollDownEvent, clockWiseGestureEvent;
	
	this.processMouse = function(e) {
		var eventTime = new Date().getTime();
		
		if (!e) e = window.event;
		var x = parseInt(e.clientX);
		var y = parseInt(e.clientY);
		
		if (startTime === 0) startTime = new Date().getTime();
		if (eventTime - startTime < 1000) {
			
			if (cPointer === 0) {
				startTime = new Date().getTime();
				circleCondition.x1 = x;
				circleCondition.y1 = y;
				cPointer += 1;
				logInf(cPointer);
			} else if (cPointer === 1) {
				if (x > (circleCondition.x1 + cRadius) && y < (circleCondition.y1 - cRadius)) {
					circleCondition.x2 = x;
					circleCondition.y2 = y;
					cPointer += 1;
					logInf(cPointer);
				}
			} else if (cPointer === 2) {
				if (x > (circleCondition.x2 + cRadius) && y > (circleCondition.y2 + cRadius)) {
					circleCondition.x3 = x;
					circleCondition.y3 = y;
					cPointer += 1;
					logInf(cPointer);
				}
			} else if (cPointer === 3) {
				if (x < (circleCondition.x3 - cRadius) && y > (circleCondition.y3 + cRadius)) {
					circleCondition.x4 = x;
					circleCondition.y4 = y;
					cPointer += 1;
					logInf(cPointer);
				}
			} else if (cPointer === 4) {
				if (x < (circleCondition.x4 - cRadius) && y < (circleCondition.y4 - cRadius)) {
					cPointer = 0;
					circleCondition.x1 = 0;
					circleCondition.y1 = 0;
					
					//Trigger the final event
					clockWiseGestureEvent();
				}
			}
		} else {
			cPointer = 0;
			startTime = 0;
			circleCondition.x1 = 0;
			circleCondition.y1 = 0;
			logInf('Reset');
		}
		
		var mcText = x + ', ' + y;		
		document.getElementById('mouseC').innerHTML = mcText;
	},
	
	//Mouse events setter functions
	this.setScrollEvents = function(scrollUpFunctionRef, scrollDownFunctionRef) {
		scrollUpEvent = scrollUpFunctionRef;
		scrollDownEvent = scrollDownFunctionRef;
	},
	
	this.setClockWiseGestureEvent = function(clockWiseGestureEventRef) {
		clockWiseGestureEvent = clockWiseGestureEventRef;
	},
	
	//Mouse wheel events
	this.handleMouseWheel = function(delta) {
		if (parseInt(delta) === 1)
			scrollUpEvent();
		else
			scrollDownEvent();
	},
	
	// This  is bound to the window/document object for this function.
	this.wheel = function(event){
		var delta = 0;
		
		if (!event) event = window.event;
		if (event.wheelDelta)
			delta = event.wheelDelta/120; 
		else if (event.detail)
			delta = -event.detail/3;

		if (delta)
			that.handleMouseWheel(delta);
		if (event.preventDefault)
			event.preventDefault();
	
		event.returnValue = false;
	}
}

function logInf(message) {
	//console.log(message);
}
