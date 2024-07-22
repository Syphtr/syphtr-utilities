import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import * as pdfParse from 'pdf-parse';

@Injectable()
export class PdfParserService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async processPdf(file: Express.Multer.File): Promise<string> {
    const pdfBuffer = file.buffer;
    const pdfData = await pdfParse(pdfBuffer);
    const text = pdfData.text;

    const apiKey = this.configService.get<string>('OPEN_AI_KEY');
    const gptUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            "Analyze the following text and extract a detailed profile in a strict, standardized format. The format should be exactly as follows:\n\n'Name: [Name]\nPublic Identifier: [Last part of the LinkedIn URL]\nLinkedIn Profile URL: [LinkedIn Profile URL]\nLanguages: [Languages]\n\nRoles:\n1. Employer: [Employer]\n   Role: [Role]\n   Tenure: [Tenure]\n   Location: [Location]\n(and so on for all roles, grouped by employer if there is more than one role per employer)\n\nEducation:\n1. Institution: [Institution]\n   Course: [Course]\n   Tenure: [Tenure]\n(and so on for all educational details)'\n\nIf any details, especially 'Location:', are missing for any entry, indicate it as 'Location: Not specified'.\n\n{truncated_text}\n\nEnd of Text.",
        },
        { role: 'user', content: text },
      ],
      max_tokens: 2000, // Adjust the max_tokens as needed
      temperature: 1,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(gptUrl, payload, { headers }),
      );
      console.log(response.data.choices[0].message);
      return response.data.choices[0].message;
      // return text;
    } catch (error) {
      if (error.response?.status === 429) {
        console.error('Rate limit exceeded, please try again later.');
      } else if (error.response?.status === 403) {
        console.error(
          'Quota exceeded, please check your billing and plan details.',
        );
      } else {
        console.error(
          'Error processing PDF:',
          error.response?.data || error.message,
        );
      }
      throw error;
    }
  }

  generateJsonData(transformedText) {
    const lines = transformedText.split('\n');
    const jsonData = [];

    lines.forEach((line) => {
      const [key, value] = line.split(': ');
      if (key && value) {
        jsonData.push({ [key]: value });
      }
    });

    return jsonData;
  }
}
