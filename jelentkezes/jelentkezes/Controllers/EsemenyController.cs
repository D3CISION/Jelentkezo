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
        public class EsemenyModel
        {
            public int Id { get; set; }
            public string Terem { get; set; }
            public TimeSpan Kezd { get; set; }
            public TimeSpan Veg { get; set; }
            public string Tema { get; set; }
            public string Eloado { get; set; }
            public int JelentkezokSzama { get; set; }
        }

        // GET api/<controller>
        public IHttpActionResult Get()
        {
            using (var ctx = new JelentkezesContext())
            {
                var res = ctx.Esemeny.ToList();
                List<EsemenyModel> response = new List<EsemenyModel>();
                foreach (var item in res)
                {
                    response.Add(new EsemenyModel() { Id = item.Id, Eloado = item.Eloado, Kezd = item.Kezd, Veg = item.Veg, Tema = item.Tema, Terem = item.Terem, JelentkezokSzama = JelentkezesekController.GetJelentkezesekSzama(item.Id) });
                }
                return Ok(response);
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