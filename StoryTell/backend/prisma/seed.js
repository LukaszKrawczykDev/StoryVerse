const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('user', 10);

    await prisma.user.create({
        data: {
            username: 'user',
            email: 'user@gmail.com',
            password_hash: hashedPassword,
            role: 'user',
            bio: 'System administrator',
            avatar: 'https://example.com/avatar.png',
            settings: {
                create: {
                    theme: 'dark',
                    privacy: 'private',
                },
            },
        },
    });

    console.log('✅ User seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error while seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });