require("dotenv").config();
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
const dns = require("dns");
const htmlTemplate = require("./HtmlTemplet");

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

let emailSentCount = 0;
let emailSkippedCount = 0;

async function getEmails() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  });

  const [rows] = await connection.execute(`
        SELECT email, remove 
        FROM whiteboxqa.massemail 
        ORDER BY id DESC
        
    `);

  await connection.end();
  return rows;
}

// Function to validate email addresses
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to check if the domain of an email has MX records
async function isDomainValid(domain) {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err) => {
      resolve(!err); // Resolve true if no error, indicating domain is valid
    });
  });
}

// Function to update email status in the database
async function updateEmailStatus(email) {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  });

  // Query to update the email status
  await connection.execute(
    `
    UPDATE whiteboxqa.massemail 
    SET remove = 'Y' 
    WHERE email = ?`,
    [email]
  );

  await connection.end();
}

// Function to send an email
async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, // Use your generated App password here
    },
  });

  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    emailSentCount++;
    console.log(`Email sent to: ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}

// Main function to process and send emails
async function main() {
  try {
    const emails = await getEmails();

    for (const { email, remove } of emails) {
      if (remove === "N") {
        if (!isValidEmail(email)) {
          console.log(`Skipped invalid email address: ${email}`);
          await updateEmailStatus(email); // Update status for invalid email
          emailSkippedCount++;
          continue; // Skip to the next email
        }

        const domain = email.split("@")[1];
        if (!(await isDomainValid(domain))) {
          console.log(`Skipped email address with invalid domain: ${email}`);
          await updateEmailStatus(email); // Update status for invalid domain
          emailSkippedCount++;
          continue; // Skip to the next email
        }

        // const unsubscribeLink = `http://localhost:3000/unsubscribe?email=${encodeURIComponent(
        //   email
        // )}`;
        const unsubscribeLink = `https://whitebox-learning.com/unsubscribe?email=${encodeURIComponent(
          email
        )}`;
        const html = `${htmlTemplate}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`;

        const subject =
          "Updated List of Machine Learning Engineer, UI and QA Candidates Available for W2, C2C, Full-Time, 1099, and C2H Opportunities";
        await sendEmail(email, subject, html);

        // Add a delay to avoid hitting rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      } else {
        console.log(
          `Skipped email address: ${email} because they unsubscribed`
        );
        emailSkippedCount++;
      }
    }

    // Log final counts
    console.log(`Total emails sent: ${emailSentCount}`);
    console.log(`Total emails skipped: ${emailSkippedCount}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the main function to start the process
main();
