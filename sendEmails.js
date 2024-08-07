// require('dotenv').config();
// const mysql = require('mysql2/promise');
// const nodemailer = require('nodemailer');

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// async function getEmails() {
//     const connection = await mysql.createConnection({
//         host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//         port: DB_PORT,
//     });

//     const [rows] = await connection.execute(`
//         SELECT email, remove
//         FROM massemail
//     `);

//     await connection.end();
//     return rows;
// }

// async function sendEmail(to, subject, text) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'srikanthprabha62@gmail.com',
//             pass: 'hefx trol niij edsi', // Use your generated App password here
//         },
//     });

//     const mailOptions = {
//         from: 'srikanthprabha62@gmail.com',
//         to,
//         subject,
//         text,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to: ${to}`);
//     } catch (error) {
//         console.error(`Error sending email to ${to}:`, error);
//     }
// }

// async function main() {
//     try {
//         const emails = await getEmails();

//         for (const { email, remove } of emails) {
//             if (remove === 'Y') {
//                 const subject = 'Your Subject Here';
//                 const text = 'Your Email Body Here';

//                 await sendEmail(email, subject, text);
//             }
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();

// working :

// require('dotenv').config();
// const mysql = require('mysql2/promise');
// const nodemailer = require('nodemailer');

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// async function getEmails() {
//     const connection = await mysql.createConnection({
//         host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//         port: DB_PORT,
//     });

//     const [rows] = await connection.execute(`
//         SELECT email, remove
//         FROM massemail
//     `);

//     await connection.end();
//     return rows;
// }

// function isValidEmail(email) {
//     // Basic email validation using regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// async function sendEmail(to, subject, text) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'srikanthprabha62@gmail.com',
//             pass: 'hefx trol niij edsi', // Use your generated App password here
//         },
//     });

//     const mailOptions = {
//         from: 'srikanthprabha62@gmail.com',
//         to,
//         subject,
//         text,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to: ${to}`);
//     } catch (error) {
//         console.error(`Error sending email to ${to}:`, error);
//     }
// }

// async function main() {
//     try {
//         const emails = await getEmails();

//         for (const { email, remove } of emails) {
//             if (remove === 'Y') {
//                 if (!isValidEmail(email)) {
//                     console.log(`Skipped invalid email address: ${email}`);
//                     continue; // Skip to the next email
//                 }

//                 const subject = 'Your Subject Here';
//                 const text = 'Your Email Body Here';

//                 await sendEmail(email, subject, text);
//             }
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();

// this one is working

// require('dotenv').config();
// const mysql = require('mysql2/promise');
// const nodemailer = require('nodemailer');
// const dns = require('dns');

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// async function getEmails() {
//     const connection = await mysql.createConnection({
//         host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//         port: DB_PORT,
//     });

//     const [rows] = await connection.execute(`
//         SELECT email, remove
//         FROM massemail
//     `);

//     await connection.end();
//     return rows;
// }

// function isValidEmail(email) {
//     // Basic email validation using regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// async function isDomainValid(domain) {
//     // Check if the domain has MX records
//     return new Promise((resolve) => {
//         dns.resolveMx(domain, (err) => {
//             resolve(!err); // Resolve true if no error, indicating domain is valid
//         });
//     });
// }

// async function sendEmail(to, subject, text) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'srikanthprabha62@gmail.com',
//             pass: 'hefx trol niij edsi', // Use your generated App password here
//         },
//     });

//     const mailOptions = {
//         from: 'srikanthprabha62@gmail.com',
//         to ,
//         subject,

//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to: ${to}`);
//     } catch (error) {
//         console.error(`Error sending email to ${to}:`, error);
//     }
// }

// async function main() {
//     try {
//         const emails = await getEmails();

//         for (const { email, remove } of emails) {
//             if (remove === 'Y') {
//                 if (!isValidEmail(email)) {
//                     console.log(`Skipped invalid email address: ${email}`);
//                     continue; // Skip to the next email
//                 }

//                 // Extract domain from email address
//                 const domain = email.split('@')[1];
//                 if (!(await isDomainValid(domain))) {
//                     console.log(`Skipped email address with invalid domain: ${email}`);
//                     continue; // Skip to the next email
//                 }

//                 const subject = 'Your Subject Here';
//                 const text = 'Your Email Body Here';

//                 await sendEmail(email, subject, text);
//             }
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();

// // // output is :
// // Skipped email address with invalid domain: golubts@-2000.com
// // Email sent to: a.guitart@01direct.com
// // Skipped email address with invalid domain: refi@0xbl.com
// // Email sent to: vijay@10square.com
// // Skipped email address with invalid domain: tom@111aldo.com
// // Email sent to: ivank@1199nbf.org
// // Skipped email address with invalid domain: vijay@128soft.com
// // Skipped email address with invalid domain: vani@128soft.com
// // Skipped email address with invalid domain: bala@128soft.com
// // Email sent to: careers@1800flowers.com
// // Skipped email address with invalid domain: recruiter4@1800tek.com
// // Skipped email address with invalid domain: recruiter7@1800tek.com
// // Skipped email address with invalid domain: recruiter8@1800tek.com
// // Skipped email address with invalid domain: bmann@1cma.com
// // Email sent to: sjohnson@1highstreet.com
// // Email sent to: lcole@1highstreet.com
// // Skipped email address with invalid domain: carol@1ktv.com
// // Email sent to: monica@1sourcestaffing.com

// require('dotenv').config();
// const mysql = require('mysql');
// const nodemailer = require('nodemailer');
// const htmlTemplate = require('./HtmlTemplet');

// // Create a Nodemailer transporter using your email credentials from the .env file
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // Create a MySQL database connection
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the database.');

//     // Query to get the email addresses from the database
//     const query = 'SELECT email FROM massemail';
//     connection.query(query, (error, results) => {
//         if (error) throw error;

//         results.forEach((row) => {
//             const mailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: row.email,
//                 subject: 'Updated List of Machine Learning Engineer, UI and QA Candidates Available for W2, C2C, Full-Time, 1099, and C2H Opportunities',
//                 html: htmlTemplate,
//             };

//             // Send the email
//             transporter.sendMail(mailOptions, (err, info) => {
//                 if (err) {
//                     console.error(`Error sending email to ${row.email}: ${err}`);
//                 } else {
//                     console.log(`Email sent to ${row.email}: ${info.response}`);
//                 }
//             });
//         });

//         // Close the database connection
//         connection.end();
//     });
// });

// require('dotenv').config();
// const mysql = require('mysql2/promise');
// const nodemailer = require('nodemailer');
// const dns = require('dns');
// const htmlTemplate = require('./HtmlTemplet'); // Make sure this file exists and exports the correct HTML template

// const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

// async function getEmails() {
//     const connection = await mysql.createConnection({
//         host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//         port: DB_PORT,
//     });

//     const [rows] = await connection.execute(`
//         SELECT email, remove
//         FROM massemail
//     `);

//     await connection.end();
//     return rows;
// }

// function isValidEmail(email) {
//     // Basic email validation using regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// async function isDomainValid(domain) {
//     // Check if the domain has MX records
//     return new Promise((resolve) => {
//         dns.resolveMx(domain, (err) => {
//             resolve(!err); // Resolve true if no error, indicating domain is valid
//         });
//     });
// }

// async function sendEmail(to, subject, html) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: EMAIL_USER,
//             pass: EMAIL_PASS, // Use your generated App password here
//         },
//     });

//     const mailOptions = {
//         from: EMAIL_USER,
//         to,
//         subject,
//         html,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent to: ${to}`);
//     } catch (error) {
//         console.error(`Error sending email to ${to}:`, error);
//     }
// }

// async function main() {
//     try {
//         const emails = await getEmails();

//         for (const { email, remove } of emails) {
//             if (remove === 'Y') {
//                 if (!isValidEmail(email)) {
//                     console.log(`Skipped invalid email address: ${email}`);
//                     continue; // Skip to the next email
//                 }

//                 // Extract domain from email address
//                 const domain = email.split('@')[1];
//                 if (!(await isDomainValid(domain))) {
//                     console.log(`Skipped email address with invalid domain: ${email}`);
//                     continue; // Skip to the next email
//                 }

//                 const subject = 'Updated List of Machine Learning Engineer, UI and QA Candidates Available for W2, C2C, Full-Time, 1099, and C2H Opportunities';
//                 const html = htmlTemplate; // Assuming htmlTemplate is a string of HTML content

//                 await sendEmail(email, subject, html);
//             }
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main();
require("dotenv").config();
const mysql = require("mysql2/promise");
const nodemailer = require("nodemailer");
const dns = require("dns");
const htmlTemplate = require("./HtmlTemplet"); // Ensure this file exists and exports the correct HTML template

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

// Function to get the first 100 email entries from the database
async function getEmails() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  });

  // Query to select the first 100 emails in descending order
  const [rows] = await connection.execute(`
        SELECT email, remove 
        FROM whiteboxqa.massemail 
        ORDER BY id DESC
        LIMIT 100
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
          continue; // Skip to the next email
        }

        const domain = email.split("@")[1];
        if (!(await isDomainValid(domain))) {
          console.log(`Skipped email address with invalid domain: ${email}`);
          await updateEmailStatus(email); // Update status for invalid domain
          continue; // Skip to the next email
        }

        const unsubscribeLink = `http://localhost:3000/unsubscribe?email=${encodeURIComponent(
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
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the main function to start the process
main();
