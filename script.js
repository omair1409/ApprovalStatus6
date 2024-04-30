// Function to fetch data from CSV file
function fetchCSVData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.error("Failed to fetch CSV file");
            }
        }
    };
    xhr.open("GET", "data.csv");
    xhr.send();
}

// Function to parse CSV data and return as an object
function parseCSVData(csvData) {
    var lines = csvData.split("\n");
    var data = {};
    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].split(",");
        if (parts.length >= 2) {
            var id = parts[0].trim();
            var name = parts[1].trim();
            data[id] = name;
        }
    }
    return data;
}

// Function to handle lookup
function lookupName() {
    var id = document.getElementById("idInput").value;
    fetchCSVData(function(csvData) {
        var idToName = parseCSVData(csvData);
        var name = idToName[id];
        if (name) {
            document.getElementById("nameOutput").textContent = "Status: " + name;
        } else {
            document.getElementById("nameOutput").textContent = "Email not found:" + id;
        }
    });
}

// Add event listener for Enter key press in the input field
document.getElementById("idInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        lookupName();
    }
});
