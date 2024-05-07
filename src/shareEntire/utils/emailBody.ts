export const emailBody = (otpCode: string) => { 
    const content = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f8f8f8;
                    border-radius: 5px;
                }
                .message {
                    margin-bottom: 20px;
                }
                .otp {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="message">
                    <p>Dear User,</p>
                    <p>Your One-Time Password (OTP) for account verification is:</p>
                    <p class="otp">${otpCode}</p>
                    <p>Please use this OTP to complete your account verification process.</p>
                    <p>If you did not initiate this request or have any concerns, please contact our support team immediately.</p>
                </div>
                <div class="footer">
                    <p>Best regards,<br>GnauqNguyen Homestay</p>
                </div>
            </div>
        </body>
        </html>`;

        return content;
}

export const emailBody2 = (otpCode: string) => {
    const content = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .otp {
                        font-size: 48px;
                        font-weight: bold;
                        color: #007bff;
                        text-align: center;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #007bff;
                        padding-bottom: 10px;
                    }
                    .message {
                        font-size: 16px;
                        line-height: 1.6;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .footer {
                        text-align: center;
                        color: #666;
                    }
                    .signature {
                        font-style: italic;
                        color: #888;
                        margin-top: 30px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>One-Time Password (OTP)</h2>
                    </div>
                    <div class="otp">${otpCode}</div>
                    <div class="message">
                        <p>Your OTP is essential for account verification:</p>
                        <p>Please use this code to proceed with your registration.</p>
                        <p>If you didn't request this OTP, please ignore this message.</p>
                    </div>
                    <div class="footer">
                        <p>Best regards,<br>GnauqNguyen Homestay</p>
                    </div>
                    <div class="signature">
                        <p>This message was sent automatically. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>`;

    return content;
}