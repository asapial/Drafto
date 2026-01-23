import express, { NextFunction } from "express"
import { postServices } from "./post.service"
import { string } from "better-auth/*";
import { type } from "node:os";
import { validationPaginationAndSorting } from "../../helpers/valiationPaginationAndSorting";



const postThePost = async (req: express.Request, res: express.Response,next:NextFunction) => {
  try {
    const {
      post_title,
      post_description,
      post_tags,
      post_thumbnail,
      published_at,
      post_status,
      author_id,
    } = req.body;

    /* ---------- Validation ---------- */

    // if (!post_title) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please enter a title for your post.",
    //   });
    // }

    // if (typeof post_title !== "string" || post_title.length < 5) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "The post title should be at least 5 characters long.",
    //   });
    // }

    // if (!post_description) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please add some content to your post.",
    //   });
    // }

    // if (typeof post_description !== "string") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Post content must be written in text format.",
    //   });
    // }

    // if (!author_id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Author information is missing. Please log in again.",
    //   });
    // }

    // if (post_tags && !Array.isArray(post_tags)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Tags should be provided as a list.",
    //   });
    // }

    // if (
    //   post_thumbnail &&
    //   (typeof post_thumbnail !== "string" ||
    //     !/^https?:\/\/.+/.test(post_thumbnail))
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide a valid image URL for the thumbnail.",
    //   });
    // }

    // if (
    //   post_status &&
    //   !["draft", "published"].includes(post_status)
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Post status must be either draft or published.",
    //   });
    // }

    // if (published_at && isNaN(Date.parse(published_at))) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide a valid publish date.",
    //   });
    // }

    /* ---------- Create post ---------- */

    const result = await postServices.createPostQuery(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Your post has been published successfully.",
      data: result,
    });

  } catch (error) {
    next(error);
    // console.error("Post creation failed:", error);

    // return res.status(500).json({
    //   success: false,
    //   message: "Something went wrong while creating your post. Please try again.",
    // });
  }
};



const getThePost = async (req: express.Request, res: express.Response) => {
  try {
    const { search, tags, featured, page, limit, sortBy, sortOrder } = req.query;

    /* -------------------- Validation -------------------- */

    // Validate `search`
    let searchingType: string | undefined = undefined;
    if (search !== undefined) {
      if (typeof search !== "string") {
        return res.status(400).json({
          success: false,
          message: "Search query must be a string.",
        });
      }
      searchingType = search.trim();
    }

    // Validate `tags`
    let tagList: string[] = [];
    if (tags !== undefined) {
      if (typeof tags !== "string") {
        return res.status(400).json({
          success: false,
          message: "Tags must be a comma-separated string.",
        });
      }

      tagList = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      if (tagList.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one valid tag is required.",
        });
      }
    }

    // Validate `featured`
    const is_featured: boolean | undefined = featured
      ? (featured === 'true'
        ? (true) : (featured === 'false'
          ? false : undefined))
      : (undefined);

    // Validate `pagination and sorting`

    const { skip: validateSkip, page: validatePage, limit: validateLimit, sortBy: validateSortBy, sortOrder: vaidateSortOrder } = validationPaginationAndSorting({ page: page as string, limit: limit as string, sortBy: sortBy as string, sortOrder: sortOrder as string });



    /* -------------------- Service Call -------------------- */

    const result = await postServices.getAllPostQuery({
      search: searchingType,
      tags: tagList,
      is_featured: is_featured,
      page: validatePage,
      skip: validateSkip,
      limit: validateLimit,
      sortBy: validateSortBy,
      sortOrder: vaidateSortOrder
    });

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Post fetching failed:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching posts. Please try again.",
    });
  }
};

const getThePostById = async (req: express.Request, res: express.Response,next:NextFunction) => {


  try {

    const id = req.params.id;

    const result = await postServices.getPostQueryById(id as string)

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    next(error);
    // console.error("Post fetching failed:", error);

    // return res.status(500).json({
    //   success: false,
    //   message: "Something went wrong while fetching posts. Please try again.",
    // });
  }
};


const getMyPosts = async (req: express.Request, res: express.Response) => {


  try {

    const id = req.user.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Author information is missing. Please log in again.",
      })
    }

    const result = await postServices.getMyPostsQuery(id as string)
    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Post fetching failed:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching posts. Please try again.",
    });
  }
};


const updateThePost = async (req: express.Request, res: express.Response) => {
  try {
    const userData = req.user;
    const postId = req.params.id;
    const data = req.body;

    if (!userData?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!Object.keys(data).length) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    const result = await postServices.updatePostQuery(
      userData,
      postId as string,
      data
    );

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    return res.status(
      error.message === "Post not found" ? 404 :
      error.message === "Forbidden" ? 403 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};



const postStatus = async (req: express.Request, res: express.Response) => {
  try {
    
    const result = await postServices.postStatusQuery();

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    return res.status(
      error.message === "Post not found" ? 404 :
      error.message === "Forbidden" ? 403 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteThePost = async (req: express.Request, res: express.Response) => {
  try {
    const userData = req.user;
    const postId = req.params.id;

    if (!userData?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await postServices.deletePostQuery(
      userData,
      postId as string,

    );

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    return res.status(
      error.message === "Post not found" ? 404 :
      error.message === "Forbidden" ? 403 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};



export const postController = {
  postThePost,
  getThePost,
  getThePostById,
  getMyPosts,
  updateThePost,
  deleteThePost,
  postStatus
}