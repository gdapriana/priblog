import { reset, seed } from "drizzle-seed";
import db from "../configs/db.js";
import { blogs, categories, sessions, users } from "./schema.js";
import { hash } from "@node-rs/argon2";
import * as schema from "./schema.js"

async function main() {
   const hashedPassword = await hash("11111111");
   await seed(db, { users });
}

main()
