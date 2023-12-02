function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z\s]*$/;
	var AssigneeName = $("#TxtEmployeeName").val().trim();

	if (AssigneeName == "") {
		$('.help-block').html('');
		$('#EmployeeNameDIV').addClass('has-error');
		$('#ErrorForEmployeeName').html('Enter Assignee Name.');
		$('#TxtEmployeeName').focus();
		return;
	} else if (!onlyText.test(AssigneeName)) {
		$('.help-block').html('');
		$('#EmployeeNameDIV').addClass('has-error');
		$('#ErrorForEmployeeName').html('Enter valid Assignee Name.');
		$('#TxtEmployeeName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Assignee_Name", AssigneeName);
	$.ajax({
		type: "POST",
		url: ServerURL + 'Employee/AddNewAssignee',
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
	$("#TxtEmployeeName").val('');
	$('#boxTitle').text('Add Assignee Details');
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
function RemoveEmployee(element) {
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
					url: ServerURL + 'Employee/DeleteAssignee',
					data: JSON.stringify({ id: id }),
					contentType: 'application/json; charset=utf-8',
					success: function (return_Data) {
						debugger;
						if (return_Data.n == 5) {
							window.location.href = "/LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							
							bootbox.alert(return_Data.msg);
							refreshDataTable(pageId);
						}
						else if (return_Data.n == 0) {
							bootbox.alert(return_Data.msg);
							refreshDataTable(pageId);
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
function EditEmployeeDetails(id) {
	$.ajax({
		type: "POST",
		url: ServerURL + 'Employee/ViewAssignToDetails',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtEmployeeName').val(return_Data.Assignee_Name);
				$('#boxTitle').text('Update Assignee Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateEmployee(' + id + ');');
			}
		}
	});

}
function UpdateEmployee(id) {
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z\s]*$/;
	var AssigneeName = $("#TxtEmployeeName").val().trim();
	if (AssigneeName == "") {
		$('.help-block').html('');
		$('#EmployeeNameDIV').addClass('has-error');
		$('#ErrorForEmployeeName').html('Enter Assignee Name.');
		$('#TxtEmployeeName').focus();
		return;
	} else if (!onlyText.test(AssigneeName)) {
		$('.help-block').html('');
		$('#EmployeeNameDIV').addClass('has-error');
		$('#ErrorForEmployeeName').html('Enter valid Assignee Name.');
		$('#TxtEmployeeName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Assignee_Name", AssigneeName);
	formdata.append("Assignee_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + 'Employee/UpdateAssignee',
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
			$('#btnSave').html('Save');
		}
	});
}
