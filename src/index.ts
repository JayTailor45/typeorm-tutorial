import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { Post } from "./entity/Post";
import express, { Request, Response } from "express";
import { validate } from "class-validator";

const app = express();
app.use(express.json());

app.post("/users", async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  try {
    const user = User.create({ name, email, role });
    const errors = await validate(user);
    if(errors.length > 0) {
      throw errors;
    }
    await user.save();
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/users", async (_: Request, res: Response) => {
  try {
    const users = await User.find({relations: ['posts']});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.put("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    await user.remove();
    return res.status(204).json({ message: "User is deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/users/:uuid", async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOneOrFail({ uuid });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.post("/posts", async (req: Request, res: Response) => {
  const { userUuid, title, body } = req.body;
  try {
    const user = await User.findOneOrFail({ uuid: userUuid });
    const post = new Post({ title, body, user });
    const errors = await validate(post);
    if(errors.length > 0) {
      throw errors;
    }
    await post.save();
    return res.status(201).json(post);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
});

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({relations: ['user']});
    return res.json(posts);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err });
  }
});

createConnection()
  .then((async) => {
    app.listen(5000, () => console.log(`Serer is running on port 5000`));
  })
  .catch((error) => console.log(error));
