using LeadManagementSystem.MODEL;
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
    
    public class LeadManagementController : Controller
    {

        ResponseStatusModel rm = new ResponseStatusModel();
        LeadDetails ld = new LeadDetails();
        public ActionResult AddLeadForm()
        {
            Session["toAddLead"] = "toAddLeadForm";
            //return View();
            return RedirectToAction("Index");
        }
        // GET: LeadManagement
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
                var result = JsonConvert.DeserializeObject<CompanyModel>(LMSTransaction.get("GetCompanyList", Session["AuthToken"].ToString()).Content);
                List<CompanyDetails> CompanyModelList = result.CompanyList;
                var stringtemp = "";
                foreach (var tempname in CompanyModelList)
                {
                    stringtemp += "<option value='" + tempname.Company_Id + "'>" + tempname.Company_Name + "</option>";
                }
                var leadSouceNamesList = JsonConvert.DeserializeObject<LeadSourceModel>(LMSTransaction.get("GetLeadSourceList", Session["AuthToken"].ToString()).Content);
                List<LeadSourceDetails> LeadSourceDetails = leadSouceNamesList.LeadSourceDetails;
                var leadSouceNames = "";
                foreach (var LeadSource in LeadSourceDetails)
                {
                    leadSouceNames += "<option value='" + LeadSource.Source_Id + "'>" + LeadSource.Source_Name + "</option>";
                }
                var leadCategoryList = JsonConvert.DeserializeObject<LeadCategoryModel>(LMSTransaction.get("GetLeadCategoryList", Session["AuthToken"].ToString()).Content);
                List<LeadCategoryDetails> LeadCategoryDetails = leadCategoryList.LeadCategoryList;
                var leadCategoryNames = "";
                foreach (var LeadCategory in LeadCategoryDetails)
                {
                    leadCategoryNames += "<option value='" + LeadCategory.Category_Id + "'>" + LeadCategory.Category_Name + "</option>";
                }
                var AssignToList = JsonConvert.DeserializeObject<AssignToModel>(LMSTransaction.get("GetAssignToList", Session["AuthToken"].ToString()).Content);
                List<AssignToDetails> AssignToDetails = AssignToList.AssignToList;
                var AssignToNames = "";
                foreach (var AssignTo in AssignToDetails)
                {
                    AssignToNames += "<option value='" + AssignTo.Employee_Id + "'>" + AssignTo.Employee_Name + "</option>";
                }
                var PlanList = JsonConvert.DeserializeObject<PlanDetailsModel>(LMSTransaction.get("GetPlanDetailsList", Session["AuthToken"].ToString()).Content);
                List<PlanDetails> PlanDetails = PlanList.PlanList;
                var PlanNames = "";
                foreach (var plan in PlanDetails)
                {
                    PlanNames += "<option value='" + plan.Plan_Id + "'>" + plan.Plan_Name + "</option>";
                }
                ViewBag.PlanDetails = PlanNames;
                ViewBag.AssignTo = AssignToNames;
                ViewBag.CompanyModelList = stringtemp;
                ViewBag.LeadSourceList = leadSouceNames;
                ViewBag.ProjectTypeModelList = leadCategoryNames;
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
            if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
            {
                LeadModel lm = new LeadModel();
                LeadDetails cd = new LeadDetails();
                var result = JsonConvert.DeserializeObject<LeadModel>(LMSTransaction.get("GetLeadDetailsList", Session["AuthToken"].ToString()).Content);
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
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    ld.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddLead", ld, Session["AuthToken"].ToString()).Content);
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
                    var result = JsonConvert.DeserializeObject<LeadDetails>(LMSTransaction.get("ViewLead?Lead_Id=" + id, Session["AuthToken"].ToString()).Content);
                    ld = result;
                    var typeOfLead = JsonConvert.DeserializeObject<TypeOfLeadModel>(LMSTransaction.get("GetTypeOfLeadList?Category_Id=" + result.ProjectType, Session["AuthToken"].ToString()).Content);
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
                    var result = JsonConvert.DeserializeObject<LeadDetails>(LMSTransaction.get("ViewLeadDetails?Lead_Id="+id, Session["AuthToken"].ToString()).Content);
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
                    var result = JsonConvert.DeserializeObject<TypeOfLeadModel>(LMSTransaction.get("GetTypeOfLeadList?Category_Id=" + id, Session["AuthToken"].ToString()).Content);
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
                    var result = JsonConvert.DeserializeObject<PlanDetails>(LMSTransaction.get("GetPlanPrice?Plan_Id=" + id, Session["AuthToken"].ToString()).Content);
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
                    //rm = cs.Update(cm);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateFinalDraftLead", ld, Session["AuthToken"].ToString()).Content);
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
                    //rm = cs.Update(cm);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateFirstDraftLead", ld, Session["AuthToken"].ToString()).Content);
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
                    //rm = cs.Update(cm);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateFinalLead", ld, Session["AuthToken"].ToString()).Content);
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
                    //rm = cs.Update(cm);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateDraftLead", ld, Session["AuthToken"].ToString()).Content);
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
                    //rm = cs.Update(cm);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("UpdateLead", ld, Session["AuthToken"].ToString()).Content);
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
                if (Session["AuthToken"] != null) // if (cc.checkSession() == 1)
                {
                    remarkModel.CreatedBy = Convert.ToString(Session["Admin_ID"]);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("AddRemark", remarkModel, Session["AuthToken"].ToString()).Content);
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
                    var result = JsonConvert.DeserializeObject<RemarkModelList>(LMSTransaction.get("GetRemarksList?Lead_Id="+id, Session["AuthToken"].ToString()).Content);
                    List<RemarkModel> RemarkModel = result.RemarkModels;
                    var stringtemp = "";
                    if(RemarkModel==null || RemarkModel.Count==0)
                    {
                        stringtemp = "No Remarks.....";
                    }
                    else
                    {
                        foreach (var tempname in RemarkModel)
                        {
                            stringtemp +=
                                $"<div class=\"RemarkData_Block\">" +
                                $"<div class=\"d-flex\">" +
                                $"<div class=\"me-auto\">" +
                                $"<p class=\"RemarkDatahead\">{tempname.CreatedByName}</p></div>" +
                                $"<div class=\"\">" +
                                $"<p class=\"RemarkDatadate\">{tempname.CreatedDate} ({tempname.CreatedTime})</p>" +
                                $"</div>" +
                                $"</div>" +
                                $"<div class=\"RemarkDataDes\">" +
                                $"{tempname.Remark}" +
                                $"</div>" +
                                $"</div>";
                        }
                    }
                    
                    ViewBag.CompanyModelList = stringtemp;

                    return Content(ViewBag.CompanyModelList);

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
                    //rm = cs.Update(cm);
                    var result = JsonConvert.DeserializeObject<ResponseStatusModel>(LMSTransaction.post("ChangeLeadStatus", ld, Session["AuthToken"].ToString()).Content);
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