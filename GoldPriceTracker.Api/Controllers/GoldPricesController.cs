
using Microsoft.AspNetCore.Mvc;
using GoldPriceTracker.Api.Models;

namespace GoldPriceTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoldPricesController : ControllerBase
    {
        // Current sample gold prices per gram
        private static readonly List<GoldPrice> Prices = new()
        {
            new GoldPrice { Karat = "18K", Price = 37.20m },
            new GoldPrice { Karat = "21K", Price = 43.40m },
            new GoldPrice { Karat = "22K", Price = 45.50m },
            new GoldPrice { Karat = "24K", Price = 49.60m }
        };

        // Sample gold prices for 30 days
        private static readonly List<GoldPriceHistory> History = new()
        {
            new() { Date = "2026-08-31", Price18 = 36.10m, Price21 = 42.10m, Price22 = 44.10m, Price24 = 48.10m },
            new() { Date = "2026-09-01", Price18 = 36.20m, Price21 = 42.20m, Price22 = 44.20m, Price24 = 48.20m },
            new() { Date = "2026-09-02", Price18 = 36.15m, Price21 = 42.15m, Price22 = 44.15m, Price24 = 48.15m },
            new() { Date = "2026-09-03", Price18 = 36.30m, Price21 = 42.35m, Price22 = 44.35m, Price24 = 48.35m },
            new() { Date = "2026-09-04", Price18 = 36.40m, Price21 = 42.45m, Price22 = 44.45m, Price24 = 48.45m },
            new() { Date = "2026-09-05", Price18 = 36.35m, Price21 = 42.40m, Price22 = 44.40m, Price24 = 48.40m },
            new() { Date = "2026-09-06", Price18 = 36.50m, Price21 = 42.55m, Price22 = 44.55m, Price24 = 48.55m },
            new() { Date = "2026-09-07", Price18 = 36.60m, Price21 = 42.70m, Price22 = 44.70m, Price24 = 48.70m },
            new() { Date = "2026-09-08", Price18 = 36.55m, Price21 = 42.65m, Price22 = 44.65m, Price24 = 48.65m },
            new() { Date = "2026-09-09", Price18 = 36.70m, Price21 = 42.80m, Price22 = 44.80m, Price24 = 48.80m },

            new() { Date = "2026-09-10", Price18 = 36.80m, Price21 = 42.90m, Price22 = 44.90m, Price24 = 48.90m },
            new() { Date = "2026-09-11", Price18 = 36.75m, Price21 = 42.85m, Price22 = 44.85m, Price24 = 48.85m },
            new() { Date = "2026-09-12", Price18 = 36.90m, Price21 = 43.00m, Price22 = 45.00m, Price24 = 49.00m },
            new() { Date = "2026-09-13", Price18 = 37.00m, Price21 = 43.10m, Price22 = 45.10m, Price24 = 49.10m },
            new() { Date = "2026-09-14", Price18 = 36.95m, Price21 = 43.05m, Price22 = 45.05m, Price24 = 49.05m },
            new() { Date = "2026-09-15", Price18 = 37.10m, Price21 = 43.20m, Price22 = 45.20m, Price24 = 49.20m },
            new() { Date = "2026-09-16", Price18 = 37.20m, Price21 = 43.30m, Price22 = 45.30m, Price24 = 49.30m },
            new() { Date = "2026-09-17", Price18 = 37.15m, Price21 = 43.25m, Price22 = 45.25m, Price24 = 49.25m },
            new() { Date = "2026-09-18", Price18 = 37.30m, Price21 = 43.40m, Price22 = 45.40m, Price24 = 49.40m },
            new() { Date = "2026-09-19", Price18 = 37.40m, Price21 = 43.50m, Price22 = 45.50m, Price24 = 49.50m },

            new() { Date = "2026-09-20", Price18 = 37.35m, Price21 = 43.45m, Price22 = 45.45m, Price24 = 49.45m },
            new() { Date = "2026-09-21", Price18 = 37.50m, Price21 = 43.60m, Price22 = 45.60m, Price24 = 49.60m },
            new() { Date = "2026-09-22", Price18 = 37.45m, Price21 = 43.55m, Price22 = 45.55m, Price24 = 49.55m },
            new() { Date = "2026-09-23", Price18 = 37.55m, Price21 = 43.65m, Price22 = 45.65m, Price24 = 49.65m },
            new() { Date = "2026-09-24", Price18 = 37.60m, Price21 = 43.70m, Price22 = 45.70m, Price24 = 49.70m },
            new() { Date = "2026-09-25", Price18 = 37.50m, Price21 = 43.60m, Price22 = 45.60m, Price24 = 49.60m },
            new() { Date = "2026-09-26", Price18 = 37.40m, Price21 = 43.50m, Price22 = 45.50m, Price24 = 49.50m },
            new() { Date = "2026-09-27", Price18 = 37.30m, Price21 = 43.45m, Price22 = 45.45m, Price24 = 49.55m },
            new() { Date = "2026-09-28", Price18 = 37.10m, Price21 = 43.30m, Price22 = 45.30m, Price24 = 49.40m },
            new() { Date = "2026-09-29", Price18 = 37.20m, Price21 = 43.40m, Price22 = 45.50m, Price24 = 49.60m }
        };

        // GET: api/goldprices
        [HttpGet]
        public ActionResult<List<GoldPrice>> GetAllPrices()
        {
            return Ok(Prices);
        }

        // GET: api/goldprices/24
        [HttpGet("{karat:int}")]
        public ActionResult<GoldPrice> GetPriceByKarat(int karat)
        {
            string karatName = $"{karat}K";

            var goldPrice = Prices.FirstOrDefault(
                p => p.Karat == karatName
            );

            if (goldPrice == null)
            {
                return NotFound(new
                {
                    message = $"Gold price for {karatName} was not found."
                });
            }

            return Ok(goldPrice);
        }

        // GET: api/goldprices/history
        [HttpGet("history")]
        public ActionResult<List<GoldPriceHistory>> GetHistory()
        {
            return Ok(History);
        }
    }
}
