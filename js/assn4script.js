function MenuChoice(selection) {
	document.getElementById("customerlist").style.visibility = "hidden";
	
switch(selection) {
		case "Home":
			break;
		case "List Customers":
			document.getElementById("customerlist").style.visibility = "visible";
			MenuChoice("customerlist");
			//ListCustomers();
			break;
		case "None":
			// No menu item selected so no section should be displayed
			break;
		default:
			alert("Please select a different menu option");
	}
}

function CreateCustomer()
{
	var objRequest = new XMLHttpRequest();
	var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
	
	
	// Collect customer data from web page
	var customerid = document.getElementById("custid").value;
	var customername = document.getElementById("custname").value;
	var customercity = document.getElementById("custcity").value;
	
	// Create the string that needs to be sent as a parameter
	var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '", "City":"' + customercity + '"}';
											
	// Checking for AJAX operation return
	objRequest.onreadystatechange = function() {
		if (objRequest.readyState == 4 && objRequest.status == 200) {
			var result = JSON.parse(objRequest.responseText);
			OperationResult(result);
		}
	}
	
	// Start AJAX request - using POST method
	objRequest.open("POST", url, true);
	objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	objRequest.send(newcustomer);
}

// This function will list the customers in a table
function ListCustomers() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var output = JSON.parse(xmlhttp.responseText);
			GenerateOutput(output);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
	function GenerateOutput(result) {
		var display = "<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
		var count = 0;
		var rowid = "oddrow";
		var customername = "";
		var customerid = "";
		for(count = 0; count < result.GetAllCustomersResult.length; count ++) {
			if (count % 2 == 0) {
				rowid = "evenrow";
			} else {
				rowid = "oddrow";
			}
			customername = '<a id="clickable" onclick="Customers(' + "'" + result.GetAllCustomersResult[count].CustomerID + "'); return false;" + "" + ">";
			customername += result.GetAllCustomersResult[count].CustomerID;
			customername += '</a>';
			
			display += "<tr id=" + rowid + "><td>" + customerid + "</td><td>" + customername + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
			display += "</table>";
			document.getElementById("customerid").innerHTML = display;
		}
	}
} // ends list customer function


		// Function that displays results
		function GenerateOutput(result) {
			var display = "<table><tr><th>Customer ID</th><th>Company Name</th><th>City</th></tr>";
			
			var count = 0;
			
			for(var count = 0; count < result.length; count++)
				{
					display += "<tr><td>" + result[count].CustomerID + "</td><td>" + result[count].CompanyName + "</td><td>" + result[count].City + "</td></tr>";
				}
				
					display += "</table>";
					document.getElementById("customerid").innerHTML = display;
		}
		

		



function OperationResult(output) {
	if (output.WasSuccessful == 1) {
		document.getElementById("result").innerHTML = "<alert>" + "The operation was successful!" + "</alert>";
	} else {
		document.getElementById("result").innerHTML = "The operation was not successful." + "<br>" + output.Exception;
	}
}
