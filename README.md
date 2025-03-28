# CVE-2025-29927 Vulnerability Demonstration in Next.js

## Overview

This project is a Next.js application that demonstrates the CVE-2025-29927 vulnerability. It serves as a proof-of-concept (PoC) to showcase how the vulnerability can be exploited and mitigated.

## Disclaimer

This repository is for educational purposes only. Exploiting vulnerabilities in unauthorized systems is illegal and unethical. Use this knowledge responsibly.

## Features

- Next.js 14 application setup
- Contains a vulnerable component demonstrating CVE-2025-29927
- Example exploit scenario
- Suggested mitigation strategies

## Prerequisites

- Node.js (>= 18)
- npm or yarn
- A basic understanding of Next.js and web security concepts

## Installation

```bash
# Clone the repository
git clone https://github.com/ARVINDTRONICS/nextjs-cv202529927-vulnerable-app.git
cd nextjs-cve-2025-29927-vulnerable-app

# Install dependencies
npm install  # or yarn install
```

## Running the Application

```bash
npm run dev  # or yarn dev
```

The application will be available at `http://localhost:3000`.

## Application Flow & Vulnerability

### Routes Overview

This application consists of two primary routes:

1. **`/login`** - A login page where users enter their email and token. These credentials are validated via the `api/auth` route, which returns a JWT token as a secure HTTP-only cookie upon successful authentication.
2. **`/admin`** - A protected route that displays sensitive administrative data, retrieved from `api/admin-data`.

### Authentication & Authorization Mechanism

- Once authenticated, users can access the `/admin` route, where an `AuthGuard` component ensures that only logged-in users with a valid JWT token can view sensitive data.
- If an unauthenticated user attempts to access `/admin`, the `AuthGuard` redirects them to the login page.
- The API route `api/admin-data` is also protected by middleware, which checks for a valid JWT token before forwarding the request.

### Vulnerability - CVE-2025-29927

Despite these protective measures, the application is vulnerable due to CVE-2025-29927. This vulnerability allows an attacker to bypass authentication and middleware validation simply by adding a specific header to the request when attempting to access `api/admin-data`. This flaw exposes sensitive data that should otherwise be restricted to authenticated users.

## Exploitation

- Attackers can craft requests to `api/admin-data` while including a specially crafted header, effectively bypassing token validation.
- This vulnerability undermines the existing security model, allowing unauthorized access to sensitive data.

## Mitigation Strategies

1. **Validate credentials in every API route that requires protection:** Do not rely solely on middleware for authentication checks—ensure server-side validation is performed within the API handler itself.
2. **Upgrade to the latest Next.js version:** If this vulnerability has been patched in newer releases, updating to the latest stable version is strongly recommended.
3. **Isolate backend and database services:** Although Next.js is a full-stack framework, it is best practice to separate backend and database operations into dedicated services while using Next.js primarily for frontend and Backend-for-Frontend (BFF) functionality.

## Contribution

If you discover any improvements or additional security flaws, feel free to submit a pull request.

## License

MIT License. See `LICENSE` file for details.
