const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const projects = await prisma.portfolioProject.findMany({
        select: { websiteType: true },
        where: { websiteType: { not: null } }
    })
    console.log('Project Website Types:', projects.map(p => p.websiteType))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
