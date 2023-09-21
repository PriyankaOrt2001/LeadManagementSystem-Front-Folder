using LeadManagementSystem.MODEL;
using LeadManagementSystem.MyServices;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeadManagementSystem.Controllers
{
    public class LogInController : Controller
    {
        ResponseStatusModel rm = new ResponseStatusModel();
        // GET: LogIn
        public ActionResult LogInForm()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username,string password)
        {
            LoginModel crm = new LoginModel();
            crm.IpAddress = Request.UserHostAddress;
            crm.UserName = username;
            crm.Password = password;
            var result = JsonConvert.DeserializeObject<UserResponseModelViewModel>(LMSTransaction.post("login", crm, null).Content);
            rm = result.response;
            rm.UserID = result.usermodel.UserID.ToString();
            rm.UserName = result.usermodel.UserName;
            rm.AuthToken = result.usermodel.Token;


            if (rm != null && rm.n == 1)
            {
                Session["Admin_ID"] = rm.UserID;
                Session["AdminUname"] = rm.UserName;
                Session["AuthToken"] = rm.AuthToken;
                Session["toAddLead"] = null;

                HttpCookie myCookie1 = new HttpCookie("Admin_ID", Convert.ToString(Session["Admin_ID"]));
                myCookie1.Expires = DateTime.Now.AddDays(2);
                Response.Cookies.Add(myCookie1);

                HttpCookie myCookie2 = new HttpCookie("AdminUSERNAME", Convert.ToString(Session["AdminUname"]));
                myCookie2.Expires = DateTime.Now.AddDays(2);
                Response.SetCookie(myCookie2);
            }
            return Json(rm, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            if (Session["Admin_ID"] != null)
            {
                var UserId = Session["Admin_ID"];
                var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("logout?UserId=" + UserId, Session["AuthToken"].ToString()).Content);
                rm = result;

                Session.Abandon();
                Session.Clear();
                Session.RemoveAll();

                HttpCookie myCookie1 = new HttpCookie("Admin_ID");
                myCookie1.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(myCookie1);

                HttpCookie myCookie2 = new HttpCookie("AdminUSERNAME");
                myCookie2.Expires = DateTime.Now.AddDays(-1);
                Response.SetCookie(myCookie2);

                rm.n = 1;

            }
            return Json(rm, JsonRequestBehavior.AllowGet);

        }
    }
}