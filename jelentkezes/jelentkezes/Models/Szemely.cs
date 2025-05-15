using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace jelentkezes.Models
{
    public class Szemelyek
    {
        [Key]
        public string Email { get; set; }
        public string Nev { get; set; }
    }
}