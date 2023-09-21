using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class DashboardModel
    {
        public string TotalLeads
        {
            get; set;
        }
        public string OpenLeadsCount
        {
            get; set;
        }
        public string ClosedLeadsCount
        {
            get; set;
        }
        public string HoldLeadsCount
        {
            get; set;
        }
        public string ConvertedLeadsCount
        {
            get; set;
        }
        public string GhostLeadsCount
        {
            get; set;
        }
        public List<LeadDetailsForChart> LeadList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class LeadDetailsForChart
    {
        public string MonthName
        {
            get; set;
        }
        public string CountOfTotalLeads
        {
            get; set;
        }
        public string CountOfClosedLeads
        {
            get; set;
        }
        public string CountOfHoldLeads
        {
            get; set;
        }
    }
}
