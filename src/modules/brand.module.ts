import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from 'src/controllers/brand/brand.controller';
import { BrandService } from 'src/services/brand/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
