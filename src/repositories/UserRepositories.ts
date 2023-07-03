import { EntityManager, UpdateResult } from "typeorm";
import { User } from "../entities/User.entity";


export class UserRepository {
    private manager:EntityManager
    constructor(manager:EntityManager){
        this.manager = manager       
    }

    createUser = async  (user:User):Promise<User>=> {
        return this.manager.save(user)
    }
    getUsers = async ():Promise<User[]> =>{
        return this.manager.find(User)
    }
    deleteUser = async (id: string): Promise<void> => {
        const user = await this.getUserById(id)
        if (user) {
          await this.manager.remove(user);
        } 
      };
    updateUser =async (id:string,body:Partial <User>):Promise <UpdateResult> => {
       const user = await this.getUserById(id)
       if (user){
        return this.manager.update(User,user.id_user,body)
       }
       throw new Error("usuario nao encontrado!")
    } 
    
      
    getUserById = async (id: string) => {
        const user = await this.manager.findOne(User,{
            where:{id_user: id}
        })
        return user
    }
    

    getUserByEmailAndPassword = async(email:string,password:string):Promise<User | null>=> {
       return this.manager.findOne(User,{
            where: {
                email:email,
                password:password
            }
        })

    }
      
}