var tBody = document.getElementById("tBody");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var customers = JSON.parse(this.responseText);

      for(var prop in customers) {
        var tableRow = document.createElement("TR");
        for(var data in customers[prop]) {
          var tableCell = document.createElement("TD");
          var textnode = document.createTextNode(customers[prop][data]);
          tableCell.appendChild(textnode);
          tableRow.appendChild(tableCell);
        }
        tBody.appendChild(tableRow);
      }
   }
};
xhttp.open("GET", "js/customers.json", true);
xhttp.send();
