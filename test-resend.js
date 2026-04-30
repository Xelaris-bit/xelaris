require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
    try {
        console.log("Using API Key:", process.env.RESEND_API_KEY ? "YES" : "NO");
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "anshumanseoczar@gmail.com",
            subject: "Resend Test Diagnostic",
            html: "<p>Test email</p>"
        });

        if (error) {
            console.error("Resend API Error:", error);
        } else {
            console.log("Success! Data:", data);
        }
    } catch (e) {
        console.error("Catch block:", e);
    }
}

test();
