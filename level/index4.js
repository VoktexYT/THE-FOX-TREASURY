class Main4 extends Phaser.Scene {
    constructor() {
        super("main4")
    }

    preload() {
        this.load.tilemapTiledJSON("tile_json4", "tiled/base_tiles4.json")
    }

    create() {
        this.level = new MakeLevel(this, {
            "tile_json": "tile_json4",
            "tile_name": "standard_tiles",
            "tile_image": "tile_image",

            "playerPos": [400, 500],
            "end": {
                "pos": [1500, 500],
                "size": [100, 500],
                "nextScene": "main",
                "visible": false
            }
        });

        this.level.create();
    }

    update() {
        this.level.update();
    }
}