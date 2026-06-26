import { Router } from "express";
import {
  createUserService,
  getUserByIdService,
  getUserByAuth0IdService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
} from "../services/userService.ts";

const router = Router();

router.post("/", async (req, res) => {
  console.log("Creating user with body:", req.body);
  try {
    const user = await createUserService(req.body);
    console.log("Created user:", user);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users" });
  }
});

router.post("/sync-auth0-user", async (req, res) => {
  console.log("sync-auth0-user body:", req.body);
  try {
    const auth0Id = req.body.auth0_id;
    const email = req.body.email;
    const name = req.body.name ?? null;

    if (!auth0Id || !email) {
      return res.status(400).json({ error: "Missing Auth0 user data" });
    }

    const existingUser = await getUserByAuth0IdService(auth0Id);

    if (existingUser) {
      return res.json(existingUser);
    }

    const user = await createUserService({
      auth0_id: auth0Id,
      email,
      name,
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error("Sync user error:", err);
    return res.status(500).json({ error: "Failed to sync user" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await updateUserService(id, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await deleteUserService(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
