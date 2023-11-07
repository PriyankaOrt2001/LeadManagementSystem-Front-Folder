function RemoveLeadSource(element) {
	bootbox.confirm({
		message: "Do You want to remove this record ?",
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
					url: ServerURL + 'Source/DeleteLeadSource',
					data: JSON.stringify({ id: id }),
					contentType: 'application/json; charset=utf-8',
					success: function (return_Data) {
						debugger;
						if (return_Data.n == 5) {
							window.location.href = "/LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							refreshDataTable();
							bootbox.alert(return_Data.msg);
						}
						else if (return_Data.n == 0) {
							debugger;
							bootbox.alert(return_Data.msg);
							refreshDataTable();
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
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var LeadSourceName = $("#TxtLeadSourceName").val().trim();

	if (LeadSourceName == "") {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Please enter Source Name.');
		$('#TxtLeadSourceName').focus();
		return;
	} else if (!onlyText.test(LeadSourceName)) {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Please enter valid Source Name.');
		$('#TxtLeadSourceName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Source_Name", LeadSourceName);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Source/AddNewSourceName',
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
				refreshDataTable();
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable();
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

	$('#boxTitle').text('Add Source Details');
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
function EditLeadSource(id) {
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'Source/ViewLeadSource',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtLeadSourceName').val(return_Data.Source_Name);

				$('#boxTitle').text('Update Source Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateLeadSource(' + id + ');');

			}

		}
	});

}
function UpdateLeadSource(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var LeadSourceName = $("#TxtLeadSourceName").val().trim();

	if (LeadSourceName == "") {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Please enter Source Name.');
		$('#TxtLeadSourceName').focus();
		return;
	} else if (!onlyText.test(LeadSourceName)) {
		$('.help-block').html('');
		$('#LeadSourceNameDIV').addClass('has-error');
		$('#ErrorForLeadSource').html('Please enter valid Source Name.');
		$('#TxtLeadSourceName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Source_Name", LeadSourceName);
	formdata.append("Source_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Source/UpdateLeadSource',
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
				refreshDataTable();
			} else {
				bootbox.alert(return_Data.msg);
				refreshDataTable();
			}
		},
		complete: function () {
			$('#btnSave').removeAttr("disabled");
			$('#btnSave').html('Save');
		}

	});

}
