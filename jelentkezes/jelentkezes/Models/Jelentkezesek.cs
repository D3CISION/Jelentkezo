using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace jelentkezes.Models
{
    public class Jelentkezesek
    {
        [Key]
        public int Id { get; set; }

        public int EsemenyId { get; set; }
        [ForeignKey("EsemenyId")]
        public virtual Esemeny Esemeny { get; set; }

        public string Email { get; set; }
        [ForeignKey("Email")]
        public virtual Szemelyek Szemelyek { get; set; }

    }
}