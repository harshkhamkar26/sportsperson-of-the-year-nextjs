import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // 1. Create Admins
  const passwordHash = await bcrypt.hash("password123", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@uaiu.edu" },
    update: {},
    create: {
      email: "admin@uaiu.edu",
      name: "System Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const harshPasswordHash = await bcrypt.hash("Harsh@890", 10);
  await prisma.admin.upsert({
    where: { email: "harshkhamkar26@gmail.com" },
    update: { passwordHash: harshPasswordHash },
    create: {
      email: "harshkhamkar26@gmail.com",
      name: "Harsh Khamkar",
      passwordHash: harshPasswordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Created Admin:", admin.email);

  // 2. Schools/Classes
  const classes = [
    "School of Engineering",
    "School of Business",
    "School of AI & Future Technologies",
    "School of Design",
    "School of Law",
    "School of Liberal Arts"
  ];

  // 3. Create Students (45 students)
  const studentsData = [];
  const firstNames = ["Harsh", "Elena", "Marcus", "Aisha", "Tyler", "Sarah", "Rohan", "David", "Jessica", "James", "Maria", "John", "Linda", "Robert", "Emily", "Michael", "Emma", "William", "Olivia", "Richard", "Sophia", "Joseph", "Isabella", "Thomas", "Mia", "Charles", "Charlotte", "Daniel", "Amelia", "Matthew", "Evelyn", "Anthony", "Abigail", "Donald", "Harper", "Steven", "Lily", "Paul", "Ella", "Andrew", "Chloe", "Joshua", "Victoria", "Kenneth", "Grace", "Kevin"];
  const lastNames = ["Khamkar", "Rostova", "Vance", "Khan", "Smith", "Jenkins", "Patel", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"];

  for (let i = 0; i < 45; i++) {
    studentsData.push({
      rollNumber: `UAI-2024-${String(i + 1).padStart(3, '0')}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      className: classes[i % classes.length],
      house: ["Red", "Blue", "Green", "Yellow"][i % 4],
    });
  }

  // Ensure Harsh Khamkar is top dog as requested in UI
  studentsData[0].name = "Harsh Khamkar";
  studentsData[0].className = "School of AI & Future Technologies";
  studentsData[1].name = "Elena Rostova";
  studentsData[1].className = "School of Business";
  studentsData[2].name = "Marcus Vance";

  // Bulk create students if they don't exist
  for (const s of studentsData) {
    await prisma.student.upsert({
      where: { rollNumber: s.rollNumber },
      update: {},
      create: s,
    });
  }
  const allStudents = await prisma.student.findMany();
  console.log("Created 45 Students.");

  // 4. Create Events (20 events)
  const sports = ["Basketball", "Football", "Tennis", "Athletics", "Swimming", "Volleyball", "Badminton", "Table Tennis", "Chess"];
  const eventsData = [];
  
  for (let i = 0; i < 20; i++) {
    const sport = sports[i % sports.length];
    const type = ["Finals", "Semi-Finals", "Qualifiers", "Championship"][i % 4];
    eventsData.push({
      name: `Men's ${sport} ${type}`,
      date: new Date(2024, 9, i + 1), // Oct 2024
    });
  }
  
  for (const e of eventsData) {
    await prisma.event.upsert({
      where: { name_date: { name: e.name, date: e.date } },
      update: {},
      create: e,
    });
  }
  const allEvents = await prisma.event.findMany();
  console.log("Created 20 Events.");

  // 5. Create PointEntries
  // Let's clear existing point entries first to have a clean slate for leaderboard
  await prisma.pointEntry.deleteMany({});

  const pointEntriesData = [];
  
  // Harsh gets a lot of points
  const harsh = allStudents.find(s => s.name === "Harsh Khamkar");
  const elena = allStudents.find(s => s.name === "Elena Rostova");
  const marcus = allStudents.find(s => s.name === "Marcus Vance");

  // Give Harsh 385 points across 6 events
  if (harsh) {
    for(let i=0; i<6; i++) {
      pointEntriesData.push({
        studentId: harsh.id,
        eventId: allEvents[i].id,
        points: i === 0 ? 85 : 60,
        position: i < 4 ? 1 : 2,
        enteredById: admin.id
      });
    }
  }

  // Give Elena 360 points
  if (elena) {
    for(let i=0; i<5; i++) {
      pointEntriesData.push({
        studentId: elena.id,
        eventId: allEvents[i+5].id,
        points: 72,
        position: 1,
        enteredById: admin.id
      });
    }
  }

  // Random points for the rest
  for (let i = 0; i < 150; i++) {
    const student = allStudents[Math.floor(Math.random() * allStudents.length)];
    const event = allEvents[Math.floor(Math.random() * allEvents.length)];
    
    // Check if they already have an entry for this event
    const exists = pointEntriesData.find(p => p.studentId === student.id && p.eventId === event.id);
    if (!exists && student.name !== "Harsh Khamkar" && student.name !== "Elena Rostova") {
      pointEntriesData.push({
        studentId: student.id,
        eventId: event.id,
        points: Math.floor(Math.random() * 50) + 10,
        position: Math.floor(Math.random() * 3) + 1,
        enteredById: admin.id
      });
    }
  }

  await prisma.pointEntry.createMany({
    data: pointEntriesData,
  });

  console.log(`Created ${pointEntriesData.length} Point Entries.`);
  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
