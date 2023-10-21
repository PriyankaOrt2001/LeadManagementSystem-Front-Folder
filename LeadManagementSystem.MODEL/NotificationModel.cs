using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class NotificationDetailsList
    {
        public List<NotificationDetails> NotificationDetails { get; set; }
        public ResponseStatusModel Response { get; set; }
    }
    public class NotificationDetails
    {
        public string RowNum { get; set; }
        public string SrNo { get; set; }
        public string NotificationId { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string NotificationSendTo { get; set; }
        public string NotificationSendBy { get; set; }
        public string NotificationType { get; set; }
        public string NotificationMsg { get; set; }
        public string NotificationTitle { get; set; }
        public int IsSeen { get; set; }
    }
    public class GetCountOfUnSeenNotification
    {
        public string TotalUnseenNotification { get; set; }
    }
}
