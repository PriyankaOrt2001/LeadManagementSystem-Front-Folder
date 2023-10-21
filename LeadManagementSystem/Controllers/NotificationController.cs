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
    public class NotificationController : Controller
    {
        ResponseStatusModel rm = new ResponseStatusModel();
        NotificationDetailsList ndl = new NotificationDetailsList();
        public ActionResult Index()
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
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
        public ActionResult NotificationTablePartial()
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                NotificationDetailsList ndl = new NotificationDetailsList();
                NotificationDetails nd = new NotificationDetails();
                var UserID = Convert.ToString(Session["Admin_ID"]);
                var result = JsonConvert.DeserializeObject<NotificationDetailsList>(LMSTransaction.get("NotificationDetails?UserId=" + UserID, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                ndl.NotificationDetails = result.NotificationDetails;
                return PartialView("NotificationTablePartial", ndl);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult RecentNotificationDetails(string UserId)
        {
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                NotificationDetailsList ndl = new NotificationDetailsList();
                NotificationDetails nd = new NotificationDetails();
                var UserID = Convert.ToString(Session["Admin_ID"]);
                var result = JsonConvert.DeserializeObject<NotificationDetailsList>(LMSTransaction.get("RecentNotificationDetails?UserId=" + UserID, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                ndl.NotificationDetails = result.NotificationDetails;
                var stringtemp12 = "";
                
                if (result.NotificationDetails == null || result.NotificationDetails.Count == 0)
                {
                    stringtemp12 = "No Notification.....";
                }
                else
                {
                    foreach (var tempname in result.NotificationDetails)
                    {
                        string remark = string.Empty;
                        if (tempname.NotificationMsg != "")
                        {
                            remark = "<b style=\"color:#3c8dbc\">Remark : </b>";
                        }
                        
                        stringtemp12 +=
                            $"<div class=\"NotificationData_Block\">" +
                            $"<div class=\"NotificationDataDes\">"+
                            $"<b>{tempname.NotificationTitle}</b>" +
                            $"<br>{remark} {tempname.NotificationMsg}" +
                            $"</div>"+
                            $"<div class=\"d-flex\" id=\"d-flex\">"+
                            $"<div>"+
                            $"<p class=\"NotificationDatadate\">{tempname.Date} ({tempname.Time})</p>"+
                            $"</div>"+
                            $"</div>"+
                            $"</div>";
                    }
                }

                ViewBag.NotificationList = stringtemp12;
                rm.n = 1;
                rm.NotificationList = stringtemp12;
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
            return Json(rm, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateNotificationSeenStatus(string UserId)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var User_Id = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("UpdateNotificationSeenStatus?UserId="+ User_Id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult GetCountOfUnSeenNotification(string UserId)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    GetCountOfUnSeenNotification coum = new GetCountOfUnSeenNotification();
                    var result = JsonConvert.DeserializeObject<GetCountOfUnSeenNotification>(LMSTransaction.get("GetCountOfUnSeenNotification?UserId=" + UserId, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    coum = result;
                    rm.n = 1;
                    rm.TotalUnseenNotification = coum.TotalUnseenNotification;
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