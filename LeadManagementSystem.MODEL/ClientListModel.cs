using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class ClientModel
    {
        public List<ClientDetails> ClientList
        {
            get; set;
        }
        public ResponseStatusModel Response { get; set; }
    }
    public class ClientDetails
    {
        public string CreatedBy { get; set; }
        public int RowNum { get; set; }
        public int SrNo { get; set; }
        public string Client_Name { get; set; }
    }
}
