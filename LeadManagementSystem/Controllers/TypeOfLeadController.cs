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
    public class TypeOfLeadController : Controller
    {
        ResponseStatusModel rm = new ResponseStatusModel();
        public ActionResult Index()
        {
            if (Session["AuthToken"] != null)
            {
                var leadCategoryList = JsonConvert.DeserializeObject<LeadCategoryModel>(LMSTransaction.get("GetLeadCategoryList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadCategoryDetails> LeadCategoryDetails = leadCategoryList.LeadCategoryList;
                var leadCategoryNames = "";
                foreach (var LeadCategory in LeadCategoryDetails)
                {
                    leadCategoryNames += "<option value='" + LeadCategory.Category_Id + "'>" + LeadCategory.Category_Name + "</option>";
                }
                ViewBag.CategoryModelList = leadCategoryNames;
                return View();
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
            
        }
        public ActionResult TypeOfLeadTablePartial()
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                TypeOfLeadModel lm = new TypeOfLeadModel();
                TypeOfLeadDetails cd = new TypeOfLeadDetails();
                var result = JsonConvert.DeserializeObject<TypeOfLeadModel>(LMSTransaction.get("GetLeadTypesList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                lm.TypeOfLeadList = result.TypeOfLeadList;
                return PartialView("TypeOfLeadTablePartial", lm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
            
        }
        public ActionResult AddTypeOfLead(TypeOfLeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddTypeOfLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult DeleteTypeOfLead(string id)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveTypeOfLead?id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult ViewTypeOfLeadDetails(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    TypeOfLeadDetails ld = new TypeOfLeadDetails();
                    var result = JsonConvert.DeserializeObject<TypeOfLeadDetails>(LMSTransaction.get("ViewTypeOfLeadDetails?TypeOfLead_ID=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateTypeOfLead(TypeOfLeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateTypeOfLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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