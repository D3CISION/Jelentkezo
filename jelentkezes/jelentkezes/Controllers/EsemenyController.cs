using jelentkezes.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace jelentkezes.Controllers
{
    public class EsemenyController : ApiController
    {
        // GET api/<controller>
        public IHttpActionResult Get()
        {
            using (var ctx = new JelentkezesContext())
            {
                var res = ctx.Esemeny.ToList();
                return Ok(res);
            }
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            using (var ctx = new JelentkezesContext())
            {
                var res = ctx.Jelentkezesek.Where(x => x.EsemenyId == id).ToList();
                return Ok(res);
            }
        }

        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}