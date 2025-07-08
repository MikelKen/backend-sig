import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../modules/product/entities/product.entity';

@Injectable()
export class ProductSeeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async syncProduct() {
    console.log('🔄 Sincronizando Products...');

    const products = [
      {
        name: 'Pan integral x12',
        active: true,
        stock: 100,
        image: 'pan-integral.jpg',
        category: 'Panadería',
        color: 'Marrón',
        size: 'Grande',
        price: 15.0,
        description: 'Pan integral fresco, paquete de 12 unidades',
      },
      {
        name: 'Leche 1L',
        active: true,
        stock: 50,
        image: 'leche.jpg',
        category: 'Lácteos',
        color: 'Blanco',
        size: '1L',
        price: 8.5,
        description: 'Leche fresca entera de 1 litro',
      },
      {
        name: 'Yogurt natural',
        active: true,
        stock: 75,
        image: 'yogurt.jpg',
        category: 'Lácteos',
        color: 'Blanco',
        size: '200ml',
        price: 6.0,
        description: 'Yogurt natural sin azúcar',
      },
      {
        name: 'Galletas',
        active: true,
        stock: 30,
        image: 'galletas.jpg',
        category: 'Snacks',
        color: 'Dorado',
        size: 'Mediano',
        price: 12.0,
        description: 'Galletas dulces variadas',
      },
      {
        name: 'Queso fresco',
        active: true,
        stock: 25,
        image: 'queso.jpg',
        category: 'Lácteos',
        color: 'Blanco',
        size: 'Grande',
        price: 25.0,
        description: 'Queso fresco artesanal',
      },
    ];

    for (const productData of products) {
      const existingProduct = await this.productRepository.findOne({
        where: { name: productData.name },
      });

      if (!existingProduct) {
        const product = this.productRepository.create(productData);
        await this.productRepository.save(product);
        console.log(`✅ Producto creado: ${productData.name}`);
      } else {
        console.log(`⚠️ Producto ya existe: ${productData.name}`);
      }
    }

    console.log('✅ Products sincronizados exitosamente.');
  }
}
