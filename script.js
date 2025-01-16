// Developer Settings
let systemStabilityResolution = 20;

// Global variables
var currentStage = 0;
var systemStability = 5000;
var pressesToNextStage = 1;

// Stage 3
var stage3Button = 0;

// Stage 5
var systemCode = "AGX51"

// Stage 7
var coreReferences = []
var coreStatus = [1000, 1000, 1000]


// Game Logic to execute every other frame.
function logic() {
    if (currentStage > 0) {
        systemStability -= 1;

        if (systemStability <= 0) {
            window.location.href = "lockout/lockout.html";
        }
    }

    if (currentStage >= 6) { // Core Instability
        for (let i = 0; i < coreReferences.length; i++) {
            if (coreStatus[i] <= 0) {
                coreStatus[i] = 0;
                systemStability -= 1;
    
                coreReferences[i].style = "color: red;"
            } else if (coreStatus[i] <= 500) {
                coreReferences[i].style = "color: yellow;"
            } else {
                coreReferences[i].style = "color: green;"
            }
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
    if (currentStage >= 2 && (buttonID != stage3Button)) {


    } else if (currentStage >= 4 && (document.getElementById("systemCodeParagrpah").innerHTML != document.getElementById("systemCodeInput").value)) {
        // Backdoor Entry
        if (currentStage >= 4 && (document.getElementById("systemCodeInput").value == "UF52BZ629NBXZ4")) {
            window.location.href = "backdoor/entry.html";
        }

    } else {
        pressesToNextStage -= 1;

        // Stage 3
        if (currentStage >= 2) {
            maxButton = 1.0;
            if (currentStage >= 7) {
                maxButton = 2.0;
            }

            stage3Button = Math.round(Math.random() * maxButton);
            for (let i = 0; i < (1 + maxButton); i++) {
                console.log("advanceButton" + (i + 1));
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
            //pressesToNextStage = 5;
            pressesToNextStage = 1;
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
        
        case 5:
            //pressesToNextStage = 10;
            pressesToNextStage = 1;
            helpTextRef.innerHTML = "By the way, if you see any artifacts in the text here, ignore it. It keeps changing itself, I don't know why.";
            break;
        
        case 6:
            //pressesToNextStage = 10;
            pressesToNextStage = 1;
            helpTextRef.innerHTML = "Hope you weren't getting too comfortable with the system integrity. Keep an eye on thoes cores and click them if they go yellow or red. Your system integrity will degrade faster if they're red."
            
            divReference = document.getElementById("coreArea")

            let newBreak = document.createElement("br");
            divReference.appendChild(newBreak)

            for (let i = 0; i < 3; i++) {
                let newButton = document.createElement("button");
                newButton.innerHTML = "CORE " + (i + 1);
                newButton.id = "coreButton" + (i + 1);

                divReference.appendChild(newButton);
                coreReferences.push(newButton);

                newButton.addEventListener("click", function() {
                    resetCore(i);
                });
            }

            break;
        
        case 7:
            //pressesToNextStage = 10;
            pressesToNextStage = 100;
            helpTextRef.innerHTML = "Alright, a bit of a difficulty boost. Third button to worry about when activating stuff, there you go.";
            
            let newButton2 = document.createElement("button");
            newButton2.innerHTML = "Advance";
            newButton2.id = "advanceButton3";

            document.getElementById("extraButton2").appendChild(newButton2);

            newButton2.addEventListener("click", function() {
                advanceButton(2);
            });
            break;

    }
}


// Stage 5 ---> Randomise Code
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


// Stage 7 ---> Core Instability Increase
var coreLoop = window.setInterval(function() {
    for (let i = 0; i < coreReferences.length; i++) {
        coreStatus[i] -= (Math.random() * 100);
    }
}, 516);


// Stage 7 ---> Reset Core Instability
function resetCore(id) {
    coreStatus[id] = 800 + (Math.random() * 200);
}