

const express = require('express');
const app = express();

// Middleware to check the time of the request
app.use((req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  // Check if it's a weekday (Monday to Friday) and the time is between 9 and 17
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
});

// Set up routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Set up the view engine (EJS in this case)
app.set('view engine', 'ejs');

// Set up static files (CSS)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
