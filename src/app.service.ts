import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface Report {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(
    type: ReportType,
    { source, amount }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);
    return newReport;
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReport,
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);

    return;
  }
}
