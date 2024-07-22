import { Controller } from '@nestjs/common';
import { PdfParserService } from './pdf-parser.service';

@Controller('pdf-parser')
export class PdfParserController {
  constructor(private readonly pdfParserService: PdfParserService) {}
}
