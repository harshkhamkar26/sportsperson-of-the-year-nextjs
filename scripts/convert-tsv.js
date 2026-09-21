// This script converts the raw TSV student data into a clean CSV file.
const fs = require('fs');
const path = require('path');

const rawData = `Registration Id\tStudent Name\tSchool Name\tDepartment\tYear\tGender
UAI02BI12501\tAakansha S. Rathore\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02BI22501\tAashika Singh\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MGM2562\tAastha Wadodkar\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MFC2501\tAbhigyan Shukla\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI22502\tAbhishek Kumar Kashyap\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI12502\tAdarsh Nema\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MFC2547\tAdish Ajmera\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2501\tAditi Singh\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02BI22546\tAditya Raj\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2502\tAgradip Kirtania\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI22503\tAgrawal Luvkishan Manojkumar\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI22539\tAisha Patel\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MGM2504\tAishwarya Sharma\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI12504\tAkash Pandey\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MFC2502\tAkhil Prasad Alex Prasad Simitha\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MFC2503\tAkshat Gupta\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI12505\tAkshat Sonkusale\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MBA2501\tAkshay Pangaria\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2505\tAllam Sri Rushyanth\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MBA2502\tAman Jain\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI22504\tAmit Nayak\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2506\tAnchal Pandey\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MGM2507\tAngkur Patowary\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2508\tAniket Rajesh Karande\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2509\tAniket Singh\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02MGM2510\tAnjaly Dubey\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MGM2511\tAnkita Chakraborty\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MFC2505\tAnsh Gupta\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI22562\tAnubhav Shresth\tSchool of Management PG\tMBA\t2nd Year PG\tMale
UAI02BI22505\tAnubhuti Singh\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02BI12506\tAnushka Choudhary\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI02MBA2503\tAprajita\tSchool of Management PG\tMBA\t2nd Year PG\tFemale
UAI06BTD2404\tHarsh Khamkar\tSchool of AI & Future Technologies\tAI & ML\t3rd Year UG\tMale`;

const lines = rawData.trim().split('\n');
const header = 'Registration Id,Student Name,School Name,Department,Year,Gender';
const csvLines = [header];

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split('\t');
  // Escape any commas in field values
  const escaped = cols.map(c => {
    c = c.trim();
    if (c.includes(',')) return '"' + c + '"';
    return c;
  });
  csvLines.push(escaped.join(','));
}

const outPath = path.join(__dirname, 'students.csv');
fs.writeFileSync(outPath, csvLines.join('\n'), 'utf8');
console.log(`Written ${csvLines.length - 1} rows to ${outPath}`);
