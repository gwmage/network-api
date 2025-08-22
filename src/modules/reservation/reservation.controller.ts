import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiProperty } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
  // ... rest of the code
}