# Contributing to Network+

Thank you for your interest in contributing to **Network+**! We welcome all contributions, bug fixes, feature requests, and documentation improvements.

---

## 🛠 Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/happybang/network_plugin_plus.git
   cd network_plugin_plus
   ```

2. **Run tests:**
   The project has zero external npm build dependencies and uses Node.js's native test runner:
   ```bash
   npm test
   ```

3. **Load in Chrome:**
   - Navigate to `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked** (top left)
   - Select the `network_plugin_plus` folder

---

## 📌 Contribution Workflow

1. **Fork & Branch:**
   Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Coding Standards:**
   - Use clean, standard modern JavaScript (ES Modules).
   - Ensure UI changes adhere to Chrome DevTools aesthetic (light & dark theme compatibility).
   - If adding helper functions, add unit tests in `tests/utils.test.js`.

3. **Verify Tests:**
   Run `npm test` before committing to make sure all tests pass without errors.

4. **Commit Guidelines:**
   Follow Conventional Commits:
   - `feat: add xxx`
   - `fix: resolve xxx`
   - `docs: update xxx`
   - `refactor: clean up xxx`

5. **Submit a Pull Request:**
   Push your branch and open a PR against `main`. Describe your changes clearly using the PR template.

---

## 💬 Community & Questions

Feel free to open an issue in the [GitHub Issues](https://github.com/happybang/network_plugin_plus/issues) tab for questions, bug reports, or feature discussions.
