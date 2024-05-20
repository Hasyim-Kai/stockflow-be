"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const saltRounds = 10;
    await prisma.$transaction(async (tx) => {
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
                { name: 'admin', email: 'admin@gmail.com', password: (0, bcrypt_1.hashSync)('password', saltRounds), outletId: outlet1.id, role: 'ADMIN' },
                { name: 'Jakarta Owner', email: 'jakarta@gmail.com', password: (0, bcrypt_1.hashSync)('password', saltRounds), outletId: outlet1.id, role: 'OUTLET_OWNER' },
                { name: 'Sugiono', email: 'sugiono@gmail.com', password: (0, bcrypt_1.hashSync)('password', saltRounds), outletId: outlet1.id, role: 'EMPLOYEE' },
                { name: 'Surabaya Owner', email: 'surabaya@gmail.com', password: (0, bcrypt_1.hashSync)('password', saltRounds), outletId: outlet2.id, role: 'OUTLET_OWNER' },
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
    });
}
main().catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map