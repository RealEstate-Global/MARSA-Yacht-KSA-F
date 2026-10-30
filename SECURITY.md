# Security Policy — Al Marsa

Al Marsa takes the security and integrity of our codebase, infrastructure, and user trust seriously. This policy outlines our security practices and instructions for reporting vulnerabilities.

---

## 1. Supported Versions

Security updates and patches are applied continuously to the `main` branch. 

| Version | Supported | Status |
| :--- | :--- | :--- |
| `1.0.x` (`main`) | ✅ Yes | Continuously deployed to production |
| `< 1.0.0` | ❌ No | Deprecated legacy prototypes |

---

## 2. Security Architecture & Posture

- **Zero In-App PII Collection**: As a web lookbook, the website does not collect, store, or process user credentials, payment details, or identification documents. All booking transactions, KYC identity checks, and Coastguard maritime permits are managed securely within the native Al Marsa mobile applications ([almarsa.app](https://almarsa.app/)).
- **Content Security & Safe Linking**: All outbound links to the official Al Marsa ecosystem use `rel="noopener noreferrer"` to protect against reverse tabnabbing and window manipulation.
- **Automated Scanning**:
  - **GitHub CodeQL**: Automated static analysis runs on every pull request and push to `main` to identify potential vulnerabilities.
  - **Dependabot**: Monitors and automatically issues pull requests for vulnerable npm dependencies and GitHub Actions workflows.
- **No Secrets in Source Control**: API keys, deployment tokens, and environment secrets are managed strictly through encrypted GitHub Secrets and Vercel environment managers.

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability, please report it privately:

1. **GitHub Security Advisory (Preferred)**:
   - Go to the **Security** tab of the repository.
   - Click **Report a vulnerability** to open a confidential report.
2. **Direct Maintainer Contact**:
   - Reach out directly to the technical lead via GitHub: [@Mostafa-SAID7](https://github.com/Mostafa-SAID7).

### Please include in your report:
- A clear description of the vulnerability and its potential impact.
- Step-by-step reproduction instructions (URLs, code snippets, or proof of concept).
- Relevant environment details (browser, operating system, device).
- **Never include live secrets, tokens, or personal data in reports.**

### Response Time & Disclosure
- You will receive an initial acknowledgement within **48 hours**.
- We will coordinate a remediation timeline before any public disclosure.
- Security researchers who report confirmed vulnerabilities in accordance with this policy will be credited upon release.
