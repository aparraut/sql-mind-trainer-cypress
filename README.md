# 🤖 SQL Mind Trainer – Cypress Automation Test Suite

This repository contains the complete **Cypress E2E, UI, and API automation suite** for  
[SQL Mind Trainer](https://aparraut.github.io/sql-mind-trainer/) — a gamified platform designed to practice SQL through interactive challenges, dynamic queries, and Supabase persistence.

The goal of this suite is to ensure the reliability, consistency, and quality of the platform across its core features.

---

🧱 Project Structure

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.js
│   │   ├── signup.cy.js
│   │   └── logout.cy.js
│   │
│   ├── gameplay/
│   │   ├── level-loading.cy.js
│   │   ├── submit-query.cy.js
│   │   └── progress-tracking.cy.js
│   │
│   ├── ui/
│   │   ├── navigation.cy.js
│   │   ├── responsiveness.cy.js
│   │   └── theme.cy.js
│   │
│   └── api/
│       ├── supabase-auth.cy.js
│       └── progress-api.cy.js
│
├── fixtures/
│   ├── users.json
│   └── queries.json
│
├── support/
│   ├── commands.js
│   ├── e2e.js
│   └── selectors.js
│
└── config/
    └── env.js (optional)
```

This structure follows **enterprise-level** best practices: separation by feature, reusable commands, fixtures for test data, and clear maintainability.

---

🚀 Key Features

✔ Full E2E Flow Testing  
Covers the entire user journey:
- Authentication (Login, Signup, Logout)  
- Level selection and loading  
- SQL query submission  
- Feedback validation  
- Progress updates stored in Supabase  

✔ UI & Navigation Validation  
Ensures:
- Buttons and screens render correctly  
- Navigation works across the full app  
- Visual elements behave responsively  

✔ API Testing  
Direct validation of Supabase endpoints using `cy.request()`:
- Auth API  
- User progress API  
- Ranking updates  

✔ Custom Commands  
Centralized reusable actions such as:
- `cy.login(email, password)`
- `cy.loadLevel(number)`
- `cy.submitQuery(query)`

---

🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/aparraut/sql-mind-trainer-tests.git
cd sql-mind-trainer-tests
```

2. Install dependencies:
```bash
npm install
```

3. Run Cypress:
```bash
npx cypress open
```

---

⚙ Configuration

`cypress.config.js` includes:

- Base URL  
- Screenshots folder  
- Optional custom tasks  
- Viewport configuration  

Example base URL used:
```
https://aparraut.github.io/sql-mind-trainer/
```

---

🧪 Running Tests

Interactive mode:
```bash
npx cypress open
```

Headless mode:
```bash
npx cypress run
```

---

📦 Fixtures

Reusable static data stored in:
- `users.json` → test accounts  
- `queries.json` → correct and incorrect SQL samples  

---

👨‍💻 Author

**Adalberto Parra**
QA Functional & Automation Engineer  
- Portfolio: https://testmindlab.com/  
- LinkedIn: https://www.linkedin.com/in/adalbertoparra/

---

## 🏁 Status

Suite currently under active development.  
New tests are added as SQL Mind Trainer evolves.

