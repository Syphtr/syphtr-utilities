import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfParserService } from './pdf-parser/pdf-parser.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private pdfService: PdfParserService,
  ) {}

  @Get()
  getProfiles() {
    return this.appService.getProfile();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const text = await this.pdfService.processPdf(file);
    // const transformedText = await this.pdfService.generateJsonData(text);

    return text;
  }
}
