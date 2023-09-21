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
    public class DashboardController : Controller
    {
        ResponseStatusModel rm = new ResponseStatusModel();
        // GET: Dashboard
        public ActionResult Index()
        {
            if (Session["AuthToken"] != null)
            {
                var result = JsonConvert.DeserializeObject<DashboardModel>(LMSTransaction.get("GetCountsForDashboard", Session["AuthToken"].ToString()).Content);
                ViewBag.TotalLeads = result.TotalLeads;
                ViewBag.OpenLeads = result.OpenLeadsCount;
                ViewBag.ClosedLeads = result.ClosedLeadsCount;
                ViewBag.OnHold = result.HoldLeadsCount;
                ViewBag.ConvertedLeads = result.ConvertedLeadsCount;
                ViewBag.GhostLeads = result.GhostLeadsCount;
                LeadModel lm = new LeadModel();
                var leadDetails = JsonConvert.DeserializeObject<LeadModel>(LMSTransaction.get("GetRecentLeadDetailsList", Session["AuthToken"].ToString()).Content);
                lm.LeadList = leadDetails.LeadList;
                ViewBag.LineChartData = result.LeadList;
                return View("Index", lm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
    }
}