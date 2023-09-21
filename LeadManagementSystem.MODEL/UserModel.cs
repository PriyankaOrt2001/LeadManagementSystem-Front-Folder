using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeadManagementSystem.MODEL
{
    public class UserModel
    {
        public long UserID { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
    }
    public class UserResponseModelViewModel
    {
        public UserModel usermodel { get; set; }
        public ResponseStatusModel response { get; set; }
        public List<UserModel> usermodellist { get; set; }
    }
}
