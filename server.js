const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const PORT = 3000;

// আপনার Google Credentials
const CLIENT_ID = '643383830086-cifsb4hvguiffath18q8p0a6fol7pca9.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// HTML পেজ দেখানোর জন্য
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// গুগলে রিডাইরেক্ট করার রাউট
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
    prompt: 'consent',
  });
  res.redirect(authUrl);
});

// গুগল থেকে ফেরত আসার পর কোড প্রসেস করার রাউট
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.send(`
      <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: white; border-radius: 8px;">
        <h2 style="color: #4ade80;">সফলভাবে অথরাইজেশন সম্পন্ন হয়েছে!</h2>
        <p>আপনার Refresh Token:</p>
        <textarea style="width: 100%; height: 100px; background: #1e293b; color: #f8fafc; padding: 10px; border-radius: 6px;">${tokens.refresh_token}</textarea>
        <p>এটি সেভ করে রাখুন।</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send('এরর হয়েছে: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`সার্ভার চালু হয়েছে: http://localhost:${PORT}`);
});
