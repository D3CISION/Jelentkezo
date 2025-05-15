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
        public DateTime Kezd { get; set; }
        public DateTime Veg { get; set; }
    }
}