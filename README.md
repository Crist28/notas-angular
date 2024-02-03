Documentación General del Proyecto
Versión del Proyecto
Backend:
Node.js: v18.19.0
npm: v10.2.3
Backend

Librerías Utilizadas
bcrypt (^5.1.1):
Descripción: bcrypt es una biblioteca para el hash de contraseñas. Utiliza una función de derivación de clave adaptativa para añadir una "sal" a las contraseñas y, opcionalmente, permite especificar el costo del proceso de hash.
Uso en el Proyecto: Se utiliza para almacenar las contraseñas de forma segura en la base de datos mediante el hash.

cors (^2.8.5):
Descripción: cors (Cross-Origin Resource Sharing) es un middleware de Express que permite o bloquea solicitudes HTTP en función de su origen.
Uso en el Proyecto: Facilita el manejo de solicitudes de recursos entre dominios.

date-fns (^3.3.1):
Descripción: date-fns es una librería que proporciona funciones para manipular y formatear fechas en JavaScript.
Uso en el Proyecto: Se utiliza para operaciones relacionadas con fechas.

dotenv (^16.3.2):
Descripción: dotenv carga variables de entorno desde un archivo .env al proceso de Node.js.
Uso en el Proyecto: Permite gestionar configuraciones sensibles, como claves secretas o detalles de conexión a la base de datos, de manera segura.

express (^4.18.2):
Descripción: Express es un framework web para Node.js que simplifica la creación de aplicaciones y servicios web.
Uso en el Proyecto: Utilizado como servidor HTTP para gestionar las rutas y solicitudes.

jsonwebtoken (^9.0.2):
Descripción: jsonwebtoken se utiliza para la creación y verificación de tokens de autenticación JWT (JSON Web Token).
Uso en el Proyecto: Gestiona la generación y verificación de tokens para la autenticación de usuarios.

mysql2 (^3.7.1):
Descripción: mysql2 es un controlador MySQL para Node.js que se utiliza para la conexión y manipulación de la base de datos MySQL.
Uso en el Proyecto: Facilita la interacción con la base de datos MySQL.

nodemon (^3.0.3):
Descripción: nodemon es una herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en los archivos.
Uso en el Proyecto: Utilizado en entornos de desarrollo para facilitar el proceso de desarrollo continuo.

sequelize (^6.35.2):
Descripción: Sequelize es un ORM (Object-Relational Mapping) para Node.js que facilita la interacción con bases de datos relacionales, como MySQL.
Uso en el Proyecto: Simplifica las consultas y operaciones en la base de datos mediante modelos y relaciones.

#################################################################################################

app.js
Propósito:

El archivo app.js es el punto de entrada principal para iniciar la aplicación. Su función principal es cargar la configuración de las variables de entorno, importar la clase Server desde el módulo server, crear una instancia de la clase y luego iniciar el servidor.

server.js:
Propósito:

Este archivo es responsable de iniciar y configurar el servidor web utilizando la biblioteca Express. Además, se encarga de la conexión inicial con la base de datos y define las rutas principales para la gestión de clientes y notas.


database/conexiondb.js
Propósito:

El archivo conexiondb.js establece la conexión a la base de datos utilizando la librería Sequelize para interactuar con una base de datos MySQL. Su función principal es configurar la conexión y verificar si se puede autenticar correctamente.


helpers/jwt.js
Propósito:

El archivo jwt.js se encarga de generar tokens JWT (JSON Web Tokens) utilizando la librería jsonwebtoken. Su principal función es crear tokens de autenticación para los usuarios, incluyendo información como el identificador del usuario, nombres, apellidos, correo electrónico y fechas de emisión y expiración.

middlewares/auth.js
Propósito:

El archivo auth.js proporciona un middleware de autenticación (auth) que se utiliza para verificar la validez y autenticidad de los tokens JWT presentes en las solicitudes HTTP. Su objetivo principal es garantizar que las rutas protegidas solo sean accesibles para usuarios autenticados.

models/cliente.js
Propósito:

El modelo cliente.js define la estructura y las propiedades de la tabla de clientes en la base de datos. Este modelo se utiliza para interactuar con la tabla de clientes y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) relacionadas con los datos de los clientes.

models/notas.js
Propósito:

El modelo notas.js define la estructura y las relaciones de la tabla de notas en la base de datos. Este modelo se utiliza para interactuar con la tabla de notas y establece una relación con la tabla de clientes mediante el campo clienteId.

routers/cliente.js
Propósito:

El archivo cliente.js define las rutas relacionadas con el modelo de cliente. Utiliza el framework Express para manejar las solicitudes HTTP asociadas con el registro y el inicio de sesión de clientes.

routes/notas.js
Propósito:

El archivo notas.js define las rutas relacionadas con el modelo de notas. Utiliza el framework Express para manejar las solicitudes HTTP asociadas con la creación, obtención, actualización y eliminación de notas. Además, utiliza el middleware auth para autenticar las solicitudes.

controllers/ClienteController.js
Propósito:

El archivo ClienteController.js contiene funciones relacionadas con las operaciones de registro y inicio de sesión de clientes. Estas funciones son utilizadas por las rutas asociadas a la gestión de clientes en el backend.

controllers/NotasController.js
Propósito:

El archivo NotasController.js contiene funciones relacionadas con la gestión de notas, como la creación, obtención, actualización y eliminación de notas asociadas a un cliente autenticado.

#################################################################################################

Documentación General del Proyecto
Versión del Proyecto
Frontend:
Node.js: v18.19.0
npm: v10.2.3
Angular: 17
Frontend

Librerías Utilizadas en el Frontend

popper.js
Versión: ^1.16.1
Descripción: Librería que proporciona utilidades para posicionar elementos en la interfaz de usuario.

jquery
Versión: ^3.7.1
Descripción: Biblioteca rápida y pequeña para simplificar la manipulación del DOM y la interacción con el navegador.

bootstrap
Versión: ^5.3.2
Descripción: Marco de diseño frontend que facilita el desarrollo de interfaces web responsivas y atractivas.
Estructura del Proyecto Frontend
El proyecto frontend está estructurado utilizando Angular 17. A continuación, se describen los archivos y carpetas clave:

Directorio src:

Contiene el código fuente del proyecto Angular.
Archivo angular.json:

Configuración del proyecto Angular, incluyendo las dependencias y scripts de construcción.
Archivo package.json:

Lista de dependencias y configuraciones del proyecto frontend.

Carpeta node_modules:
Contiene las dependencias del proyecto frontend instaladas por npm.

Carpeta src/app:
Contiene componentes, servicios, y otros archivos Angular.

Carpeta src/assets:
Almacena archivos estáticos como imágenes, fuentes, etc.

Dependencias del Proyecto Frontend
Estructura de Directorios
El frontend del proyecto sigue una estructura organizada en componentes para mejorar la modularidad y la mantenibilidad del código.

components Directory:
Contiene componentes reutilizables, como encabezados y pies de página.

pages Directory:
Contiene componentes específicos de páginas, como Home, Login y Register.

Guards y Servicios

Guards
auth.guard.ts:
Este guard protege las rutas que requieren autenticación. Si el usuario no está autenticado, será redirigido a la página de inicio de sesión.

Servicios
auth.service.ts:
Este servicio maneja la lógica de autenticación, incluyendo métodos para iniciar y cerrar sesión, y para verificar el estado de autenticación.

Uso de Componentes

components/header/header.component.ts
Este componente representa el encabezado de la aplicación y puede ser reutilizado en varias 

páginas.
pages/home/home.component.ts
Este componente representa la página de inicio y utiliza el AuthGuard para proteger el acceso a usuarios no autenticados.

Configuración de Rutas
app-routes.ts:
Configura las rutas de la aplicación, aplicando el AuthGuard en la ruta de inicio para proteger el acceso a la página de inicio.

carpeta environments
contiene la api del backend 

##############################################################################################

Base de Datos
El backend del proyecto utiliza MySQL como sistema de gestión de bases de datos. Se emplea XAMPP, que incluye MySQL, Apache y PHP, proporcionando un entorno de desarrollo local completo.

XAMPP: v[versión]
ORM y Conexión a la Base de Datos
Para interactuar con la base de datos MySQL, el proyecto utiliza Sequelize como un Object-Relational Mapping (ORM). Sequelize simplifica la interacción con la base de datos al mapear objetos de la aplicación a registros en la base de datos.

La configuración de la conexión a la base de datos se encuentra en el archivo conexiondb.js. Sequelize utiliza la configuración para establecer la conexión y proporciona una interfaz fácil de usar para realizar operaciones en la base de datos.

Dialecto: MySQL
Usuario: root
Host: localhost
Nombre de la Base de Datos: notas
Puerto: 3306
