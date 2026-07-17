/**
 * Example script to generate personalized invitation links
 *
 * Usage:
 *   bun run generate-links
 *
 * This will output personalized invitation links for each guest
 */

// Simple base64 encode function (same as in safeBase64)
function base64Encode(str) {
  return Buffer.from(str, "utf-8").toString("base64");
}

function generateInvitationLink(
  uid,
  guestName,
  baseUrl = "http://localhost:5173",
) {
  const encodedName = base64Encode(guestName);
  return `${baseUrl}/${uid}?guest=${encodedName}`;
}

// ===== CONFIGURATION =====
const INVITATION_UID = "rifqi-dina-2025"; // Change this to your invitation UID
const BASE_URL = "http://localhost:5173"; // Change this to your production URL

// List of guests
const guestList = [
  "Ahmad Abdullah",
  "Sarah Johnson",
  "Bapak Rudi & Keluarga",
  "Ibu Siti & Keluarga",
  "Dr. Bambang",
  "Keluarga Besar Hartono",
];

// ===== GENERATE LINKS =====
console.log(
  "\n╔══════════════════════════════════════════════════════════════╗",
);
console.log("║          PERSONALIZED WEDDING INVITATION LINKS               ║");
console.log(
  "╚══════════════════════════════════════════════════════════════╝\n",
);

console.log(`Invitation UID: ${INVITATION_UID}`);
console.log(`Base URL: ${BASE_URL}\n`);
console.log("─".repeat(70) + "\n");

guestList.forEach((guestName, index) => {
  const link = generateInvitationLink(INVITATION_UID, guestName, BASE_URL);
  console.log(`${index + 1}. ${guestName}`);
  console.log(`   ${link}\n`);
});

console.log("─".repeat(70));
console.log(`\nTotal guests: ${guestList.length}`);
console.log("\nHow to use:");
console.log("1. Share each personalized link with the corresponding guest");
console.log("2. When they open the link, their name will be pre-filled");
console.log("3. They can still edit their name if needed\n");
