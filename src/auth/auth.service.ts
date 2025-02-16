import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";

@Injectable({})
export class AuthService{
    async signup(dto:AuthDto){
        const users:{email:string,password:string}[] = [];
        const hash = await argon2.hash(dto.password)        
        const user = {email:dto.email,password:hash}
        users.push(user);
        return users;
    };

    singin(){
        return {message:'This is signin service.'}
    }
}