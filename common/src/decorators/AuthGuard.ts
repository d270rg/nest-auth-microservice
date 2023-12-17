import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../clients/user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const access_token = this.extractTokenFromHeader(request);
    if (!access_token) {
      return false;
    }

    try {
      const validationResult = await firstValueFrom(
        this.userService.validateUser({ access_token }),
      );
      request['user'] = validationResult.data;
      return true;
    } catch (e) {
      console.log(`[AuthGuard] Error ${e}`);
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
