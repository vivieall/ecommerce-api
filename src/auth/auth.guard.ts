import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization

        if (!authHeader){
             new UnauthorizedException('El header de autorizacion no existe')
        }

        const email = authHeader.split(":")[0]
        const password  = authHeader.split(":")[1]

        if (!email || !password) {
            throw new UnauthorizedException('Credencial no valida')
        }

        return true

    }

}