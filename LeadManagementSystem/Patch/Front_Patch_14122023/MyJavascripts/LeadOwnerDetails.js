﻿function RemoveLeadOwner(element) {
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
					url: ServerURL + 'Source/DeleteLeadOwner',
					data: JSON.stringify({ id: id }),
					contentType: 'application/json; charset=utf-8',
					success: function (return_Data) {
						debugger;
						if (return_Data.n == 5) {
							window.location.href = "/LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							refreshDataTable(pageId);
							bootbox.alert(return_Data.msg);
						}
						else if (return_Data.n == 0) {
							debugger;
							bootbox.alert(return_Data.msg);
							refreshDataTable(pageId);
						}
					}
				});
			}
			else {
				window.location.href = "/Source/Index";
			}
		}
	});
}
function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z\s-]*$/;
	var LeadSourceName = $("#TxtLeadSourceName").val().trim();
	if (LeadSourceName == "") {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Enter Owner Name.');
		$('#TxtLeadSourceName').focus();
		return;
	} else if (!onlyText.test(LeadSourceName)) {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Enter valid Owner Name.');
		$('#TxtLeadSourceName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Owner_Name", LeadSourceName);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Source/AddNewLeadOwner',
		data: formdata,
		processData: false,
		contentType: false,
		beforeSend: function () {
			$('#btnSave').attr('disabled', true);
		},
		success: function (return_Data) {
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				$('#btnSave').removeAttr("disabled");
				$('#btnSave').html('Save');
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');
				ResetFormData();
				refreshDataTable(0);
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable(0);
			}
		},
		complete: function () {
			$('#btnSave').removeAttr("disabled");
			$('#btnSave').html('Save');
		}
	});
}

function ResetFormData() {
	$("#TxtLeadSourceName").val('');
	$('#boxTitle').text('Add Owner Details');
	$('#btnSave').text('Save');
	$('#btnSave').attr('onclick', 'SaveFormData();');
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
}

$(document).keypress(function (e) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
function EditLeadOwner(id) {
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'Source/ViewLeadOwner',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtLeadSourceName').val(return_Data.Owner_Name);
				$('#boxTitle').text('Update Owner Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateLeadOwner(' + id + ');');
			}
		}
	});
}
function UpdateLeadOwner(id) {
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z\s-]*$/;
	var LeadSourceName = $("#TxtLeadSourceName").val().trim();
	if (LeadSourceName == "") {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Enter Owner Name.');
		$('#TxtLeadSourceName').focus();
		return;
	} else if (!onlyText.test(LeadSourceName)) {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Enter valid Owner Name.');
		$('#TxtLeadSourceName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Owner_Name", LeadSourceName);
	formdata.append("Owner_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Source/UpdateLeadOwner',
		data: formdata,
		processData: false,
		contentType: false,
		beforeSend: function () {
			$('#btnSave').attr('disabled', true);
		},
		success: function (return_Data) {
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else if (return_Data.n == 1) {
				$('#btnSave').removeAttr("disabled");
				$('#btnSave').html('Save');
				bootbox.alert(return_Data.msg);
				$('div').removeClass('has-error');
				$('.help-block').html('');
				ResetFormData();
				refreshDataTable(pageId);
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable(pageId);
			}
		},
		complete: function () {
			$('#btnSave').removeAttr("disabled");
		}
	});
}
