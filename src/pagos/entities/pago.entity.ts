import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  tipo: string;

  @Column()
  depto: string;

  @Column()
  cliente: string;

  @Column()
  telefono: string;

  @Column({ default: true })
  activo: boolean;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
