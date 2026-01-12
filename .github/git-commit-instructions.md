# Git Commit Instructions

This project uses **Conventional Commits** for all commit messages.

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `chore` | Changes to the build process or auxiliary tools and libraries |
| `ci` | Changes to CI configuration files and scripts |

## Scope (optional)

Use the scope to specify the area of the codebase affected:

| Scope | Description |
|-------|-------------|
| `content` | Blog posts and content files |
| `ui` | UI components and styling |
| `config` | Configuration files (nuxt.config.ts, app.config.ts) |
| `deps` | Dependency updates |
| `tooling` | Changes to developer tools, editor configs, or Copilot instructions |

## Examples

```bash
# Adding a new blog post
feat(content): add new blog post about TypeScript tips

# Fixing a UI issue
fix(ui): correct navigation menu alignment on mobile

# Updating documentation
docs: update README with deployment instructions

# Dependency updates
chore(deps): update nuxt to v4.1.0

# Code refactoring
refactor(ui): simplify AppHeader component structure

# Adding a new feature
feat: add dark mode toggle to header

# Performance improvement
perf(content): optimize image loading for blog posts
```

## Rules

1. **Use lowercase** for the type and description
2. **Do not end** the description with a period
3. **Use imperative mood** in the description ("add" not "added" or "adds")
4. **Keep the first line** under 72 characters
5. **Separate subject from body** with a blank line (if body is used)
6. **Use the body** to explain what and why vs. how

## Breaking Changes

For breaking changes, add `!` after the type/scope or add `BREAKING CHANGE:` in the footer:

```bash
# Using ! notation
feat(api)!: change response format for feed endpoint

# Using footer notation
feat(api): change response format for feed endpoint

BREAKING CHANGE: The feed endpoint now returns JSON instead of XML
```

## Multi-line Commit Messages

For more complex changes, use a body to provide additional context:

```bash
fix(ui): resolve mobile navigation overflow issue

The navigation menu was overflowing on screens smaller than 375px.
This fix adds proper responsive breakpoints and adjusts the menu
layout for very small devices.

Closes #42
```

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

