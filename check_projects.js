
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        const count = await prisma.portfolioProject.count()
        console.log(`Total projects: ${count}`)

        const activeProjects = await prisma.portfolioProject.findMany({
            where: { isActive: true },
            select: { id: true, titleEn: true, isActive: true, category: true }
        })
        console.log('Active projects:', JSON.stringify(activeProjects, null, 2))
    } catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
