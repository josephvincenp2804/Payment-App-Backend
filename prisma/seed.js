const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Starting database seed...');

  // Clean existing database records
  await prisma.payment.deleteMany({});
  await prisma.customer.deleteMany({});

  const customers = [
    { account_number: '100001', issue_date: new Date('2025-01-10T10:00:00Z'), interest_rate: 8.5, tenure: 12, emi_due: 5000.00 },
    { account_number: '100002', issue_date: new Date('2025-02-15T11:30:00Z'), interest_rate: 9.0, tenure: 24, emi_due: 3500.50 },
    { account_number: '100003', issue_date: new Date('2025-03-01T09:00:00Z'), interest_rate: 7.8, tenure: 36, emi_due: 12000.00 },
    { account_number: '100004', issue_date: new Date('2025-03-20T14:15:00Z'), interest_rate: 10.2, tenure: 18, emi_due: 4800.00 },
    { account_number: '100005', issue_date: new Date('2025-04-05T08:45:00Z'), interest_rate: 8.0, tenure: 60, emi_due: 6200.75 },
    { account_number: '100006', issue_date: new Date('2025-04-12T16:00:00Z'), interest_rate: 11.5, tenure: 12, emi_due: 2200.00 },
    { account_number: '100007', issue_date: new Date('2025-05-02T13:20:00Z'), interest_rate: 9.5, tenure: 48, emi_due: 8500.00 },
    { account_number: '100008', issue_date: new Date('2025-05-18T10:10:00Z'), interest_rate: 7.2, tenure: 24, emi_due: 1500.00 },
    { account_number: '100009', issue_date: new Date('2025-06-01T15:30:00Z'), interest_rate: 8.9, tenure: 36, emi_due: 9800.50 },
    { account_number: '100010', issue_date: new Date('2025-06-15T12:00:00Z'), interest_rate: 10.0, tenure: 12, emi_due: 7500.00 }
  ];

  for (const customer of customers) {
    await prisma.customer.create({
      data: customer
    });
  }

  console.log('[Seed] Database seed completed successfully. Loaded 10 customer records.');
}

main()
  .catch((e) => {
    console.error('[Seed Error]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
