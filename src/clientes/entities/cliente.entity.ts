import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  depto: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: string;

  @Column({ default: true })
  activo: boolean;  // Si el abono está activo o no
}
