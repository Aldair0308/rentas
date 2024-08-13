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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  luz: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  vencimiento: Date;

  @Column({ default: true })
  activo: boolean; 
}
