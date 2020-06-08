class JoeyMapOne extends Phaser.Scene
{
    constructor()
    {
        super("JoeyMapOneScene");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 1000;    
        this.JUMP_VELOCITY = -500;
    }

    preload()
    {
        // load assets
        this.load.path = "./assets/";
        this.load.image("1bit_tiles", "FullSheet.png");    // tile sheet
        this.load.spritesheet("kenney_sheet", "FullSheet.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.tilemapTiledJSON("platform_map3", "Joeymap1.json");    // Tiled JSON file
    }

    create()
    {
        //number of keys
        let keyNum = 0;
        //doorTime = 0;
        console.log("10");
        // add a tilemap
        const map = this.add.tilemap("platform_map3");
        // add a tileset to the map
        const tileset = map.addTilesetImage("FullSheet", "1bit_tiles");
        // create tilemap layers
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const groundLayer2 = map.createStaticLayer("Ground", tileset, 0, 0);
        const sceneryLayer = map.createStaticLayer("Scenery", tileset, 0, 0);
        
        // set map collision
        groundLayer2.setCollisionByProperty({ collides: true });
        
        // setup player
        // place player on map from Tiled object layer data
        // .findObject(objectLayer, callback [, context])
        // "Find the first object in the given object layer that satisfies the provided testing function. I.e. finds the first object for which callback returns true."
        const p1Spawn = map.findObject("Objects", obj => obj.name === "P1 Spawn");
        this.p1 = this.physics.add.sprite(p1Spawn.x, p1Spawn.y, "kenney_sheet", 7301);
        // set player physics properties
        this.p1.body.setSize(this.p1.width/2);
        this.p1.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.p1.body.setCollideWorldBounds(true);
        this.p1.scaleY=2;
        this.p1.scaleX=2;
        
        // generate coin objects from object data
        // .createFromObjects(name, id, spriteConfig [, scene])
        this.coins = map.createFromObjects("Objects", "coin", {
            key: "kenney_sheet",
            frame: 7298
        }, this);
        // createFromObjects can't add Physics Sprites, so we add physics manually
        // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.World.html#enable__anchor
        // second parameter is 0: DYNAMIC_BODY or 1: STATIC_BODY
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.coins.map((coin) => {
            coin.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.coinGroup = this.add.group(this.coins);

        // set gravity and physics world bounds (so collideWorldBounds works)
        this.physics.world.gravity.y = 1000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.collider(this.p1, groundLayer2);
        this.physics.add.overlap(this.p1, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            keyNum++;
            this.sound.play('key');
        });

        this.doors = map.createFromObjects("Objects", "door", {
            key: "kenney_sheet",
            frame: 8421
        }, this);

        this.physics.world.enable(this.doors, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.doors.map((door) => {
            door.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.doorGroup = this.add.group(this.doors);

        // set gravity and physics world bounds (so collideWorldBounds works)
        //this.physics.world.gravity.y = 1750;
        //this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // create collider(s)/overlap(s)
        this.physics.add.overlap(this.p1, this.doorGroup, (obj1, obj2) => {
            if(keyNum > 0){
                obj2.destroy(); // remove coin on overlap
                console.log("got");
                keyNum-=1;
            }
            else{
                this.physics.add.collider(this.p1, this.doorGroup);
            }
        });

        //creates bottom half of sliding door
        this.slides = map.createFromObjects("Objects", "slide", {
            key: "kenney_sheet",
            frame: 7861
        }, this);

        this.physics.world.enable(this.slides, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.slides.map((slide) => {
            slide.body.setCircle(8).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.slideGroup = this.add.group(this.slides);

        
        this.physics.add.overlap(this.p1, this.slideGroup, (obj1, obj2) => {

            if(doorTime < 700){
                obj2.destroy();
            }
            
                this.physics.add.collider(this.p1, this.slideGroup);
            
        });

      
       


        //creates top half of sliding door
        this.tops = map.createFromObjects("Objects", "top", {
            key: "kenney_sheet",
            frame: 7674
        }, this);

        this.physics.world.enable(this.tops, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.tops.map((top) => {
            top.body.setCircle(8).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.topGroup = this.add.group(this.tops);

       
        this.physics.add.overlap(this.p1, this.topGroup, (obj1, obj2) => {
            if(doorTime < 700){
                obj2.destroy();
                this.plates = map.createFromObjects("Objects", "plate", {
                    key: "kenney_sheet",
                    frame: 8420
                }, this);
        
                this.physics.world.enable(this.plates, Phaser.Physics.Arcade.STATIC_BODY);
                // now use JS .map method to set a more accurate circle body on each sprite
                this.plates.map((plate) => {
                    plate.body.setCircle(4).setOffset(4, 4); 
                });
                // then add the coins to a group
                this.plateGroup = this.add.group(this.plates);
        
                this.physics.add.overlap(this.p1, this.plateGroup, (obj1, obj2) => {
                    
                    down = true;
                    obj2.destroy();
                    
                        this.plates = map.createFromObjects("Objects", "plate", {
                            key: "kenney_sheet",
                            frame: 8419
                        }, this);
                    console.log("got");
                    
                    
                        this.physics.add.collider(this.p1, this.plateGroup);
                    
                });
            }
                this.physics.add.collider(this.p1, this.topGroup);

                this.plates = map.createFromObjects("Objects", "plate", {
                    key: "kenney_sheet",
                    frame: 8420
                }, this);
        
                this.physics.world.enable(this.plates, Phaser.Physics.Arcade.STATIC_BODY);
                // now use JS .map method to set a more accurate circle body on each sprite
                this.plates.map((plate) => {
                    plate.body.setCircle(4).setOffset(4, 4); 
                });
                // then add the coins to a group
                this.plateGroup = this.add.group(this.plates);
        
                this.physics.add.overlap(this.p1, this.plateGroup, (obj1, obj2) => {
                    
                    down = true;
                    obj2.destroy();
                    
                        this.plates = map.createFromObjects("Objects", "plate", {
                            key: "kenney_sheet",
                            frame: 8419
                        }, this);
                    console.log("got");
                    
                    
                        this.physics.add.collider(this.p1, this.plateGroup);
                    
                });
            
        });



        //creates and interacts with pressure plates
        this.plates = map.createFromObjects("Objects", "plate", {
            key: "kenney_sheet",
            frame: 8420
        }, this);

        this.physics.world.enable(this.plates, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.plates.map((plate) => {
            plate.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.plateGroup = this.add.group(this.plates);

        this.physics.add.overlap(this.p1, this.plateGroup, (obj1, obj2) => {
            doorTime = 700;
            down = true;
            obj2.destroy();
            
                this.plates = map.createFromObjects("Objects", "plate", {
                    key: "kenney_sheet",
                    frame: 8419
                }, this);
            console.log("got");
            
            
                this.physics.add.collider(this.p1, this.plateGroup);
            
        });


        //ladder take you to the next stage
        this.ladders = map.createFromObjects("Objects", "ladder", {
            key: "kenney_sheet",
            frame: 8422
        }, this);

        this.physics.world.enable(this.ladders, Phaser.Physics.Arcade.STATIC_BODY);
        // now use JS .map method to set a more accurate circle body on each sprite
        this.ladders.map((ladder) => {
            ladder.body.setCircle(4).setOffset(4, 4); 
        });
        // then add the coins to a group
        this.ladderGroup = this.add.group(this.ladders);

        this.physics.add.overlap(this.p1, this.ladderGroup, (obj1, obj2) => {
            this.scene.start("JoeyMapTwoScene");
        });

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.p1, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        //this.cameras.main.setDeadzone(50, 50);

        // define keyboard cursor input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('N');
        this.reload = this.input.keyboard.addKey('R');

        this.shrink=this.input.keyboard.addKey('S');
        this.grow=this.input.keyboard.addKey('G');

        // debug
        //this.scene.start("");
    }

    update() {

        
        if (down){
        doorTime--;
        }

        if(doorTime < 0){
            down = false;
            doorTime = 700;
        }

        
        console.log(doorTime);
        // player movement
        if(cursors.left.isDown) {
            this.p1.body.setAccelerationX(-this.ACCELERATION);
            this.p1.setFlip(true, false);
        } else if(cursors.right.isDown) {
            this.p1.body.setAccelerationX(this.ACCELERATION);
            this.p1.resetFlip();
        } else {
            // set acceleration to 0 so DRAG will take over
            this.p1.body.setAccelerationX(0);
            this.p1.body.setDragX(this.DRAG);
        }

        
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.p1.body.blocked.down) {
            //this.p1.anims.play('jump', true);
        }
        if(this.p1.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.p1.body.setVelocityY(this.JUMP_VELOCITY);
            this.sound.play('jump');
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("JoeyMapTwoScene");
        }
    
        if(Phaser.Input.Keyboard.JustDown(this.shrink)&&scaley!=1)
        {
            scaley=scaley/2;
            scalex=scalex/2;
            this.p1.scaleY=scaley;
            this.p1.scaleX=scalex;
            this.sound.play('shrink');
        }

        if(Phaser.Input.Keyboard.JustDown(this.grow)&&scaley!=4)
        {
            scaley=scaley*2;
            scalex=scalex*2;
            this.p1.scaleY=scaley;
            this.p1.scaleX=scalex;
            this.sound.play('grow');
        }

        
    }

        //creating door function (doesn't work because of map not being defined here)
         /*createDoor(){
            this.slides = map.createFromObjects("Objects", "slide", {
                key: "kenney_sheet",
                frame: 7861
            }, this);
    
            this.physics.world.enable(this.slides, Phaser.Physics.Arcade.STATIC_BODY);
            // now use JS .map method to set a more accurate circle body on each sprite
            this.slides.map((slide) => {
                slide.body.setCircle(8).setOffset(4, 4); 
            });
            // then add the coins to a group
            this.slideGroup = this.add.group(this.slides);
    
            
            this.physics.add.overlap(this.p1, this.slideGroup, (obj1, obj2) => {
    
                if(doorTime < 1000){
                    obj2.destroy();
                }
                
                    this.physics.add.collider(this.p1, this.slideGroup);
                
            });
    
    
            //creates top half of sliding door
            this.tops = map.createFromObjects("Objects", "top", {
                key: "kenney_sheet",
                frame: 7674
            }, this);
    
            this.physics.world.enable(this.tops, Phaser.Physics.Arcade.STATIC_BODY);
            // now use JS .map method to set a more accurate circle body on each sprite
            this.tops.map((top) => {
                top.body.setCircle(8).setOffset(4, 4); 
            });
            // then add the coins to a group
            this.topGroup = this.add.group(this.tops);
    
           
            this.physics.add.overlap(this.p1, this.topGroup, (obj1, obj2) => {
                if(doorTime < 1000){
                    obj2.destroy();
                }
                    this.physics.add.collider(this.p1, this.topGroup);
                
            });
        }*/
    }
