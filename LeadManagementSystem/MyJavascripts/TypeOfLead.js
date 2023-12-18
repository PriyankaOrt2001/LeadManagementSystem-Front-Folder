function SaveFormData() {
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var CategoryName = $("#TxtCategory").val().trim();
	var TypeOfLead = $("#TxtSubCategoryName").val().trim();

	if (CategoryName == "") {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Select category.');
		$('#TxtCategory').focus();
		return;
	} else if (TypeOfLead == "") {
		$('.help-block').html('');
		$('#SubCategoryNameDIV').addClass('has-error');
		$('#ErrorForSubCategoryName').html('Enter sub category Name.');
		$('#TxtSubCategoryName').focus();
		return;
	} else if (!onlyText.test(TypeOfLead)) {
		$('.help-block').html('');
		$('#SubCategoryNameDIV').addClass('has-error');
		$('#ErrorForSubCategoryName').html('Enter valid sub category Name.');
		$('#TxtSubCategoryName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Category_Id", CategoryName);
	formdata.append("SubCategory", TypeOfLead);
	$.ajax({
		type: "POST",
		url: ServerURL + '/TypeOfLead/AddSubCategory',
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
	$("#TxtCategory").val('');
	$("#TxtSubCategoryName").val('');
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
function RemoveSubCategory(element) {
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
					url: ServerURL + '/TypeOfLead/DeleteSubCategory',
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
function EditSubCategory(id) {
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	$.ajax({
		type: "POST",
		url: ServerURL + 'TypeOfLead/ViewSubCategoryDetails',
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
				$('#TxtSubCategoryName').val(return_Data.SubCategory);
				$('#boxTitle').text('Update Sub Category Details');
				$('#btnSave').text('Update');
				$('#btnSave').attr('onclick', 'UpdateSubCategory(' + id + ');');
			}
		}
	});
}
function UpdateSubCategory(id) {
	var activePageElement = $('.paginate_button.active');
	var aTag = activePageElement.find('a')
	var dataDtIdxValue = aTag.data('dt-idx');
	var pageId = dataDtIdxValue - 1;
	console.log(pageId);
	debugger;
	var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //To check Email ID
	var onlyText = /^[a-zA-Z0-9\s-]*$/;
	var CategoryName = $("#TxtCategory").val().trim();
	var TypeOfLead = $("#TxtSubCategoryName").val().trim();

	if (CategoryName == "") {
		$('.help-block').html('');
		$('#CategoryNameDIV').addClass('has-error');
		$('#ErrorForCategoryName').html('Select category.');
		$('#TxtCategory').focus();
		return;
	} else if (TypeOfLead == "") {
		$('.help-block').html('');
		$('#SubCategoryNameDIV').addClass('has-error');
		$('#ErrorForSubCategoryName').html('Enter sub category name.');
		$('#TxtSubCategoryName').focus();
		return;
	} else if (!onlyText.test(TypeOfLead)) {
		$('.help-block').html('');
		$('#SubCategoryNameDIV').addClass('has-error');
		$('#ErrorForSubCategoryName').html('Enter valid sub category name.');
		$('#TxtSubCategoryName').focus();
		return;
	}
	var formdata = new FormData();
	formdata.append("Category_Id", CategoryName);
	formdata.append("SubCategory", TypeOfLead);
	formdata.append("SubCategory_ID", id);
	$.ajax({
		type: "POST",
		url: ServerURL + '/TypeOfLead/UpdateSubCategory',
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
				$('#btnSave').text('Update');
				refreshDataTable(pageId);
			}
		},
		complete: function () {
			$('#btnSave').removeAttr("disabled");
		}
	});
}
