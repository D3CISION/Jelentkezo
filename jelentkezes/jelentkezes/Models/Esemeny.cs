using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace jelentkezes.Models
{
    public class Esemeny
    {
        public int Id { get; set; }
        public string Terem { get; set; }
        public TimeSpan Kezd { get; set; }
        public TimeSpan Veg { get; set; }
        public string Tema { get; set; }
        public string Eloado { get; set; }
    }
}