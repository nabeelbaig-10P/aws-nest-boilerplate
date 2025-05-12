import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/modules/authentication/guards';
import { messages } from 'src/common/constants/messages';
import { PostSignupUserDto } from '../users/dto/post-signup.dto';
import { UsersService } from '../users/users.service';

@ApiTags('Webhooks')
@Controller('webhook')
export class WebhookController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(ApiKeyGuard)
    @Post('/post-signup')
    async postSignup(@Body() postSignupDto: PostSignupUserDto): Promise<{ message: string }> {
        await this.usersService.userPostSignup(postSignupDto);
        return { message: messages.USER.CREATED_SUCCESS };
    }
}
