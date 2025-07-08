import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { MainSeeder } from './main.seed';

async function runSeeders() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const mainSeeder = app.get(MainSeeder);

  try {
    console.log('🌱 Starting database seeding...');
    await mainSeeder.run();
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

runSeeders();
