import { sign } from "jsonwebtoken"
import { AppDataSource } from "../database"
import { User } from "../entities/User.entity"
import { UserRepository } from "../repositories/UserRepositories"
import { Subject } from "typeorm/persistence/Subject"
import { EmailService } from "./emailService"

export class UserService {
    private userRepository:UserRepository
    private emailService : EmailService

    constructor (
        emailService = new EmailService(),
        userRespository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRespository
        this.emailService = emailService
    }
    getUsers=async ()=>{
        try {
            const users = await this.userRepository.getUsers()
            return users
            
            }
            
         catch (error) {
            return {
                status: false,
                message: error,
                code:500
            }
        }
         
        
    }
    createUser = async (name:string, email:string,password:string):Promise <User>=> {
        
            const user = new User(name,email,password)
            this.emailService.sendEmail(email,"Registro","Usuario registrado","<b>Usuario criado com sucesso!!</b>")
            return  this.userRepository.createUser(user)
        
    }

    
    deleteUser = async (id:string)=>{

        try {
            return await this.userRepository.deleteUser(id)
            
    
        } catch (error) {
            return {
                status:false,
                code:500,
                message:error

            }
            

    
}
        
        
        
    }
    updateUser = async(id:string,body:Partial<User>) => {
        try {
            return await this.userRepository.updateUser(id,body)
            
        } catch (error) {
            return {
                status:false,
                code:500,
                message:error
            }
        }
        
    }

    getUserByEmailAndPassword=  (email:string, password:string) : Promise <User | null>=>{
        
         return this.userRepository.getUserByEmailAndPassword(email,password)
         
        }
        
         

    
    getToken = async (email:string, password:string):Promise<string> => {
       const user = await this.getUserByEmailAndPassword(email,password)
       if(!user){
        throw new Error("dados invalidos")
       }
       const secretKey = '123'
       const tokenData = {
        name: user?.name,
        email:user?.email
       }
       const keyOption = {
        subject:user.id_user
       }
       const token = sign(tokenData,secretKey,keyOption)
       return token


    }
    

    }