import { Module } from '@nestjs/common';
import { GastosModule } from './gastos/gastos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GastosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-8ofb.railway.internal',
      port: 50903,
      username: 'root',
      password: 'lXvzrbsBoBWhbcnXsIfzywaCBVNVihXE',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo en desarrollo, sincroniza automáticamente el esquema de la base de datos
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
