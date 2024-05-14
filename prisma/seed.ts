import { PrismaClient } from "@prisma/client";
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const saltRounds = 10; // Adjust salt rounds as needed
    await prisma.$transaction(async (tx) => {
        // Seed an outlet associated with the first user (ADMIN)
        const outlet = await tx.outlet.create({
            data: {
                name: 'Blue Outlet',
                address: 'Main Street 123',
                // user: { connect: { id: users[0].id } }, // Connect to the first user (ADMIN)
            },
        });

        await tx.user.createMany({
            data: [
                { name: 'admin', email: 'admin@gmail.com', password: hashSync('password', saltRounds), outletId: outlet.id, role: 'ADMIN' },
                { name: 'Owner', email: 'owner@gmail.com', password: hashSync('password', saltRounds), outletId: outlet.id, role: 'OUTLET_OWNER' },
                { name: 'Sugiono', email: 'sugiono@gmail.com', password: hashSync('password', saltRounds), outletId: outlet.id, role: 'EMPLOYEE' },
            ],
        });

        await tx.product.createMany({
            data: [
                { productCode: 'ER121', name: 'Ager', price: 10000, sealedQuantity: 0, openedQuantity: 0, description: 'Product 1' },
                { productCode: 'ER122', name: 'Rose', price: 15000, sealedQuantity: 0, openedQuantity: 0, description: 'Product 2' },
                { productCode: 'ER123', name: 'Wood', price: 70000, sealedQuantity: 0, openedQuantity: 0, description: 'Product 3' },
            ],
        });

        const user = await tx.user.findFirst({
            where: {
                name: 'Sugiono'
            }
        })
        const product = await tx.product.findMany({
            take: 2
        })

        const transaction = await tx.transaction.create({
            data: {
                userId: user.id, // Connect to John Doe
                totalPrice: 60000,
                type: "IN",
                transactionProducts: {
                    createMany: {
                        data: [
                            { quantity: 10, productId: product[0].id, sumPrice: product[0].price * 10 },
                            { quantity: 10, productId: product[1].id, sumPrice: product[1].price * 10 },
                        ]
                    }
                },
            },
        });


        // console.log(`Created users:`, user);
        // console.log(`Created outlet:`, outlet);
        // console.log(`Created Product:`, product);
        // console.log(`Created transaction:`, transaction);
    })
}


main().catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});