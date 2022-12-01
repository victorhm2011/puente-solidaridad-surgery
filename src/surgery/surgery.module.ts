import { Module } from '@nestjs/common';
import { SurgeryService } from './services/surgery.service';
import { SurgeryController } from './controllers/surgery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurgeryEntity } from './models/surgery.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HospitalController } from './controllers/hospital/hospital.controller';
import { HospitalService } from './services/hospital/hospital.service';
import { HospitalEntity } from './models/hospital.entity';
import { ResponsibleController } from './controllers/responsible/responsible.controller';
import { ResponsibleService } from './services/responsible/responsible.service';
import { ResponsibleEntity } from './models/responsible/responsible.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurgeryEntity, HospitalEntity, ResponsibleEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    HttpModule,
    ClientsModule.register([
      {
        name: 'SURGERY_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://jyfecvep:U5wYaOhncHXDjTdmiRqUP4B_5Qck41Lk@jackal.rmq.cloudamqp.com/jyfecvep'],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  providers: [SurgeryService, JwtGuard, JwtStrategy, RolesGuard,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    HospitalService,
    ResponsibleService
  ],
  controllers: [SurgeryController, HospitalController, ResponsibleController]
})
export class SurgeryModule {}
