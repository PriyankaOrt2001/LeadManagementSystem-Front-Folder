using LeadManagementSystem.MODEL;
using LeadManagementSystem.MyServices;
using LeadManagementSystem.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeadManagementSystem.Controllers
{
    [SessionOut]
    public class AssigneeController : Controller
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
        public ActionResult AssigneeTablePartial()
        {
            if (Session["AuthToken"] != null)
            {
                AssigneeModel lcm = new AssigneeModel();
                AssigneeDetails cd = new AssigneeDetails();
                var result = JsonConvert.DeserializeObject<AssigneeModel>(LMSTransaction.get("GetAssignToList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                lcm.AssigneeList = result.AssigneeList;
                return PartialView("AssigneeTablePartial", lcm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult AddNewAssignee(AssigneeDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddNewAssignee", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult DeleteAssignee(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveAssignee?id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
                    AssigneeDetails ld = new AssigneeDetails();
                    var result = JsonConvert.DeserializeObject<AssigneeDetails>(LMSTransaction.get("ViewAssignToDetails?Assignee_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateAssignee(AssigneeDetails ad)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ad.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateAssignee", ad, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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