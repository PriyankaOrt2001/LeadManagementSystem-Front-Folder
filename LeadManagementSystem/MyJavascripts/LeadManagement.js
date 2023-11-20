var button = document.getElementById("nevigateToEditClientDetails");
if (button.textContent.trim() === "Client Details") {
	// Add the 'hidden' class to the tooltip-text element
	document.querySelector(".tooltip-text").classList.add("hidden");
}

document.querySelector("#edit-contact-tooltip-text").classList.add("hidden");
document.querySelector("#edit-project-tooltip-text").classList.add("hidden");
var FrontImgOfCardFile = '';
var Lead_Id_For_Edit = '';
var comapnyIdsValues = [];
var categoryIdValue = [];
var assignedIdValue = [];
var PriorityList = [];
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
function IsFavLead(id, IsFav) {
	debugger;
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);

	var element = document.getElementById('isFav_' + id);
	var value = element.className;
	var alterMsg = "";
	if (value =="fa fa-star-o") {
		alterMsg = "Are You sure you want to add this lead as Favourite Lead ?";
	}
	else {
		alterMsg = "Are You sure you want to remove this lead from Favourite Lead ?";
    }
	bootbox.confirm({
		message: alterMsg,
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
			formdata.append("IsFav", IsFav);
			if (result == true) {
				document.body.style.paddingRight = '0px';
				$.ajax({
					type: 'POST',
					url: ServerURL + 'LeadManagement/AddToFav',
					data: formdata,
					processData: false,
					contentType: false,
					success: function (return_Data) {
						if (return_Data.n == 5) {
							bootbox.alert(return_Data.msg);
							window.location.href = ServerURL + "LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							refreshDataTable(pageId);
							bootbox.alert(return_Data.msg);
							
						}
						else {
							refreshDataTable(0);
							bootbox.alert(return_Data.msg);
							debugger;
						}
					}
				});
			}
			else {
				debugger;
				bootbox.hideAll();
			}

		}
	});
}
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

function changeLeadStatus(id, Status) {
	var selectElement = document.getElementById("DrpStatusType_" + id);
	var valueAttribute = selectElement.getAttribute("value");
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	debugger;
	if (Status == "Converted" || Status == "Closed") {
		remark(id, Status);
		$('#closeRemarkModal').attr('onclick', 'closeRemarkModal(' + "'" + id + "'" + ');');
	}
	else {
		
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
					document.body.style.paddingRight = '0px';
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
								refreshDataTable(pageId);
								bootbox.alert(return_Data.msg);
							}
							else {
								refreshDataTable(pageId);
								bootbox.alert(return_Data.msg);
							}
						}
					});
				}
				else {
					var selectElement = document.getElementById("DrpStatusType_" + id);
					if (valueAttribute == "--Select Status--") {
						selectElement.value = "";
					}
					else {
						selectElement.value = valueAttribute;
					}

					bootbox.hideAll();
				}

			}
		});
    }
	
}
$("#TxtFilterDate").change(function () {
	debugger;
	var filterDateValue = $("#TxtFilterDate").val();
	if (filterDateValue != '') {
		alert("The text has been changed");
	}

});
function ViewDetails(id) {
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	const pageId = dataDtIdxValue - 1;
	console.log(pageId);
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
				debugger;
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
				$("#spokesName2").text(return_Data.AlternateSpokesName);
				$("#spokesMobileNumber2").text(return_Data.AlternateSpokesMobile);
				$("#spokesEmailAddress2").text(return_Data.AlternateEmailAddress);
				$("#spokesAddress2").text(return_Data.AlternateSpokesAddress);
				$('#spokesAddress').text(return_Data.SpokesAddress);
				$("#FileStatus").text(return_Data.Filename);
				$('#lead_status').text(return_Data.StatusType);
				$("#planName").text(return_Data.PlanName);
				$("#planPrice").text(return_Data.PlanPrice);
				$("#assignTo").text(return_Data.AssignTo);
				$('#scheduleDate').text(return_Data.ScheduleDate);
				$("#scheduleTime").text(return_Data.ScheduleTime);
				$('#btnShowEditForm').attr('onclick', 'View(' + "'" + id + "'" + ');');
				$('#showremarks').attr('onclick', 'showremark(' + "'" + id + "'" + ',' + "'" + return_Data.StatusType + "'" + ');');
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
				$('#myDropdown').css('display', 'none');
				
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
function deleteLead(element) {
	debugger;
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	bootbox.confirm({
		message: "Are you sure you want to delete this?",
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
			if (result == true) {
				var id = element;
				document.body.style.paddingRight = '0px';
				$.ajax({
					type: 'POST',
					url: ServerURL + '/LeadManagement/DeleteLead',
					data: JSON.stringify({ id: id }),
					contentType: 'application/json; charset=utf-8',
					success: function (return_Data) {
						if (return_Data.n == 5) {
							window.location.href = "/LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							refreshDataTable(pageId);
							bootbox.alert(return_Data.msg);
						}
						else if (return_Data.n == 0) {
							bootbox.alert(return_Data.msg);
						}
					}
				});
			}
			else {
				bootbox.hideAll();
			}
		}
	});
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
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyCharacters = /^[A-Za-z\s]*$/;
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var onlyCharacters = /^[A-Za-z\s]*$/;
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
	if (PlanPrice != "") {
		if (PlanPrice == "0") {
			alert(
				"Enter valid price value");
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
				refreshDataTable(0);
				window.location.href = "/LeadManagement/Index";
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function UpdateLead(id,btnId,page_Id) {
	debugger;
	
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var onlyCharacters = /^[A-Za-z\s]*$/;
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
			return;
		}


	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	if (btnId == "btnDraft2") {
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
	if (SpokesMobileNumber != "") {
		if (!mob_regex.test(SpokesMobileNumber)) {
			$('.help-block').html('');
			$('#SpokesMobileDIV').addClass('has-error');
			$('#ErrorForSpokesMobile').html('Enter valid spokes person mobile number.');
			$('#TxtSpokesMobile').focus();
			alert("Enter valid spokes person mobile number");
			return;
		}
	}
	else if (AlternateSpokesMobile != "") {
		if (!mob_regex.test(AlternateSpokesMobile)) {
			$('.help-block').html('');
			$('#AlternateMobileDIV').addClass('has-error');
			$('#ErrorForAlternateMobile').html('Enter Spokes Person 2 Mobile Number.');
			$('#TxtAlternateMobile').focus();
			alert("Enter valid spokes person mobile number");
			return;
		}
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
				refreshDataTable(0);
				if (btnId == "btnDraft") {
					nevigateToEditContactDetails();
				}
				else if (btnId == "btnDraft2") {
					nevigateToEditProjectDetails();
				}
				else if (btnId == "btnSave") {
					sessionStorage.setItem('pageId', page_Id);
					window.location.href = "/LeadManagement/Index";
				}
			} else {
				bootbox.alert(return_Data.msg);

			}
		}
	});



}
function CancelBtn(pageid) {
	sessionStorage.setItem('pageId', pageid);
	window.location.href = "/LeadManagement/Index";
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
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	const pageId = dataDtIdxValue - 1;
	console.log(pageId);
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/ViewLead',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data != null) {

				console.log(return_Data);
				$("#nevigationDiv").css("display", "block");
				$("#LeadTableDIV").css("display", "none");
				$("#MainEditLeadDIV").css("display", "block");

				$("#LeadForm").css("display", "block");
				$("#LeadTable").css("display", "none");
				$("#boxTitle").text('Client Details');
				$('#PageTitle').text('Edit Lead Details')
				$('#content_header').text('Edit Lead')
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
				Lead_Id_For_Edit = id;
				$('#btnDraft').text('Save');
				$('#btnDraft').css("background-color", "green");
				$('#btnDraft').attr('onclick', 'UpdateLead(' + "'" + id + "'" + ',' + "'btnDraft'" + ',' + "'" + pageId + "'" + ');');
				$('#btnDraft').css("display", "inline-block");

				$('#btnDraft2').text('Save');
				$('#btnDraft2').css("background-color", "green");
				$('#btnDraft2').attr('onclick', 'UpdateLead(' + "'" + id + "'" + ',' + "'btnDraft2'" + ',' + "'" + pageId + "'" + ');');
				$('#btnDraft2').css("display", "inline-block");

				$('#btnDraft3').text('Save');
				$('#btnDraft3').css("background-color", "green");
				$('#btnDraft3').attr('onclick', 'UpdateLead(' + "'" + id + "'" + ',' + "'btnDraft3'" + ',' + "'" + pageId + "'" + ');');
				$('#btnDraft3').css("display", "inline-block");

				$('#btnSave').css("background-color", "green");
				$('#btnSave').attr('onclick', 'UpdateLead(' + "'" + id + "'" + ',' + "'btnSave'" + ',' + "'" + pageId + "'" + ');');
				$('#btnSave').css("display", "inline-block");

				$('#btnreset').attr('onclick', 'CancelBtn(' + "'" + pageId + "'" + ')');
				$('#btnExit2').attr('onclick', 'CancelBtn(' + "'" + pageId + "'" + ')');
				$('#btnExit3').attr('onclick', 'CancelBtn(' + "'" + pageId + "'" + ')');
				$('#btnreset').text('Cancel');

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
				$('#TxtAlternateAddress').val(return_Data.AlternateSpokesAddress);
				$("#TxtPlan").val(return_Data.PlanName);
				$("#TxtPlanPrice").val(return_Data.PlanPrice);
				$("#TxtStatusType").val(return_Data.StatusType);
				$("#lead_status").text(return_Data.StatusType);
				$("#TxtPerson").val(return_Data.AssignTo);
				$('#TxtScheduleDate').val(return_Data.ScheduleDate);
				$("#TxtScheduleTime").val(return_Data.ScheduleTime);
				$("#FileStatus").text(return_Data.Filename);
				$("#TxtProjectType").val(return_Data.ProjectType);

				$('#content_header').text('Edit Details');
				$('#boxTitle').text('Client Details');

				if (return_Data.FrontImgFileName != "") {
					$("#removeFrontFileIcon").css('display', 'initial');
                }
				if (return_Data.BackImgFileName != "") {
					$("#removeBackFileIcon").css('display', 'initial');
				}
				$('#myDropdown').css('display', 'none');
				nevigateToEditClientDetails();

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
	$("#LeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Add Lead');
	$('#btnAddLead').text('Show List');
	$('#btnAddLead').attr('onclick', 'Leadtable();');
	$("#btnDraft").show();
	$("#btnreset").show();
	$("#btnDraft").text('Save as Draft');
	$("#btnDraft").css("background-color","#0096CF");
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
	$("#btnDraft").show();
	$("#btnreset").show();
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
		var table = $('#TableLead').DataTable();
		var data = table.data().toArray();

		for (var i = 0; i < data.length; i++) {
			data[i].splice(0, 1); // Remove the element at index 0 for each list
		}

		var wsData = [];

		var headers = [];
		$("#TableLead thead th").each(function () {
			headers.push($(this).text());
		});

		var actionColumnIndex = headers.indexOf("Action");
		if (actionColumnIndex !== -1) {
			headers.splice(actionColumnIndex, 1);
			headers.splice(0, 1);
		}
		// Find the indexes of columns that have a header present
		var headerIndexes = headers.map(function (header) {
			return headers.indexOf(header);
		});

		wsData.push(headers);

		for (var i = 0; i < data.length; i++) {
			var row = [];
			for (var j = 0; j < headerIndexes.length; j++) {
				if (j == 10) {
					var cellValue = data[i][headerIndexes[j]];

					// Check if the cell value contains a select element
					var $cellValue = $(cellValue);
					if ($cellValue.is('select')) {
						// Extract the value of the select element
						var selectValue = $cellValue.val();
						row.push(selectValue);
					} else {
						// Handle the case where the cell does not contain a select element
						row.push(cellValue);
					}
				}
				else {
					row.push(data[i][headerIndexes[j]]);
				}

			}
			wsData.push(row);
		}

		var ws = XLSX.utils.aoa_to_sheet(wsData);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "DataTable Data");

		XLSX.writeFile(wb, "Lead Management System.xlsx");
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

	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');

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

function remark(id,status) {
	$('#remark-modal-dialog').css('height', '460px');
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
				$("#remark-body").html(return_Data);
				$('#btnSaveRemark').attr('onclick', 'SaveRemark(' + "'" + id + "'" + ',' + "'" + status + "'" + ');');
				$('#btnSaveRemarkAndNotify').attr('onclick', 'SaveRemarkAndNotify(' + "'" + id + "'" + ',' + "'" + status + "'" + ');');
			}

		}
	});
}
function showremark(id, status) {
	$('#remark-modal-dialog').css('height', '460px');
	$('#remark-modal-dialog').css('margin-left', '561.6px');
	$('#remark-modal-dialog').css('margin-top', '85px');
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
				$("#remark-body").html(return_Data);
				$('#btnSaveRemark').attr('onclick', 'SaveRemark(' + "'" + id + "'" + ',' + "'" + status + "'" + ');');
				$('#btnSaveRemarkAndNotify').attr('onclick', 'SaveRemarkAndNotify(' + "'" + id + "'" + ',' + "'" + status + "'" + ');');
			}

		}
	});
}
function showFilter() {
	$('#Filter-Detail').modal('show');
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'LeadManagement/GetCompanyListForFilter',
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$("#FilterByCompanyRow").html(return_Data.GetCompanyListForFilter);
				$("#FilterByCategoryRow").html(return_Data.GetCategoryListForFilter);
				$("#FilterByAssignedToRow").html(return_Data.GetAssignToListForFilter);
				
				for (let i = 0; i < comapnyIdsValues.length; i++){
					$('input.CompanyModelList[value="' + comapnyIdsValues[i] + '"]').prop('checked', true);
				}
				for (let i = 0; i < categoryIdValue.length; i++){
					$('input.LeadCategoryDetails[value="' + categoryIdValue[i] + '"]').prop('checked', true);
				}
				for (let i = 0; i < assignedIdValue.length; i++){
					$('input.AssignToDetails[value="' + assignedIdValue[i] + '"]').prop('checked', true);
				}
				for (let i = 0; i < PriorityList.length; i++){
					$('input.PriorityList[value="' + PriorityList[i] + '"]').prop('checked', true);
				}
			}

		}
	});
}
function ResetRemark() {
	$("#TxtRemark").val('');
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
}
$(document).keypress(function (e) {
	$("#RemarkDIV").removeClass('has-error');
	$("#ErrorForRemark").html('');
});
function myFunction(status) {
	// Function returns the product of a and b
	return a * b;
}
function SaveRemark(id,status) {
	debugger;
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var onlyCharacters = /^[A-Za-z\s]*$/;
	var txtRemark = $('#TxtRemark').val().trim();
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	if (txtRemark == "") {
		$('.help-block').html('');
		$('#RemarkDIV').addClass('has-error');
		$('#ErrorForRemark').html('Enter remark.');
		$('#TxtRemark').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Remark", txtRemark);
	formdata.append("Lead_Id", id);
	formdata.append("Status", status);
	document.body.style.paddingRight = '0px';
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
				refreshDataTable(pageId);
				$('#remarkModal').modal('hide');
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

function SaveRemarkAndNotify(id,status) {
	debugger;
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var onlyCharacters = /^[A-Za-z\s]*$/;
	var txtRemark = $('#TxtRemark').val().trim();
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	if (txtRemark == "") {
		$('.help-block').html('');
		$('#RemarkDIV').addClass('has-error');
		$('#ErrorForRemark').html('Enter Remark.');
		$('#TxtRemark').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Remark", txtRemark);
	formdata.append("Lead_Id", id);
	formdata.append("Status", status);
	document.body.style.paddingRight = '0px';
	$.ajax({
		type: "POST",
		url: ServerURL + '/LeadManagement/AddRemarkAndNotify',
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
				remark(id,status);
				ResetRemark();
				refreshDataTable(pageId);
				$('#remarkModal').modal('hide');
			} else {
				bootbox.alert(return_Data.msg);
			}
		},
		complete: function () {
			$('#btnSaveRemarkAndNotify').removeAttr("disabled");
		}

	});

}


function nevigateToEditClientDetails() {
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();

	if (SpokesName != "" && SpokesMobileNumber != "" && SpokesEmailAddress != "" && SpokesAddress != "" && AlternateSpokesName != "" && AlternateSpokesMobile != "" && AlternateEmailAddress != "") {
		$("#nevigateToEditContactDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToEditContactDetails").css("border", "2px solid #3c8dbc");
	}

	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();

	if (PlanName != "" && PlanPrice != "" && StatusType != "" && AssignTo != "" && ScheduleDate != "" && ScheduleTime != "") {
		$("#nevigateToEditProjectDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToEditProjectDetails").css("border", "2px solid #3c8dbc");
	}

	$("#LeadForm").css("display", "block");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "none");

	document.querySelector("#edit-client-tooltip-text").classList.add("hidden");
	document.querySelector("#edit-contact-tooltip-text").classList.remove("hidden");
	document.querySelector("#edit-project-tooltip-text").classList.remove("hidden");

	$("#boxTitle").text('Client Details');
	$("#nevigateToEditClientDetails").text('Client Details');
	$("#nevigateToEditContactDetails").text('2');
	$("#nevigateToEditProjectDetails").text('3');
	$("#nevigateToEditClientDetails").css("border", "2px solid #3c8dbc");
	$("#nevigateToEditClientDetailsDiv").css("width", "12%");
	$("#nevigateToEditContactDetailsDiv").css("width", "5%");
	$("#nevigateToEditProjectDetailsDiv").css("width", "5%");

	var nevigateToEditClientDetails = document.getElementById("nevigateToEditClientDetails");
	var nevigateToEditContactDetails = document.getElementById("nevigateToEditContactDetails");
	var nevigateToEditProjectDetails = document.getElementById("nevigateToEditProjectDetails");
	nevigateToEditClientDetails.classList.remove("NevigateBtn");
	nevigateToEditClientDetails.classList.add("NevigateActiveBtn");
	nevigateToEditContactDetails.classList.remove("NevigateActiveBtn");
	nevigateToEditContactDetails.classList.add("NevigateBtn");
	nevigateToEditProjectDetails.classList.remove("NevigateActiveBtn");
	nevigateToEditProjectDetails.classList.add("NevigateBtn");

}
function nevigateToEditContactDetails() {
	debugger;
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var onlyCharacters = /^[A-Za-z\s]*$/;
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
	var PlanName = $("#TxtPlan").val();
	var PlanPrice = $("#TxtPlanPrice").val();
	var StatusType = $("#TxtStatusType").val();
	var AssignTo = $("#TxtPerson").val();
	var ScheduleDate = $('#TxtScheduleDate').val();
	var ScheduleTime = $("#TxtScheduleTime").val();
	var FrontFileStatus = $('#FrontFileStatus').text();
	var BackFileStatus = $('#BackFileStatus').text();

	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {

		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	else {
		PathOfImg = FrontFileStatus;
    }
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	else {
		PathOfBackImg = BackFileStatus;
    }
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name.');
		$('#TxtCompanyName').focus();
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ClientNameDIV').addClass('has-error');
		$('#ErrorForClientName').html('Enter Client Name.');
		$('#TxtClientName').focus();
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name.');
		$('#TxtSource').focus();
		return;
	}
	if (CompanyName != "" && ClientName != "" && Category != "" && Source != "" && TypeOfLead != "" && ProductName != "" && LeadSource != "" && Reference != "" && PathOfBackImg != "" && PathOfImg != "" && ProjectType != "") {
		$("#nevigateToEditClientDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToEditClientDetails").css("border", "2px solid #3c8dbc");
	}
	

	if (PlanName != "" && PlanPrice != "" && StatusType != "" && AssignTo != "" && ScheduleDate != "" && ScheduleTime != "") {
		$("#nevigateToEditProjectDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToEditProjectDetails").css("border", "2px solid #3c8dbc");
	}
	$("#LeadForm").css("display", "none");
	$("#ProjectDetails").css("display", "none");
	$("#ContactDetails").css("display", "block");
	$("#LeadTable").css("display", "none");

	document.querySelector("#edit-client-tooltip-text").classList.remove("hidden");
	document.querySelector("#edit-contact-tooltip-text").classList.add("hidden");
	document.querySelector("#edit-project-tooltip-text").classList.remove("hidden");

	$("#boxTitle").text('Contact Details');
	$("#nevigateToEditClientDetails").text('1');
	$("#nevigateToEditContactDetails").text('Contact Details');
	$("#nevigateToEditProjectDetails").text('3');
	$("#nevigateToEditContactDetails").css("border", "2px solid #3c8dbc");
	$("#nevigateToEditClientDetailsDiv").css("width", "5%");
	$("#nevigateToEditContactDetailsDiv").css("width", "12%");
	$("#nevigateToEditProjectDetailsDiv").css("width", "5%");

	var nevigateToEditClientDetails = document.getElementById("nevigateToEditClientDetails");
	var nevigateToEditContactDetails = document.getElementById("nevigateToEditContactDetails");
	var nevigateToEditProjectDetails = document.getElementById("nevigateToEditProjectDetails");
	nevigateToEditClientDetails.classList.remove("NevigateActiveBtn");
	nevigateToEditClientDetails.classList.add("NevigateBtn");
	nevigateToEditContactDetails.classList.remove("NevigateBtn");
	nevigateToEditContactDetails.classList.add("NevigateActiveBtn");
	nevigateToEditProjectDetails.classList.remove("NevigateActiveBtn");
	nevigateToEditProjectDetails.classList.add("NevigateBtn");
}
function nevigateToEditProjectDetails() {
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var onlyCharacters = /^[A-Za-z\s]*$/;
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
	var FrontFileStatus = $('#FrontFileStatus').text();
	var BackFileStatus = $('#BackFileStatus').text();
	var SpokesName = $("#TxtSpokesName").val();
	var SpokesMobileNumber = $("#TxtSpokesMobile").val();
	var SpokesEmailAddress = $("#TxtSpokesEmailAddress").val();
	var SpokesAddress = $('#TxtAddress').val();
	var AlternateSpokesName = $("#TxtAlternateSpokesName").val();
	var AlternateSpokesMobile = $("#TxtAlternateMobile").val();
	var AlternateEmailAddress = $('#TxtAlternateEmailAddress').val();
	var file_name = PathOfImg.substring(PathOfImg.lastIndexOf('\\') + 1);
	if (PathOfImg != "") {

		var frontfile_Size = document.getElementById('FrontImgOfCard').files[0].size;
		const fileSize = Math.round((frontfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	else {
		PathOfImg = FrontFileStatus;
	}
	if (PathOfBackImg != "") {

		var backfile_Size = document.getElementById('BackImgOfCard').files[0].size;
		const fileSize = Math.round((backfile_Size / 1024));
		// The size of the file.
		if (fileSize >= 4096) {
			alert(
				"File size limit: 4MB");
			return;
		}
	}
	else {
		PathOfBackImg = BackFileStatus;
	}
	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Select Company Name.');
		$('#TxtCompanyName').focus();
		return;
	}
	else if (ClientName == "") {
		$('.help-block').html('');
		$('#ClientNameDIV').addClass('has-error');
		$('#ErrorForClientName').html('Enter Client Name.');
		$('#TxtClientName').focus();
		return;
	}
	else if (Source == "") {
		$('.help-block').html('');
		$('#SourceDIV').addClass('has-error');
		$('#ErrorForSource').html('Select Owner Name.');
		$('#TxtSource').focus();
		return;
	}
	if (CompanyName != "" && ClientName != "" && Category != "" && Source != "" && TypeOfLead != "" && ProductName != "" && LeadSource != "" && Reference != "" && PathOfBackImg != "" && PathOfImg != "" && ProjectType != "") {
		$("#nevigateToEditClientDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToEditClientDetails").css("border", "2px solid #3c8dbc");
	}
	if (SpokesName != "" && SpokesMobileNumber != "" && SpokesEmailAddress != "" && SpokesAddress != "" && AlternateSpokesName != "" && AlternateSpokesMobile != "" && AlternateEmailAddress != "") {
		$("#nevigateToEditContactDetails").css("border", "2px solid #00a65a");
	}
	else {
		$("#nevigateToEditContactDetails").css("border", "2px solid #3c8dbc");
	}
	$("#LeadForm").css("display", "none");
	$("#ProjectDetails").css("display", "block");
	$("#ContactDetails").css("display", "none");
	$("#LeadTable").css("display", "none");
	$("#boxTitle").text('Project Details');

	document.querySelector("#edit-client-tooltip-text").classList.remove("hidden");
	document.querySelector("#edit-contact-tooltip-text").classList.remove("hidden");
	document.querySelector("#edit-project-tooltip-text").classList.add("hidden");

	$("#nevigateToEditClientDetails").text('1');
	$("#nevigateToEditContactDetails").text('2');
	$("#nevigateToEditProjectDetails").text('Project Details');
	$("#nevigateToEditProjectDetails").css("border", "2px solid #3c8dbc");
	$("#nevigateToEditClientDetailsDiv").css("width", "5%");
	$("#nevigateToEditContactDetailsDiv").css("width", "5%");
	$("#nevigateToEditProjectDetailsDiv").css("width", "12%");

	var nevigateToEditClientDetails = document.getElementById("nevigateToEditClientDetails");
	var nevigateToEditContactDetails = document.getElementById("nevigateToEditContactDetails");
	var nevigateToEditProjectDetails = document.getElementById("nevigateToEditProjectDetails");
	nevigateToEditClientDetails.classList.remove("NevigateActiveBtn");
	nevigateToEditClientDetails.classList.add("NevigateBtn");
	nevigateToEditContactDetails.classList.remove("NevigateActiveBtn");
	nevigateToEditContactDetails.classList.add("NevigateBtn");
	nevigateToEditProjectDetails.classList.remove("NevigateBtn");
	nevigateToEditProjectDetails.classList.add("NevigateActiveBtn");
}
function showCompanyList() {
	debugger;
	var showCompanyIcon = document.getElementById('showCompanyIcon');
	var showCategoryIcon = document.getElementById('showCategoryIcon');
	var showPriorityIcon = document.getElementById('showPriorityIcon');
	var showAssignToIcon = document.getElementById('showAssignToIcon');
	showCategoryIcon.classList.remove('fa-angle-up');
	showCategoryIcon.classList.add('fa-angle-down');
	showPriorityIcon.classList.remove('fa-angle-up');
	showPriorityIcon.classList.add('fa-angle-down');
	showAssignToIcon.classList.remove('fa-angle-up');
	showAssignToIcon.classList.add('fa-angle-down');
	$('#FilterByCategoryBody').css('display', 'none');
	$('#FilterByPriorityBody').css('display', 'none');
	$('#FilterByAssignedToBody').css('display', 'none');
	if (showCompanyIcon.classList.contains('fa-angle-down')) {
		showCompanyIcon.classList.remove('fa-angle-down');
		showCompanyIcon.classList.add('fa-angle-up');
	}
	else{
		showCompanyIcon.classList.remove('fa-angle-up');
		showCompanyIcon.classList.add('fa-angle-down');
	}
	$('#FilterByCompanyBody').toggle();
}
function showCategoryList() {
	$('#FilterByCategoryBody').toggle();
	var showCompanyIcon = document.getElementById('showCompanyIcon');
	var showCategoryIcon = document.getElementById('showCategoryIcon');
	var showPriorityIcon = document.getElementById('showPriorityIcon');
	var showAssignToIcon = document.getElementById('showAssignToIcon');
	showCompanyIcon.classList.remove('fa-angle-up');
	showCompanyIcon.classList.add('fa-angle-down');
	showPriorityIcon.classList.remove('fa-angle-up');
	showPriorityIcon.classList.add('fa-angle-down');
	showAssignToIcon.classList.remove('fa-angle-up');
	showAssignToIcon.classList.add('fa-angle-down');
	$('#FilterByCompanyBody').css('display', 'none');
	$('#FilterByPriorityBody').css('display', 'none');
	$('#FilterByAssignedToBody').css('display', 'none');
	if (showCategoryIcon.classList.contains('fa-angle-down')) {
		showCategoryIcon.classList.remove('fa-angle-down');
		showCategoryIcon.classList.add('fa-angle-up');
	}
	else{
		showCategoryIcon.classList.remove('fa-angle-up');
		showCategoryIcon.classList.add('fa-angle-down');
	}
}
function showPriorityList() {
	$('#FilterByPriorityBody').toggle();
	var showCompanyIcon = document.getElementById('showCompanyIcon');
	var showCategoryIcon = document.getElementById('showCategoryIcon');
	var showPriorityIcon = document.getElementById('showPriorityIcon');
	var showAssignToIcon = document.getElementById('showAssignToIcon');
	showCompanyIcon.classList.remove('fa-angle-up');
	showCompanyIcon.classList.add('fa-angle-down');
	showCategoryIcon.classList.remove('fa-angle-up');
	showCategoryIcon.classList.add('fa-angle-down');
	showAssignToIcon.classList.remove('fa-angle-up');
	showAssignToIcon.classList.add('fa-angle-down');
	$('#FilterByCompanyBody').css('display', 'none');
	$('#FilterByCategoryBody').css('display', 'none');
	$('#FilterByAssignedToBody').css('display', 'none');
	if (showPriorityIcon.classList.contains('fa-angle-down')) {
		showPriorityIcon.classList.remove('fa-angle-down');
		showPriorityIcon.classList.add('fa-angle-up');
	}
	else{
		showPriorityIcon.classList.remove('fa-angle-up');
		showPriorityIcon.classList.add('fa-angle-down');
	}
}
function showAssignedToList() {
	$('#FilterByAssignedToBody').toggle();
	var showCompanyIcon = document.getElementById('showCompanyIcon');
	var showCategoryIcon = document.getElementById('showCategoryIcon');
	var showPriorityIcon = document.getElementById('showPriorityIcon');
	var showAssignToIcon = document.getElementById('showAssignToIcon');
	showCompanyIcon.classList.remove('fa-angle-up');
	showCompanyIcon.classList.add('fa-angle-down');
	showCategoryIcon.classList.remove('fa-angle-up');
	showCategoryIcon.classList.add('fa-angle-down');
	showPriorityIcon.classList.remove('fa-angle-up');
	showPriorityIcon.classList.add('fa-angle-down');
	$('#FilterByCompanyBody').css('display', 'none');
	$('#FilterByCategoryBody').css('display', 'none');
	$('#FilterByPriorityBody').css('display', 'none');
	if (showAssignToIcon.classList.contains('fa-angle-down')) {
		showAssignToIcon.classList.remove('fa-angle-down');
		showAssignToIcon.classList.add('fa-angle-up');
	}
	else{
		showAssignToIcon.classList.remove('fa-angle-up');
		showAssignToIcon.classList.add('fa-angle-down');
	}
}
function FilterLeadDetails() {
	debugger;
	comapnyIdsValues = [];
	categoryIdValue = [];
	assignedIdValue = [];
	PriorityList = [];
	// Iterate over the checkboxes with the 'checkbox' class
	$(".CompanyModelList:checked").each(function () {
		comapnyIdsValues.push($(this).val());
	});
	$(".LeadCategoryDetails:checked").each(function () {
		categoryIdValue.push($(this).val());
	});
	$(".AssignToDetails:checked").each(function () {
		assignedIdValue.push($(this).val());
	});
	$(".PriorityList:checked").each(function () {
		PriorityList.push('\''+$(this).val()+'\'');
	});
	// Join the selected values into a comma-separated string
	var condition = "";
	var whereCompanyId = comapnyIdsValues.join(",");
	var whereCompanyId = comapnyIdsValues.join(","); 
	var whereCategoryId = categoryIdValue.join(",");
	var whereAssignedToId = assignedIdValue.join(",");
	var wherePriorityListId = PriorityList.join(",");
	
	FilterDataTable(whereCompanyId, whereCategoryId, whereAssignedToId, wherePriorityListId);
}
function resetFilter(){
	$('.CompanyModelList').prop('checked', false);
	$('.LeadCategoryDetails').prop('checked', false);
	$('.AssignToDetails').prop('checked', false);
	$('.PriorityList').prop('checked', false);
	comapnyIdsValues = [];
	categoryIdValue = [];
	assignedIdValue = [];
	PriorityList = [];
	$('#CountOfCompanyFilter').hide();
	$('#CountOfCategoryFilter').hide();
	$('#CountOfAssignToFilter').hide();
	$('#CountOfPriorityFilter').hide();
	refreshDataTable(0);
}

function CompanyFilterCount() {
	debugger;
	var checkedCheckboxes = $('.CompanyModelList:checked');
	var countOfCheckedCompanyCheckbox = checkedCheckboxes.length;
	if (checkedCheckboxes.length > 0) {
		$('#CountOfCompanyFilter').text(countOfCheckedCompanyCheckbox);
		$('#CountOfCompanyFilter').show();
	}
	else {
		$('#CountOfCompanyFilter').hide();
    }
	
}
function CategoryFilterCount() {
	debugger;
	var checkedCheckboxes = $('.LeadCategoryDetails:checked');
	var countOfCheckedCategoryCheckbox = checkedCheckboxes.length;
	if (checkedCheckboxes.length > 0) {
		$('#CountOfCategoryFilter').text(countOfCheckedCategoryCheckbox);
		$('#CountOfCategoryFilter').show();
	} else {
		$('#CountOfCategoryFilter').hide();
    }
}
function AssignToFilterCount() {
	debugger;
	var checkedCheckboxes = $('.AssignToDetails:checked');
	var countOfCheckedAssignToCheckbox = checkedCheckboxes.length;
	if (checkedCheckboxes.length > 0) {
		$('#CountOfAssignToFilter').text(countOfCheckedAssignToCheckbox);
		$('#CountOfAssignToFilter').show();
	} else {
		$('#CountOfAssignToFilter').hide();
	}
}
function PriorityFilterCount() {
	debugger;
	var checkedCheckboxes = $('.PriorityList:checked');
	var countOfCheckedPriorityCheckbox = checkedCheckboxes.length;
	if (checkedCheckboxes.length > 0) {
		$('#CountOfPriorityFilter').text(countOfCheckedPriorityCheckbox);
		$('#CountOfPriorityFilter').show();
	} else {
		$('#CountOfPriorityFilter').hide();
	}
}

function getCountOfUnseenNotification(UserId) {
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'Notification/GetCountOfUnSeenNotification',
		data: JSON.stringify({ UserId: UserId }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				debugger;
				var count = return_Data.TotalUnseenNotification;
				if (count != 0) {
					$("#countOfUnseenNotification").text(count);
				}

			}

		}
	});

}
function RecentNotificationDetails(UserId) {
	debugger;
	document.body.style.paddingRight = '0px';
	$.ajax({
		type: "POST",
		url: ServerURL + 'Notification/RecentNotificationDetails',
		data: JSON.stringify({ UserId: UserId }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			}
			else if (return_Data.n == 1) {
				$("#modalbody").html(return_Data.NotificationList);
			} else {

			}

		}
	});
}
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
	var target = event.target;
	if (target.tagName === "A") {
		var value = target.getAttribute("data-value");
		document.getElementById("TxtClientName").value = value;
		$('.dropdown-content a').css('display', 'none');
	}
});
function filterFunction() {
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

function showFavLead() {
	debugger;
	var targetClass = "fa fa-star";
	$("#TableLead tbody tr").filter(function () {
		return !$(this).find("td:eq(0) i").hasClass(targetClass);
	}).hide();
};
function closeRemarkModal(id) {
	var selectElement = document.getElementById("DrpStatusType_" + id);
	var valueAttribute = selectElement.getAttribute("value");
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	var selectElement = document.getElementById("DrpStatusType_" + id);
	if (valueAttribute == "--Select Status--") {
		selectElement.value = "";
	}
	else {
		selectElement.value = valueAttribute;
	}

	bootbox.hideAll();
}


