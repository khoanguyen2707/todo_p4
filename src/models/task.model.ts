import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;
    @Column({ type: 'varchar' })
    title: string;
    @Column({ type: 'text' })
    body: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
