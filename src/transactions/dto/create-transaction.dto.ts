import { IsUUID, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  receiver_id!: string;

  @IsNumberString()
  amount!: string; // string to enforce decimal format from client

  @IsOptional()
  @IsString()
  description?: string;
}
