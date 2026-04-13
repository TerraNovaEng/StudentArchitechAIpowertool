# EmailJS Setup Instructions for TerraNova Engineering Lab

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Copy the **Service ID** (looks like: `service_abc123def`)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this exact template structure:

### Subject:
New Workshop Registration: {{workshop}}

### HTML Body:
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Workshop Registration</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #FF6347;">🚀 New Workshop Registration</h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Participant Details:</h3>
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
        </div>

        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Workshop Information:</h3>
            <p><strong>Workshop:</strong> {{workshop}}</p>
            <p><strong>Message:</strong> {{message}}</p>
        </div>

        <p style="color: #666; font-size: 14px;">
            This registration was submitted through the TerraNova Engineering Lab website.
        </p>
    </div>
</body>
</html>
```

4. Save the template
5. Copy the **Template ID** (looks like: `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (looks like: `ABC123def456ghi`)

## Step 5: Update ContactForm.jsx
Replace the placeholder values in `/src/components/ContactForm.jsx`:

```javascript
const serviceId = 'service_abc123def'; // Your Service ID
const templateId = 'template_xyz789'; // Your Template ID
const publicKey = 'ABC123def456ghi'; // Your Public Key
```

## Step 6: Test
1. Run your app
2. Try registering for a workshop
3. Check your email (cavalcanti.paula1@gmail.com) for the registration email

## Troubleshooting
- Make sure your email service is connected and verified
- Check that all IDs are copied correctly (no extra spaces)
- EmailJS free tier allows 200 emails/month
- If emails aren't sending, check browser console for errors</content>
<parameter name="filePath">/workspaces/codespaces-react/EMAILJS_SETUP.md