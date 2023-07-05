class Main2 extends Phaser.Scene {
    constructor() {
        super("main2")
    }

    preload() {
        this.load.tilemapTiledJSON("tile_json2", "tiled/base_tiles2.json")
    }

    create() {
        this.level = new MakeLevel(this, {
            "tile_json": "tile_json2",
            "tile_name": "PR_TileSet 80x80",
            "tile_image": "tile_image",

            "playerPos": [180, 500],
            "end": {
                "pos": [1400, 330],
                "size": [100, 600],
                "nextScene": "main3",
                "visible": false
            }
        });

        this.level.create();
    }

    update() {
        this.level.update();   
    }
}