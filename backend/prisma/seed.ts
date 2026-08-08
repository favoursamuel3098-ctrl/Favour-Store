import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Favour Store database...");

  // Create categories
  const categories = [
    { name: "Software & Licenses", slug: "software-licenses", description: "Authorized software licenses and activation keys" },
    { name: "E-books", slug: "ebooks", description: "Digital books and PDF guides" },
    { name: "Templates", slug: "templates", description: "Design templates, UI kits and code templates" },
    { name: "Courses", slug: "courses", description: "Online courses and video content" },
    { name: "Design Assets", slug: "design-assets", description: "Graphics, icons and design resources" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Categories created");

  // Create admin user
  const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL || "favoursamuel3098@gmail.com";
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || "ChangeMe123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        fullName: "Favour Samuel Olakunle",
        email: adminEmail,
        passwordHash,
        phone: "09054434502",
        role: "ADMIN",
        isVerified: true,
      },
    });
    console.log(`Admin created: ${adminEmail}`);
  } else {
    console.log("Admin already exists");
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
