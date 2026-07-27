const { google } = require('googleapis');
const readline = require('readline');

// আপনার ক্লাউড কনসোল থেকে পাওয়া Client ID এবং Secret এখানে বসান
const CLIENT_ID = '643383830086-cifsb4hvguiffath18q8p0a6fol7pca9.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // refresh token পাওয়ার জন্য এটা জরুরি
  scope: ['https://www.googleapis.com/auth/youtube.upload'],
  prompt: 'consent',
});

console.log('১. নিচের পুরো লিংকটি কপি করে আপনার ব্রাউজারে অপেন করুন:\n\n', authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('\n২. অনুমতি দেওয়ার পর ব্রাউজারের URL থেকে কোডটি (code=...) এনে এখানে পেস্ট করুন: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\nআপনার Refresh Token:\n', tokens.refresh_token);
  } catch (err) {
    console.error('সমস্যা হয়েছে:', err.message);
  }
  rl.close();
});

