window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 60; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var started = false;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		started = false;
	};

	document.body.onkeydown = function (e) {
		if(e.keyCode === 32) {
			if(started == false){
				started = true;
			}
			
		}
	};
	Player.prototype.hasStarted = function(){
		return this.started;
	}


	Player.prototype.onFrame = function(delta) {

		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}*/
		if(started){
			if (Controls.keys.up) {
			/*	if(Controls.didJump()){
					this.pos.y -= delta * (SPEED*4);
				}
				else{*/
					this.pos.y -= delta * SPEED;
				/*}*/
			}
			else{
				this.pos.y += delta * SPEED;
			}

			this.checkCollisionWithBounds();

			// Update UI
			this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		}
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
