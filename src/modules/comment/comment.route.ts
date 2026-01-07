import { Router } from "express";
import { commentController } from "./comment.control";
import auth from "../../middleware/auth.middleware";



const router=Router();


router.get("/:id",auth(["user","admin"]),commentController.getCommentById)
router.delete("/:id",auth(["user","admin"]),commentController.deleteCommentById)
router.patch("/:id",auth(["user","admin"]),commentController.updateCommentById)
router.get("/author/:id",auth(["user","admin"]),commentController.getCommentByAuthorId)
router.post("/",auth(["user","admin"]),commentController.postComment)








export const commentRoute=router;