# API de Órdenes - Guía de Uso

## Estructura de Datos Actualizada

La API ahora soporta el formato de datos mejorado para órdenes con información completa del cliente, ubicación de entrega y detalles de productos.

### Estructura de Orden

```typescript
interface OrderResponse {
  id: string;
  clientName: string;
  clientPhone: string;
  deliveryLocation: {
    latitude: number;
    longitude: number;
  };
  address: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  totalAmount: number;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

enum OrderStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  EN_CAMINO = 'en_camino',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
}
```

## Endpoints Disponibles

### 1. Obtener todas las órdenes (formato completo)

```bash
GET /orders/formatted
```

**Respuesta:**

```json
[
  {
    "id": "001",
    "clientName": "María González",
    "clientPhone": "+591 7123-4567",
    "deliveryLocation": {
      "latitude": -17.783333,
      "longitude": -63.183333
    },
    "address": "Av. Cristo Redentor #123, 2do Anillo",
    "items": [
      {
        "id": "1",
        "name": "Pan integral x12",
        "quantity": 2,
        "price": 15.0
      },
      {
        "id": "2",
        "name": "Leche 1L",
        "quantity": 3,
        "price": 8.5
      }
    ],
    "status": "pendiente",
    "createdAt": "2025-07-06T14:00:00Z",
    "totalAmount": 55.5
  }
]
```

### 2. Obtener una orden específica (formato completo)

```bash
GET /orders/:id/formatted
```

### 3. Crear una nueva orden

```bash
POST /orders
```

**Body:**

```json
{
  "id": "003",
  "cliente_id": 1,
  "clientName": "Ana Rodríguez",
  "clientPhone": "+591 7345-6789",
  "address": "Av. Banzer #789, 3er Anillo",
  "deliveryLatitude": -17.789444,
  "deliveryLongitude": -63.175278,
  "items": [
    {
      "id": "5",
      "name": "Queso fresco",
      "quantity": 1,
      "price": 25.0
    }
  ],
  "status": "pendiente",
  "totalAmount": 25.0
}
```

### 4. Actualizar estado de orden

```bash
PATCH /orders/:id/status
```

**Body:**

```json
{
  "status": "en_proceso"
}
```

### 5. Obtener órdenes por cliente

```bash
GET /orders/client/:clientId
```

## Ejemplos de Datos de Prueba

Los siguientes datos se han incluido en el seeder para testing:

### Orden 001 - María González

- **Cliente:** María González (+591 7123-4567)
- **Ubicación:** Santa Cruz (-17.783333, -63.183333)
- **Dirección:** Av. Cristo Redentor #123, 2do Anillo
- **Productos:**
  - Pan integral x12 (cantidad: 2, precio: 15.0)
  - Leche 1L (cantidad: 3, precio: 8.5)
- **Total:** 55.5 Bs
- **Estado:** Pendiente

### Orden 002 - Carlos Mendoza

- **Cliente:** Carlos Mendoza (+591 7234-5678)
- **Ubicación:** Equipetrol (-17.789444, -63.175278)
- **Dirección:** Calle Warnes #456, Equipetrol
- **Productos:**
  - Yogurt natural (cantidad: 4, precio: 6.0)
  - Galletas (cantidad: 2, precio: 12.0)
- **Total:** 48.0 Bs
- **Estado:** Pendiente

## Ejecutar Seeders

Para poblar la base de datos con datos de ejemplo:

```bash
npm run seed
```

Este comando creará:

- 2 clientes de ejemplo
- 4 productos de ejemplo
- 2 órdenes de ejemplo con sus respectivos items

## Notas Técnicas

1. **IDs de UUID:** Las órdenes ahora usan UUIDs en lugar de IDs numéricos para mejor trazabilidad.

2. **Relaciones:**

   - Una orden pertenece a un cliente
   - Una orden tiene muchos items (DetailsOrder)
   - Cada item referencia un producto

3. **Geolocalización:** Las coordenadas de entrega se almacenan como campos separados de latitud y longitud con precisión decimal(10,6).

4. **Estados de Orden:** Se implementó un enum TypeScript para los estados de orden con validación en el backend.

5. **Validación:** Todos los DTOs incluyen validación con class-validator para asegurar integridad de datos.
