import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto ,SignUpRequestDto} from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
    @Post('/signup')
    singup(@Body() dto:SignUpRequestDto){       
        return this.authService.signup(dto);
    }

    @Post('/signin')
    signin(){
        return this.authService.singin()
    }
}