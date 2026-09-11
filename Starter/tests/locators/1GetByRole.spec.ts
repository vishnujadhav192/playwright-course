import { test, expect } from '@playwright/test'

test('Get by Role practice - heading', async ({ page }) => {
    await page.goto('');

    const servicesHeading = page.getByRole('heading', { name: 'our services', exact: false })

    await expect(servicesHeading).toBeVisible();

})

test('Get by Role practice - list', async ({ page }) => {
    await page.goto('');

    const servicesList = page.getByRole('list')
    await expect(servicesList).toBeVisible();

    const serviceItems = await servicesList.getByRole('listitem').all();

    for (const items of serviceItems) {
        const itemText = await items.textContent();
        expect(itemText).toBeTruthy();
        console.log(itemText)
    }
})


test('Get by Role practice - Buttons', async ({ page }) => {
    await page.goto('');

    const acceptCookiesButton = page.getByRole('button', { name: 'Accept', exact: true });

    const declineCookiesButton = page.getByRole('button', { name: 'decline', exact: false });

    await acceptCookiesButton.click();

    await expect(acceptCookiesButton).not.toBeVisible();
    await expect(declineCookiesButton).not.toBeVisible();
})

test('Get by Role practice - Link', async ({ page }) => {
    await page.goto('');

    //    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'decline', exact: false }).click();

    //    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'Go to Feedback Form' }).click();

    //    await page.waitForTimeout(2000);

    const url = page.url(); //http://localhost:5000/FeedBackForm.html
    console.log(url)
    expect(url).toContain('FeedBack')
})