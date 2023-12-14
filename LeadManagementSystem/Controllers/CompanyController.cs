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
    public class CompanyController : Controller
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
        public ActionResult CompanyTablePartial()
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                CompanyModel lm = new CompanyModel();
                CompanyDetails cd = new CompanyDetails();
                var result = JsonConvert.DeserializeObject<CompanyModel>(LMSTransaction.get("GetCompanyList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                lm.CompanyList = result.CompanyList;
                return PartialView("CompanyTablePartial", lm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
            
        }
        public ActionResult AddCompany(CompanyDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddNewComapny", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult DeleteCompany(string id)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveCompany?id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult ViewCompanyDetails(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    CompanyDetails ld = new CompanyDetails();
                    var result = JsonConvert.DeserializeObject<CompanyDetails>(LMSTransaction.get("ViewCompanyDetails?Company_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateCompany(CompanyDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateCompany", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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