import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});

//Get All Foods
app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});

//Get All Foods Tags
app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});

//Get Foods by Search Term
app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

//Get Foods by Tags
app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

//Get Foods by ID
app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find((food) => food.id === foodId);
  res.send(foods);
});

//Login
app.post("/api/users/login", (req, res) => {
  //Destructuring Assignment
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("Username or password is not valid!");
  }
});

//Generating Token with JWT
const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "SomeRandomText",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;
  return user;
};

//Just checking if everything is working in backend
