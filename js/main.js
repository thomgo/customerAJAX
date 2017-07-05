// Object to deal with HTML elements and creation
var htmlContent = {
  tableBody : document.getElementById("tBody"),
  sortingType : document.getElementById("sortingType"),
  tableElement : function(element){
    return document.createElement(element);
  },
  clearElement : function(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
  }
};

// Object to deal with display of customers
var customersManager = {
  customers : null,
  displayCustomerProperty : function(customer) {
    var tableRow = htmlContent.tableElement("TR");
    for(var data in customer) {
      var tableCell = htmlContent.tableElement("TD");
      var textnode = document.createTextNode(customer[data]);
      tableCell.appendChild(textnode);
      tableRow.appendChild(tableCell);
    }
    return tableRow;
  },
  showCustomers : function() {
    for(var prop in this.customers) {
      var customer = this.customers[prop];
      var line = this.displayCustomerProperty(customer);
      htmlContent.tableBody.appendChild(line);
    }
  },
};

// Object to deal with xml requests
var xhttp = new XMLHttpRequest();



// Function to creat a table line for each client from the request. Take a json mutlidimensional object as argument


function sortJsonArray(sortingClose, jsonArray) {
  var close = sortingClose.value;
  if ( close === "age" || close === "id") {
    jsonArray.sort(function(a, b) {
    return a[close] - b[close];
    });
  }
  else {
    jsonArray.sort(function(a, b){
      if(a[close] < b[close]) return -1;
      if(a[close] > b[close]) return 1;
      return 0;
    });
  }
}

// var sortingType = document.getElementById("sortingType");

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      customersManager.customers = JSON.parse(this.responseText);
      customersManager.showCustomers();

      htmlContent.sortingType.onchange = function() {
        htmlContent.clearElement(tBody);
        sortJsonArray(this, customersManager.customers);
        customersManager.showCustomers();
      };

   }
};
xhttp.open("GET", "js/customers.json", true);
xhttp.send();
