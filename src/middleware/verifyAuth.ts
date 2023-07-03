import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth(req:Request,res:Response,next:NextFunction){
    const authToken = req.headers.authorization
    if(authToken){
        const [...splitToken] = authToken.split(" ")
        const token = splitToken[1]
        try {
            verify(token,'123')
            return next()
        } catch (error) {
            return res.status(401).json({message:"nao autorizado"})
            
        }
    }
    return res.status(401).json({message:"nao autorizado"})
    

}