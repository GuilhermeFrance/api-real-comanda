import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductRepository) {}

  create(createProductDto: CreateProductDto) {
    return this.repository.create(createProductDto);
  }

  getPrice(id: number) {
    return this.repository.getPrice(id);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.repository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
