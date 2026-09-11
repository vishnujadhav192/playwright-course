import { test, expect } from '@playwright/test'

test.use({
    storageState: {
        cookies: [],
        origins: [{
            origin: 'http://localhost:5000/',
            localStorage: [{
                name: 'name',
                value: 'Alex2'
            }]
        }]
    }
})

test('Storage - load from configuration', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    const nameField = page.getByRole('textbox', { name: 'name' })

    await expect(nameField).toHaveValue('Alex2')

})


test('Storage - configure inside the test', async ({ page }) => {
    await page.goto('FeedBackForm.html');

    await page.evaluate(()=>{
        localStorage.setItem('email', 'alex2@email.com')
    })

    await page.reload()

    const emailField = page.getByRole('textbox', { name: 'email' })

    await expect(emailField).toHaveValue('alex2@email.com')
})