import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeRepository } from './repository/product-type.repository';

@Injectable()
export class ProductTypeService {
  constructor(private readonly repository: ProductTypeRepository) {}
  create(createProductTypeDto: CreateProductTypeDto) {
    return this.repository.create(createProductTypeDto);
  }

  findAll() {
    return this.repository.findAll();
  }
  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.repository.update(id, updateProductTypeDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
