import { expect, test } from '@playwright/test'

test('navigates through the home and blog pages without client errors', async ({ page }) => {
  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error')
      consoleErrors.push(message.text())
  })
  page.on('pageerror', error => pageErrors.push(error.message))

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Hi, I\'m Alexandre' })).toBeVisible()
  await page.getByRole('link', { name: 'See my blog' }).click()
  await expect(page).toHaveURL(/\/posts$/)
  await expect(page.getByRole('heading', { name: 'Blog', exact: true })).toBeVisible()
  expect(consoleErrors).toEqual([])

  await page.goto('/posts/github-actions-var-and-context')
  await expect(page.getByRole('heading', {
    name: '4 tips about GitHub Actions environment variables and contexts',
    exact: true
  })).toBeVisible()
  expect(pageErrors).toEqual([])
})

test('serves RSS and Atom feeds', async ({ request }) => {
  const rss = await request.get('/feed.rss')
  const atom = await request.get('/feed.atom')

  expect(rss.ok()).toBe(true)
  expect(rss.headers()['content-type']).toContain('application/rss+xml')
  expect(await rss.text()).toContain('<rss')
  expect(atom.ok()).toBe(true)
  expect(atom.headers()['content-type']).toContain('application/atom+xml')
  expect(await atom.text()).toContain('<feed')
})

test('loads previously broken post images', async ({ page }) => {
  await page.goto('/posts/once-upon-a-time-in-dotnet')

  const image = page.getByRole('img', { name: 'Code showing classes not having value equality' })
  await expect(image).toBeVisible()
  await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
})

test('isolates Twitter embeds in sandboxed frames', async ({ page }) => {
  await page.route('https://platform.twitter.com/**', route => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>Test embed</title>'
  }))

  await page.goto('/posts/github-actions-var-and-context')

  const embed = page.locator('iframe[title="Embedded post 1417509550786322440"]')
  await expect(embed).toHaveAttribute('sandbox', /allow-scripts/)
  await expect(embed).toHaveAttribute('src', /platform\.twitter\.com\/embed\/Tweet\.html/)
  await expect(page.locator('script[src*="platform.twitter.com/widgets.js"]')).toHaveCount(0)
})

test('validates and submits the contact form', async ({ page }) => {
  let submission: unknown
  await page.route('https://api.submitjson.com/**', async (route) => {
    submission = route.request().postDataJSON()
    await route.fulfill({
      contentType: 'application/json',
      body: '{}',
      status: 200
    })
  })
  await page.goto('/contact')

  await page.getByRole('button', { name: 'Send', exact: true }).click()
  await expect(page.getByText('Required', { exact: true }).first()).toBeVisible()

  await page.getByLabel('Name', { exact: true }).fill('E2E Test')
  await page.getByLabel('Email', { exact: true }).fill('test@example.com')
  const message = page.getByLabel('Message', { exact: true })
  await message.fill('Testing the upgraded contact form.')
  await message.blur()
  await expect(page.getByText('Required', { exact: true })).toHaveCount(0)
  await page.getByRole('button', { name: 'Send', exact: true }).click()

  await expect.poll(() => submission).toMatchObject({
    data: {
      name: 'E2E Test',
      email: 'test@example.com',
      message: 'Testing the upgraded contact form.'
    }
  })
  await expect(page).toHaveURL(/\/$/)
})
