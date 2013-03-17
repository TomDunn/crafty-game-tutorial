// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});

// binds on the NewDirection, updates an orientation on NewDirection event
Crafty.c('Orientable', {
    init: function() {
        this.requires('Fourway')
            .attr({
                facing: {
                    right:  1,
                    left:  -1,
                }
            })
            .bind("NewDirection", function(data) {
                if (data.x > 0) {
                    this.facing.right = 1;
                    this.facing.up = 0;
                } else if (data.x < 0) {
                    this.facing.right = -1;
                    this.facing.up = 0;
                } else if (data.y > 0) {
                    this.facing.up = -1;
                    this.facing.right = 0;
                } else if (data.y < 0) {
                    this.facing.up = 1;
                    this.facing.right = 0;
                }
            });
    }
});
