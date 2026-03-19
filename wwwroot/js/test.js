

function calculDate() {
    var date1 = new Date(document.getElementById("date1").value);
    var date2 = new Date(document.getElementById("date2").value);

    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    document.getElementById("result").innerHTML = "Il y a " + diffDays + " jours entre les deux dates.";
}


function insertNDateFieldsInDocument() {
    var n = parseInt(document.getElementById("n").value);
    var container = document.getElementById("dateFieldsContainer");

    // Clear previous fields
    container.innerHTML = "";

    for (var i = 0; i < n; i++) {
        var input = document.createElement("input");
        input.type = "date";
        input.id = "date" + (i + 1);
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }
}

function removeAllDateFieldsInDocument() {
    logApp("INFO", "Removing all date fields from the document.");
    var container = document.getElementById("dateFieldsContainer");
    container.innerHTML = "";
}


function addInt(a, b) {
    return a + b;
}

function logApp(severity, message) {
    var logContainer = document.getElementById("idDivLogs");
    var logEntry = document.createElement("div");
    logEntry.className = "log-entry " + severity;
    logEntry.textContent = "[" + severity.toUpperCase() + "] " + message;
    logContainer.appendChild(logEntry);
}
    
