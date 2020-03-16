import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { CreateDeductionDTO } from '../deductions/dto/create-deduction.dto';
import { ValidateObjectId } from '../deductions/shared/pipes/validate-object-id.pipes';

@Controller('deduction')
export class DeductionController {

  constructor(private deductionService: DeductionService) { }

  // Submit a deduction
  @Post('/add')
  async addDeduction(@Res() res, @Body() createDeductionDTO: CreateDeductionDTO) {
    const newDeduction = await this.deductionService.addDeduction(createDeductionDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Deduction has been submitted successfully!',
      deduction: newDeduction,
    });
  }

  // Fetch a particular deduction using ID
  @Get('deduction/:deductionID')
  async getDeduction(@Res() res, @Param('deductionID', new ValidateObjectId()) deductionID) {
    const deduction = await this.deductionService.getDeduction(deductionID);
    if (!deduction) {
        throw new NotFoundException('Deduction does not exist!');
    }
    return res.status(HttpStatus.OK).json(deduction);
  }

  // Fetch all deductions
  @Get('deductions')
  async getDeductions(@Res() res) {
    const deductions = await this.deductionService.getDeductions();
    return res.status(HttpStatus.OK).json(deductions);
  }

  // Edit a particular deduction using ID
  @Put('/edit')
  async editDeduction(
    @Res() res,
    @Query('deductionID', new ValidateObjectId()) deductionID,
    @Body() createDeductionDTO: CreateDeductionDTO,
  ) {
    const editedDeduction = await this.deductionService.editDeduction(deductionID, createDeductionDTO);
    if (!editedDeduction) {
        throw new NotFoundException('Deduction does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Deduction has been successfully updated',
      deduction: editedDeduction,
    });
  }

  // Delete a deduction using ID
  @Delete('/delete')
  async deleteDeduction(@Res() res, @Query('deductionID', new ValidateObjectId()) deductionID) {
    const deletedDeduction = await this.deductionService.deleteDeduction(deductionID);
    if (!deletedDeduction) {
        throw new NotFoundException('Deduction does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Deduction has been deleted!',
      deduction: deletedDeduction,
    });
  }
}
