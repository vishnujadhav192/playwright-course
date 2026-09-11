import { test, expect } from '@playwright/test';

test('Get by text practice', async ({ page }) => {

    await page.goto('FeedBackForm.html')

    const title = page.getByText('Feedback Form').first()
    await expect(title).toBeVisible()

})

test('Get by text practice - hidden elements', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const hiddenButton = page.getByText('Hidden feature')
    // await expect(hiddenButton).not.toBeVisible()
    await expect(hiddenButton).toBeHidden();

    const hiddenButtonText = await hiddenButton.textContent()
    console.log(hiddenButtonText)

    const hiddenButtonWithRole = page.getByRole('button', {
        name: 'Hidden feature'
    })
    //const hiddenButtonWithRoleText = await hiddenButtonWithRole.textContent() // not working
    // console.log(hiddenButtonWithRoleText)
})

test('Get by text practice - error messages', async ({ page }) => {
    await page.goto('FeedBackForm.html')

    const emailValidationMessage = page.getByText('Invalid email format');
    await page.waitForTimeout(2000);

    await expect(emailValidationMessage).not.toBeVisible();
    // await expect(emailValidationMessage).toBeHidden();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', { name: 'email' }).fill('john@email')
    await page.waitForTimeout(2000);

    await expect(emailValidationMessage).toBeVisible();
    await page.waitForTimeout(2000);

    await page.getByRole('textbox', { name: 'email' }).fill('john@email.com')
    await page.waitForTimeout(2000);

    await expect(emailValidationMessage).toBeHidden();
    await page.waitForTimeout(2000);

})

test('test check', async ({ page }) => {
    await page.goto('http://localhost:5000/FeedBackForm.html');
    await page.getByRole('button', { name: 'Submit' }).click();
});