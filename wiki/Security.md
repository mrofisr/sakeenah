# Security & Privacy

Sakeenah implements multiple security layers to protect guest privacy and prevent abuse.

## Data Protection

### Multi-Tenant Isolation

Database-level separation ensures wedding data never crosses boundaries. Each wedding's wishes and analytics are completely isolated.

### Input Validation

All API inputs are validated with Zod schemas, preventing:

- SQL injection attacks
- XSS (Cross-Site Scripting)
- Invalid data types

### Transport Security

- HTTPS enforced for all production deployments
- TLS encryption for data in transit
- CORS protection restricts API access to approved domains

## Guest Privacy

### URL Sanitization

Sensitive parameters are removed from the URL after extraction:

1. Guest opens: `https://domain.com/wedding-2025?guest=encoded-name`
2. System stores data in localStorage
3. URL changes to: `https://domain.com`
4. Browser history shows only the clean URL

### Local Storage Security

- Client-side data expires after 30 days automatically
- No server-side session management required
- Each browser/device maintains separate invitation data

### Anti-Scraping Measures

- Meta tags prevent Wayback Machine archiving
- Robots.txt blocks web crawlers
- No sensitive data in URL history or bookmarks

## Privacy Guarantees

| Aspect         | Implementation                                      |
| -------------- | --------------------------------------------------- |
| Minimal Data   | Only wedding UID and guest name stored client-side  |
| No Tracking    | Zero third-party analytics by default               |
| Public Wishes  | Guest messages intentionally public for celebration |
| Data Retention | localStorage cleared after 30 days                  |
| No URL History | Sensitive data not persisted in browser history     |

## Authentication

Sakeenah uses a **passwordless** approach for guest experience:

- No login required for guests
- Seamless experience via localStorage persistence
- URL-based identification with automatic cleanup

## Production Recommendations

For production deployments, consider adding:

- **Rate Limiting**: Prevent API abuse (recommended)
- **WAF Rules**: Block malicious traffic patterns
- **Database Encryption**: Encrypt sensitive fields at rest
- **Audit Logging**: Track administrative actions
