// Object to deal with xml requests
var xhttp = new XMLHttpRequest();

// Get the body table to add the lines
var tBody = document.getElementById("tBody");

// Store the different customers
var customers = null;

// Function to creat a table line for each client from the request. Take a json mutlidimensional object as argument
function createLines(jsonObject) {
  for(var prop in jsonObject) {
    var tableRow = document.createElement("TR");
    for(var data in jsonObject[prop]) {
      var tableCell = document.createElement("TD");
      var textnode = document.createTextNode(jsonObject[prop][data]);
      tableCell.appendChild(textnode);
      tableRow.appendChild(tableCell);
    }
    tBody.appendChild(tableRow);
  }
}

function clearTable(selectedNode) {
  while (selectedNode.firstChild) {
    selectedNode.removeChild(selectedNode.firstChild);
}
}

var test = document.getElementById("test");


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      customers = JSON.parse(this.responseText);
      createLines(customers);

      test.onclick = function() {
        clearTable(tBody);
        customers.sort(function(a, b) {
        return a.age - b.age;
        });
        createLines(customers);
      };

   }
};
xhttp.open("GET", "js/customers.json", true);
xhttp.send();
