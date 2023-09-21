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
    public class EmployeeController : Controller
    {
        ResponseStatusModel rm = new ResponseStatusModel();
        public ActionResult Index()
        {
            if (Session["AuthToken"] != null)
            {
                return View();
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult EmployeeTablePartial()
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                AssignToModel lcm = new AssignToModel();
                AssignToDetails cd = new AssignToDetails();
                var result = JsonConvert.DeserializeObject<AssignToModel>(LMSTransaction.get("GetAssignToList", Session["AuthToken"].ToString()).Content);
                lcm.AssignToList = result.AssignToList;
                return PartialView("EmployeeTablePartial", lcm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }

        }
        public ActionResult AddNewEmployee(AssignToDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddNewEmployee", ld, Session["AuthToken"].ToString()).Content);
                    rm = result;
                }
                else
                {
                    rm.n = 5;
                    rm.msg = "Session Expired";
                }
            }
            catch (Exception ex)
            {
                rm.RStatus = "Error";
                rm.msg = "Some error occured while processing your request, Please try again later";
                rm.n = 0;
            }
            return Json(rm, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteEmployee(string id)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveEmployee?id=" + id, Session["AuthToken"].ToString()).Content);
                    rm = result;
                }
                else
                {
                    rm.n = 5;
                    rm.msg = "Session Expired";
                }
            }
            catch (Exception ex)
            {
                rm.RStatus = "Error";
                rm.msg = "Some error occured while processing your request, Please try again later";
                rm.n = 0;
            }
            return Json(rm, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ViewAssignToDetails(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    AssignToDetails ld = new AssignToDetails();
                    var result = JsonConvert.DeserializeObject<AssignToDetails>(LMSTransaction.get("ViewAssignToDetails?Employee_Id=" + id, Session["AuthToken"].ToString()).Content);
                    ld = result;
                    return Json(ld, JsonRequestBehavior.AllowGet);

                }

                else
                {
                    rm.n = 5;
                    rm.msg = "Session Expired";
                    return Json(rm, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                rm.RStatus = "Error";
                rm.msg = "Some error occured while processing your request, Please try again later";
                rm.n = 0;
            }
            return Json(rm, JsonRequestBehavior.AllowGet);

        }
        public ActionResult UpdateEmployee(AssignToDetails ad)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ad.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateEmployee", ad, Session["AuthToken"].ToString()).Content);
                    rm = result;
                }
                else
                {
                    rm.n = 5;
                    rm.msg = "Session Expired";
                }
            }
            catch (Exception ex)
            {
                rm.RStatus = "Error";
                rm.msg = "Some error occured while processing your request, Please try again later";
                rm.n = 0;
            }
            return Json(rm, JsonRequestBehavior.AllowGet);
        }
    }
}