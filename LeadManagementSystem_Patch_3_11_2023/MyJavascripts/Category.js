function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var CategoryName = $("#TxtCategoryName").val().trim();

	if (CategoryName == "") {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Please enter Category Name.');
		$('#TxtCategoryName').focus();
		return;
	}
	else if (!onlyText.test(CategoryName)) {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Please enter valid category name.');
		$('#TxtCategoryName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Category_Name", CategoryName);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Category/AddCategory',
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
	$("#TxtCategoryName").val('');

	$('#boxTitle').text('Add Category');
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
function RemoveCategory(element) {
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
					url: ServerURL + '/Category/DeleteCategory',
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
function EditCategory(id) {

	$.ajax({
		type: "POST",
		url: ServerURL + 'Category/ViewCategoryDetails',
		data: JSON.stringify({ id: id }),
		contentType: 'application/json; charset=utf-8',
		success: function (return_Data) {
			debugger;
			if (return_Data.n == 5) {
				bootbox.alert(return_Data.msg);
				window.location.href = "/LogIn/LogInForm";
			} else (return_Data != null)
			{
				$('#TxtCategoryName').val(return_Data.Category_Name);

				$('#boxTitle').text('Update Category');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateCategory(' + id + ');');

			}

		}
	});

}
function UpdateCategory(id) {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[A-Za-z\s]*$/; //To check value contains text only
	var CategoryName = $("#TxtCategoryName").val().trim();

	if (CategoryName == "") {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Please enter category name.');
		$('#TxtCategoryName').focus();
		return;
	} else if (!onlyText.test(CategoryName)) {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Please enter valid category name.');
		$('#TxtCategoryName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Category_Name", CategoryName);
	formdata.append("Category_Id", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/Category/UpdateCategory',
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
