class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create()
    {
        // display mennu
        let menuConfig = {
            fontFamily: 'fantasy',
            fontSize: '16px',
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

        this.add.text(centerX, centerY- textSpacer, 'Joey Balaoing-Programming/Level Design', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 0 * textSpacer, 'David Pazos-Programming/Level Design/Art', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 1 * textSpacer, 'Dallas Truong-Programming/Musc/SFX', menuConfig).setOrigin(0.5);

        this.swap = this.input.keyboard.addKey('N');
        cursors = this.input.keyboard.createCursorKeys();
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.swap))
        {
            music.stop(config);
            this.scene.start('menuScene');
        }
    } 
}

