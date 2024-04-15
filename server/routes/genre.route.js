import express from "express";
const CategoryRouter = express.Router();

CategoryRouter.post("/addcategory");
CategoryRouter.post("/getcategories");
CategoryRouter.get("/category/:id");
CategoryRouter.post("/category/:id/update");
CategoryRouter.post("/category/:id/delete");

export default CategoryRouter;
