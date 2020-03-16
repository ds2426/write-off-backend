import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Deduction } from '../deductions/interfaces/deduction.interface';
import { CreateDeductionDTO } from '../deductions/dto/create-deduction.dto';

@Injectable()
export class DeductionService {
  constructor(@InjectModel('Deduction') private readonly deductionModel: Model<Deduction>) { }

  async addDeduction(createDeductionDTO: CreateDeductionDTO): Promise<Deduction> {
    const newDeduction = await this.deductionModel(createDeductionDTO);
    return newDeduction.save();
  }  

  async getDeduction(deductionID): Promise<Deduction> {
    const deduction = await this.deductionModel
      .findById(deductionID)
      .exec();
    return deduction;
  }

  async getDeductions(): Promise<Deduction[]> {
    const deductions = await this.deductionModel.find().exec();
    return deductions;
  }

  async editDeduction(deductionID, createDeductionDTO: CreateDeductionDTO): Promise<Deduction> {
    const editedDeduction = await this.deductionModel
      .findByIdAndUpdate(deductionID, createDeductionDTO, { new: true });
    return editedDeduction;
  }

  async deleteDeduction(deductionID): Promise<any> {
    const deletedDeduction = await this.deductionModel
      .findByIdAndRemove(deductionID);
    return deletedDeduction;
  }
} 
