import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
const router = Router();

//Get All Foods
router.get("/", (req, res) => {
  res.send(sample_foods);
});

//Get All Foods Tags
router.get("/tags", (req, res) => {
  res.send(sample_tags);
});

//Get Foods by Search Term
router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

//Get Foods by Tags
router.get("/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

//Get Foods by ID
router.get("/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find((food) => food.id === foodId);
  res.send(foods);
});

export default router;
