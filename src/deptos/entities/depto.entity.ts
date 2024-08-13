import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Depto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  precio: number;

  @Column()
  deposito: number;

  @Column({ type: 'string', default: () => '2024-08-12' })
  luz: string;

  @Column({ type: 'string', default: () => 'CURRENT_TIMESTAMP' })
  vencimiento: string;

  @Column({ default: true })
  activo: boolean;
}
