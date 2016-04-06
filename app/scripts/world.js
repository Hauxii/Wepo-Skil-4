window.World = (function() {
	'use strict';

	var INITIAL_POSITION_X = 60;
	var INITIAL_POSITION_Y = 20;
	var WIDTH = 10;
	var HEIGHT = 100;
	var started = true;

	var pipeId = 0;
	var gap = 120;


	var World = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	World.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	World.prototype.hasStarted = function(){
		return this.started;
	};


	World.prototype.onFrame = function(delta) {
		if(started){
			this.checkCollisionWithBounds();
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		}
	};

	World.prototype.checkCollisionWithBounds = function() {

	};

	return World;
})();