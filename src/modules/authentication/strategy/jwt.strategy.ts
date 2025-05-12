import { unauthorized } from '@hapi/boom';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { messages } from 'src/common/constants/messages';
import { UsersRepository } from 'src/modules/users/repositories';
import { JwtPayload, ValidatedUser } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userRepository: UsersRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            issuer: configService.get('cognito.authorityUrl'),
            algorithms: ['RS256'],
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.get('cognito.authorityUrl')}/.well-known/jwks.json`,
            }),
        });
    }

    async validate(payload: JwtPayload): Promise<ValidatedUser> {
        const user: User | null = await this.userRepository.findUserByCognitoId(payload.sub);

        if (!user) {
            throw unauthorized(messages.USER.NOT_FOUND);
        }

        return {
            cognitoId: payload.sub,
            userId: user.id,
            role: payload.role,
        };
    }
}
