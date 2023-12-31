﻿using LeadManagementSystem.MODEL;
using LeadManagementSystem.MyServices;
using LeadManagementSystem.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace LeadManagementSystem.Controllers
{
    [SessionOut]
    public class LeadManagementController : Controller
    {

        ResponseStatusModel rm = new ResponseStatusModel();
        LeadDetails ld = new LeadDetails();
        public ActionResult AddLeadForm()
        {
            Session["toAddLead"] = "toAddLeadForm";
            
            return RedirectToAction("Index");
        }
        public ActionResult Index()
        {
            if (Session["AuthToken"] != null)
             {
                if(Session["toAddLead"]!= null)
                {
                    ViewBag.toAddLeadForm = Session["toAddLead"];
                    Session["toAddLead"] = null;
                }
                else
                {
                    ViewBag.toAddLeadForm = "toLeadDetails";
                }
                CompanyModel cm = new CompanyModel();
                CompanyDetails cd = new CompanyDetails();
                var result = JsonConvert.DeserializeObject<CompanyModel>(LMSTransaction.get("GetCompanyList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<CompanyDetails> CompanyModelList = result.CompanyList;
                var stringtemp = "";
                foreach (var tempname in CompanyModelList)
                {
                    stringtemp += "<option value='" + tempname.Company_Id + "'>" + tempname.Company_Name + "</option>";
                }
                var leadSouceNamesList = JsonConvert.DeserializeObject<LeadSourceModel>(LMSTransaction.get("GetSourceList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadSourceDetails> LeadSourceDetails = leadSouceNamesList.LeadSourceDetails;
                var leadSouceNames = "";
                foreach (var LeadSource in LeadSourceDetails)
                {
                    leadSouceNames += "<option value='" + LeadSource.Source_Id + "'>" + LeadSource.Source_Name + "</option>";
                }
                var leadOwnerNamesList = JsonConvert.DeserializeObject<LeadOwnerModel>(LMSTransaction.get("GetOwnerList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadOwnerDetails> LeadOwnerDetails = leadOwnerNamesList.LeadOwnerDetails;
                var leadOwnerNames = "";
                foreach (var LeadOwner in LeadOwnerDetails)
                {
                    leadOwnerNames += "<option value='" + LeadOwner.Owner_Id + "'>" + LeadOwner.Owner_Name + "</option>";
                }
                var leadCategoryList = JsonConvert.DeserializeObject<LeadCategoryModel>(LMSTransaction.get("GetLeadCategoryList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadCategoryDetails> LeadCategoryDetails = leadCategoryList.LeadCategoryList;
                var leadCategoryNames = "";
                foreach (var LeadCategory in LeadCategoryDetails)
                {
                    leadCategoryNames += "<option value='" + LeadCategory.Category_Id + "'>" + LeadCategory.Category_Name + "</option>";
                }
                var AssignToList = JsonConvert.DeserializeObject<AssigneeModel>(LMSTransaction.get("GetAssigneeList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<AssigneeDetails> AssignToDetails = AssignToList.AssigneeList;
                var AssignToNames = "";
                foreach (var AssignTo in AssignToDetails)
                {
                    AssignToNames += "<option value='" + AssignTo.Assignee_Id + "'>" + AssignTo.Assignee_Name + "</option>";
                }
                var PlanList = JsonConvert.DeserializeObject<PlanDetailsModel>(LMSTransaction.get("GetPlanDetailsList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<PlanDetails> PlanDetails = PlanList.PlanList;
                var PlanNames = "";
                foreach (var plan in PlanDetails)
                {
                    PlanNames += "<option value='" + plan.Plan_Id + "'>" + plan.Plan_Name + "</option>";
                }
                var GetClientDetailsList = JsonConvert.DeserializeObject<ClientModel>(LMSTransaction.get("GetClientDetailsList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<ClientDetails> ClientDetails = GetClientDetailsList.ClientList;
                var ClientNames = "";
                int i = 0;
                int j = ClientDetails.Count();
                foreach (var clientname in ClientDetails)
                {
                    i++;
                    if (i == j)
                    {
                        ClientNames += "<a href=\"#" + clientname.Client_Name + "\" style=\"border-bottom: 1px solid #d2d6de;\" data-value=\"" + clientname.Client_Name + "\">" + clientname.Client_Name + "</a>";
                    }
                    else
                    {
                        ClientNames += "<a href=\"#" + clientname.Client_Name + "\" data-value=\"" + clientname.Client_Name + "\">" + clientname.Client_Name + "</a>";
                    }
                }
                ViewBag.PlanDetails = PlanNames;
                ViewBag.AssignTo = AssignToNames;
                ViewBag.CompanyModelList = stringtemp;
                ViewBag.LeadSourceList = leadSouceNames;
                ViewBag.LeadOwnerList = leadOwnerNames;
                ViewBag.ProjectTypeModelList = leadCategoryNames;
                ViewBag.ClientNamesList = "";
                ViewBag.ClientNamesList = ClientNames;
                return View();              
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult AddNewLead()
        {
            if (Session["AuthToken"] != null)
            {
                if (Session["toAddLead"] != null)
                {
                    ViewBag.toAddLeadForm = Session["toAddLead"];
                    Session["toAddLead"] = null;
                }
                else
                {
                    ViewBag.toAddLeadForm = "toLeadDetails";
                }
                CompanyModel cm = new CompanyModel();
                CompanyDetails cd = new CompanyDetails();
                var result = JsonConvert.DeserializeObject<CompanyModel>(LMSTransaction.get("GetCompanyList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<CompanyDetails> CompanyModelList = result.CompanyList;
                var stringtemp = "";
                foreach (var tempname in CompanyModelList)
                {
                    stringtemp += "<option value='" + tempname.Company_Id + "'>" + tempname.Company_Name + "</option>";
                }
                var leadSouceNamesList = JsonConvert.DeserializeObject<LeadSourceModel>(LMSTransaction.get("GetSourceList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadSourceDetails> LeadSourceDetails = leadSouceNamesList.LeadSourceDetails;
                var leadSouceNames = "";
                foreach (var LeadSource in LeadSourceDetails)
                {
                    leadSouceNames += "<option value='" + LeadSource.Source_Id + "'>" + LeadSource.Source_Name + "</option>";
                }
                var leadOwnerNamesList = JsonConvert.DeserializeObject<LeadOwnerModel>(LMSTransaction.get("GetOwnerList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadOwnerDetails> LeadOwnerDetails = leadOwnerNamesList.LeadOwnerDetails;
                var leadOwnerNames = "";
                foreach (var LeadOwner in LeadOwnerDetails)
                {
                    leadOwnerNames += "<option value='" + LeadOwner.Owner_Id + "'>" + LeadOwner.Owner_Name + "</option>";
                }
                var leadCategoryList = JsonConvert.DeserializeObject<LeadCategoryModel>(LMSTransaction.get("GetLeadCategoryList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<LeadCategoryDetails> LeadCategoryDetails = leadCategoryList.LeadCategoryList;
                var leadCategoryNames = "";
                foreach (var LeadCategory in LeadCategoryDetails)
                {
                    leadCategoryNames += "<option value='" + LeadCategory.Category_Id + "'>" + LeadCategory.Category_Name + "</option>";
                }
                var AssignToList = JsonConvert.DeserializeObject<AssigneeModel>(LMSTransaction.get("GetAssigneeList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<AssigneeDetails> AssignToDetails = AssignToList.AssigneeList;
                var AssignToNames = "";
                foreach (var AssignTo in AssignToDetails)
                {
                    AssignToNames += "<option value='" + AssignTo.Assignee_Id + "'>" + AssignTo.Assignee_Name + "</option>";
                }
                var PlanList = JsonConvert.DeserializeObject<PlanDetailsModel>(LMSTransaction.get("GetPlanDetailsList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<PlanDetails> PlanDetails = PlanList.PlanList;
                var PlanNames = "";
                foreach (var plan in PlanDetails)
                {
                    PlanNames += "<option value='" + plan.Plan_Id + "'>" + plan.Plan_Name + "</option>";
                }
                var GetClientDetailsList = JsonConvert.DeserializeObject<ClientModel>(LMSTransaction.get("GetClientDetailsList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                List<ClientDetails> ClientDetails = GetClientDetailsList.ClientList;
                var ClientNames = "";
                int i = 0;
                int j = ClientDetails.Count();
                foreach (var clientname in ClientDetails)
                {
                    i++;
                    if (i == j)
                    {
                        ClientNames += "<a href=\"#" + clientname.Client_Name + "\" style=\"border-bottom: 1px solid #d2d6de;\" data-value=\"" + clientname.Client_Name + "\">" + clientname.Client_Name + "</a>";
                    }
                    else
                    {
                        ClientNames += "<a href=\"#" + clientname.Client_Name + "\" data-value=\"" + clientname.Client_Name + "\">" + clientname.Client_Name + "</a>";
                    }
                }
                ViewBag.PlanDetails = PlanNames;
                ViewBag.AssignTo = AssignToNames;
                ViewBag.CompanyModelList = stringtemp;
                ViewBag.LeadSourceList = leadSouceNames;
                ViewBag.LeadOwnerList = leadOwnerNames;
                ViewBag.ProjectTypeModelList = leadCategoryNames;
                ViewBag.ClientNamesList = "";
                ViewBag.ClientNamesList = ClientNames;
                return View();
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult LeadTablePartial()
        {
            if (Session["AuthToken"] != null)
            {
                LeadModel lm = new LeadModel();
                LeadDetails cd = new LeadDetails();
                var UserID= Convert.ToString(Session["Admin_ID"]);
                var result = JsonConvert.DeserializeObject<LeadModel>(LMSTransaction.get("GetLeadDetailsList?UserId="+ UserID,Session["AuthToken"].ToString(),Session["Admin_ID"].ToString()).Content);
                lm.LeadList = result.LeadList;
                return PartialView("LeadTablePartial", lm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }

        public ActionResult FilterLeadTablePartial(FilterBy filterBy)
        {
            if (Session["AuthToken"] != null)
            {
                LeadModel lm = new LeadModel();
                LeadDetails cd = new LeadDetails();
                var UserID = Convert.ToString(Session["Admin_ID"]);
                var result = JsonConvert.DeserializeObject<LeadModel>(LMSTransaction.post("FilterLeadTableDetails", filterBy, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                lm.LeadList = result.LeadList;
                return PartialView("LeadTablePartial", lm);
            }
            else
            {
                rm.msg = "Expired";
                rm.n = 5;
                return RedirectToAction("LogInForm", "LogIn");
            }
        }
        public ActionResult AddLead(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.ScheduleDate = ld.ScheduleDate ?? "";
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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

        public ActionResult ViewLead(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    TypeOfLeadModel tolm = new TypeOfLeadModel();
                    var result = JsonConvert.DeserializeObject<LeadDetails>(LMSTransaction.get("ViewLead?Lead_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    ld = result;
                    var typeOfLead = JsonConvert.DeserializeObject<TypeOfLeadModel>(LMSTransaction.get("GetTypeOfLeadList?Category_Id=" + result.ProjectType, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    ld.TypeOfLeadList = typeOfLead.TypeOfLeadList;
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
        public ActionResult ViewLeadDetails(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var result = JsonConvert.DeserializeObject<LeadDetails>(LMSTransaction.get("ViewLeadDetails?Lead_Id="+id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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

        public ActionResult GetTypeOfLeadList(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    TypeOfLeadModel tolm = new TypeOfLeadModel();
                    var result = JsonConvert.DeserializeObject<TypeOfLeadModel>(LMSTransaction.get("GetTypeOfLeadList?Category_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    tolm = result;
                    return Json(tolm, JsonRequestBehavior.AllowGet);
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
        public ActionResult GetPlanPrice(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    PlanDetails pd = new PlanDetails();
                    var result = JsonConvert.DeserializeObject<PlanDetails>(LMSTransaction.get("GetPlanPrice?Plan_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    pd = result;
                    return Json(pd, JsonRequestBehavior.AllowGet);
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
        public ActionResult UpdateFinalDraftLead(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateFinalDraftLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateFirstDraftLead(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateFirstDraftLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateFinalLead(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateFinalLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateDraftLead(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateDraftLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult UpdateLead(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    ld.ScheduleDate = ld.ScheduleDate ?? "";
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateLead", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult AddRemark(RemarkModel remarkModel)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    if(remarkModel.Status== "undefined")
                    {
                        remarkModel.Status = "";
                    }
                    remarkModel.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddRemark", remarkModel, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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

        public ActionResult AddRemarkAndNotify(RemarkModel remarkModel)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    remarkModel.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddRemarkAndNotify", remarkModel, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult GetRemarksList(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var result = JsonConvert.DeserializeObject<RemarkModelList>(LMSTransaction.get("GetRemarksList?Lead_Id=" + id, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    List<RemarkModel> RemarkModel = result.RemarkModels;
                    var stringtemp = "";
                    var classname = "";
                    var status = "";
                    var datahead = "RemarkDatahead";
                    var remarkStatus = "";
                    if (RemarkModel == null || RemarkModel.Count == 0)
                    {
                        stringtemp = "No Remarks.....";
                    }
                    else
                    {
                        foreach (var tempname in RemarkModel)
                        {
                            if (tempname.Status == "Converted")
                            {
                                status = tempname.Status;
                                classname = "ConvertRemarkData_Block";
                            }
                            else if(tempname.Status == "Closed")
                            {
                                status = tempname.Status;
                                classname = "ClosedRemarkData_Block";
                            }
                            else
                            {
                                status = "";
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
                            if (tempname.RemarkStatus == "Saved")
                            {
                                tempname.RemarkStatus = "";
                            }
                            stringtemp +=
                                $"<div class=\"{classname}\">" +
                                $"<div class=\"RemarkStatus\">" +
                                $"{tempname.RemarkStatus}" +
                                $"</div>" +
                                $"<div class=\"RemarkDataDes\">" +
                                $"{tempname.Remark}" +
                                $"</div>" +
                                $"<div class=\"d-flex float-container\">" +
                                $"<div class=\"me-auto float-child\">" +
                                $"<p><span class=\"{datahead}\">{tempname.CreatedByName} </span>{tempname.CreatedDate} ({tempname.CreatedTime})</p></div>" +
                                $"<div class=\"status\">" +
                                $"<p class=\"RemarkDatadate\">{status}</p>" +
                                $"</div>" +
                                $"</div>" +
                                $"</div>";
                        }
                    }
                    ViewBag.GetRemarksList = stringtemp;
                    return Content(ViewBag.GetRemarksList);
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
        public ActionResult GetCompanyListForFilter()
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    FilterDetailsModel fdm = new FilterDetailsModel();
                    CompanyDetails cd = new CompanyDetails();
                    var result = JsonConvert.DeserializeObject<CompanyModel>(LMSTransaction.get("GetCompanyList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    List<CompanyDetails> CompanyModelList = result.CompanyList;
                    var stringtemp = "";
                    string newRow = string.Empty;
                    var leadCategoryList = JsonConvert.DeserializeObject<LeadCategoryModel>(LMSTransaction.get("GetLeadCategoryList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    List<LeadCategoryDetails> LeadCategoryDetails = leadCategoryList.LeadCategoryList;
                    var leadCategoryNames = "";
                    var NewRowForCategory = "";
                    var AssignToList = JsonConvert.DeserializeObject<AssigneeModel>(LMSTransaction.get("GetAssigneeList", Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
                    List<AssigneeDetails> AssignToDetails = AssignToList.AssigneeList;
                    var AssignToNames = "";
                    var NewRowForAssignTo = "";
                    if (CompanyModelList == null || CompanyModelList.Count==0)
                    {
                        stringtemp = $"<div class=\"col-md-12\">"+
                                     $" No Comapny Name available...." +
                                     $"</div>";
                    }
                    else
                    {
                        int i = 0;
                        foreach (var tempname in CompanyModelList)
                        {
                            newRow +=
                                     $"<div class=\"col-md-4\">" +
                                     $"<div class=\"col-md-3\" style=\"padding:0px\">" +
                                     $"<input class =\"CompanyModelList\" data-val=\"true\"" +
                                     $"id=\"isActive\"" +
                                     $"name=\"isActive\"" +
                                     $"type=\"checkbox\"" +
                                     $"value=\"{tempname.Company_Id}\" onclick=\"CompanyFilterCount()\"/>" +
                                     $"</div>" +
                                     $"<div class=\"col-md-9\" style=\"padding:0px\">" +
                                     $"<span id =\"Category_Consulting\"> {tempname.Short_Company_Name} </span>" +
                                     $"</div>" +
                                     $"</div>";
                            i++;
                            if (i == 3)
                            {
                                stringtemp +=
                                     $"<div class=\"col-md-12\">" +
                                     newRow+
                                     $"</div> <br>";
                                i = 0;
                                newRow = "";
                            }
                        }
                        if (newRow != "")
                        {
                            stringtemp +=
                                   $"<div class=\"col-md-12\">" +
                                   newRow +
                                   $"</div> <br>";
                        }
                    }
                    if (LeadCategoryDetails == null || LeadCategoryDetails.Count == 0)
                    {
                        leadCategoryNames = 
                                     $"<div class=\"col-md-12\">" +
                                     $" No Category Name available...." +
                                     $"</div>";
                    }
                    else
                    {
                        int i = 0;
                        foreach (var tempname in LeadCategoryDetails)
                        {
                            leadCategoryNames +=
                                     $"<div class=\"col-md-4\">" +
                                     $"<div class=\"col-md-3\" style=\"padding:0px\">" +
                                     $"<input class =\"LeadCategoryDetails\" data-val=\"true\"" +
                                     $"id=\"isActive\"" +
                                     $"name=\"isActive\"" +
                                     $"type=\"checkbox\"" +
                                     $"value=\"{tempname.Category_Id}\" onclick=\"CategoryFilterCount()\"/>"+
                                     $"</div>" +
                                     $"<div class=\"col-md-9\" style=\"padding:0px\">" +
                                     $"<span id =\"Category_Consulting\"> {tempname.Category_Name} </span>" +
                                     $"</div>" +
                                     $"</div>";
                            i++;
                            if (i == 3)
                            {
                                NewRowForCategory +=
                                     $"<div class=\"col-md-12\">" +
                                     leadCategoryNames +
                                     $"</div> <br>";
                                i = 0;
                                leadCategoryNames = "";
                            }
                        }
                        if (leadCategoryNames != "")
                        {
                            NewRowForCategory +=
                                   $"<div class=\"col-md-12\">" +
                                   leadCategoryNames +
                                   $"</div> <br>";
                        }
                    }
                    if (AssignToDetails == null || AssignToDetails.Count == 0)
                    {
                        AssignToNames =
                                     $"<div class=\"col-md-12\">" +
                                     $" Data not available...." +
                                     $"</div>";
                    }
                    else
                    {
                        int i = 0;
                        foreach (var tempname in AssignToDetails)
                        {
                            AssignToNames +=
                                     $"<div class=\"col-md-4\">" +
                                     $"<div class=\"col-md-3\" style=\"padding:0px\">" +
                                     $"<input class =\"AssignToDetails\" data - val=\"true\"" +
                                     $"id=\"isActive\"" +
                                     $"name=\"isActive\"" +
                                     $"type=\"checkbox\"" +
                                     $"value=\"{tempname.Assignee_Id}\" onclick=\"AssignToFilterCount()\"/>"+
                                     $"</div>" +
                                     $"<div class=\"col-md-9\" style=\"padding:0px\">" +
                                     $"<span id =\"Category_Consulting\"> {tempname.Assignee_Name} </span>" +
                                     $"</div>" +
                                     $"</div>";
                            i++;
                            if (i == 3)
                            {
                                NewRowForAssignTo +=
                                     $"<div class=\"col-md-12\">" +
                                     AssignToNames +
                                     $"</div> <br>";
                                i = 0;
                                AssignToNames = "";
                            }
                        }
                        if (AssignToNames != "")
                        {
                            NewRowForAssignTo +=
                                   $"<div class=\"col-md-12\">" +
                                   AssignToNames +
                                   $"</div> <br>";
                        }
                    }
                    fdm.GetCompanyListForFilter = stringtemp;
                    fdm.GetCategoryListForFilter = NewRowForCategory;
                    fdm.GetAssignToListForFilter = NewRowForAssignTo;
                    return Json(fdm, JsonRequestBehavior.AllowGet);
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
        public ActionResult ChangeLeadStatus(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.UpdatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("ChangeLeadStatus", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult AddToFav(LeadDetails ld)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    ld.UpdatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddToFav", ld, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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
        public ActionResult DeleteLead(string id)
        {
            try
            {
                if (Session["AuthToken"] != null)
                {
                    var userid = Session["Admin_ID"].ToString();
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.get("RemoveLead?LeadId=" + id+"&UserId="+userid, Session["AuthToken"].ToString(), Session["Admin_ID"].ToString()).Content);
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