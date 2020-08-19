(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets:createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;
    let spinButton:UIObjects.Button;
    let bet1Button:UIObjects.Button;
    let bet10Button:UIObjects.Button;
    let bet100Button:UIObjects.Button;
    let betMaxButton:UIObjects.Button;
    let resetButton:UIObjects.Button;
    let stopButton:UIObjects.Button;
    let jackPotLabel:UIObjects.Label;
    let creditLabel:UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel:UIObjects.Label;
    let messageLabel:UIObjects.Label;
    let leftReel:Core.GameObject;
    let middleReel:Core.GameObject;
    let rightReel:Core.GameObject;
    let betLine:Core.GameObject;

    ///
    let playerMoney = 0;
    let playerCredit=1000;
    let winnings = 0;
    let jackpot = 5000;
    let turn = 0;
    let playerBet = 0;
    let winNumber = 0;
    let lossNumber = 0;
    let spinResult;
    let fruits = "";
    let winRatio = 0;


   //symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;

    let manifest:Core.Item[]=[ 
        {id:"background",src:"../Assets/images/background.png"},
        {id:"banana",src:"../Assets/images/banana.gif"},
        {id:"bar",src:"../Assets/images/bar.gif"},
        {id:"bell",src:"../Assets/images/bell.gif"},
        {id:"bet_line",src:"../Assets/images/bet_line.gif"},
        {id:"bet1Button",src:"../Assets/images/bet1Button.png"},
        {id:"bet10Button",src:"../Assets/images/bet10Button.png"},
        {id:"bet100Button",src:"../Assets/images/bet100Button.png"},
        {id:"betMaxButton",src:"../Assets/images/betMaxButton.png"},
        {id:"blank",src:"../Assets/images/blank.gif"},
        {id:"cherry",src:"../Assets/images/cherry.gif"},
        {id:"grapes",src:"../Assets/images/grapes.gif"},
        {id:"orange",src:"../Assets/images/orange.gif"},
        {id:"seven",src:"../Assets/images/seven.gif"},
        {id:"spinButton",src:"../Assets/images/spinButton.png"},
        {id:"resetButton",src:"../Assets/images/resetButton.png"},
        {id:"click",src:"../Assets/sounds/click.mp3"},
        {id:"stopButton",src:"../Assets/images/Stop.png"}

    ];


    //This function trigers first and preload everything
    function Preload()
    {
        assets = new createjs.LoadQueue;
        assets.installPlugin(createjs.Sound);
        assets.on("complete",Start);

        assets.loadManifest(manifest);
       
    }
    //This function is triggered after preload
    // config and initialization
    function Start():void
    {
        console.log("App Started...");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest=assets;
        Main();
    }

  
    // called every frame
    function Update():void
    {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number):number |boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else
        {
            return !value;
        }
    }

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        function Reels():string[] {
            let betLine = [" ", " ", " "];
            let outCome = [0, 0, 0];

            for (let spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "blank";
                        blanks++;
                        break;
                    case checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "grapes";
                        grapes++;
                        break;
                    case checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "banana";
                        bananas++;
                        break;
                    case checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "orange";
                        oranges++;
                        break;
                    case checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "cherry";
                        cherries++;
                        break;
                    case checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "bar";
                        bars++;
                        break;
                    case checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "bell";
                        bells++;
                        break;
                    case checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "seven";
                        sevens++;
                        break;
                }
            }
            return betLine;
        }

        function resetFruitTally() {
            grapes = 0;
            bananas = 0;
            oranges = 0;
            cherries = 0;
            bars = 0;
            bells = 0;
            sevens = 0;
            blanks = 0;
        }

        /* Check to see if the player won the jackpot */
        function checkJackPot() {
            /* compare two random values */
            let jackPotTry = Math.floor(Math.random() * 51 + 1);
            let jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                alert("You Won the /n$" + jackpot + " Jackpot!!");
                playerMoney += jackpot;
                jackpot = 1000;
            }
        }

        function showWinMessage() {
            playerMoney += winnings;
            playerCredit=playerCredit+playerMoney;
            messageLabel.text="You win \n$"+winnings+"";//NEWCHANGES
            winningsLabel.text=""+playerMoney+"";
            creditLabel.text=""+playerCredit+"";
            resetFruitTally();
            checkJackPot();
        }
        
        /* Utility function to show a loss message and reduce player money */
        function showLossMessage() {
            playerMoney -= playerBet;
            playerCredit=playerCredit-playerBet;
            creditLabel.text=""+playerCredit+"";
            messageLabel.text="You lose \n$"+playerBet+"";//NEWCHANGES
            winningsLabel.text=""+playerMoney+"";
            resetFruitTally();
        }

        function determineWinnings()
        {
            if (blanks == 0)
            {
                if (grapes == 3) {
                    winnings = playerBet * 10;
                }
                else if(bananas == 3) {
                    winnings = playerBet * 20;
                }
                else if (oranges == 3) {
                    winnings = playerBet * 30;
                }
                else if (cherries == 3) {
                    winnings = playerBet * 40;
                }
                else if (bars == 3) {
                    winnings = playerBet * 50;
                }
                else if (bells == 3) {
                    winnings = playerBet * 75;
                }
                else if (sevens == 3) {
                    winnings = playerBet * 100;
                }
                else if (grapes == 2) {
                    winnings = playerBet * 2;
                }
                else if (bananas == 2) {
                    winnings = playerBet * 2;
                }
                else if (oranges == 2) {
                    winnings = playerBet * 3;
                }
                else if (cherries == 2) {
                    winnings = playerBet * 4;
                }
                else if (bars == 2) {
                    winnings = playerBet * 5;
                }
                else if (bells == 2) {
                    winnings = playerBet * 10;
                }
                else if (sevens == 2) {
                    winnings = playerBet * 20;
                }
                else if (sevens == 1) {
                    winnings = playerBet * 5;
                }
                else {
                    winnings = playerBet * 1;
                }
                winNumber++;
                showWinMessage();
            }
            else
            {
                lossNumber++;
                showLossMessage();
            }
            
        }

        /* Utility function to show a win message and increase player money */


        function CheckPlayable()
        {

        }

        //Game interface
        function buildinterface():void
        {
        //Slot machine background
        slotMachineBackground= new Core.GameObject("background",Config.Screen.CENTER_X+40,Config.Screen.CENTER_y-240,true);
        stage.addChild(slotMachineBackground);

        //Buttons
        spinButton= new UIObjects.Button("spinButton",Config.Screen.CENTER_X+125,Config.Screen.CENTER_y+145,true);
        stage.addChild(spinButton);       

        bet1Button= new UIObjects.Button("bet1Button",Config.Screen.CENTER_X-150,Config.Screen.CENTER_y+145,true);
        stage.addChild(bet1Button);       

        bet10Button= new UIObjects.Button("bet10Button",Config.Screen.CENTER_X-83,Config.Screen.CENTER_y+145,true);
        stage.addChild(bet10Button);       

        bet100Button= new UIObjects.Button("bet100Button",Config.Screen.CENTER_X-15,Config.Screen.CENTER_y+145,true);
        stage.addChild(bet100Button);      

        betMaxButton= new UIObjects.Button("betMaxButton",Config.Screen.CENTER_X+57,Config.Screen.CENTER_y+145,true);
        stage.addChild(betMaxButton);

        resetButton=new UIObjects.Button("resetButton",Config.Screen.CENTER_X+200,Config.Screen.CENTER_y-30,true);
        stage.addChild(resetButton);

        stopButton=new UIObjects.Button("stopButton",Config.Screen.CENTER_X-250,Config.Screen.CENTER_y-35,true);
        stage.addChild(stopButton);

      


        //labels
        jackPotLabel= new UIObjects.Label("5000","20px","consolas","#FF0000",Config.Screen.CENTER_X-30,58,true);
        stage.addChild(jackPotLabel);

        creditLabel= new UIObjects.Label("1000","20px","consolas","#FF0000",Config.Screen.CENTER_X-140,340,true);
        stage.addChild(creditLabel);

        betLabel= new UIObjects.Label("0000","20px","consolas","#FF0000",Config.Screen.CENTER_X-30,340,true);
        stage.addChild(betLabel);

        winningsLabel= new UIObjects.Label("0000","20px","consolas","#FF0000",Config.Screen.CENTER_X+50,340,true);
        stage.addChild(winningsLabel);

        messageLabel= new UIObjects.Label("Hi there!","20px","consolas","#FF0000",Config.Screen.CENTER_X+180,Config.Screen.CENTER_y-200,true);
        stage.addChild(messageLabel);


        //Reel Gameobjects
        leftReel= new Core.GameObject("bell",Config.Screen.CENTER_X-91,Config.Screen.CENTER_y-47,true);
        stage.addChild(leftReel);

        middleReel= new Core.GameObject("banana",Config.Screen.CENTER_X-13,Config.Screen.CENTER_y-47,true);
        stage.addChild(middleReel);

        rightReel= new Core.GameObject("bar",Config.Screen.CENTER_X+65,Config.Screen.CENTER_y-47,true);
        stage.addChild(rightReel);

        //bet Line
        betLine=new Core.GameObject("bet_line",Config.Screen.CENTER_X-138,Config.Screen.CENTER_y-16,true);
        stage.addChild(betLine);

        }

        function interfaceLogic():void
        {
            //Buttons logic
        
        spinButton.on("click",()=>{
            console.log("SpinButton clicked");
            createjs.Sound.play("click");

            //Reels test
            let reels=Reels();

            let left = document.createElement("img");       
            leftReel.image=assets.getResult(reels[0]) as HTMLImageElement;
            middleReel.image=assets.getResult(reels[1]) as HTMLImageElement;
            rightReel.image=assets.getResult(reels[2]) as HTMLImageElement;
            determineWinnings();

        });
      

        resetButton.on("click",()=>{
            console.log("resetButton clicked");
            createjs.Sound.play("click");
            betLabel.text="0";
            jackPotLabel.text="5000";
            creditLabel.text="1000";
            winningsLabel.text="0";       
            
             playerMoney=0;
             grapes = 0;
             bananas = 0;
             oranges = 0;
             cherries = 0;
             bars = 0;
             bells = 0;
             sevens = 0;
             blanks = 0;
             messageLabel.text="New Game";
        });



        bet1Button.on("click",()=>{
            console.log("bet1Button clicked");
            createjs.Sound.play("click");         
            betLabel.text="1";
            messageLabel.text="you bet \n   $1";//NEWCHANGES
            playerBet=1;
            CheckPlayable();
        });


        bet10Button.on("click",()=>{
            console.log("bet10Button clicked");
            createjs.Sound.play("click");
            betLabel.text="10";
            messageLabel.text="you bet \n   $10";//NEWCHANGES
            playerBet=10;
            CheckPlayable();
        });

        
        bet100Button.on("click",()=>{
            console.log("bet10Button clicked");
            createjs.Sound.play("click");
            betLabel.text="100";
            messageLabel.text="you bet \n   $100";//NEWCHANGES
            playerBet=100;
            CheckPlayable();
        });

       
        betMaxButton.on("click",()=>{
            console.log("betMaxButton clicked");
            createjs.Sound.play("click");
            messageLabel.text="you bet \n   $999";//NEWCHANGES
            betLabel.text="999";
        });


        stopButton.on("click",()=>{
            console.log("stopButton clicked");
           
        });




        }

    // app logic goes here
    function Main():void
    {
       
        buildinterface();
        interfaceLogic();

    }

    window.addEventListener("load", Preload);
})();