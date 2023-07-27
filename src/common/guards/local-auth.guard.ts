import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { email, password } = request.body;
        let errorMessages = [];
        if (!email) errorMessages.push('Email is required');
        if (!password) errorMessages.push('Password is required');
        if (errorMessages.length) throw new UnauthorizedException(errorMessages.join(', '));
        return super.canActivate(context);
    }
}