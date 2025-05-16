using jelentkezes.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using jelentkezes.Models;
using System.Data.Entity;

namespace jelentkezes.Controllers
{
    public class JelentkezesekController : ApiController
    {
        public int getJelentkezesekSzama(int id)
        {
            using (var ctx = new JelentkezesContext())
            {
                return ctx.Jelentkezesek.Where(x => x.EsemenyId == id).Count();
            }
        }
        public class JelentkezesModel
        {
            public string Nev { get; set; }
            public List<int> EsemenyIdk { get; set; }
        }
        public class EsemenyResponseModel
        {
            public int Id { get; set; }
            public string Terem { get; set; }
            public TimeSpan Kezd { get; set; }
            public TimeSpan Veg { get; set; }
            public string Tema { get; set; }
            public string Eloado { get; set; }
            public Esemeny Esemeny { get; set; }
            public Szemelyek Szemelyek { get; set; }
        }
        // GET api/<controller>
        public IHttpActionResult Get()
        {
            using(var ctx= new JelentkezesContext())
            {
                var res = ctx.Jelentkezesek.Include(x => x.Esemeny).Include(x => x.Szemelyek).ToList();

                return Ok(res);
            }

        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public IHttpActionResult Post(string email, [FromBody] JelentkezesModel value)
        {
            try
            {
                using (var ctx = new JelentkezesContext())
                {
                    if (value.EsemenyIdk.Count > 0)
                    {
                        ctx.Szemelyek.Add(new Szemelyek() { Email = email, Nev = value.Nev });
                        ctx.SaveChanges();
                        foreach (var item in value.EsemenyIdk)
                        {
                            if (getJelentkezesekSzama(item)>=15)
                            {
                                return Conflict();
                            }
                            else
                            {

                                ctx.Jelentkezesek.Add(new Jelentkezesek() { EsemenyId = item, Email = email });
                            }
                        }
                        ctx.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
    }
}