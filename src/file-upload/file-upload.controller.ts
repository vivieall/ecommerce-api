import { Controller, Post, Param, UploadedFile, UseInterceptors, ParseFilePipe, // Importa los decoradores y clases necesarios para definir el controlador y manejar archivos.
  MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common'; // Importa los validadores para el tamaño máximo del archivo y el tipo de archivo.
import { FileUploadService } from './file-upload.service'; // Importa el servicio de carga de archivos.
import { Express } from 'express'; // Importa el tipo Express para los archivos cargados.
import { FileInterceptor } from '@nestjs/platform-express'; // Importa el interceptor para manejar la carga de archivos en NestJS.

@Controller('files') // Define el controlador con la ruta base 'files'.
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {} // Inyecta el servicio de carga de archivos en el controlador.

  @Post('uploadImage/:productId') // Define un endpoint POST en la ruta 'uploadImage/:productId' para cargar imágenes de productos.
  @UseInterceptors(FileInterceptor('file')) // Usa el interceptor FileInterceptor para manejar la carga del archivo con el campo 'file'.
  async uploadProductImage(
    @Param('productId') productId: string, // Extrae el parámetro 'productId' de la ruta.
    @UploadedFile( // Usa el decorador UploadedFile para obtener el archivo cargado.
      new ParseFilePipe({ // Aplica validaciones al archivo cargado usando ParseFilePipe.
        validators: [ // Lista de validadores aplicados al archivo.
          new MaxFileSizeValidator({ // Valida que el tamaño del archivo no supere el límite especificado.
            maxSize: 2000000, // Tamaño máximo del archivo en bytes (2 MB).
            message: 'File size too large', // Mensaje de error si el archivo es demasiado grande.
          }),
          new FileTypeValidator({ // Valida el tipo de archivo permitido.
            fileType: /(jpg|jpeg|png|webp)$/, // Tipos de archivo permitidos (imágenes JPEG, PNG y WEBP).
          }),
        ],
      }),
    )
    file: Express.Multer.File, // Define el tipo de archivo cargado como Express.Multer.File.
  ) {
    return this.fileUploadService.uploadProductImage(file, productId); // Llama al método del servicio para manejar la carga del archivo y el ID del producto.
  }
}