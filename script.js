// Developer Settings
let systemStabilityResolution = 20;

// Global variables
var currentStage = 0;
var systemStability = 5000;
var pressesToNextStage = 1;

var systemCode = "AGX51"

var stage3Button = 0;

// Game Logic to execute every other frame.
function logic() {
    if (currentStage > 0) {
        systemStability -= 1;

        if (systemStability <= 0) {
            window.location.href = "lockout/lockout.html";
        }
    }
}

// Redrawing things that are constantly changing.
function updateScreen() {
    // Instability Bar
    var instabilityText = "[ "

    for (let i = 0; i < systemStabilityResolution; i++) {
        if (systemStability > (i * (10000 / systemStabilityResolution))) {
            instabilityText += "|"
        } else {
            instabilityText += "-"
        }
    }

    instabilityText += " ] (" + (100 * (systemStability / 10000)).toFixed(2) + "%)"

    document.getElementById("systemStabilityBar").innerHTML = instabilityText
}

var mainLoop = window.setInterval(function() {
    logic();
    updateScreen();
}, 1);


// Repair Button
function repairButton() {
    systemStability += 1 + Math.floor(Math.random() * 799);
    
    if (systemStability > 10000) {
        systemStability = 10000
    }
}

// Advance Button
function advanceButton(buttonID) {
    console.log("You tried tbh.")

    if (currentStage >= 2 && (buttonID != stage3Button)) {


    } else if (currentStage >= 4 && (document.getElementById("systemCodeParagrpah").innerHTML != document.getElementById("systemCodeInput").value)) {
        // Backdoor Entry
        if (currentStage >= 4 && (document.getElementById("systemCodeInput").value == "UF52BZ629NBXZ4")) {
            window.location.href = "backdoor/entry.html";
        }

    } else {
        console.log("Pressed.")
        pressesToNextStage -= 1;

        // Stage 3
        if (currentStage >= 2) {
            stage3Button = Math.round(Math.random());
            for (let i = 0; i < 2; i++) {
                if (i == stage3Button) {
                    document.getElementById("advanceButton" + (i + 1)).style = "color: green;";
                } else {
                    document.getElementById("advanceButton" + (i + 1)).style = "color: black;";
                }
            }
        }

        if (pressesToNextStage <= 0) {
            currentStage += 1;
    
            handleStage();
        }
    }
}


// Handle Stages
function handleStage() {
    helpTextRef = document.getElementById("helpText");

    switch (currentStage) {
        case 0:
            break;
        
        case 1:
            //pressesToNextStage = 20;
            pressesToNextStage = 1;
            helpTextRef.innerHTML = "Good job. You've probably noticed that the integrity has started to rapidly degrade. Make sure to keep it topped up while you read these messages. Go on and keep clicking.";
            break;

        case 2:
            //pressesToNextStage = 10;
            pressesToNextStage = 1;
            helpTextRef.innerHTML = "Still too easy? Alright, let's spice things up. There are now two buttons that could advance stages. One is coloured green, one isn't. Click the green one, please.";
            
            let newButton = document.createElement("button");
            newButton.innerHTML = "Advance";
            newButton.id = "advanceButton2";

            document.getElementById("extraButton").appendChild(newButton);

            newButton.addEventListener("click", function() {
                advanceButton(1);
            });

            document.getElementById("advanceButton1").style = "color: green;";
            break;
        
            case 3:
                //pressesToNextStage = 10;
                pressesToNextStage = 1;
                helpTextRef.innerHTML = "I'm sure you're wondering if this has a point or not. If any of these buttons rea;;y matter. Well it doesn't matter. At least, not to you.";
                break;
            
            case 4:
                pressesToNextStage = 10;
                helpTextRef.innerHTML = "Alright, new gimmick? New gimmick. Makes sure you keep an eye on the System Code. If it changes, copy it into the text field next to the code. Copy and paste, type it out, I don't care how you get it in there, just get it in there. That activate button won't work if you've got the wrong code."
                
                let newParagraph = document.createElement("p");
                newParagraph.id = "systemCodeParagrpah"
                document.getElementById("systemCodeArea").appendChild(newParagraph)
                
                let newField = document.createElement("input");
                newField.type = "text";
                newField.id = "systemCodeInput";
                document.getElementById("systemCodeArea").append(newField);

                newParagraph.innerHTML = systemCode;
                break;
    }
}


// Steag 5 ---> Randomise Code
var codeLoop = window.setInterval(function() {

    if(Math.random() > 0.55) {
        var components = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        systemCode = "";

        for(let i = 0; i < 5; i++) {
            systemCode += components[Math.floor(Math.random() * components.length)];
        }
        if (document.getElementById("systemCodeParagrpah") != null) {
            document.getElementById("systemCodeParagrpah").innerHTML = systemCode;
        }
    }

}, 4897);