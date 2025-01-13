// Developer Settings
let systemStabilityResolution = 20;

var systemStability = 500;

function logic() {
    systemStability -= 1;

    if (systemStability <= 0) {
        window.location.href = "lockout/lockout.html";
    }
}

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


function repairButton() {
    systemStability += 1 + Math.floor(Math.random() * 799);
    
    if (systemStability > 10000) {
        systemStability = 10000
    }
}