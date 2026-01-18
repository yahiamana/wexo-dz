const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const projects = await prisma.portfolioProject.findMany({
        select: { category: true }
    })

    const uniqueCategories = [...new Set(projects.map(p => p.category))]
    console.log('Unique Categories:', uniqueCategories)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
