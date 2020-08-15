(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets:createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;

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
        slotMachineBackground= new Core.GameObject("background",360,8,true);
        stage.addChild(slotMachineBackground);
       

        
    }

    window.addEventListener("load", Preload);
})();