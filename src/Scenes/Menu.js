class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload()
    {
        this.load.image('menu', './assets/Menu.png');
        this.load.audio('jump', './assets/Jump.wav');
        this.load.audio('key', './assets/key.wav');
        this.load.audio('grow', './assets/Grow.wav');
        this.load.audio('shrink', './assets/Shrink.wav');
        this.load.audio('song', './assets/Clockwork_Confusion.wav');
        this.load.audio('timer', './assets/timer.wav');
    }

    create()
    {
        // display mennu
        let menuConfig = {
            fontFamily: 'fantasy',
            fontSize: '20px',
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

        this.add.image(0, 0, 'menu').setOrigin(0,0);
        

        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('N');
        this.controls = this.input.keyboard.addKey('I');
        //keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);

        music = this.sound.add('song');

        let musicconfig=
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0   
        }

        music.play(musicconfig);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.swap))
        {
            this.scene.start('tiledPlatformScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.controls))
        {
            this.scene.start('controlsScene');
        }
    } 
}

