import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../modules/client/entities/client.entity';

@Injectable()
export class ClientSeeder {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async syncClient() {
    console.log('🔄 Sincronizando Clients...');

    const clients = [
      // CLIENTES ZONA NORTE
      {
        name: 'María',
        lastName: 'González',
        email: 'maria.gonzalez@email.com',
        phone: '+591 7123-4567',
        address: 'Av. Cristo Redentor #123, 2do Anillo Norte',
      },
      {
        name: 'Carlos',
        lastName: 'Mendoza',
        email: 'carlos.mendoza@email.com',
        phone: '+591 7234-5678',
        address: 'Calle Warnes #456, Equipetrol Norte',
      },
      {
        name: 'Ana',
        lastName: 'Rodríguez',
        email: 'ana.rodriguez@email.com',
        phone: '+591 7345-6789',
        address: 'Av. Banzer #789, 3er Anillo Norte',
      },
      {
        name: 'Luis',
        lastName: 'Fernández',
        email: 'luis.fernandez@email.com',
        phone: '+591 7456-7890',
        address: 'Calle Libertad #321, Plan 3000',
      },

      // CLIENTES ZONA SUR
      {
        name: 'Elena',
        lastName: 'Vargas',
        email: 'elena.vargas@email.com',
        phone: '+591 7567-8901',
        address: 'Av. Santos Dumont #654, Zona Sur',
      },
      {
        name: 'Roberto',
        lastName: 'Morales',
        email: 'roberto.morales@email.com',
        phone: '+591 7678-9012',
        address: 'Calle Alemana #987, Villa Olímpica',
      },
      {
        name: 'Patricia',
        lastName: 'Silva',
        email: 'patricia.silva@email.com',
        phone: '+591 7789-0123',
        address: 'Av. Roca y Coronado #147, Zona Sur',
      },

      // CLIENTES ZONA ESTE
      {
        name: 'Diego',
        lastName: 'Herrera',
        email: 'diego.herrera@email.com',
        phone: '+591 7890-1234',
        address: 'Av. Moscú #258, Villa 1ro de Mayo',
      },
      {
        name: 'Carmen',
        lastName: 'Flores',
        email: 'carmen.flores@email.com',
        phone: '+591 7901-2345',
        address: 'Calle Los Cusis #369, Villa 1ro de Mayo',
      },
      {
        name: 'Andrés',
        lastName: 'Gutiérrez',
        email: 'andres.gutierrez@email.com',
        phone: '+591 7012-3456',
        address: 'Av. G77 #741, Zona Este',
      },

      // CLIENTES ZONA OESTE
      {
        name: 'Sofía',
        lastName: 'Ramírez',
        email: 'sofia.ramirez@email.com',
        phone: '+591 7123-4560',
        address: 'Av. Paraguá #852, Zona Oeste',
      },
      {
        name: 'Fernando',
        lastName: 'Castro',
        email: 'fernando.castro@email.com',
        phone: '+591 7234-5601',
        address: 'Calle Sucre #963, Zona Oeste',
      },

      // CLIENTES CENTRO
      {
        name: 'Valentina',
        lastName: 'López',
        email: 'valentina.lopez@email.com',
        phone: '+591 7345-6012',
        address: 'Calle 21 de Mayo #159, Centro',
      },
      {
        name: 'Gabriel',
        lastName: 'Jiménez',
        email: 'gabriel.jimenez@email.com',
        phone: '+591 7456-7023',
        address: 'Av. Monseñor Rivero #357, Centro',
      },
      {
        name: 'Isabella',
        lastName: 'Vega',
        email: 'isabella.vega@email.com',
        phone: '+591 7567-8034',
        address: 'Calle Campero #468, Centro',
      },

      // CLIENTES BARRIOS RESIDENCIALES
      {
        name: 'Sebastián',
        lastName: 'Torres',
        email: 'sebastian.torres@email.com',
        phone: '+591 7678-9045',
        address: 'Urb. Las Palmas #579, Barrio Las Palmas',
      },
      {
        name: 'Camila',
        lastName: 'Méndez',
        email: 'camila.mendez@email.com',
        phone: '+591 7789-0156',
        address: 'Condominio Los Jardines #680, Los Jardines',
      },
      {
        name: 'Nicolás',
        lastName: 'Rojas',
        email: 'nicolas.rojas@email.com',
        phone: '+591 7890-1267',
        address: 'Av. Los Cusis #791, Barrio Los Cusis',
      },

      // CLIENTES COMERCIALES/EMPRESARIALES
      {
        name: 'Victoria',
        lastName: 'Sánchez',
        email: 'victoria.sanchez@email.com',
        phone: '+591 7901-2378',
        address: 'Av. Irala #135, Equipetrol',
      },
      {
        name: 'Emilio',
        lastName: 'Córdoba',
        email: 'emilio.cordoba@email.com',
        phone: '+591 7012-3489',
        address: 'Calle Murillo #246, Equipetrol',
      },
      {
        name: 'Lucía',
        lastName: 'Peña',
        email: 'lucia.pena@email.com',
        phone: '+591 7123-4590',
        address: 'Av. San Martín #357, 4to Anillo',
      },

      // CLIENTES ZONAS PERIFÉRICAS
      {
        name: 'Mateo',
        lastName: 'Aguilar',
        email: 'mateo.aguilar@email.com',
        phone: '+591 7234-5601',
        address: 'Av. Mutualista #468, Mutualista',
      },
      {
        name: 'Daniela',
        lastName: 'Ortega',
        email: 'daniela.ortega@email.com',
        phone: '+591 7345-6712',
        address: 'Calle Principal #579, Pampa de la Isla',
      },
      {
        name: 'Joaquín',
        lastName: 'Molina',
        email: 'joaquin.molina@email.com',
        phone: '+591 7456-7823',
        address: 'Av. Radial 26 #680, Radial 26',
      },
      {
        name: 'Valeria',
        lastName: 'Rivero',
        email: 'valeria.rivero@email.com',
        phone: '+591 7567-8934',
        address: 'Calle Los Tajibos #791, Los Tajibos',
      },
    ];

    for (const clientData of clients) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: clientData.email },
      });

      if (!existingClient) {
        const client = this.clientRepository.create(clientData);
        await this.clientRepository.save(client);
        console.log(
          `✅ Cliente creado: ${clientData.name} ${clientData.lastName}`,
        );
      } else {
        console.log(`⚠️ Cliente ya existe: ${clientData.email}`);
      }
    }

    console.log('✅ Clients sincronizados exitosamente.');
  }
}
