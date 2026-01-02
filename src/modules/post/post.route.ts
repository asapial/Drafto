
import  { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth.middleware";

const router=Router();

// router.get("/",(req,res)=>{

//     res.send("Hello abdullah");
// })

router.post("/",auth(),postController.postTheUser)



export  const postRoute=router;