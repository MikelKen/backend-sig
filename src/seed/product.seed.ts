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
    console.log('🔄 Sincronizando Products (Zapatos)...');

    const products = [
      // ZAPATOS DEPORTIVOS
      {
        name: 'Nike Air Max 270',
        active: true,
        stock: 25,
        image: 'nike-air-max-270.jpg',
        category: 'Deportivos',
        color: 'Negro/Blanco',
        size: '42',
        price: 450.0,
        description:
          'Zapatillas deportivas Nike Air Max 270 con tecnología de amortiguación',
      },
      {
        name: 'Adidas Ultraboost 22',
        active: true,
        stock: 18,
        image: 'adidas-ultraboost-22.jpg',
        category: 'Deportivos',
        color: 'Azul',
        size: '41',
        price: 520.0,
        description:
          'Zapatillas Adidas Ultraboost 22 para running con tecnología Boost',
      },
      {
        name: 'Puma RS-X3',
        active: true,
        stock: 22,
        image: 'puma-rsx3.jpg',
        category: 'Deportivos',
        color: 'Blanco/Gris',
        size: '40',
        price: 380.0,
        description: 'Zapatillas Puma RS-X3 con diseño retro-futurista',
      },
      {
        name: 'New Balance 990v5',
        active: true,
        stock: 15,
        image: 'new-balance-990v5.jpg',
        category: 'Deportivos',
        color: 'Gris',
        size: '43',
        price: 480.0,
        description: 'New Balance 990v5 Made in USA, comodidad premium',
      },

      // ZAPATOS CASUALES
      {
        name: 'Converse Chuck Taylor All Star',
        active: true,
        stock: 35,
        image: 'converse-chuck-taylor.jpg',
        category: 'Casuales',
        color: 'Negro',
        size: '39',
        price: 280.0,
        description: 'Clásicas zapatillas Converse Chuck Taylor All Star',
      },
      {
        name: 'Vans Old Skool',
        active: true,
        stock: 28,
        image: 'vans-old-skool.jpg',
        category: 'Casuales',
        color: 'Negro/Blanco',
        size: '41',
        price: 320.0,
        description: 'Zapatillas Vans Old Skool con la clásica banda lateral',
      },
      {
        name: 'Adidas Stan Smith',
        active: true,
        stock: 30,
        image: 'adidas-stan-smith.jpg',
        category: 'Casuales',
        color: 'Blanco/Verde',
        size: '42',
        price: 350.0,
        description:
          'Icónicas zapatillas Adidas Stan Smith, estilo minimalista',
      },

      // ZAPATOS FORMALES
      {
        name: 'Clarks Desert Boot',
        active: true,
        stock: 12,
        image: 'clarks-desert-boot.jpg',
        category: 'Formales',
        color: 'Marrón',
        size: '43',
        price: 650.0,
        description: 'Botas Clarks Desert Boot en cuero genuino',
      },
      {
        name: 'Oxford Leather Shoes',
        active: true,
        stock: 8,
        image: 'oxford-leather.jpg',
        category: 'Formales',
        color: 'Negro',
        size: '42',
        price: 750.0,
        description: 'Zapatos Oxford de cuero para ocasiones formales',
      },
      {
        name: 'Loafers Penny',
        active: true,
        stock: 10,
        image: 'loafers-penny.jpg',
        category: 'Formales',
        color: 'Marrón Claro',
        size: '41',
        price: 580.0,
        description: 'Mocasines Penny Loafers de cuero premium',
      },

      // BOTAS
      {
        name: 'Dr. Martens 1460',
        active: true,
        stock: 16,
        image: 'dr-martens-1460.jpg',
        category: 'Botas',
        color: 'Negro',
        size: '42',
        price: 720.0,
        description: 'Botas Dr. Martens 1460 originales con suela AirWair',
      },
      {
        name: 'Timberland 6-Inch Premium',
        active: true,
        stock: 14,
        image: 'timberland-6inch.jpg',
        category: 'Botas',
        color: 'Wheat',
        size: '43',
        price: 680.0,
        description: 'Botas Timberland 6-Inch Premium impermeables',
      },
      {
        name: 'Red Wing Iron Ranger',
        active: true,
        stock: 6,
        image: 'red-wing-iron-ranger.jpg',
        category: 'Botas',
        color: 'Marrón Oscuro',
        size: '44',
        price: 950.0,
        description: 'Botas Red Wing Iron Ranger, construcción artesanal',
      },

      // SANDALIAS
      {
        name: 'Birkenstock Arizona',
        active: true,
        stock: 20,
        image: 'birkenstock-arizona.jpg',
        category: 'Sandalias',
        color: 'Marrón',
        size: '42',
        price: 420.0,
        description: 'Sandalias Birkenstock Arizona con plantilla de corcho',
      },
      {
        name: 'Adidas Adilette',
        active: true,
        stock: 25,
        image: 'adidas-adilette.jpg',
        category: 'Sandalias',
        color: 'Negro',
        size: '41',
        price: 180.0,
        description: 'Chanclas Adidas Adilette para uso casual',
      },

      // ZAPATOS PARA MUJER
      {
        name: 'Nike Air Force 1 Low',
        active: true,
        stock: 22,
        image: 'nike-air-force-1.jpg',
        category: 'Deportivos Mujer',
        color: 'Blanco',
        size: '38',
        price: 400.0,
        description: 'Nike Air Force 1 Low para mujer, diseño clásico',
      },
      {
        name: 'Adidas Gazelle',
        active: true,
        stock: 18,
        image: 'adidas-gazelle.jpg',
        category: 'Casuales Mujer',
        color: 'Rosa',
        size: '37',
        price: 360.0,
        description: 'Adidas Gazelle para mujer, estilo retro',
      },
      {
        name: 'Ballerinas Clásicas',
        active: true,
        stock: 15,
        image: 'ballerinas-clasicas.jpg',
        category: 'Formales Mujer',
        color: 'Negro',
        size: '39',
        price: 280.0,
        description: 'Ballerinas clásicas de cuero para uso formal',
      },
      {
        name: 'Tacones Altos',
        active: true,
        stock: 12,
        image: 'tacones-altos.jpg',
        category: 'Formales Mujer',
        color: 'Rojo',
        size: '38',
        price: 450.0,
        description: 'Tacones altos elegantes para ocasiones especiales',
      },

      // ZAPATOS INFANTILES
      {
        name: 'Converse Kids Chuck Taylor',
        active: true,
        stock: 30,
        image: 'converse-kids.jpg',
        category: 'Infantiles',
        color: 'Azul',
        size: '32',
        price: 180.0,
        description: 'Converse Chuck Taylor para niños, colores vibrantes',
      },
      {
        name: 'Nike Kids Air Max',
        active: true,
        stock: 25,
        image: 'nike-kids-air-max.jpg',
        category: 'Infantiles',
        color: 'Multicolor',
        size: '35',
        price: 220.0,
        description: 'Nike Air Max para niños con tecnología de amortiguación',
      },
      {
        name: 'Adidas Kids Superstar',
        active: true,
        stock: 28,
        image: 'adidas-kids-superstar.jpg',
        category: 'Infantiles',
        color: 'Blanco/Negro',
        size: '33',
        price: 200.0,
        description: 'Adidas Superstar para niños, diseño icónico',
      },

      // ZAPATOS DE TRABAJO
      {
        name: 'Caterpillar Colorado',
        active: true,
        stock: 10,
        image: 'caterpillar-colorado.jpg',
        category: 'Trabajo',
        color: 'Marrón',
        size: '43',
        price: 580.0,
        description: 'Botas Caterpillar Colorado para trabajo pesado',
      },
      {
        name: 'Safety Boots Steel Toe',
        active: true,
        stock: 8,
        image: 'safety-boots-steel.jpg',
        category: 'Trabajo',
        color: 'Negro',
        size: '44',
        price: 620.0,
        description: 'Botas de seguridad con puntera de acero',
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

    console.log('✅ Products (Zapatos) sincronizados exitosamente.');
  }
}
