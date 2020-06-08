class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    create()
    {
        // display mennu
        let controlConfig = {
            fontFamily: 'fantasy',
            fontSize: '11px',
            backgroundColor: '#7aa1a0',
            color: '#7b348c',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 54;

        this.add.text(centerX, centerY- textSpacer, 'Press S to Shrink and G to Grow', controlConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 0 * textSpacer, 'Some door open when you walk into them with keys', controlConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 1 * textSpacer, 'Some doors open when you walk into them after activating something', controlConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 2 * textSpacer, 'Press I to return to Menu', controlConfig).setOrigin(0.5);

        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('N');
        this.controls = this.input.keyboard.addKey('I');
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.controls))
        {
            music.stop(config);
            this.scene.start('menuScene');
        }
    } 
}

