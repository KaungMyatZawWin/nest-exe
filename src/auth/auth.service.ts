import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return {message:'This is signup service.'}
    };

    singin(){
        return {message:'This is signin service.'}
    }
}