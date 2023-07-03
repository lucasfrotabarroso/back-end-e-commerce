import { Router } from "express";
import { UserController } from "./controllers/userController";
import { LoginController } from "./controllers/loginController";
import { verifyAuth } from "./middleware/verifyAuth";

export const router = Router()

const userController = new UserController()
const loginController = new LoginController()



router.get('/user',userController.getUsers)
router.post('/user',userController.createUser)
router.delete('/user/:id',userController.deleteUser)
router.put('/user/:id',verifyAuth,userController.updateUser)
router.post('/login', loginController.login)

// cadastra(post) --> login(post) --> atualizar usuario por ID (token)