import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read

router.get("/", verifyToken, getFeedPosts); // this will grab the user feed whn on home page
router.get("/userId/posts", verifyToken,getUserPosts); // on thee user profile it will show only user post

// UPDATE
router.patch("/:id/like", verifyToken, likePost); // for liking the post

export default router;

