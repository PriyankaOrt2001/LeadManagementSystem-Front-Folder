var FrontImgOfCardFile = '';
const fileInputforFrontImg = document.getElementById('FrontImgOfCard');
fileInputforFrontImg.onchange = () => {
	FrontImgOfCardFile = fileInputforFrontImg.files[0];
	//console.log(selectedFile);
}
var BackImgOfCardFile = '';
const fileInput = document.getElementById('BackImgOfCard');
fileInput.onchange = () => {
	BackImgOfCardFile = fileInput.files[0];
	//console.log(selectedFile);
}
var IsFinal = 0;
function changeLeadStatus(id, Status) {
	bootbox.confirm({
		message: "Are You sure you want to change status ?",
		buttons: {
			confirm: {
				label: 'Yes',
				className: 'btn-success'
			},
			cancel: {
				label: 'No',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			debugger;
			var formdata = new FormData();
			formdata.append("LeadId", id);
			formdata.append("StatusType", Status);
			if (result == true) {
				$.ajax({
					type: 'POST',
					url: ServerURL + 'LeadManagement/ChangeLeadStatus',
					data: formdata,
					processData: false,
					contentType: false,
					success: function (return_Data) {
						if (return_Data.n == 5) {
							bootbox.alert(return_Data.msg);
							window.location.href = ServerURL + "LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							bootbox.alert(return_Data.msg);
							window.location.href = ServerURL + "LeadManagement/Index";
						}
						else {
							bootbox.alert(return_Data.msg);
							window.location.href = ServerURL + "/LeadManagement/Index";
						}
					}
				});
			}
			else {
				window.location.href = ServerURL + "/LeadManagement/Index";
			}

		}
	});
}
$("#TxtFilterDate").change(function () {
	debugger;
	var filterDateValue = $("#TxtFilterDate").val();
	if (filterDateValue != '') {
		alert("The text has been changed.");
	}

});
function ViewDetails(id) {
	debugger;
	$('#modal-Detail').modal('toggle');
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/ViewLeadDetails',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{

				$('#leadDate').text(return_Data.CreatedDate);
				$('#leadId').text(return_Data.LeadId);
				$('#status').text(return_Data.StatusType);
				$("#compName").text(return_Data.CompanyName);
				$("#clientName").text(return_Data.ClientName);
				$("#category").text(return_Data.Category);
				$("#typeOfLead").text(return_Data.TypeOfLead);
				$("#ProductName").text(return_Data.ProductName);
				$("#source").text(return_Data.Source);
				$("#ref").text(return_Data.Reference);
				$("#leadSource").text(return_Data.LeadSource);
				$("#spokesName").text(return_Data.SpokesName);
				$("#spokesMobileNumber").text(return_Data.SpokesMobileNumber);
				$("#spokesEmailAddress").text(return_Data.SpokesEmailAddress);
				$('#spokesAddress').text(return_Data.SpokesAddress);
				$("#FileStatus").text(return_Data.Filename);

				$("#planName").text(return_Data.PlanName);
				$("#planPrice").text(return_Data.PlanPrice);
				$("#assignTo").text(return_Data.AssignTo);
				$('#scheduleDate').text(return_Data.ScheduleDate);
				$("#scheduleTime").text(return_Data.ScheduleTime);
				$('#btnShowEditForm').attr('onclick', 'View(' + "'" + id + "'" + ');');
				if (return_Data.FrontImgOfCardPath != "") {
					$('#frontimg').css('display', 'initial');
				}
				if (return_Data.BackImgOfCardPath != "") { 
					$('#backimg').css('display', 'initial');
				}
				$('#frontimg').attr('src', return_Data.FrontImgOfCardPath);
				$('#ViewFrontCardImagePath').attr('src', return_Data.FrontImgOfCardPath);
				$('#backimg').attr('src', return_Data.BackImgOfCardPath);
				$('#ViewBackCardImagePath').attr('src', return_Data.BackImgOfCardPath);
			}

		}
	});

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
function UpdateFirstDraftLead(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
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
				"File too Big, please select a file less than 4mb");
			return;
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File too Big, please select a file less than 4mb");
			return;
		}
	}

	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Please select Company Name.');
		$('#TxtCompanyName').focus();
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ClientNameDIV').addClass('has-error');
		$('#ErrorForClientName').html('Please enter Client Name.');
		$('#TxtClientName').focus();
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Please Select Owner Name.');
		$('#TxtSource').focus();
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
		url: ServerURL + '/LeadManagement/UpdateFirstDraftLead',
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

				$("#LeadForm").css("display", "none");
				$("#ProjectDetails").css("display", "none");
				$("#ContactDetails").css("display", "block");
				$("#LeadTable").css("display", "none");

				$('#btnDraft2').text('Update');
				$('#btnDraft2').attr('onclick', 'UpdateDraft1(' + "'" + id + "'" + ');');
				$('#btnDraft2').css("display", "inline-block");

				$('#btnSave').text('Save');
				$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + id + "'" + ');');
				$('#btnSave').css("display", "inline-block");

				$('#btnDraft3').text('Draft');
				$('#btnDraft3').attr('onclick', 'UpdateFinalDraftLead(' + "'" + id + "'" + ');');
				$('#btnDraft3').css("display", "inline-block");

				$("#boxTitle").text('Add Contact Details');
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}

function UpdateFinalDraftLead(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
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
				"File too Big, please select a file less than 4mb");
			return;
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File too Big, please select a file less than 4mb");
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
		url: ServerURL + '/LeadManagement/UpdateFinalDraftLead',
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
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function UpdateFinal(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
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
				"File too Big, please select a file less than 4mb");
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File too Big, please select a file less than 4mb");
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
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function UpdateDraft1(id) {
	debugger;

	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
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



	var formdata = new FormData();
	formdata.append("LeadId", id);
	formdata.append("CompanyName", "");
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
	formdata.append("IsFinal", 0);



	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + '/LeadManagement/UpdateDraftLead',
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

				$("#LeadForm").css("display", "none");
				$("#ProjectDetails").css("display", "block");
				$("#ContactDetails").css("display", "none");
				$("#LeadTable").css("display", "none");

				$('#btnSave').text('Save');
				$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + id + "'" + ');');
				$('#btnSave').css("display", "inline-block");

				$('#btnDraft3').text('Draft');
				$('#btnDraft3').attr('onclick', 'UpdateFinalDraftLead(' + "'" + id + "'" + ');');
				$('#btnDraft3').css("display", "inline-block");


				$("#boxTitle").text('Add Project Details');

			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function Update(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
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
				"File too Big, please select a file less than 4mb");
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File too Big, please select a file less than 4mb");
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
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function ExitForm2() {
	$("#LeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");
	$("#LeadTable").css("display", "none");
}

function ExitForm3() {
	$("#LeadForm").css("display", "none");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "block");
	$("#LeadTable").css("display", "none");
}

function View(id) {
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/ViewLead',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data != null) {

				console.log(return_Data);

				$("#LeadForm").css("display", "block");
				$("#LeadTable").css("display", "none");
				$("#boxTitle").text('Edit Lead');
				$('#PageTitle').text('Edit Lead Details')
				$('#btnAddLead').text('Show List');
				$('#btnAddLead').attr('onclick', 'Leadtable();');
				//$("#btnSave").show();
				$("#btnDraft").show();
				$("#btnreset").show();
				//$("#btnSave").text('Update');
				$("#btnDraft").text('Update');
				$('#btnDownloadReport').css('display', 'none');
				$('#btnAddLead').css('display', 'none');
				$('#TxtFilterDate').css('display', 'none');
				$('#toLeadDetails').css('display', 'initial');
				$("#modal-Detail").modal("hide");

				//$('#btnSave').text('Update');
				//$('#btnSave').attr('onclick', 'Update('+"'" + id +"'"+');');
				//$('#btnSave').css("display", "inline-block");

				$('#btnDraft').text('Update');
				$('#btnDraft').attr('onclick', 'UpdateFirstDraftLead(' + "'" + id + "'" + ');');
				$('#btnDraft').css("display", "inline-block");

				$('#btnDraft2').text('Update');
				$('#btnDraft2').attr('onclick', 'UpdateDraft1(' + "'" + id + "'" + ');');
				$('#btnDraft2').css("display", "inline-block");

				$('#btnDraft3').text('Draft');
				$('#btnDraft3').attr('onclick', 'UpdateFinalDraftLead(' + "'" + id + "'" + ');');
				$('#btnDraft3').css("display", "inline-block");

				$('#btnSave').text('Save');
				$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + id + "'" + ');');
				$('#btnSave').css("display", "inline-block");

				$('#TxtTypeOfLead').find('option').remove().end();
				$('#TxtTypeOfLead').append(`<option selected="" value="">--Select Type Of Lead--</option>`);

				if (return_Data.TypeOfLeadList == null) { }
				else {
					$.each(return_Data.TypeOfLeadList, function (i, obj) {
						$('#TxtTypeOfLead').append(`<option value="${obj.TypeOfLead_ID}">${obj.TypeOfLead}</option>`);
					});}
				$('#FrontFileStatus').attr('href', return_Data.FrontImgOfCardPath);
				$('#FrontFileStatus').attr('target', '_blank');
				$('#FrontFileStatus').text(return_Data.FrontImgFileName);

				$('#BackFileStatus').attr('href', return_Data.BackImgOfCardPath);
				$('#BackFileStatus').attr('target', '_blank');
				$('#BackFileStatus').text(return_Data.BackImgFileName);

				$('#leadDate').val(return_Data.CreatedDate);
				$('#lead_ld').text(return_Data.LeadId);
				$("#TxtCompanyName").val(return_Data.CompanyName);
				$("#TxtClientName").val(return_Data.ClientName);
				$("#TxtCategory").val(return_Data.Category);
				$("#TxtTypeOfLead").val(return_Data.TypeOfLead);
				$("#TxtProductName").val(return_Data.ProductName);
				$("#TxtSource").val(return_Data.Source);
				$("#TxtReference").val(return_Data.Reference);
				$("#TxtLeadSource").val(return_Data.LeadSource);
				$("#TxtSpokesName").val(return_Data.SpokesName);
				$("#TxtSpokesMobile").val(return_Data.SpokesMobileNumber);
				$("#TxtSpokesEmailAddress").val(return_Data.SpokesEmailAddress);
				$('#TxtAddress').val(return_Data.SpokesAddress);
				$("#TxtAlternateSpokesName").val(return_Data.AlternateSpokesName);
				$("#TxtAlternateMobile").val(return_Data.AlternateSpokesMobile);
				$('#TxtAlternateEmailAddress').val(return_Data.AlternateEmailAddress);
				$("#TxtPlan").val(return_Data.PlanName);
				$("#TxtPlanPrice").val(return_Data.PlanPrice);
				$("#TxtStatusType").val(return_Data.StatusType);
				$("#TxtPerson").val(return_Data.AssignTo);
				$('#TxtScheduleDate').val(return_Data.ScheduleDate);
				$("#TxtScheduleTime").val(return_Data.ScheduleTime);
				$("#FileStatus").text(return_Data.Filename);
				$("#TxtProjectType").val(return_Data.ProjectType);


				if (return_Data.FrontImgFileName != "") {
					$("#removeFrontFileIcon").css('display', 'initial');
                }
				if (return_Data.BackImgFileName != "") {
					$("#removeBackFileIcon").css('display', 'initial');
				}
				

			}
		}
	});
}
function ShowAddLeadForm() {
	$('#btnDownloadReport').css('display', 'none');
	$("#LeadForm").css("display", "block");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Add Lead');
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');
	//$("#btnSave").show();
	$("#btnDraft").show();
	$("#btnreset").show();
	//$("#btnSave").text('Add');
	$("#btnDraft").text('Draft');
	$('#btnAddLead').css('display', 'none');
	$('#TxtFilterDate').css('display', 'none');
	$('#LeadIdRow').css('display', 'none');
	$('#StatusRow').css('display', 'none');
	$('#currentPage').text('Add Lead');
	$('#toLeadDetails').css('display', 'none');
}
function ShowForm() {
	$('#btnDownloadReport').css('display', 'none');

	$("#LeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");

	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Add Lead');
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');

	/*$("#btnSave").show();*/
	$("#btnDraft").show();

	$("#btnreset").show();

	/*$("#btnSave").text('Add');*/
	$("#btnDraft").text('Draft');

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
	$("#LeadForm").css("display", "none");
	$("#LeadTable").css("display", "block");


	$("#boxTitle").text('');
	$('#btnAddLead').text('+ Add Lead');
	$('#btnAddLead').attr('onclick', 'ShowForm();');
	$('#btnDownloadReport').css('display', 'initial');
	$('#TxtFilterDate').css('display', 'initial');
	$('#toLeadDetails').css('display', 'none');
}
function ShowEditForm() {
	$('#modal-Detail').modal('toggle');
	$("#LeadForm").css("display", "block");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Edit Lead');
	$('#PageTitle').text('Edit Lead Details')
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');

	/*$("#btnSave").show();*/
	$("#btnDraft").show();

	$("#btnreset").show();

	//$("#btnSave").text('Update');
	$("#btnDraft").text('Update');

	$('#btnDownloadReport').css('display', 'none');
	$('#btnAddLead').css('display', 'none');
	$('#TxtFilterDate').css('display', 'none');
	$('#toLeadDetails').css('display', 'initial');
}
function ViewDetailsForEdit() {
	$("#LeadForm").css("display", "block");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Edit Lead');
	$('#PageTitle').text('Edit Lead Details')
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');

	/*$("#btnSave").show();*/
	$("#btnDraft").show();

	$("#btnreset").show();

	//$("#btnSave").text('Update');
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

	var value = $('#FrontImgOfCard').val();
	file_name = value.substring(value.lastIndexOf('\\') + 1);

	const preview = $('#FrontImgOfCard').val();
	const file = document.querySelector("input[type=file]").files[0];
	var filecount = document.querySelector("input[type=file]").files;
	var Base64OfFrontImg = "";
	const reader = new FileReader();
	if (filecount.length > 0) {
		reader.onloadend = function () {
			// convert image file to base64 string
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

function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var mob_regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/; //For mobile number
	var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/ //For number
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

	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {

		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File too Big, please select a file less than 4mb");
			return;
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File too Big, please select a file less than 4mb");
			return;
		}


	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Please select Company Name.');
		$('#TxtCompanyName').focus();
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ClientNameDIV').addClass('has-error');
		$('#ErrorForClientName').html('Please enter Client Name.');
		$('#TxtClientName').focus();
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Please Select Owner Name.');
		$('#TxtSource').focus();
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
	formdata.append("PlanName", PlanName);
	formdata.append("PlanPrice", PlanPrice);
	formdata.append("StatusType", StatusType);
	formdata.append("AssignTo", AssignTo);
	formdata.append("ScheduleDate", ScheduleDate);
	formdata.append("ScheduleTime", ScheduleTime);
	formdata.append("ProjectType", ProjectType);


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
				$('#btnDraft').html('Draft');
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');

				$("#LeadForm").css("display", "none");
				$("#ProjectDetails").css("display", "none");
				$("#ContactDetails").css("display", "block");
				$("#LeadTable").css("display", "none");


				refreshDataTable();

				$('#btnDraft2').attr('onclick', 'UpdateDraft1(' + "'" + return_Data.LeadId + "'" + ');');
				$('#btnDraft3').attr('onclick', 'UpdateFinalDraftLead(' + "'" + return_Data.LeadId + "'" + ');');
				$('#btnSave').attr('onclick', 'UpdateFinal(' + "'" + return_Data.LeadId + "'" + ');');
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable();
			}
		},
		complete: function () {
			$('#btnDraft').removeAttr("disabled");
			$('#btnDraft').html('Draft');
		}

	});


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

function remark(id) {
	debugger;
	$('#remarkModal').modal('show');
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/GetRemarksList',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				var d2 = document.getElementById("modal-body")
					.innerHTML = return_Data;
				$('#btnSaveRemark').attr('onclick', 'SaveRemark(' + "'" + id + "'" + ');');
			}

		}
	});
}
function ResetRemark() {
	$("#TxtRemark").val('');
}
$(document).keypress(function (e) {
	$("#RemarkDIV").removeClass('has-error');
	$("#ErrorForRemark").html('');
});
function myFunction(status) {
	// Function returns the product of a and b
	return a * b;
}
function SaveRemark(id) {
	debugger;
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var txtRemark = $('#TxtRemark').val().trim();

	if (txtRemark == "") {
		$('.help-block').html('');
		$('#RemarkDIV').addClass('has-error');
		$('#ErrorForRemark').html('Please enter remark.');
		$('#TxtRemark').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Remark", txtRemark);
	formdata.append("Lead_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/LeadManagement/AddRemark',
		data: formdata,
		processData: false,
		contentType: false,
		beforeSend: function () {
			$('#btnSave').attr('disabled', true);
			//var loader = "<img src='../img/ajax-loader-square.gif' style='height:15px;width:15px'/>";
			//$(element).html(loader);
		},
		success: function (return_Data) {
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				bootbox.alert(return_Data.msg);
				remark(id);
				ResetRemark();
				refreshDataTable();
			} else {
				bootbox.alert(return_Data.msg);
			}
		},
		complete: function () {
			$('#btnSaveRemark').removeAttr("disabled");
			$('#btnSaveRemark').html('Save');
		}

	});

}


