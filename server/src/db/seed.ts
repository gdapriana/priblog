import { reset, seed } from "drizzle-seed";
import db from "../configs/db.js";
import * as schema from "./schema.js";
import { hash } from "@node-rs/argon2";

const USER_COUNT = 10;
const CATEGORY_COUNT = 5;
const BLOG_COUNT = 30;
const SESSION_COUNT = 15;

async function main() {
  const hashedPassword = await hash("11111111");

   await reset(db, schema);

  await seed(db, schema).refine((f) => ({
    users: {
      count: USER_COUNT,
      columns: {
        name: f.fullName(),
        age: f.int({ minValue: 18, maxValue: 60 }),
        email: f.email(),
        hashedPassword: f.default({ defaultValue: hashedPassword }),
      },
    },
    categories: {
      count: CATEGORY_COUNT,
      columns: {
        slug: f.string({ isUnique: true }),
        title: f.loremIpsum({ sentencesCount: 1 }),
      },
    },
    blogs: {
      count: BLOG_COUNT,
      columns: {
        userId: f.int({ minValue: 1, maxValue: USER_COUNT }),
        categoryId: f.int({ minValue: 1, maxValue: CATEGORY_COUNT }),
        slug: f.string({ isUnique: true }),
        title: f.loremIpsum({ sentencesCount: 1 }),
        excerpt: f.loremIpsum({ sentencesCount: 2 }),
      },
    },
    sessions: {
      count: SESSION_COUNT,
      columns: {
        id: f.uuid(),
        userId: f.int({ minValue: 1, maxValue: USER_COUNT }),
        userAgent: f.valuesFromArray({
          values: [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0",
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1",
            "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
          ],
        }),
        ipAddress: f.valuesFromArray({
          values: ["127.0.0.1", "192.168.1.10", "10.0.0.5"],
        }),
      },
    },
  }));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
