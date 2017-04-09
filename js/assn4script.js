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

function OperationResult(output) {
	if (output.WasSuccessful == 1) {
		document.getElementById("result").innerHTML = "The operation was successful!"
	} else {
		document.getElementById("result").innerHTML = "The operation was not successful." + "<br>" + output.Exception;
	}
}