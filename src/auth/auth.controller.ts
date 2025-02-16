import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
    @Post('/signup')
    singup(@Body() authDto:AuthDto){
        console.log("checking ==> " ,authDto);
        
        return this.authService.signup();
    }

    @Post('/signin')
    signin(){
        return this.authService.singin()
    }
}