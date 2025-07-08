# Documentación para Pruebas de API con Postman

Este documento describe cómo probar los endpoints del sistema de gestión de pedidos, entregas y rutas mediante Postman.

## Configuración Inicial en Postman

1. **Crear una nueva colección**:
   - Nombre: "SIG API"
   - Crea una variable de entorno llamada `base_url` con el valor `http://localhost:3000`

2. **Configuración de Headers globales**:
   - Content-Type: application/json

## Estructura de Endpoints por Módulo

### 1. Clientes (Client)

#### Crear un cliente
- **Método**: POST
- **URL**: {{base_url}}/client
- **Body (raw JSON)**:
```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "phone": "123456789",
  "address": "Av. Principal #123"
}
```

#### Obtener todos los clientes
- **Método**: GET
- **URL**: {{base_url}}/client

#### Obtener un cliente específico
- **Método**: GET
- **URL**: {{base_url}}/client/1

#### Actualizar un cliente
- **Método**: PATCH
- **URL**: {{base_url}}/client/1
- **Body (raw JSON)**:
```json
{
  "name": "Juan Carlos",
  "phone": "987654321"
}
```

#### Eliminar un cliente
- **Método**: DELETE
- **URL**: {{base_url}}/client/1

### 2. Productos (Product)

#### Crear un producto
- **Método**: POST
- **URL**: {{base_url}}/product
- **Body (raw JSON)**:
```json
{
  "name": "Camisa Azul",
  "active": true,
  "stock": 100,
  "image": "camisa-azul.jpg",
  "category": "Ropa",
  "color": "Azul",
  "size": "M",
  "price": 29.99,
  "description": "Camisa de algodón color azul talla M"
}
```

#### Obtener todos los productos
- **Método**: GET
- **URL**: {{base_url}}/product

#### Obtener un producto específico
- **Método**: GET
- **URL**: {{base_url}}/product/1

#### Actualizar un producto
- **Método**: PATCH
- **URL**: {{base_url}}/product/1
- **Body (raw JSON)**:
```json
{
  "stock": 90,
  "price": 27.99
}
```

#### Eliminar un producto
- **Método**: DELETE
- **URL**: {{base_url}}/product/1

### 3. Pedidos (Order)

#### Crear un pedido
- **Método**: POST
- **URL**: {{base_url}}/order
- **Body (raw JSON)**:
```json
{
  "cliente_id": 1,
  "total": 59.98,
  "state": "pendiente",
  "ubication": "Zona Norte",
  "estimatedDeliveryDate": "2025-05-20T15:00:00.000Z",
  "latitude": -17.783341,
  "longitude": -63.182126,
  "paid": false
}
```

#### Obtener todos los pedidos
- **Método**: GET
- **URL**: {{base_url}}/order

#### Obtener un pedido específico
- **Método**: GET
- **URL**: {{base_url}}/order/1

#### Obtener pedidos de un cliente
- **Método**: GET
- **URL**: {{base_url}}/order/client/1

#### Actualizar un pedido
- **Método**: PATCH
- **URL**: {{base_url}}/order/1
- **Body (raw JSON)**:
```json
{
  "state": "en proceso",
  "paid": true
}
```

#### Eliminar un pedido
- **Método**: DELETE
- **URL**: {{base_url}}/order/1

### 4. Detalles de Pedido (DetailsOrder)

#### Crear un detalle de pedido
- **Método**: POST
- **URL**: {{base_url}}/details-order
- **Body (raw JSON)**:
```json
{
  "productId": 1,
  "amount": 2,
  "unitPrice": 29.99,
  "deliveryAddress": "Av. Principal #123",
  "subTotal": 59.98
}
```

#### Obtener todos los detalles de pedido
- **Método**: GET
- **URL**: {{base_url}}/details-order

#### Obtener un detalle específico
- **Método**: GET
- **URL**: {{base_url}}/details-order/1

#### Actualizar un detalle de pedido
- **Método**: PATCH
- **URL**: {{base_url}}/details-order/1
- **Body (raw JSON)**:
```json
{
  "amount": 3,
  "subTotal": 89.97
}
```

#### Eliminar un detalle de pedido
- **Método**: DELETE
- **URL**: {{base_url}}/details-order/1

### 5. Repartidores (Dealer)

#### Crear un repartidor
- **Método**: POST
- **URL**: {{base_url}}/dealer
- **Body (raw JSON)**:
```json
{
  "name": "Carlos",
  "active": true,
  "registrationDate": "2025-05-14",
  "address": "Calle 123 #456",
  "dni": "12345678",
  "phone": "123456789",
  "email": "carlos@example.com",
  "lastName": "González"
}
```

#### Obtener todos los repartidores
- **Método**: GET
- **URL**: {{base_url}}/dealer

#### Obtener un repartidor específico
- **Método**: GET
- **URL**: {{base_url}}/dealer/1

#### Actualizar un repartidor
- **Método**: PATCH
- **URL**: {{base_url}}/dealer/1
- **Body (raw JSON)**:
```json
{
  "active": false,
  "phone": "987654321"
}
```

#### Eliminar un repartidor
- **Método**: DELETE
- **URL**: {{base_url}}/dealer/1

### 6. Vehículos (Vehicle)

#### Crear un vehículo
- **Método**: POST
- **URL**: {{base_url}}/vehicle
- **Body (raw JSON)**:
```json
{
  "type": "Motocicleta",
  "active": true,
  "photo": "moto-honda.jpg",
  "capacityKg": 50,
  "nroPlate": "ABC123",
  "model": "Honda CB150",
  "dealer": {
    "id": 1
  }
}
```

#### Obtener todos los vehículos
- **Método**: GET
- **URL**: {{base_url}}/vehicle

#### Obtener un vehículo específico
- **Método**: GET
- **URL**: {{base_url}}/vehicle/1

#### Obtener vehículos por repartidor
- **Método**: GET
- **URL**: {{base_url}}/vehicle/dealer/1

#### Actualizar un vehículo
- **Método**: PATCH
- **URL**: {{base_url}}/vehicle/1
- **Body (raw JSON)**:
```json
{
  "active": false,
  "capacityKg": 60
}
```

#### Eliminar un vehículo
- **Método**: DELETE
- **URL**: {{base_url}}/vehicle/1

### 7. Entregas (Delivery)

#### Crear una entrega
- **Método**: POST
- **URL**: {{base_url}}/delivery
- **Body (raw JSON)**:
```json
{
  "comment": "Llamar al llegar",
  "order_delivery": 1,
  "state": "pendiente",
  "location_delivery": "Zona Norte, Calle Principal",
  "payment_type": "efectivo",
  "latitude": -17.783341,
  "longitude": -63.182126,
  "sequence": 1
}
```

#### Obtener todas las entregas
- **Método**: GET
- **URL**: {{base_url}}/delivery

#### Obtener una entrega específica
- **Método**: GET
- **URL**: {{base_url}}/delivery/1

#### Actualizar una entrega
- **Método**: PATCH
- **URL**: {{base_url}}/delivery/1
- **Body (raw JSON)**:
```json
{
  "state": "entregado",
  "actual_delivery_date": "2025-05-14T16:30:00.000Z"
}
```

#### Eliminar una entrega
- **Método**: DELETE
- **URL**: {{base_url}}/delivery/1

### 8. Rutas (Route)

#### Crear una ruta
- **Método**: POST
- **URL**: {{base_url}}/route
- **Body (raw JSON)**:
```json
{
  "date": "2025-05-14",
  "hour_end": "18:00:00",
  "delivery_quantity": 5,
  "hour_start": "09:00:00",
  "total_distance": 15.5,
  "polyline": "encoded_polyline_string_here",
  "dealer": {
    "id": 1
  }
}
```

#### Obtener todas las rutas
- **Método**: GET
- **URL**: {{base_url}}/route

#### Obtener una ruta específica
- **Método**: GET
- **URL**: {{base_url}}/route/1

#### Obtener rutas por repartidor
- **Método**: GET
- **URL**: {{base_url}}/route/dealer/1

#### Actualizar una ruta
- **Método**: PATCH
- **URL**: {{base_url}}/route/1
- **Body (raw JSON)**:
```json
{
  "hour_end": "19:00:00",
  "total_distance": 18.7
}
```

#### Eliminar una ruta
- **Método**: DELETE
- **URL**: {{base_url}}/route/1

## Flujo de prueba recomendado

Para probar el sistema completo, se sugiere seguir este orden de creación:

1. Crear clientes
2. Crear productos
3. Crear repartidores
4. Crear vehículos asociados a repartidores
5. Crear pedidos asociados a clientes
6. Crear detalles de pedido asociados a productos
7. Crear entregas asociadas a pedidos
8. Crear rutas asociadas a repartidores y entregas

## Consejos para pruebas

- **Variables**: Utiliza el entorno de variables de Postman para almacenar IDs de recursos creados y reutilizarlos en otras solicitudes.
- **Tests**: Puedes configurar pruebas en Postman para verificar códigos de respuesta y valores específicos.
- **Colecciones**: Organiza tus endpoints en carpetas según el módulo para mantener un mejor orden.
- **Pre-request Scripts**: Útiles para configurar datos dinámicos antes de enviar solicitudes.

## Posibles errores comunes

1. **404 Not Found**: Verificar que la ruta esté bien escrita y que el recurso exista.
2. **400 Bad Request**: Verificar que el cuerpo de la solicitud tenga todos los campos requeridos y con los tipos correctos.
3. **500 Internal Server Error**: Puede indicar un problema en el servidor, revisa los logs.
4. **403 Forbidden**: Verificar permisos si has implementado autenticación.

## Validación de relaciones

Para comprobar que las relaciones entre entidades funcionan correctamente:

1. Crea un cliente y luego crea pedidos asociados a ese cliente.
2. Crea un producto y luego detalles de pedido asociados a ese producto.
3. Verifica que al obtener un cliente, también se obtengan sus pedidos relacionados.
4. Verifica que al obtener un repartidor, también se obtengan sus vehículos y rutas relacionadas.