// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
	init: function() {
		this.requires('Actor, Solid, spr_tree');
	},
});

// A Bush is just an Actor with a certain sprite
Crafty.c('Bush', {
	init: function() {
		this.requires('Actor, Solid, spr_bush');
	},
});

// A Rock is just an Actor with a certain sprite
Crafty.c('Rock', {
	init: function() {
        this.requires('Solid, Actor, spr_rock');
	}
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
	init: function() {
		this.requires('Actor, spr_village');
	},

	// Process a visitation with this village
	visit: function() {
		this.destroy();
		Crafty.audio.play('knock');
		Crafty.trigger('VillageVisited', this);
	}
});
