window.World = (function() {
	'use strict';

	var INITIAL_POSITION_X = 100;
	var INITIAL_POSITION_Y = 30;
	var WIDTH = 5;
	var HEIGHT = 5;
	var started = false;

	var pipeId = 0;
	var gap = 120;


	var World = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.el.css('transform', 'translateZ(0) translate(' + INITIAL_POSITION_X + 'em, ' + INITIAL_POSITION_Y + 'em)');
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
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return World;
})();