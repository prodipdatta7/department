using dotnet_backend_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PdfController : ControllerBase
    {
        private readonly PdfService _pdfService;
        public PdfController(PdfService pdfService)
        {
            _pdfService = pdfService;
        }

        [HttpPost("generate")]
        public ActionResult<object> Generate([FromBody] PdfRequest request)
        {
            var url = _pdfService.GeneratePdf(request.Title, request.Content);
            return Ok(new { url });
        }

        [HttpGet("list")]
        public ActionResult<List<string>> List()
        {
            var files = _pdfService.ListPdfs();
            return Ok(files);
        }

        [HttpGet("download/{fileName}")]
        public IActionResult Download(string fileName)
        {
            var path = _pdfService.GetPdfPath(fileName);
            if (path == null) return NotFound();
            var stream = System.IO.File.OpenRead(path);
            return File(stream, "application/pdf", fileName);
        }
    }

    public class PdfRequest
    {
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
    }
} 