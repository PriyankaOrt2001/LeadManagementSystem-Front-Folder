function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/ //For number
	var PlanName = $("#TxtPlanName").val().trim();
	var PlanPrice = $("#TxtPlanPrice").val().trim();
	if (PlanName == "") {
		$('.help-block').html('');
		$('#PlanNameDIV').addClass('has-error');
		$('#ErrorForPlanName').html('Enter Plan Name.');
		$('#TxtPlanName').focus();
		return;
	} else if (!onlyText.test(PlanName)) {
		$('.help-block').html('');
		$('#PlanNameDIV').addClass('has-error');
		$('#ErrorForPlanName').html('Enter valid Plan Name.');
		$('#TxtPlanName').focus();
		return;
	}
	else if (PlanPrice == "") {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter Plan Price.');
		$('#TxtPlanPrice').focus();
		return;
	} else if (PlanPrice == "0") {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter valid Plan Price.');
		$('#TxtPlanPrice').focus();
		return;
	}
	else if (!numberRegex.test(PlanPrice)) {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter valid Plan Price.');
		$('#TxtPlanPrice').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Plan_Name", PlanName);
	formdata.append("Plan_Price", PlanPrice);
	$.ajax({
		type: "POST",
		url: ServerURL + '/PlanDetail/AddNewPlan',
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

$(document).keypress(function (e) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});
function ResetFormData() {
	$("#TxtPlanName").val('');
	$("#TxtPlanPrice").val('');
	$('#boxTitle').text('Add Plan Details');
	$('#btnSave').text('Save');
	$('#btnSave').attr('onclick', 'SaveFormData();');
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
}
function RemovePlan(element) {
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
					url: ServerURL + '/PlanDetail/DeletePlan',
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
				bootbox.hideAll();
			}
		}
	});
}
function EditPlan(id) {
	debugger;
	$.ajax({
		type: "POST",
		url: ServerURL + 'PlanDetail/ViewPlanDetails',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$("#TxtPlanName").val(return_Data.Plan_Name);
				$("#TxtPlanPrice").val(return_Data.Plan_Price);

				$('#boxTitle').text('Update Plan');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdatePlan(' + id + ');');
			}
		}
	});
}
function UpdatePlan(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/ //For number
	var PlanName = $("#TxtPlanName").val().trim();
	var PlanPrice = $("#TxtPlanPrice").val().trim();
	if (PlanName == "") {
		$('.help-block').html('');
		$('#PlanNameDIV').addClass('has-error');
		$('#ErrorForPlanName').html('Enter Plan Name.');
		$('#TxtPlanName').focus();
		return;
	} else if (!onlyText.test(PlanName)) {
		$('.help-block').html('');
		$('#PlanNameDIV').addClass('has-error');
		$('#ErrorForPlanName').html('Enter valid Plan Name.');
		$('#TxtPlanName').focus();
		return;
	}
	else if (PlanPrice == "") {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter Plan Price.');
		$('#TxtPlanPrice').focus();
		return;
	}
	else if (PlanPrice == "0") {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter valid Plan Price.');
		$('#TxtPlanPrice').focus();
		return;
	}
	else if (!numberRegex.test(PlanPrice)) {
		$('.help-block').html('');
		$('#PlanPriceDIV').addClass('has-error');
		$('#ErrorForPlanPrice').html('Enter valid Plan Price.');
		$('#TxtPlanPrice').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Plan_Name", PlanName);
	formdata.append("Plan_Price", PlanPrice);
	formdata.append("Plan_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/PlanDetail/UpdatePlan',
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
		}
	});
}
