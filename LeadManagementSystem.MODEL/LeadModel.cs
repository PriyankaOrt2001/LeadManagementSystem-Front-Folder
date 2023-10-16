using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class CardImagesData
    {
        public string FrontImgOfCardPath { get; set; }
        public string FrontImgFileName { get; set; }
        public string FrontImgBase64 { get; set; }
        public string FrontImgFileType { get; set; }
        public string BackImgOfCardPath { get; set; }
        public string BackImgFileName { get; set; }
        public string BackImgBase64 { get; set; }
        public string BackImgFileType { get; set; }
    }
    public class LeadModel
    {
        public List<LeadDetails> LeadList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    } 
    public class LeadDetails
    {
        public Int32 RowNum { get; set; }
        public string ProjectTypeId { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedBy { get; set; }
        public string LeadId { get; set; }
        public string CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string ClientName { get; set; }
        public string CategoryId { get; set; }
        public string Category { get; set; }
        public string TypeOfLeadId { get; set; }
        public string TypeOfLead { get; set; }
        public string ProductName { get; set; }
        public string SourceId { get; set; }
        public string Source { get; set; }
        public string Reference { get; set; }
        public string LeadSourceId { get; set; }
        public string LeadSource { get; set; }
        public string SpokesName { get; set; }
        public string SpokesMobileNumber { get; set; }
        public string SpokesEmailAddress { get; set; }
        public string SpokesAddress { get; set; }
        public string AlternateSpokesName { get; set; }
        public string AlternateSpokesMobile { get; set; }
        public string AlternateEmailAddress { get; set; }
        public string PlanId { get; set; }
        public string PlanName { get; set; }
        public string PlanPrice { get; set; }
        public string StatusType { get; set; }
        public string AssignToId { get; set; }
        public string AssignTo { get; set; }
        public string ScheduleDate { get; set; }
        public string ScheduleTime { get; set; }
        public List<TypeOfLeadDetails> TypeOfLeadList { get; set;}
        public string FrontImgOfCardPath { get; set; }
        public string FrontImgFileName { get; set; }
        public string FrontImgBase64 { get; set; }
        public string FrontImgFileType { get; set; }
        public string BackImgOfCardPath { get; set; }
        public string BackImgFileName { get; set; }
        public string BackImgBase64 { get; set; }
        public string BackImgFileType { get; set; }
        public int Active { get; set; }
        public string ProjectType { get; set; }
        public int IsFinal { get; set; }
        public string remarkCount { get; set; }
        public string BackFileStatus { get; set; }
        public string FrontFileStatus { get; set; }
        public int IsFav { get; set; } = 0;
        public string Short_Company_Name { get; set; } = "";

    }
    public class CardImages
    {
        public string Base64 { get; set; }
        public string Filename { get; set; }
        public string ImagePath { get; set; }
        public string ImgType { get; set; }
        public string FileType { get; set; }
    }
    public class RemarkModelList
    {
        public List<RemarkModel> RemarkModels
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class RemarkModel
    {
        public string CreatedBy
        {
            get; set;
        }
        public string CreatedByName
        {
            get; set;
        }
        public string CreatedDate
        {
            get; set;
        }
        public string CreatedTime
        {
            get; set;
        }
        public string Lead_Id
        { 
            get; set;
        }
        public string Remark
        {
            get; set;
        }
    }
}
