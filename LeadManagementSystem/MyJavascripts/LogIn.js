$(document).keypress(function (e) {
	$(".form-group").removeClass('has-error');
	$(".txtdiv").removeClass('has-error');
	$(".form-group > span").html('');
});

function LogIn() {
	debugger;
	var UserName = $("#TxtUserName").val().trim();
	var Password = $("#TxtUserPassword").val().trim();

	if (UserName == "") {
		$('.help-block').html('');
		$('#DivUserName').addClass('has-error');
		$('#errorForUserName').html('Please enter valid user name.');
		$('#TxtUserName').focus();
		return;
	}
	else if (Password == "") {
		$('.help-block').html('');
		$('#DivPassword').addClass('has-error');
		$('#errorForUserPassword').html('Please enter valid password.');
		$('#TxtUserPassword').focus();
		return;
	}
	else {
		var formdata = new FormData();
		formdata.append("username", UserName);
		formdata.append("Password", Password);
		$.ajax({
			type: "POST",
			url: ServerURL + 'LogIn/Login',
			data: formdata,
			processData: false,
			contentType: false,
			beforeSend: function () {
				$('#btnlogin').attr('disabled', true);
				var loader = "<i class='fa fa-spinner fa-spin'></i>Please wait..";
				$('#btnlogin').html(loader);
			},
			success: function (return_Data) {
				debugger;
				if (return_Data.n == 1) {
					window.location.href = ServerURL + "Dashboard/Index";
				} else if (return_Data.n == 0) {
					$('#error-message').html("Invalid Credentials")
				}
				else {
					$('#error-message').html("Invalid Credentials")
				}
			},
			complete: function () {
				$('#btnlogin').removeAttr('disabled');
				$('#btnlogin').html('Login');
			}
		});
	}
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#TxtUserPassword');

togglePassword.addEventListener('click', function (e) {
	debugger;
	var Password = $("#TxtUserPassword").val().trim();
	if (Password != "") {
		// toggle the type attribute
		const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
		password.setAttribute('type', type);
		// toggle the eye slash icon
		this.classList.toggle('fa-eye-slash');
    }
});