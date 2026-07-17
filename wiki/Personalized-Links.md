# Personalized Guest Invitation Links

This guide explains how to generate and distribute personalized invitation links for your guests.

## URL Pattern

Each guest receives a unique invitation link:

```
https://yourdomain.com/<wedding-uid>?guest=<base64-encoded-name>
```

**Components:**

- `<wedding-uid>`: Your unique wedding identifier (e.g., `rifqi-dina-2025`)
- `?guest=`: Query parameter for guest identification
- `<base64-encoded-name>`: Guest name encoded in URL-safe base64 format

## How It Works

### First Visit

1. Guest clicks: `https://yourdomain.com/ahmad-fatimah-2025?guest=QWhtYWQ`
2. System extracts and stores UID and guest name in localStorage
3. URL automatically changes to: `https://yourdomain.com`
4. All data persists in localStorage for 30 days
5. Guest sees clean URL, data remains private

### Subsequent Visits

- Guest navigates to `https://yourdomain.com`
- Data loads from localStorage automatically
- No need to click the original link again

### Multiple Invitations

If a guest opens a different wedding invitation link, the system automatically updates localStorage with the new wedding data. No manual clearing needed.

## Generating Guest Links

Use the built-in script to generate personalized links:

```bash
bun run generate-links
```

### Steps

1. Edit `generate-links-example.js`:

   ```javascript
   const INVITATION_UID = "your-wedding-uid";
   const BASE_URL = "https://yourdomain.com";

   const guestList = [
     "Ahmad Abdullah",
     "Sarah Johnson",
     "Bapak Rudi & Keluarga",
     // ... add all your guests
   ];
   ```

2. Run the script:

   ```bash
   bun run generate-links
   ```

3. Output includes personalized links:

   ```
   1. Ahmad Abdullah
      https://yourdomain.com/ahmad-fatimah-2025?guest=QWhtYWQlMjBBYmR1bGxhaA

   2. Sarah Johnson
      https://yourdomain.com/ahmad-fatimah-2025?guest=U2FyYWglMjBKb2huc29u
   ```

## Guest Experience Features

- **Name pre-filled**: Guest name automatically appears in hero section
- **Wish form ready**: Name pre-populated in wedding wish submission
- **Editable**: Guests can update their name if needed
- **Attendance tracking**: Individual RSVP tracked per guest
- **No login required**: Seamless experience without authentication
- **Privacy protected**: Guest data stored locally, not in URL history

## Distribution Templates

### WhatsApp

```
Assalamualaikum Warahmatullahi Wabarakatuh,

Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:

[Bride] & [Groom]
[Date] | [Location]

Buka undangan digital: [personalized-link]

Jazakumullahu khairan
```

### SMS

```
[Bride] & [Groom] wedding invitation
Date: [date]
View your invitation: [short-link]
```

### Email

```
Subject: Wedding Invitation - [Bride] & [Groom]

Dear [Guest Name],

We joyfully invite you to celebrate our wedding...
View your personalized invitation: [link]
```

## Tips

- **Test links first**: Always test generated links before mass distribution
- **URL shorteners**: Use bit.ly or similar for cleaner WhatsApp sharing
- **Track opens**: Monitor invitation views through attendance statistics
- **Backup list**: Keep a spreadsheet of guest names and their unique links
- **Resend capability**: Guests can request link resend via contact information
