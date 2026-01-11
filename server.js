const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// API Route for contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields.' 
            });
        }

        // In a real application, you would send an email here
        // For now, we'll just log it and return success
        console.log('Contact Form Submission:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Message:', message);

        // Simulate email sending
        // You can configure nodemailer with your SMTP settings
        /*
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-app-password'
            }
        });

        await transporter.sendMail({
            from: email,
            to: 'gym@example.com',
            subject: `Contact Form: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
        });
        */

        res.json({ 
            success: true, 
            message: 'Thank you for contacting us! We will get back to you soon.' 
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again later.' 
        });
    }
});

// API Route for membership signup
app.post('/api/membership', async (req, res) => {
    try {
        const { name, email, phone, plan } = req.body;
        
        if (!name || !email || !phone || !plan) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please fill in all required fields.' 
            });
        }

        console.log('Membership Signup:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Plan:', plan);

        res.json({ 
            success: true, 
            message: 'Thank you for signing up! We will contact you soon.' 
        });
    } catch (error) {
        console.error('Error processing membership signup:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again later.' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Fitness Gym server is running on http://localhost:${PORT}`);
});