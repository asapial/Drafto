import { prisma } from "../lib/prisma";

const seedingAdmin = async () => {
  try {
    const adminData = {
      name: "Admin 4",
      email: "admin4@gmail.com",
      password: `${process.env.admin_password}`
    };

    /* ------------------ Validation ------------------ */
    if (!adminData.name || !adminData.email || !adminData.password) {
      throw new Error("Admin seed failed: Missing required fields");
    }

    /* ------------------ Sign Up ------------------ */
    const response = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      }
    );

    const data = await response.json();

    /* ------------------ Handle API Errors ------------------ */
    if (!response.ok) {
      console.error("Admin seed failed:", data);
      return;
    }

    /* ------------------ Promote to Admin ------------------ */
    await prisma.user.update({
      where: {
        email: data.user.email,
      },
      data: {
        emailVerified: true,
      },
    });

    console.log("Admin seeded successfully");
    // console.log(data);
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

seedingAdmin();
