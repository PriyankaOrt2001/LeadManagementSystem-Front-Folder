using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class LeadSourceModel
    {
        public List<LeadSourceDetails> LeadSourceDetails
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class LeadSourceDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Source_Id { get; set; }
        public string Source_Name { get; set; }
    }
    public class LeadOwnerModel
    {
        public List<LeadOwnerDetails> LeadOwnerDetails
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class LeadOwnerDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public int Owner_Id { get; set; }
        public string Owner_Name { get; set; }
    }
}
