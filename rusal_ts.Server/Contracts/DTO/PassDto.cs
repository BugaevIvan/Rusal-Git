using System.ComponentModel.DataAnnotations;

namespace rusal_ts.Server.Contracts.DTO
{
    public class PassDto
    {
        [Key]
        public Guid PassId { get; set; }

        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd HH:mm:ss}")]
        public DateTime DateApply { get; set; }

        public string Number { get; set; } = string.Empty;
        [Required]
        public string Status { get; set; } = null!;
        [Required]
        public string Type { get; set; } = null!;
        [Required]
        public string TypePeriod { get; set; } = null!;
        [Required]
        public string Organization { get; set; } = null!;
        [Required]
        public string Comment { get; set; } = null!;
        [Required]
        public DateOnly Datefrom { get; set; }
        [Required]
        public DateOnly Dateto { get; set; }
    }
}
