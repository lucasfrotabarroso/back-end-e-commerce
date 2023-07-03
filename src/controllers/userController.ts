import { Request, Response } from "express"
import { UserService } from "../services/userService"
export class UserController {

    // userService : UserService
    // this.userService = userService

    constructor(
        private readonly userService = new UserService()
    ) {}

    createUser = async (req:Request, res:Response) => {
        const user = req.body
        
        if (!user.name || !user.password || !user.email){
            res.status(400).json({message:"dados invalidos"})
            
        }
         this.userService.createUser(user.name,user.email,user.password)
         return res.status(201).json({message:'Usuario criado'})

    }
     getUsers = async (req:Request, res: Response)=>{
        const users = await this.userService.getUsers()
        return res.status(200).json(users)
    }
    deleteUser = async(req:Request, res:Response)=>{
        const id = req.params.id
        this.userService.deleteUser(id)
        return res.status(200).json({message:'Usuário deletado com sucesso'})
    }
    updateUser = async (req:Request, res:Response) => {
        const id = req.params.id
        const user = req.body
        await this.userService.updateUser(id,user)
        return res.status(200).json({message:"Usuário atualizado com sucesso!"})
      
    }
    

        
    

}