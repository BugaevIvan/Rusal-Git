using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rusal.Server.DAL.Entities;

namespace rusal.Server.API.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PassController(AppDbContext passContext) : Controller
    {
        [HttpPost]
        public async Task<IActionResult> PostPass([FromBody] Pass pass)
        {
            var now = DateTime.Now;
            pass.DateApply = now;
            //var neededDate = $"{now.Year}-{now.Month.ToString("00")}-";
            var neededDate = $"{now:yyyy-MM}-";

            var numbers = await passContext.Passes
                .Where(nPass => nPass.DateApply.Year == now.Year && nPass.DateApply.Month == now.Month)
                .Select(nPass => nPass.Number)
                .ToListAsync();

            var lastNumber = numbers
                .Select(numberPass => int.TryParse(numberPass.Split('-').LastOrDefault(), out int num) ? num : 0)
                .DefaultIfEmpty(0) // Добавлено для предотвращения исключений, если список пуст
                .Max();

            pass.Number = $"{neededDate}{(lastNumber + 1).ToString("D2")}";

            pass.PassId = Guid.NewGuid();

            await passContext.Passes.AddAsync(pass);
            await passContext.SaveChangesAsync();
            return CreatedAtAction("PostPass", pass);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pass>>> GetPasses()
        {
            if (passContext.Passes == null)
                return NotFound();
            return await passContext.Passes.ToListAsync();
        }

        [HttpGet("{passId}")]
        public async Task<ActionResult<Pass>> GetPass([FromRoute] Guid passId)
        {
            if (passContext.Passes == null)
                return NotFound();
            var pass = await passContext.Passes.FirstOrDefaultAsync(pass => pass.PassId == passId);
            if (pass == null)
                return NotFound();
            return pass!;
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePass([FromBody] Pass pass)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var thatPass = await passContext.Passes.FirstOrDefaultAsync(p => p.PassId == pass.PassId);

            if (thatPass == null)
                return NotFound();

            thatPass.Status = pass.Status;
            thatPass.Type = pass.Type;
            thatPass.TypePeriod = pass.TypePeriod;
            thatPass.Organization = pass.Organization;
            thatPass.Comment = pass.Comment;
            thatPass.Dateto = pass.Dateto;
            thatPass.Datefrom = pass.Datefrom;

            await passContext.SaveChangesAsync();
            return Ok();
        }
    }
}
