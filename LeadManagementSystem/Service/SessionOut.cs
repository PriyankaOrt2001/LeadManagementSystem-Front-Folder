using LeadManagementSystem.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LeadManagementSystem.Service
{
    public class SessionOut : ActionFilterAttribute
    {
        public bool skip { get; set; } = true;
        ResponseStatusModel rm = new ResponseStatusModel();
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (skip)
            {
                if (string.IsNullOrEmpty(Convert.ToString(HttpContext.Current.Session["Admin_ID"])))
                {
                    HttpContext.Current.Session.Clear();
                    filterContext.Result = new RedirectResult("~/LogIn/LogInForm");
                    return;
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}