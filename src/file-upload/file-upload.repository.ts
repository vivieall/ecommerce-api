import { Injectable } from '@nestjs/common'; // Importa el decorador Injectable de NestJS para definir una clase como un proveedor de servicios.
import { UploadApiResponse, v2 } from 'cloudinary'; // Importa las interfaces UploadApiResponse y el objeto v2 de la librería Cloudinary.
import toStream = require('buffer-to-stream'); // Importa el módulo buffer-to-stream, que convierte un buffer de datos en un flujo (stream).

@Injectable() // Marca la clase FileUploadRepository como un proveedor de NestJS que puede ser inyectado en otros componentes.
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> { // Define un método asincrónico que sube una imagen y devuelve una promesa de UploadApiResponse.
    return new Promise((resolve, reject) => { // Crea y devuelve una nueva promesa.
      const upload = v2.uploader.upload_stream( // Crea un flujo de carga usando el método upload_stream de Cloudinary.
        { resource_type: 'auto' }, // Configura el tipo de recurso a 'auto' para que Cloudinary detecte el tipo de archivo automáticamente.
        (error, result) => { // Define un callback que maneja el resultado de la carga o un error.
          if (error) { // Si ocurre un error en la carga.
            reject(error); // Rechaza la promesa con el error.
          } else { // Si la carga es exitosa.
            resolve(result); // Resuelve la promesa con el resultado de la carga.
          }
        },
      );

      toStream(file.buffer).pipe(upload); // Convierte el buffer del archivo en un flujo y lo envía al flujo de carga de Cloudinary.
    });
  }
}