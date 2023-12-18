using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class LeadCategoryModel
    {
        public List<LeadCategoryDetails> LeadCategoryList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class LeadCategoryDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Category_Id { get; set; }
        public string Category_Name { get; set; }
        public int TypeOfLead_ID { get; set; }
        public string TypeOfLead { get; set; }
    }
    public class TypeOfLeadModel
    {
        public List<TypeOfLeadDetails> TypeOfLeadList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class TypeOfLeadDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Category_Id { get; set; }
        public string Category_Name { get; set; }
        public int TypeOfLead_ID { get; set; }
        public string TypeOfLead { get; set; }
    }

    public class SubCategoryModel
    {
        public List<SubCategoryDetails> SubCategoryList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class SubCategoryDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public string Category_Name { get; set; }
        public int Category_Id { get; set; }
        public int SubCategory_ID { get; set; }
        public string SubCategory { get; set; }
    }

}