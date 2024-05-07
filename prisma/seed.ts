import { PrismaClient } from "@prisma/client";
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const saltRounds = 10; // Adjust salt rounds as needed
    prisma.$transaction(async (tx) => {
        await tx.user.deleteMany({});
        await tx.outlet.deleteMany({});

        // Seed an outlet associated with the first user (ADMIN)
        const outlet = await tx.outlet.create({
            data: {
                name: 'Blue Outlet',
                address: '123 Main Street',
                // user: { connect: { id: users[0].id } }, // Connect to the first user (ADMIN)
            },
        });

        const user = await tx.user.createMany({
            data: [
                { name: 'John Doe', email: 'john.doe@gmail.com', password: hashSync('password', saltRounds), outletId: outlet.id, role: 'ADMIN' },
                { name: 'Sugiono', email: 'sugiono@gmail.com', password: hashSync('password', saltRounds), outletId: outlet.id, role: 'EMPLOYEE' },
            ],
        });

        const product = await tx.product.createMany({
            data: [
                { productCode: 'ER121', name: 'Ager', pricePerMiliLiter: 10000, quantity: 1, quantityUnit: "Liter", description: 'Product 1' },
                { productCode: 'ER122', name: 'Rose', pricePerMiliLiter: 15000, quantity: 1.5, quantityUnit: "Liter", description: 'Product 2' },
                { productCode: 'ER123', name: 'Wood', pricePerMiliLiter: 70000, quantity: 1.5, quantityUnit: "Liter", description: 'Product 3' },
            ],
        });


        console.log(`Created users:`, user);
        console.log(`Created outlet:`, outlet);
        console.log(`Created outlet:`, product);
    })
}


main().catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});