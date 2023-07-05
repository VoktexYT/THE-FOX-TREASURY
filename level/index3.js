class Main3 extends Phaser.Scene {
    constructor() {
        super("main3")
    }

    preload() {
        this.load.tilemapTiledJSON("tile_json3", "tiled/base_tiles3.json")
    }

    create() {
        this.level = new MakeLevel(this, {
            "tile_json": "tile_json3",
            "tile_name": "standard_tiles",
            "tile_image": "tile_image",

            "playerPos": [160, 500],
            "end": {
                "pos": [350, 0],
                "size": [100, 300],
                "nextScene": "main4",
                "visible": false
            }
        });

        this.level.create();
    }

    update() {
        this.level.update();
    }
}