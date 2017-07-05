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

  sortString : function(jsonArray) {
    jsonArray.sort(function(a, b){
      if(a[htmlContent.sortingType.value] < b[htmlContent.sortingType.value]) return -1;
      if(a[htmlContent.sortingType.value] > b[htmlContent.sortingType.value]) return 1;
      return 0;
    });
  },
  sortInteger : function(jsonArray) {
    jsonArray.sort(function(a, b) {
    return a[htmlContent.sortingType.value] - b[htmlContent.sortingType.value];
    });
  },
  sort : function(jsonArray) {
    if (typeof jsonArray[0][htmlContent.sortingType.value] === "string" ) {
      this.sortString(jsonArray);
    }
    else {
      this.sortInteger(jsonArray);
    }
  },

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
  showCustomers : function(sort = false) {
    htmlContent.clearElement(htmlContent.tableBody);
    if(sort) {
      this.sort(this.customers);
    }
    for(var prop in this.customers) {
      var customer = this.customers[prop];
      var line = this.displayCustomerProperty(customer);
      htmlContent.tableBody.appendChild(line);
    }
  },
};

// Object to deal with xml requests
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      customersManager.customers = JSON.parse(this.responseText);
      customersManager.showCustomers();

      htmlContent.sortingType.onchange = function() {
        customersManager.showCustomers(true);
      };

   }
};
xhttp.open("GET", "js/customers.json", true);
xhttp.send();
