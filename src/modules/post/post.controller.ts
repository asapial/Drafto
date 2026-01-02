import express from "express"
import { postServices } from "./post.service"

const postTheUser=async (req:express.Request,res:express.Response)=>{
    console.log("Controller : ", req.body);

    try {
        const result = await postServices.createPostQuery(req.body);
res.status(201).json({
    result
}
)
    } catch (error) {
        console.log("Error occur here : ",error);
    }


}



export const postController={
    postTheUser
}