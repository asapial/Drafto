
import  { Router } from "express";
import { postController } from "./post.controller";
import auth from "../../middleware/auth.middleware";

const router=Router();

// router.get("/",(req,res)=>{

//     res.send("Hello abdullah");
// })

router.post("/",auth(),postController.postThePost)
router.get("/",postController.getThePost)
router.get("/:id",postController.getThePostById)



export  const postRoute=router;