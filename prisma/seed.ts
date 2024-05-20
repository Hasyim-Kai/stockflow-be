import { PrismaClient } from "@prisma/client";
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const saltRounds = 10; // Adjust salt rounds as needed
    await prisma.$transaction(async (tx) => {
        // Seed an outlet associated with the first user (ADMIN)
        const outlet1 = await tx.outlet.create({
            data: {
                name: 'Jakarta Outlet',
                address: 'Main Street 123',
            },
        });

        const outlet2 = await tx.outlet.create({
            data: {
                name: 'Surabaya Outlet',
                address: 'Main Street 121',
            },
        });

        await tx.user.createMany({
            data: [
                { name: 'admin', email: 'admin@gmail.com', password: hashSync('password', saltRounds), outletId: outlet1.id, role: 'ADMIN' },
                { name: 'Jakarta Owner', email: 'jakarta@gmail.com', password: hashSync('password', saltRounds), outletId: outlet1.id, role: 'OUTLET_OWNER' },
                { name: 'Sugiono', email: 'sugiono@gmail.com', password: hashSync('password', saltRounds), outletId: outlet1.id, role: 'EMPLOYEE' },
                { name: 'Surabaya Owner', email: 'surabaya@gmail.com', password: hashSync('password', saltRounds), outletId: outlet2.id, role: 'OUTLET_OWNER' },
            ],
        });

        await tx.product.createMany({
            data: [
                {
                    productCode: 'ER123', name: 'Wood', price: 70000,
                    outletId: outlet1.id,
                    description: 'Product 3'
                },
                {
                    productCode: 'ER113', name: 'Light', price: 70000,
                    outletId: outlet2.id,
                    description: 'Product 3'
                }
            ]
        });

        // const user = await tx.user.findFirst({
        //     where: {
        //         name: 'Sugiono'
        //     }
        // })
        // const product = await tx.product.findMany({
        //     take: 2
        // })

        // const transaction = await tx.transaction.create({
        //     data: {
        //         userId: user.id, // Connect to John Doe
        //         outletId: outlet1.id,
        //         totalPrice: 60000,
        //         type: "IN",
        //         transactionProducts: {
        //             createMany: {
        //                 data: [
        //                     { quantity: 10, productId: product[0].id, sumPrice: product[0].price * 10 },
        //                 ]
        //             }
        //         },
        //     },
        // });


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