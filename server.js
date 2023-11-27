const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Read the contents sof emails.txt
function readEmailsFile() {
  try {
    const content = fs.readFileSync('emails.txt', 'utf8');
    return content;
  } catch (error) {
    throw new Error('Error reading emails.txt file');
  }
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email', // Replace with your Gmail address
    pass: 'password', // Replace with your Gmail password
  },
});

// Define a route to display the contents of emails.txt
app.get('/emails', (req, res) => {
  try {
    const emailsContent = readEmailsFile();
    res.sendFile(__dirname + '/index.html');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Define a route to send the email
app.get('/send-email', (req, res) => {
  try {
    const emailsContent = readEmailsFile();

    // Send email
    transporter.sendMail({
      from: 'user email', // Replace with your Gmail address
      to: 'receiver email', // Replace with the recipient's email address
      subject: 'Read data from the Text file',
      text: emailsContent,
    });

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/emails`);
});
