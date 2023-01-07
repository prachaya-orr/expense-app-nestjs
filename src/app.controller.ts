import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById() {
    return {};
  }

  @Post()
  createReport() {
    return 'Created';
  }

  @Put(':id')
  updateReport() {
    return 'update';
  }

  @Delete()
  deleteReport() {
    return 'deleted';
  }
}
