using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using jelentkezes.Models;


namespace jelentkezes.Database
{
    public class JelentkezesContext : DbContext
    {
        public DbSet<Esemeny> Esemeny { get; set; }
        public DbSet<Szemelyek> Szemelyek { get; set; }
        public DbSet<Jelentkezesek> Jelentkezesek { get; set; }

        public JelentkezesContext() : base("name=JelentkezesContext") { }
        public JelentkezesContext(DbConnection existingConnection, bool contextOwnsConnection)
        : base(existingConnection, contextOwnsConnection) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}