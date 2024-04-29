import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, 
ForbiddenException,} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { verifyJWT } from 'src/shareEntire/utils';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            if (!request.headers.authorization) {
                throw new UnauthorizedException('no access_token');
            }

            const access_token = request.headers.authorization.replace("Bearer ", "");
            if (!access_token || access_token.trim() === '') {
                throw new UnauthorizedException('no access_token');
            }

            const resp = await verifyJWT(access_token);
            request.decodedData = resp;

            return true;
        } catch (error) {
            throw new ForbiddenException(error.message || 'session expired! please sign In');
        }
    }
}