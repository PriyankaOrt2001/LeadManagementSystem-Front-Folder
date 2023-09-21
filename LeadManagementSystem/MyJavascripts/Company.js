function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*\\$/; //To check value contains text only
	var CompanyName = $("#TxtCompanyName").val().trim();

	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompanyNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Please enter Company Name.');
		$('#TxtCompanyName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Company_Name", CompanyName);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Company/AddCompany',
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
	$("#TxtCompanyName").val('');

	$('#boxTitle').text('Add Company');
	$('#btnSave').text('Save');
	$('#btnSave').attr('onclick', 'SaveFormData();');
}

$(document).keypress(function (e) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
function RemoveCompany(element) {
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
					url: ServerURL + '/Company/DeleteCompany',
					data: JSON.stringify({ id: id }),
					contentType: 'application/json; charset=utf-8',
					success: function (return_Data) {
						if (return_Data.n == 5) {
							window.location.href = "/LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							refreshDataTable();
							bootbox.alert(return_Data.msg);
						}
						else if (return_Data.n == 0) {
							bootbox.alert(return_Data.msg);
							refreshDataTable();
						}
					}
				});
			}
			else {
				window.location.href = "/Company/Index";
			}
		}
	});
}
function EditCompany(id) {

	$.ajax({
		type: "POST",
		url: ServerURL + 'Company/ViewCompanyDetails',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtCompanyName').val(return_Data.Company_Name);
				$('#boxTitle').text('Update Company Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateCompany(' + id + ');');

			}

		}
	});

}
function UpdateCompany(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*\\$/; //To check value contains text only
	var CompanyName = $("#TxtCompanyName").val().trim();

	if (CompanyName == "") {
		$('.help-block').html('');
		$('#CompanyNameDIV').addClass('has-error');
		$('#ErrorForCompanyName').html('Please enter Company Name.');
		$('#TxtCompanyName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Company_Name", CompanyName);
	formdata.append("Company_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Company/UpdateCompany',
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