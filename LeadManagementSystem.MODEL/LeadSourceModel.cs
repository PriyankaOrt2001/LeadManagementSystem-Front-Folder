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
}
