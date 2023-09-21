using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace LeadManagementSystem.MyServices
{
    public class LMSTransaction
    {
        public static string ScreenURLAPI = ConfigurationManager.AppSettings["ScreenURLAPI"].ToString();
        public static RestResponse get(string reltivePath, String token)
        {
            var client = new RestClient(ScreenURLAPI);
            var request = new RestRequest(reltivePath, Method.Get);
            //     request.AddHeader("postman-token", "token");
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("authToken", token);
            //     request.AddHeader("APIKey", ConfigurationManager.AppSettings["APIKey"]);
            return client.Execute(request);
        }
        public static RestResponse post(string relativePath, object data, String token)
        {
            var client = new RestClient(ScreenURLAPI);
            var request = new RestRequest(relativePath, Method.Post);
            // request.AddHeader("postman-token", "token");
            // request.AddHeader("cache-control", "no-cache");
            // request.AddHeader("content-type", "application/json");
            if (token != null)
                request.AddHeader("authToken", token);
            request.AddParameter("application/json", JsonConvert.SerializeObject(data), ParameterType.RequestBody);
            return client.Execute(request);
        }
    }
}