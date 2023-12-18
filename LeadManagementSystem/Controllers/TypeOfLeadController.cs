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
            if (Session["AuthToken"] != null)
            {
                SubCategoryModel lm = new SubCategoryModel();
                SubCategoryDetails cd = new SubCategoryDetails();
                var result = JsonConvert.DeserializeObject<SubCategoryModel>(LMSTransaction.get("GetSubCategoryList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                lm.SubCategoryList = result.SubCategoryList;
                return PartialView("TypeOfLeadTablePartial", lm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult AddSubCategory(SubCategoryDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddSubCategory", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult DeleteSubCategory(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveSubCategory?id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult ViewSubCategoryDetails(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    SubCategoryDetails ld = new SubCategoryDetails();
                    var result = JsonConvert.DeserializeObject<SubCategoryDetails>(LMSTransaction.get("ViewSubCategoryDetails?SubCategory_ID=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateSubCategory(SubCategoryDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateSubCategory", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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