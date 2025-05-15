using jelentkezes.Database;
using jelentkezes.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace jelentkezes.Controllers
{
    public class SzemelyekController : ApiController
    {
        [HttpGet]
        [Route("api/Szemelyek")]
        // GET api/<controller>
        public IHttpActionResult Get()
        {
            using (var ctx = new JelentkezesContext())
            {
                var res = ctx.Szemelyek.ToList();
                return Ok(res);
            }

        }
        [HttpGet]
        [Route("api/Szemelyek/{email}")]
        public IHttpActionResult Get(string email)
        {
            using (var ctx = new JelentkezesContext())
            {
                var res = ctx.Szemelyek.ToList();

                foreach (var item in res)
                {

                }
                return Ok(ctx.Szemelyek.ToList());
            }

        }
        [Route("api/Szemelyek")]
        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

    }
}