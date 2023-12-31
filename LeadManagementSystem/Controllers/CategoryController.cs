﻿using LeadManagementSystem.MODEL;
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
    public class CategoryController : Controller
    {
        private  int GetSessionTimeoutFromConfig()
        {
            try
            {
                // Retrieve the session timeout value from httpRuntime in web.config
                var sessionStateSection = System.Web.Configuration.WebConfigurationManager.GetSection("system.web/sessionState") as System.Web.Configuration.SessionStateSection;
                if (sessionStateSection != null)
                {
                    int sessionTimeoutMinutes = (int)sessionStateSection.Timeout.TotalMinutes;
                    return sessionTimeoutMinutes;
                }
                return 30;
            }
            catch (Exception ex)
            {
                // Log or handle any exceptions
                Console.WriteLine($"Error retrieving session timeout: {ex.Message}");
                return 20; // Set your default value here
            }
        }
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
        public ActionResult CategoryTablePartial()
        {
            if (Session["AuthToken"] != null)
            {
                int sessionTimeoutMinutes = GetSessionTimeoutFromConfig();

                // Display the session timeout in the view
                ViewBag.SessionTimeout = sessionTimeoutMinutes;
                LeadCategoryModel lcm = new LeadCategoryModel();
                LeadCategoryDetails cd = new LeadCategoryDetails();
                var result = JsonConvert.DeserializeObject<LeadCategoryModel>(LMSTransaction.get("GetLeadCategoryList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                lcm.LeadCategoryList = result.LeadCategoryList;
                return PartialView("CategoryTablePartial", lcm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
            
        }
        public ActionResult ViewCategoryDetails(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    LeadCategoryDetails ld = new LeadCategoryDetails();
                    var result = JsonConvert.DeserializeObject<LeadCategoryDetails>(LMSTransaction.get("ViewCategoryDetails?Category_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult AddCategory(LeadCategoryDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddCategory", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult DeleteCategory(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveCategory?id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateCategory(LeadCategoryDetails cd)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    cd.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateCategory", cd, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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