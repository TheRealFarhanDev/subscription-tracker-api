import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

//no need to authorize for these routes
userRouter.get('/', getUsers);
userRouter.post('/', createUser);

//authorize for these routes
userRouter.get('/:id',authorize, getUser);
userRouter.put('/:id',authorize, updateUser);
userRouter.delete('/:id',authorize, deleteUser);


export default userRouter;