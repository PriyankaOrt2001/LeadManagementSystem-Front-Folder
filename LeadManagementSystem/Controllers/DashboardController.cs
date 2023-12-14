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
        public ActionResult Index()
        {
            if (Session["AuthToken"] != null)
            {
                var result = JsonConvert.DeserializeObject<DashboardModel>(LMSTransaction.get("GetCountsForDashboard", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                ViewBag.TotalLeads = result.TotalLeads;
                ViewBag.OpenLeads = result.OpenLeadsCount;
                ViewBag.ClosedLeads = result.ClosedLeadsCount;
                ViewBag.OnHold = result.HoldLeadsCount;
                ViewBag.ConvertedLeads = result.ConvertedLeadsCount;
                ViewBag.GhostLeads = result.GhostLeadsCount;
                ViewBag.TotalPriceOfTotalLeads = result.PriceOfTotalLeads;
                ViewBag.TotalPriceOfOpenLeads = result.PriceOfOpenLeads;
                ViewBag.TotalPriceOfClosedLeads = result.PriceOfClosedLeads;
                ViewBag.TotalPriceOfHoldLeads = result.PriceOfHoldLeads;
                ViewBag.TotalPriceOfConvertedLeads = result.PriceOfConvertedLeads;
                ViewBag.TotalPriceOfGhostLeads = result.PriceOfGhostLeads;
                LeadModel lm = new LeadModel();
                var leadDetails = JsonConvert.DeserializeObject<RemarkModelList>(LMSTransaction.get("GetRecentRemarksList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<RemarkModel> RemarkModel = leadDetails.RemarkModels;
                var stringtemp = "";
                var classname = "";
                var datahead = "RemarkDatahead";
                int i = 0;
                if (RemarkModel == null || RemarkModel.Count == 0)
                {
                    stringtemp = "No Remarks.....";
                }
                else
                {
                    foreach (var tempname in RemarkModel)
                    {
                        i++;
                        if (i == 8)
                        {
                            break;
                        }
                        else
                        {
                            if (tempname.Status == "Converted")
                            {
                                classname = "ConvertRemarkData_Block";
                            }
                            else if (tempname.Status == "Closed")
                            {
                                classname = "ClosedRemarkData_Block";
                            }
                            else
                            {
                                classname = "RemarkData_Block";
                            }
                            if (tempname.CreatedBy == "1")
                            {
                                datahead = "AdminRemarkDatahead";
                            }
                            else
                            {
                                datahead = "RemarkDatahead";
                            }
                            stringtemp +=

                                $"<div class=\"{classname}\">" +
                                $"<div class=\"d-flex\">" +
                                $"<div class=\"me-auto\">" +
                                $"<p class=\"{datahead}\">{tempname.CreatedByName} </p> " +
                                //$"<span><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></span> " +
                                $"<p class=\"RemarkDatahead\">{tempname.ClientName}</p></div>" +
                                $"<div class=\"RemarkDataDes\">" +
                                $"{tempname.Remark}" +
                                $"</div>" +
                                $"<div class=\"\">" +
                                $"<p class=\"RemarkDatadate\">{tempname.CreatedDate} ({tempname.CreatedTime})</p>" +
                                $"</div>" +
                                $"</div>" +
                                $"</div>";
                        }
                    }
                }
                ViewBag.GetRemarksList = stringtemp;
                ViewBag.LineChartData = result.LeadList;
                return View();
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult ViewCategoryPriceByStatus(LeadsAmountByDate leadsAmountBy)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    int sessionTimeoutMinutes = Session.Timeout;
                    CategoryPriceList cp = new CategoryPriceList();
                    var result = JsonConvert.DeserializeObject<CategoryPriceList>(LMSTransaction.post("GetCategoryPriceByStatus", leadsAmountBy, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    cp = result;
                    return Json(cp, JsonRequestBehavior.AllowGet);
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
        public ActionResult GetLeadsPriceByDates(LeadsAmountByDate leadsAmountBy)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    DashboardModel dm = new DashboardModel();
                    var result = JsonConvert.DeserializeObject<DashboardModel>(LMSTransaction.post("GetLeadsPriceByDates",leadsAmountBy, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    ViewBag.TotalLeads = result.TotalLeads;
                    ViewBag.OpenLeads = result.OpenLeadsCount;
                    ViewBag.ClosedLeads = result.ClosedLeadsCount;
                    ViewBag.OnHold = result.HoldLeadsCount;
                    ViewBag.ConvertedLeads = result.ConvertedLeadsCount;
                    ViewBag.GhostLeads = result.GhostLeadsCount;
                    ViewBag.TotalPriceOfTotalLeads = result.PriceOfTotalLeads;
                    ViewBag.TotalPriceOfOpenLeads = result.PriceOfOpenLeads;
                    ViewBag.TotalPriceOfClosedLeads = result.PriceOfClosedLeads;
                    ViewBag.TotalPriceOfHoldLeads = result.PriceOfHoldLeads;
                    ViewBag.TotalPriceOfConvertedLeads = result.PriceOfConvertedLeads;
                    ViewBag.TotalPriceOfGhostLeads = result.PriceOfGhostLeads;
                    dm = result;
                    return Json(dm, JsonRequestBehavior.AllowGet);
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
    }
}