
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
router.get("/my/posts",auth(),postController.getMyPosts)
router.patch("/:id",auth(),postController.updateThePost)
router.delete("/:id",auth(),postController.deleteThePost)
router.get("/post/status",auth(["admin"]),postController.postStatus)





export  const postRoute=router;