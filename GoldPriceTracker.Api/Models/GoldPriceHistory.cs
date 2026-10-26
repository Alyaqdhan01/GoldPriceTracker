
namespace GoldPriceTracker.Api.Models
{
    public class GoldPriceHistory
    {
        public string Date { get; set; } = string.Empty;

        public decimal Price18 { get; set; }

        public decimal Price21 { get; set; }

        public decimal Price22 { get; set; }

        public decimal Price24 { get; set; }
    }
}
