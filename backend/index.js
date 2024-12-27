require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require("node-cron");
const backupDatabase = require("./backup");
const cors = require('cors')
const port = process.env.PORT
const DataBase = require('./db/db')
const Booking = require('./models/RegistrationModels')
const backupFrequency = "0 0 * * *";

const app = express();

app.use(express.json())

app.use(cors({
    origin: 'https://booking-app-frontend-topaz.vercel.app/',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/booking', async (req, res) => {
    const { name, email, date, timeSlot } = req.body;

    try {
        const existingBooking = await Booking.findOne({ date, timeSlot });

        if (existingBooking) {
            return res.status(409).json({ message: "This time slot is already booked. Please choose another." });
        }

        const newBooking = await Booking.create({
            name,
            email,
            date,
            timeSlot,
        });

        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'muhammadzubairahmad35@gmail.com',
                pass: 'ghjj jpsr xjop xroy',
            },
        });

        const mailOptions = {
            from: '"Booking Confirmation" muhammadzubairahmad35@gmail.com', 
            to: email,
            subject: 'Booking Confirmation',
            text: `Hello ${name},\n\nYour booking is confirmed for ${date} at ${timeSlot}.\n\nThank you!`,
            html: `<p>Hello <strong>${name}</strong>,</p>
                   <p>Your booking is confirmed for <strong>${date}</strong> at <strong>${timeSlot}</strong>.</p>
                   <p>Thank you!</p>`,
        };

        await transport.sendMail(mailOptions);

        res.status(201).json({ message: "Successfully Registered", booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

cron.schedule(backupFrequency, () => {
    console.log("Starting scheduled database backup...");
    backupDatabase();
  });
  
  console.log("Automatic database backup scheduled.");

app.listen(port, () => {
    console.log(DataBase())
    console.log(`server is running on port ${port}`)
})
