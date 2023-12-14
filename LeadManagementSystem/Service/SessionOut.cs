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
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContextBase httpContext = filterContext.HttpContext;

            if (httpContext.Session != null && httpContext.Session["AuthToken"] == null)
            {
                // Session expired, redirect to login page or display a message
                filterContext.Result = new RedirectToRouteResult(
                    new System.Web.Routing.RouteValueDictionary {
                    { "controller", "LogIn" },
                    { "action", "LogInForm" }
                    });

                // Optionally, you can set a message to be displayed on the login page
                // TempData["SessionExpiredMessage"] = "Your session has expired. Please log in again.";

                return;
            }

            base.OnActionExecuting(filterContext);
        }

    }
}