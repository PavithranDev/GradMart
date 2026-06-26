import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('Seeding database...');
    // Clean existing projects (which cascades to purchases)
    await prisma.project.deleteMany();
    // Create robust dummy projects based on the user's screenshot
    const p1 = await prisma.project.create({
        data: {
            title: 'AI Smart Attendance System',
            slug: 'ai-smart-attendance-system',
            category: 'AI & ML',
            imageColor: '#6c3bff', // Purple
            price: 2499,
            rating: 4.9,
            reviews: 128,
            description: 'A cutting-edge smart attendance system using facial recognition technology to automate roll calls. Ideal for college campuses and corporate offices. Includes complete Python OpenCV models and a React dashboard.',
            tags: ['React', 'Nodejs', 'Express', 'MongoDB', 'Face Recognition'],
            features: ['Source Code', 'Report', 'PPT', 'Setup Guide'],
        },
    });
    const p2 = await prisma.project.create({
        data: {
            title: 'Campus ERP',
            slug: 'campus-erp',
            category: 'Next.js',
            imageColor: '#0a0a0a', // Dark
            price: 2499,
            rating: 4.8,
            reviews: 95,
            description: 'A full-stack Enterprise Resource Planning system tailored for educational institutions. Manages student data, faculty portals, timetables, and grading.',
            tags: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
            features: ['Source Code', 'Report', 'PPT', 'Setup Guide'],
        },
    });
    const p3 = await prisma.project.create({
        data: {
            title: 'MERN Food Delivery',
            slug: 'mern-food-delivery',
            category: 'MERN Stack',
            imageColor: '#8b5cf6', // Violet
            price: 2499,
            rating: 5.0,
            reviews: 210,
            description: 'A complete food delivery platform with user, restaurant, and delivery agent apps. Features real-time order tracking and secure payments integration.',
            tags: ['React Native', 'Node.js', 'Socket.io', 'Stripe'],
            features: ['Source Code', 'Report', 'Setup Guide'],
        },
    });
    const p4 = await prisma.project.create({
        data: {
            title: 'Hospital Management',
            slug: 'hospital-management',
            category: 'Java',
            imageColor: '#1a3a2a', // Dark Green
            price: 2499,
            rating: 4.7,
            reviews: 88,
            description: 'Robust hospital management desktop and web hybrid application built with Java Spring Boot. Handles patient records, appointments, and billing.',
            tags: ['Java Spring', 'MySQL', 'Hibernate', 'JSP'],
            features: ['Source Code', 'Report', 'PPT', 'Setup Guide'],
        },
    });
    const p5 = await prisma.project.create({
        data: {
            title: 'Online Voting',
            slug: 'online-voting',
            category: 'Blockchain',
            imageColor: '#e91e8c', // Pink
            price: 2499,
            rating: 4.9,
            reviews: 156,
            description: 'A decentralized, secure voting application utilizing Ethereum smart contracts. Ensures vote anonymity and immutable public records.',
            tags: ['Solidity', 'Web3.js', 'React', 'Truffle'],
            features: ['Source Code', 'Smart Contracts', 'Report', 'Setup Guide'],
        },
    });
    const p6 = await prisma.project.create({
        data: {
            title: 'Student Tracker',
            slug: 'student-tracker',
            category: 'Vue',
            imageColor: '#0a0a0a', // Dark
            price: 0, // Free
            rating: 4.9,
            reviews: 420,
            description: 'A completely free basic student tracking dashboard. Great for beginners learning Vue and Firebase integration.',
            tags: ['Vue.js', 'Firebase', 'Tailwind'],
            features: ['Source Code', 'Setup Guide'],
        },
    });
    // Find users
    const users = await prisma.user.findMany();
    if (users.length > 0) {
        for (const user of users) {
            console.log(`Seeding purchases for user ${user.email}...`);
            await prisma.purchase.create({
                data: {
                    userId: user.id,
                    projectId: p1.id,
                    downloadCount: 4,
                    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
                },
            });
            await prisma.purchase.create({
                data: {
                    userId: user.id,
                    projectId: p2.id,
                    downloadCount: 2,
                    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
                },
            });
        }
        console.log('Successfully seeded purchases!');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
