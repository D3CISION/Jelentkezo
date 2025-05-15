using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace jelentkezes.Models
{
    public class Jelentkezesek
    {
        public int Id { get; set; }
        public int EsemenyId { get; set; }
        public string Email { get; set; }
    }
}