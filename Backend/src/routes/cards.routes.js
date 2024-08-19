import { Router } from "express";
import {
  createCards,
  getAllCards,
  searchCard,
} from "../controllers/card.controller.js";
const router = Router();

router.route("/cards").post(createCards);
router.route("/cards").get(getAllCards);
router.route("/search-cards/:value").get(searchCard);
export default router;
