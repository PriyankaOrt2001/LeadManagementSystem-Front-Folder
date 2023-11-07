function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var CategoryName = $("#TxtCategory").val().trim();
	var TypeOfLead = $("#TxtTypeOfLeadName").val().trim();

	if (CategoryName == "") {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Please select category.');
		$('#TxtCategory').focus();
		return;
	} else if (TypeOfLead == "") {
		$('.help-block').html('');
		$('#TypeOfLeadNameDIV').addClass('has-error');
		$('#ErrorForTypeOfLeadName').html('Please enter sub category Name.');
		$('#TxtTypeOfLeadName').focus();
		return;
	} else if (!onlyText.test(TypeOfLead)) {
		$('.help-block').html('');
		$('#TypeOfLeadNameDIV').addClass('has-error');
		$('#ErrorForTypeOfLeadName').html('Please enter valid sub category Name.');
		$('#TxtTypeOfLeadName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Category_Id", CategoryName);
	formdata.append("TypeOfLead", TypeOfLead);
	$.ajax({
		type: "POST",
		url: ServerURL + '/TypeOfLead/AddTypeOfLead',
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
	$("#TxtCategory").val('');
	$("#TxtTypeOfLeadName").val('');

	$('#boxTitle').text('Add Sub Category');
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

$("#TxtCategory").change(function () {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
function RemoveTypeOfLead(element) {
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
					url: ServerURL + '/TypeOfLead/DeleteTypeOfLead',
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
function EditTypeOfLead(id) {

	$.ajax({
		type: "POST",
		url: ServerURL + 'TypeOfLead/ViewTypeOfLeadDetails',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtCategory').val(return_Data.Category_Id);
				$('#TxtTypeOfLeadName').val(return_Data.TypeOfLead);

				$('#boxTitle').text('Update Sub Category Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateTypeOfLead(' + id + ');');

			}

		}
	});

}
function UpdateTypeOfLead(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var CategoryName = $("#TxtCategory").val().trim();
	var TypeOfLead = $("#TxtTypeOfLeadName").val().trim();

	if (CategoryName == "") {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Please select category.');
		$('#TxtCategory').focus();
		return;
	} else if (TypeOfLead == "") {
		$('.help-block').html('');
		$('#TypeOfLeadNameDIV').addClass('has-error');
		$('#ErrorForTypeOfLeadName').html('Please enter sub category name.');
		$('#TxtTypeOfLeadName').focus();
		return;
	} else if (!onlyText.test(TypeOfLead)) {
		$('.help-block').html('');
		$('#TypeOfLeadNameDIV').addClass('has-error');
		$('#ErrorForTypeOfLeadName').html('Please enter valid sub category name.');
		$('#TxtTypeOfLeadName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Category_Id", CategoryName);
	formdata.append("TypeOfLead", TypeOfLead);
	formdata.append("TypeOfLead_ID", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/TypeOfLead/UpdateTypeOfLead',
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
