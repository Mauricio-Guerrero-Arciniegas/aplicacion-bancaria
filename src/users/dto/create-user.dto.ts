import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  name!: string;

  @IsEmail({}, { message: 'Debe ser un email válido' })
  @MaxLength(100, { message: 'El email no puede tener más de 100 caracteres' })
  email!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsOptional()
  @IsNumber({}, { message: 'El balance debe ser un número' })
  balance?: number; // balance inicial opcional
}