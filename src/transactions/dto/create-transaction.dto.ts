import { IsUUID, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  receiver_id!: string;

  @IsNumberString()
  amount!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
