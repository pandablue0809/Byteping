# Contributing to BytePing

Contributions are what makes the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Before jumping into a PR be sure to search [existing PRs](https://github.com/arjunan-k/byteping/pulls) or [issues](https://github.com/arjunan-k/byteping/issues) for an open or closed item that relates to your submission.

## Priorities

<table>
  <tr>
    <td>
      Type of Issue
    </td>
    <td>
      Priority
    </td>
  </tr>
  <tr>
    <td>
      Core Bugs (Login not working)
    </td>
    <td>
      <a href="https://github.com/arjunan-k/byteping/issues?q=is:issue+is:open+sort:updated-desc+label:Urgent">
        <img src="https://img.shields.io/badge/-Urgent-red">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      Core Features (Add voice recorder)
    </td>
    <td>
      <a href="https://github.com/arjunan-k/byteping/issues?q=is:issue+is:open+sort:updated-desc+label:%22High+priority%22">
        <img src="https://img.shields.io/badge/-High%20Priority-orange">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      Confusing UX (... but working)
    </td>
    <td>
      <a href="https://github.com/arjunan-k/byteping/issues?q=is:issue+is:open+sort:updated-desc+label:%22Medium+priority%22">
        <img src="https://img.shields.io/badge/-Medium%20Priority-yellow">
      </a>
    </td>
  </tr>
  <tr>
    <td>
      Minor improvements, non-core feature requests
    </td>
    <td>
      <a href="https://github.com/arjunan-k/byteping/issues?q=is:issue+is:open+sort:updated-desc+label:%22Low+priority%22">
        <img src="https://img.shields.io/badge/-Low%20Priority-green">
      </a>
    </td>
  </tr>
</table>

## Local Setup for Development

The development branch is `main`. This is the branch that all pull
requests should be made against.

1. [Fork](https://help.github.com/articles/fork-a-repo/) this [repository](https://github.com/arjunan-k/byteping/) to your
   own GitHub account and then
   [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

   ```sh
   git clone https://github.com/arjunan-k/byteping.git
   ```

2. Create a new branch: Follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) while creating branches and commiting.

   ```sh
   git checkout -b BRANCH_NAME
   ```

   Branch names

   ```txt
   - feat(authentication): implement OAuth2 login
   - fix(login): resolve login button not working
   - docs(readme): update installation instructions
   - style(formatting): fix indentation in main.js
   - refactor(user-service): optimize database queries
   - test(user-api): add unit tests for user validation
   - chore(build): update dependencies to latest versions
   ```

3. npm Install:

   ```sh
   npm install
   ```

4. Set up your `.env` file: Duplicate **.env.local** to **.env**

   ```txt
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.
   - Use `openssl rand -base64 24` to generate a key and add it under `CALENDSO_ENCRYPTION_KEY` in the `.env` file.
   ```

5. Start developing and watch for code changes:

   ```sh
   npm run dev
   ```

## Building

You can build the project with:

```bash
npm run build
```

Please be sure that you can make a full production build before pushing code.

## Testing

More info on how to add new tests coming soon.

### Running tests

This will run and test all flows in multiple Chromium windows to verify that no critical flow breaks:

```sh
npm run test
```

## Linting

To check the formatting of your code:

```sh
npm lint
```

If you get errors, be sure to fix them before committing.

## Making a Pull Request

- Be sure to [check the "Allow edits from maintainers" option](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) while creating your PR.
- If your PR refers to or fixes an issue, be sure to add `refs #XXX` or `fixes #XXX` to the PR description. Replacing `XXX` with the respective issue number. See more about [Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).
- Be sure to fill the PR Template accordingly.
- Review & follow [Contribution Guidelines](./CONTRIBUTING.md).
