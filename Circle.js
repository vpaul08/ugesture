function Circle() {
	var that = this;
	var windowH = $(document).height();
	var windowW = $(document).width();
	
	var circleRadius = 150;
	var state = "open";
	var innerFill = "#069";
	var outerStroke = "#6C9";
	var hInnerFill = "#C33";
	var hOuterStroke = "#CC3";
	var strokeWidthBefore = 60;
	var strokeWidthAfter = 150;
	
	var animationType = "elastic";
	var animationTime = 3000;
	var circleX = (windowW)/2;
	var circleY = (windowH)/2;
	alert(circleX + ":" + circleY);
	var raphaelObject;
	
	//Constructor to initialise (Raphael code).
	(function() {
		Raphael(function () {
			var paper = Raphael("holder", windowW, windowH);
			raphaelObject = paper.circle(circleX, circleY, circleRadius);			
			raphaelObject.attr({
				fill: innerFill,
				stroke: outerStroke,
				"stroke-width": strokeWidthBefore,
				cursor: "pointer"
			}).hover( function() {
				this.attr({
					fill: hInnerFill,
					stroke: hOuterStroke
				});
			}, function() {
				this.attr({
					fill: innerFill,
					stroke: outerStroke
				});
			}).click( function() {
				that.animateToggle();
			}).animate({
					"stroke-width": strokeWidthAfter
			}, animationTime, animationType);
		});
	}());
	
	this.animateToggle = function() {
		if (state === "open") {
			this.animateMyCircleIn();
		} else {
			this.animateMyCircleOut();
		}
	},
	
	this.animateMyCircleOut = function() {
		state = "open";
		raphaelObject.attr({
			"stroke-width": strokeWidthBefore
		}).animate({
			"stroke-width": strokeWidthAfter
		}, animationTime, animationType);
	},
	this.animateMyCircleIn = function() {
		state = "close";
		raphaelObject.attr({
			"stroke-width": strokeWidthAfter
		}).animate({
			"stroke-width": strokeWidthBefore
		}, animationTime, animationType);
	}
}

