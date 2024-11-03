# React Cart Application

This project is a single-page application (SPA) that serves as a cart system for a small store, implemented with React. The app allows users to browse products, add items to their cart, proceed to checkout, and view an order confirmation.

## Features
1. **Browse View**: 
   - Displays a list of products with the ability to increase/decrease the quantity of each.
   - Includes a search bar to filter products by title.
   - Maintains the cart state and quantity for each item.

2. **Cart View**:
   - Shows selected items, quantities, individual prices, and the total amount.
   - Includes a form to enter shipping details and payment information with validation for required fields (e.g., email, credit card, zip code).
   - Includes a "Checkout" button to proceed to the order confirmation.

3. **Confirmation View**:
   - Displays the order summary with purchased items, total amount, and user info.
   - Partially redacts the credit card number for security.
   - Includes a "Back to Browse" button that resets the cart and returns to the browse view.
