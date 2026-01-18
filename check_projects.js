const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const projects = await prisma.portfolioProject.findMany({
        select: {
            id: true,
            titleEn: true,
            category: true,
            websiteType: true,
            isVisible: true
        }
    })
    console.log('Projects:', JSON.stringify(projects, null, 2))
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
