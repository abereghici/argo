import { PrismaClient } from "@prisma/client";
import bcrypt from "@node-rs/bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const hashedPassword = await bcrypt.hash("mysupergoodpassword", 10);

  await prisma.user.create({
    data: {
      email: "you@example.com",
      firstName: "You",
      lastName: "Example",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

try {
  seed();
  process.exit(0);
} catch (error: unknown) {
  console.error(error);
  process.exit(1);
}
