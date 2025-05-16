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

      
        [Route("api/Szemelyek")]
        // POST api/<controller>
        public IHttpActionResult Post([FromBody] Szemelyek value)
        {
            using (var ctx = new JelentkezesContext())
            {
                var res = ctx.Szemelyek.Where(x => x.Email == value.Email).FirstOrDefault();
                if(res != null)
                {
                    return Conflict();
                }
                else
                {
                    return Ok(value);
                }
            }
        }

    }
}