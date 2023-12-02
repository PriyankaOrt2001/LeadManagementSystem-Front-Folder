using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class CompanyModel
    {
        public List<CompanyDetails> CompanyList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class CompanyDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Company_Id { get; set; }
        public string Company_Name { get; set; }
        public string Short_Company_Name { get; set; }
    }
    public class AssignToModel
    {
        public List<AssignToDetails> AssignToList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class AssignToDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Assignee_Id { get; set; }
        public string Assignee_Name { get; set; }
    }
    public class PlanDetailsModel
    {
        public List<PlanDetails> PlanList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class PlanDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Plan_Id { get; set; }
        public string Plan_Name { get; set; }
        public string Plan_Price { get; set; }
    }
}
