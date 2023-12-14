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
        public string PriceOfTotalLeads
        {
            get; set;
        }
        public string PriceOfOpenLeads
        {
            get; set;
        }
        public string PriceOfClosedLeads
        {
            get; set;
        }
        public string PriceOfHoldLeads
        {
            get; set;
        }
        public string PriceOfConvertedLeads
        {
            get; set;
        }
        public string PriceOfGhostLeads
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
        public string CountOfOpenLeads
        {
            get; set;
        }
        public string CountOfGhostLeads
        {
            get; set;
        }
        public string CountOfConvertedLeads
        {
            get; set;
        }
    }
    public class CategoryPrice
    {
        public List<CategoryPriceList> CategoryPriceList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class CategoryPriceList
    {
        public int HotLeadsAmount { get; set; }
        public int ColdLeadsAmount { get; set; }
        public int WarmLeadsAmount { get; set; }
        public int GhostLeadsAmount { get; set; }
    }
    public class LeadsAmountByDate
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string StatusType { get; set; }
    }
}
