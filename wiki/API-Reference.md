# API Reference

All API endpoints use Zod schema validation for type-safe request handling.

## Invitations

### GET `/api/invitation/:uid`

Retrieves wedding details including agenda and bank accounts.

**Parameters:**

| Name  | Type   | Description                                                   |
| ----- | ------ | ------------------------------------------------------------- |
| `uid` | string | Wedding identifier (lowercase letters, numbers, hyphens only) |

**Response:**

```json
{
  "uid": "wedding-2025",
  "title": "Wedding of Ahmad & Fatimah",
  "groom_name": "Ahmad",
  "bride_name": "Fatimah",
  "date": "2025-06-15",
  "agenda": [...],
  "banks": [...]
}
```

## Wishes

### GET `/api/:uid/wishes`

Retrieves paginated wishes for a wedding.

**Parameters:**

| Name     | Type   | Default  | Description                          |
| -------- | ------ | -------- | ------------------------------------ |
| `uid`    | string | required | Wedding identifier                   |
| `limit`  | number | 50       | Number of wishes to return (max 100) |
| `offset` | number | 0        | Pagination offset                    |

### POST `/api/:uid/wishes`

Creates new wish with attendance status.

**Request Body:**

```json
{
  "name": "Guest Name",
  "message": "Congratulations!",
  "attendance": "ATTENDING"
}
```

**Validation:**

| Field        | Rules                                                       |
| ------------ | ----------------------------------------------------------- |
| `name`       | 1-100 characters, automatically trimmed                     |
| `message`    | 1-500 characters, automatically trimmed                     |
| `attendance` | `ATTENDING`, `NOT_ATTENDING`, or `MAYBE` (default: `MAYBE`) |

### DELETE `/api/:uid/wishes/:id`

Deletes a specific wish (admin function).

**Parameters:**

| Name  | Type   | Description        |
| ----- | ------ | ------------------ |
| `uid` | string | Wedding identifier |
| `id`  | number | Wish ID to delete  |

### GET `/api/:uid/stats`

Returns attendance statistics.

**Response:**

```json
{
  "attending": 45,
  "not_attending": 12,
  "maybe": 8,
  "total": 65
}
```

## Error Responses

All endpoints return validation errors in this format:

```json
{
  "success": false,
  "error": {
    "issues": [
      {
        "path": ["name"],
        "message": "Name must be less than 100 characters"
      }
    ]
  }
}
```

## HTTP Status Codes

| Code | Meaning          |
| ---- | ---------------- |
| 200  | Success          |
| 201  | Created          |
| 204  | No Content       |
| 400  | Validation Error |
| 404  | Not Found        |
| 409  | Conflict         |
| 500  | Server Error     |
