import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './../auth/guards/auth.guard'

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) { }

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProduct (
    @Param('id') id: string,
    @UploadedFile(new ParseFilePipe({ 
      validators: [ 
        new MaxFileSizeValidator({ 
          maxSize: 200000,
          message: 'File size too large', 
        }),
        new FileTypeValidator({ 
          fileType: /(jpg|jpeg|png|webp)$/, 
        }),
      ],
    }),) file: Express.Multer.File,
    ) 
   {
    return this.fileUploadService.uploadProductImage(file, id)
  }
  
}
