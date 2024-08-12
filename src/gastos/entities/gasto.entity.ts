import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gasto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  descripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ default: true })
  activo: boolean;  // Si el abono está activo o no
}
