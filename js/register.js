// Global Constants
var URL = "http://192.169.244.18/mobiroster/index.php";
var URL_ADMIN = "http://192.169.244.18/mobiroster/php/admin_functions.php";

var M_SUCCESS = "success";
var M_YES = "yes";
var M_NO = "no";	

//LOG Constants
var MSG_SERVER_MAINTENANCE = "Server under maintenance. Please try again after a while!";

//Error Constants
var ERR_SERVER = "Server Error!";

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }

  if (!xhr) {
    console.log('CORS not supported');
  } else {
    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };
  }
  return xhr;
}

$(document).ready(function () {
	console.log('loaded');
	$('#new_company').click(function(e){
		console.log('sending');
		(e || window.event).preventDefault();
		var xhr = createCORSRequest('POST', URL);
		xhr.onload = function(){
			$().onAddCompanyResponse(xhr.responseText);
		};
		xhr.onerror = function() {
			// Handle error
		};

		if(!$().validateForm()){
			$("#form-validation-error").css('display','block');
			return;
		}else{
			$("#form-validation-error").css('display','none');
		}
		
		var data = new FormData();
		var company_data = new Object();
		var admin_data = new Object();

		//fetch values
		company_data.company_name = $('#reg_company_name').val().trim();
		company_data.abn = $('#reg_abn').val().trim();
		company_data.logo = null;
		company_data.timezone = $( "#reg_timezone option:checked" ).val();
		company_data.scheduleType = $( "#reg_schedule_type input:checked" ).val();
		company_data.weekStartsOn = 1;
		company_data.sundayPayrate = 1;
		company_data.saturdayPayrate = 1;
		company_data.workingHoursStart = 7;
		company_data.workingHoursEnd = 23;
		company_data.payslipFormat = 0;
		company_data.hasRosterBreaks = 1;
		
		company_data.stores = [];
		for (var i = 0; i< stores.length ; i++) {
			tempStore = new Object();
			tempStore.code = 'S'+(i+1);
			tempStore.description = stores[i];
			company_data.stores[company_data.stores.length] = tempStore;
		};

		admin_data.email = $('#reg_email').val().trim();
		admin_data.firstName = $('#reg_firstname').val().trim();
		admin_data.middleName = "";
		admin_data.lastName = $('#reg_lastname').val().trim();
		admin_data.payrate = 0;
		admin_data.position = 1;
		admin_data.claimTaxFreeThreshold = 0;

		/* 
		https://mobiroster.com/mobiroster/php/admin_functions.php?
 			mode=new_company&
 			company={	"abn":"PTSFMLY","name":"Pets Family","logo":null,"timezone":"Australia/Melbourne","scheduleType":"1","weekStartsOn":"2",
 						"sundayPayrate":"1","saturdayPayrate":"1","workingHoursStart":"10","workingHoursEnd":"23","payslipFormat":"1","hasRosterBreaks":"1",
 						"stores":[{"code":"PF","description":"Pets Family"}]}&
 			admin={		"email":"chris.chonglim@gmail.com","firstName":"Chris","middleName":"","lastName":"Lim","payrate":"0","position":"1",
 						"claimTaxFreeThreshold":"0"}
		*/
		// add data to FormDate object
		data.append('mode', 'new_company');
		data.append('company', JSON.stringify(company_data));
		data.append('admin', JSON.stringify(admin_data));
		console.log(JSON.stringify(company_data) + "\n" + JSON.stringify(admin_data));
		xhr.send(data);
	});

	stores = [];
	$('#reg_stores').on('keyup',function(){
		stores = [];
		strStores = $(this).val().toString();
		stores = strStores.split(",");
		for (var i = stores.length - 1; i >= 0; i--) {
			stores[i] = stores[i].trim();
			var numOccurences = $.grep(stores, function (elem) {
				return elem.toLowerCase() === stores[i].toLowerCase();
			}).length;
			if(stores[i] === "" || numOccurences > 1)
				stores.splice(i,1);
		};
		$().resetStoresList();
		//console.log(stores);
		strStores = stores.toString().replace(/\,/g,', ');
		//console.log(strStores);
	});

});

$.fn.validateForm = function(){
	var email = $('#reg_email').val().trim();
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(email === "" || !emailReg.test(email)){
		$("#error-message").html("Enter valid email");
		$('#reg_email').focus();
		return false;
	}

	var firstName = $('#reg_firstname').val().trim();
	if(firstName === ""){
		$("#error-message").html("Enter firstname");
		$('#reg_firstname').focus();
		return false;
	}

	var lastName = $('#reg_lastname').val().trim();
	if(lastName === ""){
		$("#error-message").html("Enter lastname");
		$('#reg_lastname').focus();
		return false;
	}
	
	var companyName = $('#reg_company_name').val().trim();
	if(companyName === ""){
		$("#error-message").html("Enter company name");
		$('#reg_company_name').focus();
		return false;
	}
	var companyABN = $('#reg_abn').val().trim();
	if(companyABN === ""){
		$("#error-message").html("Enter company ABN");
		$('#reg_abn').focus();
		return false;
	}
	if($( "#reg_timezone option:checked" ).index() == 0){
		$("#error-message").html("Select your timezone");
		return false;
	}

	if(stores.length == 0){
		$("#error-message").html("Add at least one store");
		return false;
	}
	return true;
}

$.fn.resetStoresList = function(){
	listHTML = '';
	if(stores.length == 0){
		$('.help-message').css('display','none');
	}else{
		$('.help-message').css('display','block');
	}
	for(var i = 0; i <stores.length; i++){
		listHTML += '<li><div class="del-store"/></div>' + stores[i] + '</li>';
	}
	$('#store-list').html(listHTML);
	$('.del-store').on('click',function(){
		console.log('deleting');
		stores.splice($(this).parent().index(),1);
		strStores = stores.toString().replace(/\,/g,', ');
		$('#reg_stores').val(strStores);
		$().resetStoresList();
	});
}


$.fn.onAddCompanyResponse = function(response) {
	data = jQuery.parseJSON(response.trim());
	if(!data){
		console.log(ERR_SERVER);
		return;
	}
	if(data.status != M_SUCCESS){
		console.log(ERR_SERVER);
		return;
	}
	if(data.sm != M_NO){
		console.log(MSG_SERVER_MAINTENANCE);
		return;
	}
	
	loginData = data.login_response;
	if(loginData.status == M_SUCCESS){
		// Display a message
		
		window.close();
	}
};