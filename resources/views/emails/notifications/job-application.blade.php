<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Job Application</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #3b82f6;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9fafb;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .button {
            display: inline-block;
            background: #3b82f6;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Job Application</h1>
    </div>
    
    <div class="content">
        <p>Hello!</p>
        
        <p>A new application has been received for the position of <strong>{{ $job->title }}</strong>.</p>
        
        <div style="background: white; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3>Application Details:</h3>
            <p><strong>Candidate:</strong> {{ $candidate->name }}</p>
            <p><strong>Company:</strong> {{ $job->company->name }}</p>
            <p><strong>Position:</strong> {{ $job->title }}</p>
            <p><strong>Applied:</strong> {{ now()->format('M j, Y \a\t g:i A') }}</p>
        </div>
        
        <a href="{{ url('/recruiter/applications') }}" class="button">View Application</a>
        
        <p>You can review the full application and candidate details in your dashboard.</p>
    </div>
    
    <div class="footer">
        <p>Best regards,<br>Unlock Portal Job Team</p>
        <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
</body>
</html>
