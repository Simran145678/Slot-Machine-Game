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
    let jackPotLabel:UIObjects.Label;
    let creditLabel:UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel:UIObjects.Label;
    let leftReel:Core.GameObject;
    let middleReel:Core.GameObject;
    let rightReel:Core.GameObject;
    let betLine:Core.GameObject;
   

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
        {id:"spinButton",src:"../Assets/images/spinButton.png"}

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
        //helloLabel.rotation -= 5;

        stage.update();
    }

    // app logic goes here
    function Main():void
    {
        //Slot machine background
        slotMachineBackground= new Core.GameObject("background",Config.Screen.CENTER_X+40,Config.Screen.CENTER_y-240,true);
        stage.addChild(slotMachineBackground);

        //Buttons
        spinButton= new UIObjects.Button("spinButton",Config.Screen.CENTER_X+125,Config.Screen.CENTER_y+145,true);
        stage.addChild(spinButton);

        spinButton.on("click",()=>{
            console.log("SpinButton clicked");
        });

        bet1Button= new UIObjects.Button("bet1Button",Config.Screen.CENTER_X-150,Config.Screen.CENTER_y+145,true);
        stage.addChild(bet1Button);

        bet1Button.on("click",()=>{
            console.log("bet1Button clicked");
        });

        bet10Button= new UIObjects.Button("bet10Button",Config.Screen.CENTER_X-83,Config.Screen.CENTER_y+145,true);
        stage.addChild(bet10Button);

        bet10Button.on("click",()=>{
            console.log("bet10Button clicked");
        });

        bet100Button= new UIObjects.Button("bet100Button",Config.Screen.CENTER_X-15,Config.Screen.CENTER_y+145,true);
        stage.addChild(bet100Button);

        bet10Button.on("click",()=>{
            console.log("bet10Button clicked");
        });

        betMaxButton= new UIObjects.Button("betMaxButton",Config.Screen.CENTER_X+57,Config.Screen.CENTER_y+145,true);
        stage.addChild(betMaxButton);

        betMaxButton.on("click",()=>{
            console.log("betMAxButton clicked");
        });


        //labels
        jackPotLabel= new UIObjects.Label("9999999","20px","consolas","#FF0000",Config.Screen.CENTER_X-40,58,true);
        stage.addChild(jackPotLabel);

        creditLabel= new UIObjects.Label("9999999","20px","consolas","#FF0000",Config.Screen.CENTER_X-140,340,true);
        stage.addChild(creditLabel);

        betLabel= new UIObjects.Label("9999","20px","consolas","#FF0000",Config.Screen.CENTER_X-30,340,true);
        stage.addChild(betLabel);

        winningsLabel= new UIObjects.Label("9999999","20px","consolas","#FF0000",Config.Screen.CENTER_X+50,340,true);
        stage.addChild(winningsLabel);

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

    window.addEventListener("load", Preload);
})();