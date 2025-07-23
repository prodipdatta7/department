using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace dotnet_backend_api.Services
{
    public class PdfService
    {
        private readonly IWebHostEnvironment _env;
        public PdfService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public string GeneratePdf(string title, string content)
        {
            var pdfsDir = Path.Combine(_env.WebRootPath, "pdfs");
            if (!Directory.Exists(pdfsDir)) Directory.CreateDirectory(pdfsDir);
            var fileName = $"{Guid.NewGuid()}.pdf";
            var filePath = Path.Combine(pdfsDir, fileName);

            Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.Content()
                        .Column(col =>
                        {
                            col.Item().Text(title).FontSize(20).Bold();
                            col.Item().Text(content).FontSize(14);
                        });
                });
            }).GeneratePdf(filePath);

            return $"/pdfs/{fileName}";
        }

        public List<string> ListPdfs()
        {
            var pdfsDir = Path.Combine(_env.WebRootPath, "pdfs");
            if (!Directory.Exists(pdfsDir)) return new List<string>();
            return Directory.GetFiles(pdfsDir, "*.pdf").Select(f => Path.GetFileName(f)).ToList();
        }

        public string? GetPdfPath(string fileName)
        {
            var pdfsDir = Path.Combine(_env.WebRootPath, "pdfs");
            var filePath = Path.Combine(pdfsDir, fileName);
            return File.Exists(filePath) ? filePath : null;
        }
    }
} 