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
      {
        name: 'María',
        lastName: 'González',
        email: 'maria.gonzalez@email.com',
        phone: '+591 7123-4567',
        address: 'Av. Cristo Redentor #123, 2do Anillo',
      },
      {
        name: 'Carlos',
        lastName: 'Mendoza',
        email: 'carlos.mendoza@email.com',
        phone: '+591 7234-5678',
        address: 'Calle Warnes #456, Equipetrol',
      },
      {
        name: 'Ana',
        lastName: 'Rodríguez',
        email: 'ana.rodriguez@email.com',
        phone: '+591 7345-6789',
        address: 'Av. Banzer #789, 3er Anillo',
      },
      {
        name: 'Luis',
        lastName: 'Fernández',
        email: 'luis.fernandez@email.com',
        phone: '+591 7456-7890',
        address: 'Calle Libertad #321, Centro',
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
