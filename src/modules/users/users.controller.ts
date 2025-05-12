import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../authentication/guards';
import { descriptions, messages } from '../../common/constants';
import { AuthenticatedRequest } from '../authentication/interfaces';
import { UpdateUserDto, UserDetailsResponseDto } from './dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.USER.GET_USER_DETAILS,
    })
    @Get('/')
    async fetchUserDetails(
        @Req() req: AuthenticatedRequest,
    ): Promise<{ message: string; data: UserDetailsResponseDto }> {
        const { userId } = req.user;
        const user = await this.usersService.getUserDetails(userId);
        return {
            message: messages.DATA_FETCHED_SUCCESS,
            data: user,
        };
    }

    @ApiBearerAuth()
    @ApiOperation({
        description: descriptions.USER.UPDATE_PREFERENCES,
    })
    @Patch('/')
    async update(
        @Req() req: AuthenticatedRequest,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<{ message: string }> {
        const { userId } = req.user;
        await this.usersService.update(userId, updateUserDto);
        return { message: messages.USER.UPDATE };
    }
}
