const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function run() {
  const content = fs.readFileSync('scripts/full-paste.tsv', 'utf-8');
  const lines = content.trim().split('\n');

  let added = 0;
  for (const line of lines) {
    const cols = line.split('\t');
    if (cols.length < 6) continue;
    if (cols[0] === 'Registration Id') continue;
    let [rollNumber, name, schoolName, departmentName, className, gender] = cols;

    if (!rollNumber || rollNumber.trim() === '') {
      rollNumber = 'TEMP-' + name.trim().replace(/\s+/g, '-').toUpperCase();
    }

    // School
    let school = await prisma.school.findFirst({ where: { name: schoolName } });
    if (!school) {
      let schoolCode = schoolName.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
      school = await prisma.school.create({
        data: { name: schoolName, code: schoolCode }
      });
    }

    // Department
    let dept = await prisma.department.findFirst({
      where: { name: departmentName, schoolId: school.id }
    });
    if (!dept) {
      let deptCode = departmentName.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
      dept = await prisma.department.create({
        data: { name: departmentName, code: deptCode, schoolId: school.id }
      });
    }

    const g = gender.trim().toUpperCase() === 'MALE' ? 'MALE' : 'FEMALE';

    await prisma.student.upsert({
      where: { rollNumber: rollNumber.trim() },
      update: {
        name: name.trim(),
        schoolId: school.id,
        departmentId: dept.id,
        className: className.trim(),
        gender: g
      },
      create: {
        rollNumber: rollNumber.trim(),
        name: name.trim(),
        schoolId: school.id,
        departmentId: dept.id,
        className: className.trim(),
        gender: g
      }
    });
    added++;
  }
  console.log('Finished inserting', added, 'students');
}

run().catch(console.error).finally(() => prisma.$disconnect());
