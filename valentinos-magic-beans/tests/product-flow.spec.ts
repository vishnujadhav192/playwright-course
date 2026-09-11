import { test, expect } from '@playwright/test';
import * as products from './pages/Products'
import * as cart from './pages/Cart'

test('Item is added to the shopping cart', async ({ page }) => {
    await page.goto('/products');

    const addedProduct = await products.addProductToCart(page, 1);

    await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click();

    await cart.assertProduct(page, addedProduct.name!)

    const subtotal = await cart.getSubTotal(page)

    expect(subtotal).toBe(addedProduct.price)

})