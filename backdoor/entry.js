function enterAccessCode() {
    document.getElementById("submitButton").disabled = true;
    accessCode = document.getElementById("inputCode").value
    console.log(accessCode)

     $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("Access-Control-Allow-Origin", "*")
        },
        url: 'http://localhost:8000',
        type: 'POST',
        crossDomain: true,
        data: { action: "0", code: accessCode },
        success : function(response) {
            if (response == -1) {
                window.location.href = "../lockout/lockout.html";
            } else {
                alert("You're in.")
            }
        }
     })
}