﻿using LeadManagementSystem.MODEL;
using LeadManagementSystem.MyServices;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeadManagementSystem.Controllers
{
    public class SourceController : Controller
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
        public ActionResult LeadSourceTablePartial()
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                LeadSourceModel lcm = new LeadSourceModel();
                LeadSourceDetails cd = new LeadSourceDetails();
                var result = JsonConvert.DeserializeObject<LeadSourceModel>(LMSTransaction.get("GetLeadSourceList", Session["AuthToken"].ToString()).Content);
                lcm.LeadSourceDetails = result.LeadSourceDetails;
                return PartialView("LeadSourceTablePartial", lcm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }

        }
        public ActionResult DeleteLeadSource(string id)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveLeadSource?id=" + id, Session["AuthToken"].ToString()).Content);
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
        public ActionResult AddNewSourceName(LeadSourceDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddLeadSource", ld, Session["AuthToken"].ToString()).Content);
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
        public ActionResult ViewLeadSource(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    LeadSourceDetails ld = new LeadSourceDetails();
                    var result = JsonConvert.DeserializeObject<LeadSourceDetails>(LMSTransaction.get("ViewLeadSource?SourceId=" + id, Session["AuthToken"].ToString()).Content);
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
        public ActionResult UpdateLeadSource(LeadSourceDetails sd)
        {
            try
            {
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    sd.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateLeadSource", sd, Session["AuthToken"].ToString()).Content);
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