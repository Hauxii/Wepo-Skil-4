window.World = (function() {
	'use strict';

	var SPEED = 30;
	var INITIAL_POSITION_X = 120;
	var WIDTH = 20;
	var HEIGHT = 50;

	var World = function(up, down, game) {
		this.up = up;
		this.down = down;
		this.game = game;
		this.up.pos = { x: 0, y: 0 };
		this.down.pos = { x: 0, y: 0};
		this.scoreIncremented;
	};

	World.prototype.reset = function() {
		var random = (Math.floor(Math.random() * 30) + 1) - 35;

        this.up.pos.x = INITIAL_POSITION_X;
        this.down.pos.x = INITIAL_POSITION_X;

        this.up.pos.y = random;
        this.down.pos.y = random + 70;

        this.up.css('transform', 'translateZ(0) translate(' + this.up.pos.x + 'em, ' + this.up.pos.y + 'em)');
        this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
	};

	World.prototype.onFrame = function(delta) {
		console.log(this.game.player.playing);
		if(this.game.player.playing){
			this.checkCollisionWithBounds();

			this.checker();

			this.up.pos.x -= delta * SPEED;
			this.down.pos.x -= delta * SPEED;

			this.up.css('transform', 'translateZ(0) translate(' + this.up.pos.x + 'em, ' + this.up.pos.y + 'em)');
			this.down.css('transform', 'translateZ(0) translate(' + this.down.pos.x + 'em, ' + this.down.pos.y + 'em)');
		}
		
	};

	World.prototype.checker = function (){
		if(this.up.pos.x < -WIDTH){
			return this.reset();
		}
	};

	World.prototype.checkCollisionWithBounds = function() {

		if(this.up.pos.x <= 28 || this.up.pos.x <= 38) {
            if(this.game.player.pos.y <= this.up.pos.y + 20 || this.game.player.pos.y >= this.down.pos.y) {
            	this.game.player.playerDeath();
                return this.game.gameover();
            } else if((this.scoreIncremented === false) && this.up.pos.x <= 30) {    
            	this.scoreIncremented = true;       
            	this.game.player.incrementCurrScore();
            }
        }
        else{
        	this.scoreIncremented = false;
        } 
	};

	return World;
})();