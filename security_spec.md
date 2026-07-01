# Security Specification & Adversarial Test Plan
## Sai Shankar Netralayam Eye Hospital

This document defines the security boundaries, data invariants, and adversarial test scenarios ("The Dirty Dozen") to verify the robustness of our Firestore Security Rules.

---

## 1. Core Data Invariants

1. **User Profile (`users/{userId}`)**:
   - Only the authenticated user whose `request.auth.uid` matches the document `{userId}` can create, read, update, or delete their profile.
   - Profile reads of private PII are restricted strictly to the profile owner (Zero-Trust isolation).
   - User profiles cannot set administrative roles or change system-generated timestamps.

2. **Appointments (`appointments/{appointmentId}`)**:
   - Only authenticated users can create appointments.
   - The `userId` field of the created appointment MUST exactly match the authenticated user's `request.auth.uid` (Identity Integrity).
   - Users can only read, update, or cancel their *own* appointments. List queries must be restricted to filter by the user's ID.
   - The appointment status can be initialized to `pending` by the user, but only an administrator or hospital agent can transition it to `confirmed` (Tiered Identity Logic).
   - Immutable fields like `createdAt` and `userId` cannot be updated after creation.

3. **Testimonials (`testimonials/{testimonialId}`)**:
   - Registered patients can write testimonials.
   - They must bind the `userId` to their own authenticated UID.
   - Testimonials must be created with `isApproved = false` (automatic moderation queue). Only system admins can approve testimonials (State Locking).
   - Ratings must be strictly between `1` and `5` (Value bounds validation).
   - Testimonials are readable by everyone *if and only if* they have `isApproved == true`. Private unapproved testimonials can only be listed/checked by the owner or admin.

---

## 2. The "Dirty Dozen" Adversarial Payloads

The following malicious JSON payloads are designed to attack the security laws of the database and must be blocked with `PERMISSION_DENIED`.

### Attack 1: User Profile Spoofing (Identity Spoofing)
* **Goal**: Write a profile document for a different user.
* **Payload**: Authenticated as `user_abc` attempting to write to `users/user_xyz` with:
```json
{
  "userId": "user_xyz",
  "displayName": "Hacker Bob",
  "email": "hacker@example.com"
}
```
* **Result**: `PERMISSION_DENIED`

### Attack 2: Profile PII Harvesting (PII Blanket Read)
* **Goal**: Read another patient's user profile (containing phone, age, email) as an unrelated signed-in user.
* **Query**: `getDoc(doc(db, "users", "patient_123"))` signed-in as `patient_456`.
* **Result**: `PERMISSION_DENIED`

### Attack 3: Self-Elevation to Admin
* **Goal**: Inject unauthorized claims or bypass rules to mark a user profile as administrative.
* **Payload**: Authenticated as `patient_123` writing to `users/patient_123`:
```json
{
  "userId": "patient_123",
  "displayName": "Patient One",
  "email": "patient@example.com",
  "role": "admin",
  "isAdmin": true
}
```
* **Result**: `PERMISSION_DENIED` (due to strict schema validation or field-level blocking)

### Attack 4: Unverified Email Write Bypass
* **Goal**: Create an appointment from an account with an unverified email address when email verification is strictly required.
* **Payload**: Authenticated as `unverified_user` (`email_verified = false`) attempting to write to `appointments/app_001`.
* **Result**: `PERMISSION_DENIED`

### Attack 5: Sibling Appointment Theft (Identity Spoofing)
* **Goal**: Create an appointment under another user's name and UID.
* **Payload**: Authenticated as `user_abc` trying to write to `appointments/app_002` with:
```json
{
  "id": "app_002",
  "userId": "user_xyz",
  "patientName": "Victim Patient",
  "phone": "+919999999999",
  "preferredDate": "2026-07-05",
  "status": "pending",
  "createdAt": "request.time"
}
```
* **Result**: `PERMISSION_DENIED`

### Attack 6: Unbounded Query Scraping (Secure List Query Bypass)
* **Goal**: List all appointments in the hospital database.
* **Query**: `getDocs(collection(db, "appointments"))` (without filtering by `userId == request.auth.uid`).
* **Result**: `PERMISSION_DENIED`

### Attack 7: Fake Appointment Confirmation (Privilege Escalation)
* **Goal**: Update status of an appointment to `confirmed` as a normal patient.
* **Payload**: Authenticated as `patient_123` updating `appointments/app_owned_by_123` with:
```json
{
  "status": "confirmed"
}
```
* **Result**: `PERMISSION_DENIED` (Ordinary users can only transition to `cancelled` or modify symptoms, not change status to `confirmed`).

### Attack 8: ID Poisoning / Denial-of-Wallet String Injection
* **Goal**: Inject a massive string as a document ID or string attribute to crash databases or consume extreme resources.
* **Payload**: Authenticated as `patient_123` creating `appointments/MALICIOUS_VERY_LONG_STRING_REPEATED_10000_TIMES_...` or setting `symptoms` to a 10MB string.
* **Result**: `PERMISSION_DENIED` (Blocked by string length and character constraints).

### Attack 9: Immutability Violation (createdAt Overwrite)
* **Goal**: Change the historic creation date of a booked appointment.
* **Payload**: Authenticated as `patient_123` attempting to update `appointments/app_owned_by_123` with:
```json
{
  "createdAt": "2020-01-01T00:00:00Z"
}
```
* **Result**: `PERMISSION_DENIED`

### Attack 10: Testimonial Moderation Bypass (State Shortcutting)
* **Goal**: Post an pre-approved live testimonial directly to the public slider.
* **Payload**: Authenticated as `patient_123` posting `testimonials/t_001`:
```json
{
  "id": "t_001",
  "userId": "patient_123",
  "authorName": "Rogue Patient",
  "rating": 5,
  "content": "Excellent Care!",
  "isApproved": true,
  "createdAt": "request.time"
}
```
* **Result**: `PERMISSION_DENIED` (must be `isApproved = false` on creation).

### Attack 11: Cross-User Testimonial Theft
* **Goal**: Modify or delete another patient's submitted testimonial.
* **Payload**: Authenticated as `patient_456` attempting to delete or edit `testimonials/t_owned_by_123`.
* **Result**: `PERMISSION_DENIED`

### Attack 12: Range Value Poisoning (Invalid Ratings)
* **Goal**: Post a testimonial with a star rating of `10` or a negative rating.
* **Payload**: Authenticated as `patient_123` posting `testimonials/t_002` with:
```json
{
  "id": "t_002",
  "userId": "patient_123",
  "authorName": "Unruly Reviewer",
  "rating": 99,
  "content": "Bad parsing!",
  "isApproved": false,
  "createdAt": "request.time"
}
```
* **Result**: `PERMISSION_DENIED`
