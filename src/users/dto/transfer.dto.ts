import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class TransferDto {
  @IsUUID('4', { message: 'El ID del usuario destinatario debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El destinatario es obligatorio' })
  toUserId!: string;

  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0.01, { message: 'El monto debe ser mayor a 0' })
  amount!: number;
}