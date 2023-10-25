using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class ResponseStatusModel
    {
        public int n { get; set; }
        public string msg { get; set; }
        public string RStatus { get; set; }
        public string AuthToken { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }

        public string TotalUnseenNotification { get; set; }
        public string LeadId { get; set; }
        public string NotificationList { get; set; }
        
    }
}
