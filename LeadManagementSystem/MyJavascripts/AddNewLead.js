var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
var onlyText = /^[a-zA-Z0-9\s-]*$/;
var email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var onlyCharacters = /^[A-Za-z\s]*$/;
var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/ //For number

var button = document.getElementById("nevigateToClientDetails");
if (button.textContent.trim() === "Client Details") {
	document.querySelector(".tooltip-text").classList.add("hidden");
}
var button = document.getElementById("nevigateToContactDetails");
if (button.textContent.trim() === "Contact Details") {
	document.querySelector(".tooltip-text").classList.add("hidden");
}
var button = document.getElementById("nevigateToProjectDetails");
if (button.textContent.trim() === "Project Details") {
	document.querySelector(".tooltip-text").classList.add("hidden");
}

var FrontImgOfCardFile = '';
const fileInputforFrontImg = document.getElementById('FrontImgOfCard');
var LeadId = '';
fileInputforFrontImg.onchange = () => {
	FrontImgOfCardFile = fileInputforFrontImg.files[0];
}
var BackImgOfCardFile = '';
const fileInput = document.getElementById('BackImgOfCard');
fileInput.onchange = () => {
	BackImgOfCardFile = fileInput.files[0];
}
var IsFinal = 0;
$("#TxtFilterDate").change(function () {
	debugger;
	var filterDateValue = $("#TxtFilterDate").val();
	if (filterDateValue != '') {
		alert("The text has been changed");
	}

});
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formattedToday = yyyy + '-' + mm + '-' + dd;

function IsValidDate(scheduleDate) {
	debugger;
	if (scheduleDate != "") {
		const date = scheduleDate;
		var newdate = date.split("/").reverse().join("-");
		console.log(newdate)
		const schedule_Date = new Date(newdate);
		const Current_date = new Date(formattedToday);

		const schedule_Date_ = schedule_Date.toISOString().split('T')[0];
		const Current_date_ = Current_date.toISOString().split('T')[0];

		if (schedule_Date_ < Current_date_) {
			alert("Select current or upcoming date");
			$('#TxtScheduleDate').val('');
			return false;
		}
		else {
			$('#TxtScheduleTime').focus();
		}
	}

}

function enableReference(value) {
	debugger;
	if (value == "Reference") {
		$('#TxtReference').prop('disabled', false);
		$('#TxtReference').prop('placeholder', 'Enter Reference');
	}
	else {
		$('#TxtReference').prop('disabled', true);
		$('#TxtReference').prop('placeholder', '');
	}
}
function changeTypeOfLead(id) {
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/GetTypeOfLeadList',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtTypeOfLead').find('option').remove().end();
				$('#TxtTypeOfLead').append(`<option selected="" value="">--Select Type Of Lead--</option>`);
				$.each(return_Data.TypeOfLeadList, function (i, obj) {
					$('#TxtTypeOfLead').append(`<option value="${obj.TypeOfLead_ID}">${obj.TypeOfLead}</option>`);
				});

			}

		}
	});

}
function changePlanPrice(id) {
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/GetPlanPrice',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtTypeOfLead').find('option').remove().end();
				$('#TxtPlanPrice').val(return_Data.Plan_Price);
			}

		}
	});

}
function removeFrontFile() {
	debugger;
	$('#FrontFileStatus').text('');
	$("#removeFrontFileIcon").css('display', 'none');
	$('#FrontImgOfCard').val('');

}
function removeBackFile() {
	debugger;
	$('#BackFileStatus').text('');
	$("#removeBackFileIcon").css('display', 'none');
	$('#BackImgOfCard').val('');
}
function UpdateFinal(id) {
	debugger;
	var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/ //For number
	var CompanyName = $("#TxtCompanyName").val().trim();
	var ClientName = $("#TxtClientName").val().trim();
	var Category = $("#TxtCategory").val();
	var TypeOfLead = $("#TxtTypeOfLead").val();
	var ProductName = $("#TxtProductName").val();
	var Source = $("#TxtSource").val();
	var Reference = $("#TxtReference").val();
	var LeadSource = $("#TxtLeadSource").val();
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();

	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();
	var AlternateAddress = $('#TxtAlternateAddress').val();
	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();
	var PathOfImg = $('#FrontImgOfCard').val();
	var PathOfBackImg = $('#BackImgOfCard').val();
	var ProjectType = $('#TxtProjectType').val();

	var FrontFileStatus = $('#FrontFileStatus').text();
	var BackFileStatus = $('#BackFileStatus').text();

	var cardimgdetails = CardImages;
	var file_name = "";

	var FrontImgOfCardPath = "";
	var FrontImgFileName = "";
	var FrontImgBase64 = "";
	var FrontImgFileType = "";
	var BackImgOfCardPath = "";
	var BackImgFileName = "";
	var BackImgBase64 = "";
	var BackImgFileType = "";


	if (PathOfImg != "") {

		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
		}


	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name');
		$('#TxtCompanyName').focus();
		alert("Select Company Name");
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ErrorForClientName').html('Enter Client Name');
		$('#ErrorForClientName').css('color', 'red');
		$('#TxtClientName').focus();
		alert("Enter Client Name");
		return;
	}
	else if (Category == "") {
		$('.help-block').html('');
		$('#CategoryDIV').addClass('has-error');
		$('#ErrorForCategory').html('Select Priority');
		$('#TxtCategory').focus();
		alert("Select Priority");
		return;
	}
	else if (ProjectType == "") {
		$('.help-block').html('');
		$('#ProjectTypeDIV').addClass('has-error');
		$('#ErrorForProjectType').html('Select Category');
		$('#TxtProjectType').focus();
		alert("Select Category");
		return;
	}
	else if (TypeOfLead == "") {
		$('.help-block').html('');
		$('#TypeOfLeadDIV').addClass('has-error');
		$('#ErrorForTypeOfLead').html('Select Sub Category');
		$('#TxtTypeOfLead').focus();
		alert("Select Sub Category");
		return;
	}
	else if (ProductName == "") {
		$('.help-block').html('');
		$('#ProductNameDIV').addClass('has-error');
		$('#ErrorForProductName').html('Enter Product Name');
		$('#TxtProductName').focus();
		alert("Enter Product Name");
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name');
		$('#TxtSource').focus();
		alert("Select Owner Name");
		return;
	}
	else if (LeadSource == "") {
		$('.help-block').html('');
		$('#LeadSourceDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Select Lead Source Name');
		$('#TxtLeadSource').focus();
		alert("Select Lead Source Name");
		return;
	}
	else if (Reference == "") {
		$('.help-block').html('');
		$('#ReferenceDIV').addClass('has-error');
		$('#ErrorForReference').html('Enter Reference');
		$('#TxtReference').focus();
		alert("Enter Reference");
		return;
	}
	else if (PathOfImg == "") {
		$('.help-block').html('');
		$('#FrontImgOfCardDIV').addClass('has-error');
		$('#ErrorForFrontImgOfCard').html('Select front image for the card');
		$('#FrontImgOfCard').focus();
		alert("Select front image for the card");
		return;
	}
	else if (PathOfBackImg == "") {
		$('.help-block').html('');
		$('#BackImgOfCardDIV').addClass('has-error');
		$('#ErrorForBackImgOfCard').html('Select back image for the card');
		$('#BackImgOfCard').focus();
		alert("Select back image for the card");
		return;
	}

	else if (SpokesName == "") {
		$('.help-block').html('');
		$('#SpokesNameDIV').addClass('has-error');
		$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
		$('#TxtSpokesName').focus();
		alert("Enter Spokes Person 1 Name");
		return;
	}
	else if (SpokesName != "") {
		if (!onlyCharacters.test(SpokesName)) {
			$('.help-block').html('');
			$('#SpokesNameDIV').addClass('has-error');
			$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
			$('#TxtSpokesName').focus();
			alert("Enter valid Spokes Person 1 Name");
			return;
		}
	}
	else if (AlternateSpokesName != "") {
		if (!onlyCharacters.test(AlternateSpokesName)) {
			$('.help-block').html('');
			$('#AlternateSpokesNameDIV').addClass('has-error');
			$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
			$('#TxtAlternateSpokesName').focus();
			alert("Enter valid Spokes Person 2 Name");
			return;
		}
	}
	else if (SpokesMobileNumber == "") {
		$('.help-block').html('');
		$('#SpokesMobileDIV').addClass('has-error');
		$('#ErrorForSpokesMobile').html('Enter Spokes Person 1 Mobile Number');
		$('#TxtSpokesMobile').focus();
		alert("Enter Spokes Person 1 Mobile Number");
		return;
	}
	else if (SpokesMobileNumber != "") {
		if (!mob_regex.test(SpokesMobileNumber)) {
			$('.help-block').html('');
			$('#SpokesMobileDIV').addClass('has-error');
			$('#ErrorForSpokesMobile').html('Enter valid Mobile Number');
			$('#TxtSpokesMobile').focus();
			alert("Enter valid Mobile Number");
			return;
		}
	}
	else if (SpokesEmailAddress == "") {
		$('.help-block').html('');
		$('#SpokesEmailDIV').addClass('has-error');
		$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
		$('#TxtSpokesEmailAddress').focus();
		alert("Enter Spokes Person 1 Email Address");
		return;
	}
	else if (SpokesEmailAddress != "") {
		if (!email.test(SpokesEmailAddress)) {
			$('.help-block').html('');
			$('#SpokesEmailDIV').addClass('has-error');
			$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
			$('#TxtSpokesEmailAddress').focus();
			alert("Enter Spokes Person 1 Email Address");
			return;
		}
	}
	else if (SpokesAddress == "") {
		$('.help-block').html('');
		$('#AddressDIV').addClass('has-error');
		$('#ErrorForAddress').html('Enter Spokes Person 1 Address');
		$('#TxtAddress').focus();
		alert("Enter Spokes Person 1 Address");
		return;
	}
	else if (AlternateSpokesName == "") {
		$('.help-block').html('');
		$('#AlternateSpokesNameDIV').addClass('has-error');
		$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
		$('#TxtAlternateSpokesName').focus();
		alert("Enter Spokes Person 2 Name");
		return;
	}
	else if (AlternateSpokesName != "") {
		if (!onlyCharacters.test(AlternateSpokesName)) {
			$('.help-block').html('');
			$('#AlternateSpokesNameDIV').addClass('has-error');
			$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
			$('#TxtAlternateSpokesName').focus();
			alert("Enter valid Spokes Person 2 Name");
			return;
		}
	}
	else if (AlternateSpokesMobile == "") {
		$('.help-block').html('');
		$('#AlternateMobileDIV').addClass('has-error');
		$('#ErrorForAlternateMobile').html('Enter Spokes Person 2 Mobile Number');
		$('#TxtAlternateMobile').focus();
		alert("Enter Spokes Person 2 Mobile Number");
		return;
	}
	else if (AlternateSpokesMobile != "") {
		if (!mob_regex.test(AlternateSpokesMobile)) {
			$('.help-block').html('');
			$('#AlternateMobileDIV').addClass('has-error');
			$('#ErrorForAlternateMobile').html('Enter Spokes Person 2 Mobile Number');
			$('#TxtAlternateMobile').focus();
			alert("Enter valid Spokes Person Mobile Number");
			return;
		}
	}
	else if (AlternateEmailAddress == "") {
		$('.help-block').html('');
		$('#AlternateEmailDIV').addClass('has-error');
		$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
		$('#TxtAlternateEmailAddress').focus();
		alert("Enter Spokes Person 2 Email Address");
		return;
	}
	else if (AlternateEmailAddress != "") {
		if (!email.test(AlternateEmailAddress)) {
			$('.help-block').html('');
			$('#AlternateEmailDIV').addClass('has-error');
			$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
			$('#TxtAlternateEmailAddress').focus();
			alert("Enter Spokes Person 2 Email Address");
			return;
		}
	}
	else if (PlanName == "") {
		$('.help-block').html('');
		$('#PlanDIV').addClass('has-error');
		$('#ErrorForPlan').html('Select Plan Name');
		$('#TxtPlan').focus();
		alert("Select Plan Name");
		return;
	}
	else if (PlanPrice == "") {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter Price Of Plan');
		$('#TxtPlanPrice').focus();
		alert("Enter Price Of Plan");
		return;
	}
	else if (PlanPrice == "0") {
		alert(
			"Enter valid price");
		return;
	}
	else if (StatusType == "") {
		$('.help-block').html('');
		$('#ChangeStatusDIV').addClass('has-error');
		$('#ErrorForChangeStatus').html('Select Lead Status');
		$('#TxtStatusType').focus();
		alert("Select Lead Status");
		return;
	}
	else if (AssignTo == "") {
		$('.help-block').html('');
		$('#AssignLeadDIV').addClass('has-error');
		$('#ErrorForSelectPerson').html('Select Assignee Name');
		$('#TxtPerson').focus();
		alert("Select Assignee Name");
		return;
	}
	else if (ScheduleDate == "") {
		$('.help-block').html('');
		$('#ScheduleDateDiv').addClass('has-error');
		$('#ErrorForScheduledate').html('Select Schedule Date');
		$('#TxtScheduleDate').focus();
		alert("Select Schedule Date");
		return;
	}
	else if (ScheduleTime == "") {
		$('.help-block').html('');
		$('#ScheduleTimeDIV').addClass('has-error');
		$('#ErrorForScheduleTime').html('Select Schedule Time');
		$('#TxtScheduleTime').focus();
		alert("Select Schedule Time");
		return;
	}
	var formdata = new FormData();
	formdata.append("LeadId", id);
	formdata.append("CompanyName", CompanyName);
	formdata.append("ClientName", ClientName);
	formdata.append("Category", Category);
	formdata.append("TypeOfLead", TypeOfLead);
	formdata.append("ProductName", ProductName);
	formdata.append("Source", Source);
	formdata.append("Reference", Reference);
	formdata.append("LeadSource", LeadSource);
	formdata.append("SpokesName", SpokesName);
	formdata.append("SpokesMobileNumber", SpokesMobileNumber);
	formdata.append("SpokesEmailAddress", SpokesEmailAddress);
	formdata.append("SpokesAddress", SpokesAddress);
	formdata.append("AlternateSpokesName", AlternateSpokesName);
	formdata.append("AlternateSpokesMobile", AlternateSpokesMobile);
	formdata.append("AlternateEmailAddress", AlternateEmailAddress);
	formdata.append("PlanName", PlanName);
	formdata.append("PlanPrice", PlanPrice);
	formdata.append("StatusType", StatusType);
	formdata.append("AssignTo", AssignTo);
	formdata.append("ScheduleDate", ScheduleDate);
	formdata.append("ScheduleTime", ScheduleTime);
	formdata.append("ProjectType", ProjectType);
	formdata.append("FrontFileStatus", FrontFileStatus);
	formdata.append("BackFileStatus", BackFileStatus);
	formdata.append("IsFinal", 1);
	$.each(CardImages, function (i, obj) {
		debugger;
		if (obj.ImgType == 'front') {
			$('#FrontFileStatus').attr('href', obj.ImagePath);
			$('#FrontFileStatus').attr('target', '_blank');
			$('#FrontFileStatus').text(obj.Filename);


			FrontImgFileName = obj.Filename;
			FrontImgBase64 = obj.Base64;
			FrontImgFileType = obj.FileType;
		}
		else if (obj.ImgType == 'back') {
			$('#BackFileStatus').attr('href', obj.ImagePath);
			$('#BackFileStatus').attr('target', '_blank');
			$('#BackFileStatus').text(obj.Filename);


			BackImgFileName = obj.Filename;
			BackImgBase64 = obj.Base64;
			BackImgFileType = obj.FileType;
		}
	});
	formdata.append("FrontImgOfCardPath", "");
	formdata.append("FrontImgFileName", FrontImgFileName);
	formdata.append("FrontImgBase64", FrontImgBase64);
	formdata.append("FrontImgFileType", FrontImgFileType);

	formdata.append("BackImgOfCardPath", "");
	formdata.append("BackImgFileName", BackImgFileName);
	formdata.append("BackImgBase64", BackImgBase64);
	formdata.append("BackImgFileType", BackImgFileType);


	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + '/LeadManagement/UpdateFinalLead',
		data: formdata,
		processData: false,
		contentType: false,
		success: function (return_Data) {
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');
				refreshDataTable();
				window.location.href = "/Dashboard/Index";
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function UpdateLead(id, btnId) {
	debugger;
	
	var CompanyName = $("#TxtCompanyName").val().trim();
	var ClientName = $("#TxtClientName").val().trim();
	var Category = $("#TxtCategory").val();
	var TypeOfLead = $("#TxtTypeOfLead").val();
	var ProductName = $("#TxtProductName").val();
	var Source = $("#TxtSource").val();
	var Reference = $("#TxtReference").val();
	var LeadSource = $("#TxtLeadSource").val();
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();
	var AlternateAddress = $('#TxtAlternateAddress').val();
	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();
	var PathOfImg = $('#FrontImgOfCard').val();
	var PathOfBackImg = $('#BackImgOfCard').val();
	var ProjectType = $('#TxtProjectType').val();

	var FrontFileStatus = $('#FrontFileStatus').text();
	var BackFileStatus = $('#BackFileStatus').text();

	var cardimgdetails = CardImages;
	var file_name = "";

	var FrontImgOfCardPath = "";
	var FrontImgFileName = "";
	var FrontImgBase64 = "";
	var FrontImgFileType = "";
	var BackImgOfCardPath = "";
	var BackImgFileName = "";
	var BackImgBase64 = "";
	var BackImgFileType = "";
	if (PathOfImg != "") {
		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (PathOfBackImg != "") {
		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (SpokesName != "") {
		if (!onlyCharacters.test(SpokesName)) {
			$('.help-block').html('');
			$('#SpokesNameDIV').addClass('has-error');
			$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
			$('#TxtSpokesName').focus();
			alert("Enter valid Spokes Person 1 Name");
			return;
		}
	}
	if (SpokesMobileNumber != "") {
		if (!mob_regex.test(SpokesMobileNumber)) {
			$('.help-block').html('');
			$('#SpokesMobileDIV').addClass('has-error');
			$('#ErrorForSpokesMobile').html('Enter valid spokes person mobile number');
			$('#TxtSpokesMobile').focus();
			alert("Enter valid spokes person mobile number");
			return;
		}
	}
	if (SpokesEmailAddress != "") {
		if (!email.test(SpokesEmailAddress)) {
			$('.help-block').html('');
			$('#SpokesEmailDIV').addClass('has-error');
			$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
			$('#TxtSpokesEmailAddress').focus();
			alert("Enter Spokes Person 1 Email Address");
			return;
		}
	}
	if (AlternateSpokesName != "") {
		if (!onlyCharacters.test(AlternateSpokesName)) {
			$('.help-block').html('');
			$('#AlternateSpokesNameDIV').addClass('has-error');
			$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
			$('#TxtAlternateSpokesName').focus();
			alert("Enter valid Spokes Person 2 Name");
			return;
		}
	}
	if (AlternateSpokesMobile != "") {
		if (!mob_regex.test(AlternateSpokesMobile)) {
			$('.help-block').html('');
			$('#AlternateMobileDIV').addClass('has-error');
			$('#ErrorForAlternateMobile').html('Enter valid spokes person Mobile Number');
			$('#TxtAlternateMobile').focus();
			alert("Enter valid spokes person Mobile Number");
			return;
		}
	}
	if (AlternateEmailAddress != "") {
		if (!email.test(AlternateEmailAddress)) {
			$('.help-block').html('');
			$('#AlternateEmailDIV').addClass('has-error');
			$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
			$('#TxtAlternateEmailAddress').focus();
			alert("Enter Spokes Person 2 Email Address");
			return;
		}
	}
	var formdata = new FormData();
	formdata.append("LeadId", id);
	formdata.append("CompanyName", CompanyName);
	formdata.append("ClientName", ClientName);
	formdata.append("Category", Category);
	formdata.append("TypeOfLead", TypeOfLead);
	formdata.append("ProductName", ProductName);
	formdata.append("Source", Source);
	formdata.append("Reference", Reference);
	formdata.append("LeadSource", LeadSource);
	formdata.append("SpokesName", SpokesName);
	formdata.append("SpokesMobileNumber", SpokesMobileNumber);
	formdata.append("SpokesEmailAddress", SpokesEmailAddress);
	formdata.append("SpokesAddress", SpokesAddress);
	formdata.append("AlternateSpokesName", AlternateSpokesName);
	formdata.append("AlternateSpokesMobile", AlternateSpokesMobile);
	formdata.append("AlternateEmailAddress", AlternateEmailAddress);
	formdata.append("AlternateSpokesAddress", AlternateAddress);
	formdata.append("PlanName", PlanName);
	formdata.append("PlanPrice", PlanPrice);
	formdata.append("StatusType", StatusType);
	formdata.append("AssignTo", AssignTo);
	formdata.append("ScheduleDate", ScheduleDate);
	formdata.append("ScheduleTime", ScheduleTime);
	formdata.append("ProjectType", ProjectType);
	formdata.append("FrontFileStatus", FrontFileStatus);
	formdata.append("BackFileStatus", BackFileStatus);
	formdata.append("IsFinal", 0);
	$.each(CardImages, function (i, obj) {
		debugger;
		if (obj.ImgType == 'front') {
			$('#FrontFileStatus').attr('href', obj.ImagePath);
			$('#FrontFileStatus').attr('target', '_blank');
			$('#FrontFileStatus').text(obj.Filename);


			FrontImgFileName = obj.Filename;
			FrontImgBase64 = obj.Base64;
			FrontImgFileType = obj.FileType;
		}
		else if (obj.ImgType == 'back') {
			$('#BackFileStatus').attr('href', obj.ImagePath);
			$('#BackFileStatus').attr('target', '_blank');
			$('#BackFileStatus').text(obj.Filename);


			BackImgFileName = obj.Filename;
			BackImgBase64 = obj.Base64;
			BackImgFileType = obj.FileType;
		}
	});
	formdata.append("FrontImgOfCardPath", "");
	formdata.append("FrontImgFileName", FrontImgFileName);
	formdata.append("FrontImgBase64", FrontImgBase64);
	formdata.append("FrontImgFileType", FrontImgFileType);

	formdata.append("BackImgOfCardPath", "");
	formdata.append("BackImgFileName", BackImgFileName);
	formdata.append("BackImgBase64", BackImgBase64);
	formdata.append("BackImgFileType", BackImgFileType);


	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + '/LeadManagement/UpdateLead',
		data: formdata,
		processData: false,
		contentType: false,
		success: function (return_Data) {
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');
				refreshDataTable();
				if (btnId == "btnDraft2") {
					nevigateToProjectDetails();
				}
				else if (btnId == "btnDraft") {
					nevigateToContactDetails();
				}
				else if (btnId == "btnDraft3") {
					window.location.href = "/LeadManagement/Index";
                }
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function ExitForm2() {
	$("#AddNewLeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");
	$("#LeadTable").css("display", "none");
}

function ExitForm3() {
	$("#AddNewLeadForm").css("display", "none");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "block");
	$("#LeadTable").css("display", "none");
}

function ShowAddLeadForm() {
	$('#btnDownloadReport').css('display', 'none');
	$("#AddNewLeadForm").css("display", "block");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Add Lead');
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');
	//$("#btnSave").show();
	$("#btnDraft").show();
	$("#btnreset").show();
	//$("#btnSave").text('Add');
	$("#btnDraft").text('Save as Draft');
	$('#btnDraft').css("background-color", "#0096CF");
	$('#btnAddLead').css('display', 'none');
	$('#TxtFilterDate').css('display', 'none');
	$('#LeadIdRow').css('display', 'none');
	$('#StatusRow').css('display', 'none');
	$('#currentPage').text('Add Lead');
	$('#toLeadDetails').css('display', 'none');
}
function ShowForm() {

	$('#btnDownloadReport').css('display', 'none');

	$("#AddNewLeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");

	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Add Lead');
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');
	$("#btnDraft").show();
	$("#btnreset").show();
	$("#btnDraft").text('Save as Draft');
	$("#btnDraft").css("background-color", "#0096CF");
	$('#TxtFilterDate').css('display', 'none');
	$('#LeadIdRow').css('display', 'none');
	$('#StatusRow').css('display', 'none');
	$('#toLeadDetails').css('display', 'initial');
	$('#currentPage').text('Add Lead');
	ResetFormData();
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');
}

function Leadtable() {
	debugger;
	window.location.href = "/LeadManagement/Index";
	$("#AddNewLeadForm").css("display", "none");
	$("#LeadTable").css("display", "block");
	$("#boxTitle").text('');
	$('#btnAddLead').text('+ Add Lead');
	$('#btnDownloadReport').css('display', 'initial');
	$('#TxtFilterDate').css('display', 'initial');
	$('#toLeadDetails').css('display', 'none');
}
function ShowEditForm() {
	$('#modal-Detail').modal('toggle');
	$("#AddNewLeadForm").css("display", "block");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Edit Lead');
	$('#PageTitle').text('Edit Lead Details')
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');
	$("#btnDraft").show();
	$("#btnreset").show();
	$("#btnDraft").text('Update');
	$('#btnDownloadReport').css('display', 'none');
	$('#btnAddLead').css('display', 'none');
	$('#TxtFilterDate').css('display', 'none');
	$('#toLeadDetails').css('display', 'initial');
}
$(function () {
	$("#btnDownloadReport").click(function () {
		debugger;
		$("#TableLead").remove("#colAction").table2excel({
			exclude: "#colAction",
			filename: "Lead Records.xls"
		});
	});
});
var getFilename = function (str) {
	return str.substring(str.lastIndexOf('/') + 1);
}

$("#FrontImgOfCard").change(function () {
	debugger;
	$("#removeFrontFileIcon").css('display', 'initial');
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
	var value = $('#FrontImgOfCard').val();
	file_name = value.substring(value.lastIndexOf('\\') + 1);
	const preview = $('#FrontImgOfCard').val();
	const file = document.querySelector("input[type=file]").files[0];
	var filecount = document.querySelector("input[type=file]").files;
	var Base64OfFrontImg = "";
	const reader = new FileReader();
	if (filecount.length > 0) {
		reader.onloadend = function () {
			console.log(reader.result);
			base64 = reader.result
			preview.src = reader.result;
			var base64path = reader.result.split(',')[1];
			Base64OfFrontImg = base64;
			CardImages.push({ Base64: Base64OfFrontImg, Filename: file_name, ImagePath: '', ImgType: 'front', FileType: '' });

		};
		reader.readAsDataURL(FrontImgOfCardFile);
	}

	$("#FrontFileStatus").text(file_name);
});
$("#BackImgOfCard").change(function () {
	debugger;
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
	var value = $('#BackImgOfCard').val();
	backFile_name = value.substring(value.lastIndexOf('\\') + 1);

	$("#removeBackFileIcon").css('display', 'initial');

	const preview = $('#BackImgOfCard').val();
	const file = document.querySelector("input[type=file]").files[0];
	var filecount = document.querySelector("input[type=file]").files;
	var Base64OfFrontImg = "";
	const reader = new FileReader();
	reader.onloadend = function () {
		debugger;
		console.log(reader.result);
		base64 = reader.result
		preview.src = reader.result;
		var base64path = reader.result.split(',')[1];
		Base64OfFrontImg = base64;
		CardImages.push({ Base64: Base64OfFrontImg, Filename: backFile_name, ImagePath: '', ImgType: 'back', FileType: '' });

	};
	reader.readAsDataURL(BackImgOfCardFile);


	$("#BackFileStatus").text(backFile_name);
});
var CardImages = [];
function SaveFinalFormData() {
	debugger;
	var CompanyName = $("#TxtCompanyName").val().trim();
	var ClientName = $("#TxtClientName").val().trim();
	var Category = $("#TxtCategory").val();
	var TypeOfLead = $("#TxtTypeOfLead").val();
	var ProductName = $("#TxtProductName").val();
	if ($("#TxtSource").val() == "null") {
		var Source = "";
	}
	else {
		var Source = $("#TxtSource").val();
	}
	var Reference = $("#TxtReference").val();
	var LeadSource = $("#TxtLeadSource").val();
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();
	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();
	var ProjectType = $('#TxtProjectType').val();
	var PathOfImg = $('#FrontImgOfCard').val();
	var cardimgdetails = CardImages;
	var PathOfBackImg = $('#BackImgOfCard').val();
	var FrontImgOfCardPath = "";
	var FrontImgFileName = "";
	var FrontImgBase64 = "";
	var FrontImgFileType = "";
	var BackImgOfCardPath = "";
	var BackImgFileName = "";
	var BackImgBase64 = "";
	var BackImgFileType = "";
	var AlternateAddress = $('#TxtAlternateAddress').val();

	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {
		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name');
		$('#TxtCompanyName').focus();
		alert("Select Company Name");
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ClientNameDIV').addClass('has-error');
		$('#ErrorForClientName').html('Enter Client Name');
		$('#TxtClientName').focus();
		alert("Enter Client Name");
		return;
	}
	else if (Category == "") {
		$('.help-block').html('');
		$('#CategoryDIV').addClass('has-error');
		$('#ErrorForCategory').html('Select Priority');
		$('#TxtCategory').focus();
		alert("Select Priority");
		return;
	}
	else if (ProjectType == "") {
		$('.help-block').html('');
		$('#ProjectTypeDIV').addClass('has-error');
		$('#ErrorForProjectType').html('Select Category');
		$('#TxtProjectType').focus();
		alert("Select Category");
		return;
	}
	else if (TypeOfLead == "") {
		$('.help-block').html('');
		$('#TypeOfLeadDIV').addClass('has-error');
		$('#ErrorForTypeOfLead').html('Select Sub Category');
		$('#TxtTypeOfLead').focus();
		alert("Select Sub Category");
		return;
	}
	else if (ProductName == "") {
		$('.help-block').html('');
		$('#ProductNameDIV').addClass('has-error');
		$('#ErrorForProductName').html('Enter Product Name');
		$('#TxtProductName').focus();
		alert("Enter Product Name");
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name');
		$('#TxtSource').focus();
		alert("Select Owner Name");
		return;
	}
	else if (LeadSource == "") {
		$('.help-block').html('');
		$('#LeadSourceDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Select Lead Source Name');
		$('#TxtLeadSource').focus();
		alert("Select Lead Source Name");
		return;
	}
	else if (Reference == "") {
		$('.help-block').html('');
		$('#ReferenceDIV').addClass('has-error');
		$('#ErrorForReference').html('Enter Reference');
		$('#TxtReference').focus();
		alert("Enter Reference");
		return;
	}
	else if (PathOfImg == "") {
		$('.help-block').html('');
		$('#FrontImgOfCardDIV').addClass('has-error');
		$('#ErrorForFrontImgOfCard').html('Select front image for the card');
		$('#FrontImgOfCard').focus();
		alert("Select front image for the card");
		return;
	}
	else if (PathOfBackImg == "") {
		$('.help-block').html('');
		$('#BackImgOfCardDIV').addClass('has-error');
		$('#ErrorForBackImgOfCard').html('Select back image for the card');
		$('#BackImgOfCard').focus();
		alert("Select back image for the card");
		return;
	}
	
	else if (SpokesName == "") {
		$('.help-block').html('');
		$('#SpokesNameDIV').addClass('has-error');
		$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
		$('#TxtSpokesName').focus();
		alert("Enter Spokes Person 1 Name");
		return;
	}
	else if (SpokesName != "") {
		if (!onlyCharacters.test(SpokesName)) {
			$('.help-block').html('');
			$('#SpokesNameDIV').addClass('has-error');
			$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
			$('#TxtSpokesName').focus();
			alert("Enter valid Spokes Person 1 Name");
			return;
		}
	}
	else if (SpokesMobileNumber == "") {
		$('.help-block').html('');
		$('#SpokesMobileDIV').addClass('has-error');
		$('#ErrorForSpokesMobile').html('Enter Spokes Person 1 Mobile Number');
		$('#TxtSpokesMobile').focus();
		alert("Enter Spokes Person 1 Mobile Number");
		return;
	}
	else if (SpokesMobileNumber != "") {
		if (!mob_regex.test(SpokesMobileNumber)) {
			$('.help-block').html('');
			$('#SpokesMobileDIV').addClass('has-error');
			$('#ErrorForSpokesMobile').html('Enter valid spokes person mobile number');
			$('#TxtSpokesMobile').focus();
			alert("Enter valid spokes person mobile number");
			return;
		}
	}
	else if (SpokesEmailAddress == "") {
		$('.help-block').html('');
		$('#SpokesEmailDIV').addClass('has-error');
		$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
		$('#TxtSpokesEmailAddress').focus();
		alert("Enter Spokes Person 1 Email Address");
		return;
	}
	else if (SpokesEmailAddress != "") {
		if (!email.test(SpokesEmailAddress)) {
			$('.help-block').html('');
			$('#SpokesEmailDIV').addClass('has-error');
			$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
			$('#TxtSpokesEmailAddress').focus();
			alert("Enter Spokes Person 1 Email Address");
			return;
		}
	}
	else if (SpokesAddress == "") {
		$('.help-block').html('');
		$('#AddressDIV').addClass('has-error');
		$('#ErrorForAddress').html('Enter Spokes Person 1 Address');
		$('#TxtAddress').focus();
		alert("Enter Spokes Person 1 Address");
		return;
	}
	else if (AlternateSpokesName == "") {
		$('.help-block').html('');
		$('#AlternateSpokesNameDIV').addClass('has-error');
		$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
		$('#TxtAlternateSpokesName').focus();
		alert("Enter Spokes Person 2 Name");
		return;
	} else if (AlternateSpokesName != "") {
		if (!onlyCharacters.test(AlternateSpokesName)) {
			$('.help-block').html('');
			$('#AlternateSpokesNameDIV').addClass('has-error');
			$('#ErrorForAlternateSpokesName').html('Enter valid Spokes Person 2 Name');
			$('#TxtAlternateSpokesName').focus();
			alert("Enter valid Spokes Person 2 Name");
			return;
		}
	}
	else if (AlternateSpokesMobile == "") {
		$('.help-block').html('');
		$('#AlternateMobileDIV').addClass('has-error');
		$('#ErrorForAlternateMobile').html('Enter Spokes Person 2 Mobile Number');
		$('#TxtAlternateMobile').focus();
		alert("Eenter Spokes Person 2 Mobile Number");
		return;
	}
	else if (AlternateSpokesMobile != "") {
		if (!mob_regex.test(AlternateSpokesMobile)) {
			$('.help-block').html('');
			$('#AlternateMobileDIV').addClass('has-error');
			$('#ErrorForAlternateMobile').html('Enter Spokes Person 2 Mobile Number');
			$('#TxtAlternateMobile').focus();
			alert("Enter valid Spokes Person Mobile Number");
			return;
		}
	}
	else if (AlternateEmailAddress == "") {
		$('.help-block').html('');
		$('#AlternateEmailDIV').addClass('has-error');
		$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
		$('#TxtAlternateEmailAddress').focus();
		alert("Enter Spokes Person 2 Email Address");
		return;
	}
	else if (AlternateEmailAddress != "") {
		if (!email.test(AlternateEmailAddress)) {
			$('.help-block').html('');
			$('#AlternateEmailDIV').addClass('has-error');
			$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
			$('#TxtAlternateEmailAddress').focus();
			alert("Enter Spokes Person 2 Email Address");
			return;
		}
	}
	else if (AlternateAddress != "") {
		$('.help-block').html('');
		$('#AlternateAddressDIV').addClass('has-error');
		$('#ErrorForAlternateAddress').html('Enter valid spokes person Mobile Number');
		$('#TxtAlternateAddress').focus();
		return;
	}
	else if (PlanName == "") {
		$('.help-block').html('');
		$('#PlanDIV').addClass('has-error');
		$('#ErrorForPlan').html('Select Plan Name');
		$('#TxtPlan').focus();
		alert("Select Plan Name");
		return;
	}
	else if (PlanPrice == "") {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter Price Of Plan');
		$('#TxtPlanPrice').focus();
		alert("Enter Price Of Plan");
		return;
	}
	else if (PlanPrice == "0") {
		alert(
			"Enter valid price value");
		return;
	}
	else if (StatusType == "") {
		$('.help-block').html('');
		$('#ChangeStatusDIV').addClass('has-error');
		$('#ErrorForChangeStatus').html('Select Lead Status');
		$('#TxtStatusType').focus();
		alert("Select Lead Status");
		return;
	}
	else if (AssignTo == "") {
		$('.help-block').html('');
		$('#AssignLeadDIV').addClass('has-error');
		$('#ErrorForSelectPerson').html('Select Name to Assign a Lead');
		$('#TxtPerson').focus();
		alert("Select Name to Assign a Lead");
		return;
	}
	else if (ScheduleDate == "") {
		$('.help-block').html('');
		$('#ScheduleDateDiv').addClass('has-error');
		$('#ErrorForScheduledate').html('Select Schedule Date');
		$('#TxtScheduleDate').focus();
		alert("Select Schedule Date");
		return;
	}
	else if (ScheduleTime == "") {
		$('.help-block').html('');
		$('#ScheduleTimeDIV').addClass('has-error');
		$('#ErrorForScheduleTime').html('Select Schedule Time');
		$('#TxtScheduleTime').focus();
		alert("Select Schedule Time");
		return;
	}
	var formdata = new FormData();
	formdata.append("CompanyName", CompanyName);
	formdata.append("ClientName", ClientName);
	formdata.append("Category", Category);
	formdata.append("TypeOfLead", TypeOfLead);
	formdata.append("ProductName", ProductName);
	formdata.append("Source", Source);
	formdata.append("Reference", Reference);
	formdata.append("LeadSource", LeadSource);
	formdata.append("SpokesName", SpokesName);
	formdata.append("SpokesMobileNumber", SpokesMobileNumber);
	formdata.append("SpokesEmailAddress", SpokesEmailAddress);
	formdata.append("SpokesAddress", SpokesAddress);
	formdata.append("AlternateSpokesName", AlternateSpokesName);
	formdata.append("AlternateSpokesMobile", AlternateSpokesMobile);
	formdata.append("AlternateEmailAddress", AlternateEmailAddress);
	formdata.append("AlternateSpokesAddress", AlternateAddress);
	formdata.append("PlanName", PlanName);
	formdata.append("PlanPrice", PlanPrice);
	formdata.append("StatusType", StatusType);
	formdata.append("AssignTo", AssignTo);
	formdata.append("ScheduleDate", ScheduleDate);
	formdata.append("ScheduleTime", ScheduleTime);
	formdata.append("ProjectType", ProjectType);
	formdata.append("IsFinal", 1);

	$.each(CardImages, function (i, obj) {
		debugger;
		if (obj.ImgType == 'front') {
			$('#FrontFileStatus').attr('href', obj.ImagePath);
			$('#FrontFileStatus').attr('target', '_blank');
			$('#FrontFileStatus').text(obj.Filename);
			$("#removeFrontFileIcon").css('display', 'initial');
			FrontImgFileName = obj.Filename;
			FrontImgBase64 = obj.Base64;
			FrontImgFileType = obj.FileType;
		}
		else if (obj.ImgType == 'back') {
			$('#BackFileStatus').attr('href', obj.ImagePath);
			$('#BackFileStatus').attr('target', '_blank');
			$('#BackFileStatus').text(obj.Filename);
			$("#removeBackFileIcon").css('display', 'initial');
			BackImgFileName = obj.Filename;
			BackImgBase64 = obj.Base64;
			BackImgFileType = obj.FileType;
		}
	});
	formdata.append("FrontImgOfCardPath", "");
	formdata.append("FrontImgFileName", FrontImgFileName);
	formdata.append("FrontImgBase64", FrontImgBase64);
	formdata.append("FrontImgFileType", FrontImgFileType);
	formdata.append("BackImgOfCardPath", "");
	formdata.append("BackImgFileName", BackImgFileName);
	formdata.append("BackImgBase64", BackImgBase64);
	formdata.append("BackImgFileType", BackImgFileType);
	console.log(formdata);
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/AddLead',
		data: formdata,
		processData: false,
		contentType: false,
		beforeSend: function () {
			$('#btnDraft').attr('disabled', true);
		},
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				$('#btnDraft').removeAttr("disabled");
				$('#btnDraft').html('Save as Draft');
				$('#btnDraft').css("background-color", "#0096CF");
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');
				LeadId = return_Data.LeadId;
				window.location.href = "/LeadManagement/Index";
				refreshDataTable();
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable();
			}
		},
		complete: function () {
			$('#btnDraft').removeAttr("disabled");
			$('#btnDraft').html('Save as Draft');
			$('#btnDraft').css("background-color", "#0096CF");
		}
	});
}
function SaveFormData(id) {
	debugger;
	var CompanyName = $("#TxtCompanyName").val().trim();
	var ClientName = $("#TxtClientName").val().trim();
	var Category = $("#TxtCategory").val();
	var TypeOfLead = $("#TxtTypeOfLead").val();
	var ProductName = $("#TxtProductName").val();
	if ($("#TxtSource").val() == "null") {
		var Source = "";
	}
	else {
		var Source = $("#TxtSource").val();
	}
	var Reference = $("#TxtReference").val();
	var LeadSource = $("#TxtLeadSource").val();
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();
	var AlternateAddress = $('#TxtAlternateAddress').val();
	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();
	var ProjectType = $('#TxtProjectType').val();
	var PathOfImg = $('#FrontImgOfCard').val();
	var cardimgdetails = CardImages;
	var PathOfBackImg = $('#BackImgOfCard').val();
	var FrontImgOfCardPath = "";
	var FrontImgFileName = "";
	var FrontImgBase64 = "";
	var FrontImgFileType = "";
	var BackImgOfCardPath = "";
	var BackImgFileName = "";
	var BackImgBase64 = "";
	var BackImgFileType = "";
	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {
		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (PathOfBackImg != "") {
		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name');
		$('#TxtCompanyName').focus();
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ErrorForClientName').html('Enter Client Name');
		$('#ErrorForClientName').css('color', 'red');
		$('#TxtClientName').focus();
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name');
		$('#TxtSource').focus();
		return;
	}
	if (SpokesName != "") {
		if (!onlyCharacters.test(SpokesName)) {
			$('.help-block').html('');
			$('#SpokesNameDIV').addClass('has-error');
			$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
			$('#TxtSpokesName').focus();
			alert("Enter valid Spokes Person 1 Name");
			return;
		}
	}
	if (SpokesMobileNumber != "") {
		if (!mob_regex.test(SpokesMobileNumber)) {
			$('.help-block').html('');
			$('#SpokesMobileDIV').addClass('has-error');
			$('#ErrorForSpokesMobile').html('Enter valid spokes person mobile number');
			$('#TxtSpokesMobile').focus();
			alert("Enter valid spokes person mobile number");
			return;
		}
	}
	if (SpokesEmailAddress != "") {
		if (!email.test(SpokesEmailAddress)) {
			$('.help-block').html('');
			$('#SpokesEmailDIV').addClass('has-error');
			$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
			$('#TxtSpokesEmailAddress').focus();
			alert("Enter Spokes Person 1 Email Address");
			return;
		}
	}
	if (AlternateSpokesName != "") {
		if (!onlyCharacters.test(AlternateSpokesName)) {
			$('.help-block').html('');
			$('#AlternateSpokesNameDIV').addClass('has-error');
			$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
			$('#TxtAlternateSpokesName').focus();
			alert("Enter valid Spokes Person 2 Name");
			return;
		}
	}
	if (AlternateSpokesMobile != "") {
		if (!mob_regex.test(AlternateSpokesMobile)) {
			$('.help-block').html('');
			$('#AlternateMobileDIV').addClass('has-error');
			$('#ErrorForAlternateMobile').html('Enter valid spokes person Mobile Number');
			$('#TxtAlternateMobile').focus();
			alert("Enter valid spokes person Mobile Number");
			return;
		}
	}
	if (AlternateEmailAddress != "") {
		if (!email.test(AlternateEmailAddress)) {
			$('.help-block').html('');
			$('#AlternateEmailDIV').addClass('has-error');
			$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
			$('#TxtAlternateEmailAddress').focus();
			alert("Enter Spokes Person 2 Email Address");
			return;
		}
	}
	var formdata = new FormData();
	formdata.append("CompanyName", CompanyName);
	formdata.append("ClientName", ClientName);
	formdata.append("Category", Category);
	formdata.append("TypeOfLead", TypeOfLead);
	formdata.append("ProductName", ProductName);
	formdata.append("Source", Source);
	formdata.append("Reference", Reference);
	formdata.append("LeadSource", LeadSource);
	formdata.append("SpokesName", SpokesName);
	formdata.append("SpokesMobileNumber", SpokesMobileNumber);
	formdata.append("SpokesEmailAddress", SpokesEmailAddress);
	formdata.append("SpokesAddress", SpokesAddress);
	formdata.append("AlternateSpokesName", AlternateSpokesName);
	formdata.append("AlternateSpokesMobile", AlternateSpokesMobile);
	formdata.append("AlternateEmailAddress", AlternateEmailAddress);
	formdata.append("AlternateSpokesAddress", AlternateAddress);
	formdata.append("PlanName", PlanName);
	formdata.append("PlanPrice", PlanPrice);
	formdata.append("StatusType", StatusType);
	formdata.append("AssignTo", AssignTo);
	formdata.append("ScheduleDate", ScheduleDate);
	formdata.append("ScheduleTime", ScheduleTime);
	formdata.append("ProjectType", ProjectType);
	formdata.append("IsFinal", 0);

	$.each(CardImages, function (i, obj) {
		debugger;
		if (obj.ImgType == 'front') {
			$('#FrontFileStatus').attr('href', obj.ImagePath);
			$('#FrontFileStatus').attr('target', '_blank');
			$('#FrontFileStatus').text(obj.Filename);

			$("#removeFrontFileIcon").css('display', 'initial');

			FrontImgFileName = obj.Filename;
			FrontImgBase64 = obj.Base64;
			FrontImgFileType = obj.FileType;
		}
		else if (obj.ImgType == 'back') {
			$('#BackFileStatus').attr('href', obj.ImagePath);
			$('#BackFileStatus').attr('target', '_blank');
			$('#BackFileStatus').text(obj.Filename);

			$("#removeBackFileIcon").css('display', 'initial');

			BackImgFileName = obj.Filename;
			BackImgBase64 = obj.Base64;
			BackImgFileType = obj.FileType;
		}
	});
	formdata.append("FrontImgOfCardPath", "");
	formdata.append("FrontImgFileName", FrontImgFileName);
	formdata.append("FrontImgBase64", FrontImgBase64);
	formdata.append("FrontImgFileType", FrontImgFileType);

	formdata.append("BackImgOfCardPath", "");
	formdata.append("BackImgFileName", BackImgFileName);
	formdata.append("BackImgBase64", BackImgBase64);
	formdata.append("BackImgFileType", BackImgFileType);

	console.log(formdata);
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/AddLead',
		data: formdata,
		processData: false,
		contentType: false,
		beforeSend: function () {
			$('#btnDraft').attr('disabled', true);
		},
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				$('#btnDraft').removeAttr("disabled");
				$('#btnDraft').html('Save as Draft');
				$('#btnDraft').css("background-color", "#0096CF");
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');

				LeadId = return_Data.LeadId;
				if (id == "btnDraft") {
					nevigateToContactDetails();
				}
				else if (id == "btnDraft2") {
					nevigateToProjectDetails();
				}
				else if (id == "btnDraft3") {
					window.location.href = "/Dashboard/Index";
				}
				$('#btnDraft').attr('onclick', 'UpdateLead(' + "'" + return_Data.LeadId + "'" + ',' + "'btnDraft'" + ');');
				$('#btnDraft2').attr('onclick', 'UpdateLead(' + "'" + return_Data.LeadId + "'" + ',' + "'btnDraft2'" + ');');
				$('#btnDraft3').attr('onclick', 'UpdateLead(' + "'" + return_Data.LeadId + "'" + ',' + "'btnDraft3'" + ');');
				$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + return_Data.LeadId + "'" + ');');
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable();
			}
		},
		complete: function () {
			$('#btnDraft').removeAttr("disabled");
			$('#btnDraft').html('Save as Draft');
			$('#btnDraft').css("background-color", "#0096CF");
		}
	});
}
function nevigateToClientDetails() {
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();

	if (SpokesName != "" && SpokesMobileNumber != "" && SpokesEmailAddress != "" && SpokesAddress != "" && AlternateSpokesName != "" && AlternateSpokesMobile != "" && AlternateEmailAddress != "") {
		$("#nevigateToContactDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToContactDetails").css("border", "2px solid #3c8dbc");
	}

	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();

	if (PlanName != "" && PlanPrice != "" && StatusType != "" && AssignTo != "" && ScheduleDate != "" && ScheduleTime != "") {
		$("#nevigateToProjectDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToProjectDetails").css("border", "2px solid #3c8dbc");
	}

	document.querySelector("#client-tooltip-text").classList.add("hidden");
	document.querySelector("#contact-tooltip-text").classList.remove("hidden");
	document.querySelector("#project-tooltip-text").classList.remove("hidden");

	$("#AddNewLeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");

	$("#boxTitle").text('Client Details');
	$("#nevigateToClientDetails").text('Client Details');
	$("#nevigateToContactDetails").text('2');
	$("#nevigateToProjectDetails").text('3');
	$("#nevigateToClientDetails").css("border", "2px solid #3c8dbc");

	var nevigateToClientDetails = document.getElementById("nevigateToClientDetails");
	var nevigateToContactDetails = document.getElementById("nevigateToContactDetails");
	var nevigateToProjectDetails = document.getElementById("nevigateToProjectDetails");
	nevigateToClientDetails.classList.remove("NevigateBtn");
	nevigateToClientDetails.classList.add("NevigateActiveBtn");
	nevigateToContactDetails.classList.remove("NevigateActiveBtn");
	nevigateToContactDetails.classList.add("NevigateBtn");
	nevigateToProjectDetails.classList.remove("NevigateActiveBtn");
	nevigateToProjectDetails.classList.add("NevigateBtn");

	$("#nevigateToClientDetailsDiv").css("width", "12%");
	$("#nevigateToContactDetailsDiv").css("width", "5%");
	$("#nevigateToProjectDetailsDiv").css("width", "5%");

	if (LeadId != "") {
		$('#btnDraft').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft'" + ');');
		$('#btnDraft2').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft2'" + ');');
		$('#btnDraft3').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft3'" + ');');
		$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + LeadId + "'" + ');');
	}
	else {
		$('#btnDraft2').attr('onclick', 'SaveFormData(' + "'btnDraft2'" + ');');
		$('#btnDraft3').attr('onclick', 'SaveFormData(' + "'btnDraft3'" + ');');
		$('#btnSave').attr('onclick', 'SaveFinalFormData();');
    }
}
function nevigateToContactDetails() {
	debugger;
	var CompanyName = $("#TxtCompanyName").val().trim();
	var ClientName = $("#TxtClientName").val().trim();
	var Category = $("#TxtCategory").val();
	var TypeOfLead = $("#TxtTypeOfLead").val();
	var ProductName = $("#TxtProductName").val();
	if ($("#TxtSource").val() == "null") {
		var Source = "";
	}
	else {
		var Source = $("#TxtSource").val();
	}
	var Reference = $("#TxtReference").val();
	var LeadSource = $("#TxtLeadSource").val();
	var ProjectType = $('#TxtProjectType').val();
	var PathOfImg = $('#FrontImgOfCard').val();
	var PathOfBackImg = $('#BackImgOfCard').val();

	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {

		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name');
		$('#TxtCompanyName').focus();
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ClientNameDIV').addClass('has-error');
		$('#ErrorForClientName').html('Enter Client Name');
		$('#ErrorForClientName').css('color', 'red');
		$('#TxtClientName').focus();
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name');
		$('#TxtSource').focus();
		return;
	}
	if (CompanyName != "" && ClientName != "" && Category != "" && Source != "" && TypeOfLead != "" && ProductName != "" && LeadSource != "" && Reference != "" && PathOfBackImg != "" && PathOfImg != "" && ProjectType != "") {
		$("#nevigateToClientDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToClientDetails").css("border", "2px solid #3c8dbc");
	}
	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();

	if (PlanName != "" && PlanPrice != "" && StatusType != "" && AssignTo != "" && ScheduleDate != "" && ScheduleTime != "") {
		$("#nevigateToProjectDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToProjectDetails").css("border", "2px solid #3c8dbc");
	}

	document.querySelector("#client-tooltip-text").classList.remove("hidden");
	document.querySelector("#contact-tooltip-text").classList.add("hidden");
	document.querySelector("#project-tooltip-text").classList.remove("hidden");

	$("#AddNewLeadForm").css("display", "none");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "block");
	$("#LeadTable").css("display", "none");

	$("#boxTitle").text('Contact Details');
	$("#nevigateToClientDetails").text('1');
	$("#nevigateToContactDetails").text('Contact Details');
	$("#nevigateToProjectDetails").text('3');
	$("#nevigateToContactDetails").css("border", "2px solid #3c8dbc");

	var nevigateToClientDetails = document.getElementById("nevigateToClientDetails");
	var nevigateToContactDetails = document.getElementById("nevigateToContactDetails");
	var nevigateToProjectDetails = document.getElementById("nevigateToProjectDetails");
	nevigateToClientDetails.classList.remove("NevigateActiveBtn");
	nevigateToClientDetails.classList.add("NevigateBtn");
	nevigateToContactDetails.classList.remove("NevigateBtn");
	nevigateToContactDetails.classList.add("NevigateActiveBtn");
	nevigateToProjectDetails.classList.remove("NevigateActiveBtn");
	nevigateToProjectDetails.classList.add("NevigateBtn");

	$("#nevigateToClientDetailsDiv").css("width", "5%");
	$("#nevigateToContactDetailsDiv").css("width", "12%");
	$("#nevigateToProjectDetailsDiv").css("width", "5%");

	if (LeadId != "") {
		$('#btnDraft').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft'" + ');');
		$('#btnDraft2').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft2'" + ');');
		$('#btnDraft3').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft3'" + ');');
		$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + LeadId + "'" + ');');
	}
	else {
		$('#btnDraft2').attr('onclick', 'SaveFormData(' + "'btnDraft2'" + ');');
		$('#btnDraft3').attr('onclick', 'SaveFormData(' + "'btnDraft3'" + ');');
		$('#btnSave').attr('onclick', 'SaveFinalFormData();');
	}
}
function nevigateToProjectDetails() {
	debugger;
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	var CompanyName = $("#TxtCompanyName").val().trim();
	var ClientName = $("#TxtClientName").val().trim();
	var Category = $("#TxtCategory").val();
	var TypeOfLead = $("#TxtTypeOfLead").val();
	var ProductName = $("#TxtProductName").val();
	var SpokesName = $("#TxtSpokesName").val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	if ($("#TxtSource").val() == "null") {
		var Source = "";
	}
	else {
		var Source = $("#TxtSource").val();
	}
	var Reference = $("#TxtReference").val();
	var LeadSource = $("#TxtLeadSource").val();
	var ProjectType = $('#TxtProjectType').val();
	var PathOfImg = $('#FrontImgOfCard').val();
	var PathOfBackImg = $('#BackImgOfCard').val();

	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {

		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name');
		$('#TxtCompanyName').focus();
		return;
	}
	if (ClientName == "") {
		$('.help-block').html('');
		$('#ErrorForClientName').html('Enter Client Name');
		$('#ErrorForClientName').css('color', 'red');
		$('#TxtClientName').focus();
		return;
	}
	if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name');
		$('#TxtSource').focus();
		return;
	}
	if (SpokesName != "") {
		if (!onlyCharacters.test(SpokesName)) {
			$('.help-block').html('');
			$('#SpokesNameDIV').addClass('has-error');
			$('#ErrorForSpokesName').html('Enter Spokes Person 1 Name');
			$('#TxtSpokesName').focus();
			return;
		}
	}
	if (SpokesMobileNumber != "") {
		if (!mob_regex.test(SpokesMobileNumber)) {
			$('.help-block').html('');
			$('#SpokesMobileDIV').addClass('has-error');
			$('#ErrorForSpokesMobile').html('Enter valid spokes person mobile number');
			$('#TxtSpokesMobile').focus();
			return;
		}
	}
	if (SpokesEmailAddress != "") {
		if (!email.test(SpokesEmailAddress)) {
			$('.help-block').html('');
			$('#SpokesEmailDIV').addClass('has-error');
			$('#ErrorForSpokesEmail').html('Enter Spokes Person 1 Email Address');
			$('#TxtSpokesEmailAddress').focus();
			return;
		}
	}
	if (AlternateSpokesName != "") {
		if (!onlyCharacters.test(AlternateSpokesName)) {
			$('.help-block').html('');
			$('#AlternateSpokesNameDIV').addClass('has-error');
			$('#ErrorForAlternateSpokesName').html('Enter Spokes Person 2 Name');
			$('#TxtAlternateSpokesName').focus();
			return;
		}
	}
	if (AlternateSpokesMobile != "") {
		if (!mob_regex.test(AlternateSpokesMobile)) {
			$('.help-block').html('');
			$('#AlternateMobileDIV').addClass('has-error');
			$('#ErrorForAlternateMobile').html('Enter valid spokes person Mobile Number');
			$('#TxtAlternateMobile').focus();
			return;
		}
	}
	if (AlternateEmailAddress != "") {
		if (!email.test(AlternateEmailAddress)) {
			$('.help-block').html('');
			$('#AlternateEmailDIV').addClass('has-error');
			$('#ErrorForAlternateEmail').html('Enter Spokes Person 2 Email Address');
			$('#TxtAlternateEmailAddress').focus();
			return;
		}
	}
	if (CompanyName != "" && ClientName != "" && Category != "" && Source != "" && TypeOfLead != "" && ProductName != "" && LeadSource != "" && Reference != "" && PathOfBackImg != "" && PathOfImg != "" && ProjectType != "") {
		$("#nevigateToClientDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToClientDetails").css("border", "2px solid #3c8dbc");
	}
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();

	if (SpokesName != "" && SpokesMobileNumber != "" && SpokesEmailAddress != "" && SpokesAddress != "" && AlternateSpokesName != "" && AlternateSpokesMobile != "" && AlternateEmailAddress != "") {
		$("#nevigateToContactDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToContactDetails").css("border", "2px solid #3c8dbc");
	}

	document.querySelector("#client-tooltip-text").classList.remove("hidden");
	document.querySelector("#contact-tooltip-text").classList.remove("hidden");
	document.querySelector("#project-tooltip-text").classList.add("hidden");

	$("#AddNewLeadForm").css("display", "none");
	$("#ProjectDetails").css("display", "block");
	$("#ContactDetails").css("display", "none");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Project Details');

	$("#nevigateToClientDetails").text('1');
	$("#nevigateToContactDetails").text('2');
	$("#nevigateToProjectDetails").text('Project Details');
	$("#nevigateToProjectDetails").css("border", "2px solid #3c8dbc");

	var nevigateToClientDetails = document.getElementById("nevigateToClientDetails");
	var nevigateToContactDetails = document.getElementById("nevigateToContactDetails");
	var nevigateToProjectDetails = document.getElementById("nevigateToProjectDetails");
	nevigateToClientDetails.classList.remove("NevigateActiveBtn");
	nevigateToClientDetails.classList.add("NevigateBtn");
	nevigateToContactDetails.classList.remove("NevigateActiveBtn");
	nevigateToContactDetails.classList.add("NevigateBtn");
	nevigateToProjectDetails.classList.remove("NevigateBtn");
	nevigateToProjectDetails.classList.add("NevigateActiveBtn");

	$("#nevigateToClientDetailsDiv").css("width", "5%");
	$("#nevigateToContactDetailsDiv").css("width", "5%");
	$("#nevigateToProjectDetailsDiv").css("width", "12%");
	if (LeadId != "") {
		$('#btnDraft').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft'" + ');');
		$('#btnDraft2').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft2'" + ');');
		$('#btnDraft3').attr('onclick', 'UpdateLead(' + "'" + LeadId + "'" + ',' + "'btnDraft3'" + ');');
		$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + LeadId + "'" + ');');
	}
	else {
		$('#btnDraft2').attr('onclick', 'SaveFormData(' + "'btnDraft2'" + ');');
		$('#btnDraft3').attr('onclick', 'SaveFormData(' + "'btnDraft3'" + ');');
		$('#btnSave').attr('onclick', 'SaveFinalFormData();');
	}
}
function CancelBtn() {
	window.location.href = "/Dashboard/Index";
}
function ResetFormData() {
	$("#TxtCompanyName").val('');
	$("#TxtClientName").val('');
	$("#TxtCategory").val('');
	$("#TxtTypeOfLead").val('');
	$("#TxtProductName").val('');
	$("#TxtSource").val('');
	$("#TxtReference").val('');
	$("#TxtLeadSource").val('');
	$("#TxtSpokesName").val('');
	$("#TxtSpokesMobile").val('');
	$("#TxtSpokesEmailAddress").val('');
	$('#TxtAddress').val('');
	$("#TxtAlternateSpokesName").val('');
	$("#TxtAlternateMobile").val('');
	$('#TxtAlternateEmailAddress').val('');
	$("#TxtPlan").val('');
	$("#TxtPlanPrice").val('');
	$("#TxtStatusType").val('');
	$("#TxtPerson").val('');
	$('#TxtScheduleDate').val('');
	$("#TxtScheduleTime").val('');
	$("#FrontImgOfCard").val('');
	$("#BackImgOfCard").val('');
	$("#TxtProjectType").val('');
	$("#FrontFileStatus").text('');
	$("#BackFileStatus").text('');



	CardImages = [];
}

$(document).keypress(function (e) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtCompanyName").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});

$("#TxtLeadSource").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtStatusType").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtProjectType").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtCategory").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtSource").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtTypeOfLead").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtPerson").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtSource").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$("#TxtPlan").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
$('#TxtClientName').focus(function () {
	debugger;
	$('.dropdown-content a').css('display', 'block');
	$('#myDropdown').css('display', 'block');
});
$('#TxtClientName').click(function () {
	debugger;
	$('.dropdown-content a').css('display', 'block');
	$('#myDropdown').css('display', 'block');
});
$('#showClientName').click(function () {
	debugger;

	$('#myDropdown').css('display', 'block');
	var a_tags = document.querySelectorAll(".dropdown-content a");

	for (var i = 0; i < a_tags.length; i++) {
		if (window.getComputedStyle(a_tags[i]).display === "none") {
			a_tags[i].style.display = "block";
		} else {
			a_tags[i].style.display = "none";
		}
	}

});
$('#TxtClientName').change(function () {
	debugger;

	$('#myDropdown').css('display', 'block');
	var a_tags = document.querySelectorAll(".dropdown-content a");

	for (var i = 0; i < a_tags.length; i++) {
		if (window.getComputedStyle(a_tags[i]).display === "none") {
			a_tags[i].style.display = "block";
		} else {
			a_tags[i].style.display = "none";
		}
	}

});
document.getElementById("myDropdown").addEventListener("click", function (event) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
	var target = event.target;
	if (target.tagName === "A") {
		var value = target.getAttribute("data-value");
		document.getElementById("TxtClientName").value = value;
		$('.dropdown-content a').css('display', 'none');
	}
});
function filterFunction() {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
	var input, filter, a, i, txtValue;
	input = document.getElementById("TxtClientName");
	filter = input.value.toUpperCase();
	a = document.querySelectorAll(".dropdown-content a");
	if (filter == "") {
		$('.dropdown-content a').css('display', 'block');
		$('#myDropdown').css('display', 'block');
	}
	else {
		for (i = 0; i < a.length; i++) {
			txtValue = a[i].getAttribute("data-value");
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				a[i].style.display = "block";
			} else {
				a[i].style.display = "none";
			}
		}
    }
}
$(document).mouseup(function (e) {
	$('.dropdown-content a').css('display', 'none');
	$('#myDropdown').css('display', 'none');
});
