function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*\\$/; //To check value contains text only
	var EmployeeName = $("#TxtEmployeeName").val().trim();

	if (EmployeeName == "") {
		$('.help-block').html('');
		$('#EmployeeNameDIV').addClass('has-error');
		$('#ErrorForEmployeeName').html('Please enter Employee Name.');
		$('#TxtEmployeeName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Employee_Name", EmployeeName);
	$.ajax({
		type: "POST",
		url: ServerURL + 'Employee/AddNewEmployee',
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
	$("#TxtEmployeeName").val('');

	$('#boxTitle').text('Add Employee Details');
	$('#btnSave').text('Save');
	$('#btnSave').attr('onclick', 'SaveFormData();');
}

$(document).keypress(function (e) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
function RemoveEmployee(element) {
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
					url: ServerURL + 'Employee/DeleteEmployee',
					data: JSON.stringify({ id: id }),
					contentType: 'application/json; charset=utf-8',
					success: function (return_Data) {
						debugger;
						if (return_Data.n == 5) {
							window.location.href = "/LogIn/LogInForm";
						}
						else if (return_Data.n == 1) {
							
							bootbox.alert(return_Data.msg);
							refreshDataTable();
						}
						else if (return_Data.n == 0) {
							bootbox.alert(return_Data.msg);
							refreshDataTable();
						}
					}
				});
			}
			else {
				window.location.href = "/Employee/Index";
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
				$('#TxtEmployeeName').val(return_Data.Employee_Name);
				$('#boxTitle').text('Update Employee Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateEmployee(' + id + ');');

			}

		}
	});

}
function UpdateEmployee(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*\\$/; //To check value contains text only
	var EmployeeName = $("#TxtEmployeeName").val().trim();

	if (EmployeeName == "") {
		$('.help-block').html('');
		$('#EmployeeNameDIV').addClass('has-error');
		$('#ErrorForEmployeeName').html('Please enter Employee Name.');
		$('#TxtEmployeeName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Employee_Name", EmployeeName);
	formdata.append("Employee_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + 'Employee/UpdateEmployee',
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
