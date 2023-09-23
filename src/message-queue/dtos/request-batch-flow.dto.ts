import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RequestBatchFlowDto {
  @IsString()
  @Expose()
  no: string;

  @IsString()
  @Expose()
  parcelCompanyName: string;

  @IsString()
  @Expose()
  invoiceNo: string;

  @IsString()
  @IsOptional()
  @Expose()
  statusChanged?: string;
}
