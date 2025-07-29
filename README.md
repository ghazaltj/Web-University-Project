# Online Shop Web Project

A sample university web application – full-stack online store  
(Frontend: HTML/CSS/JS | Backend: Node.js, Express | Database: MongoDB)

---

## Overview

This is a simple e-commerce web application developed as an educational project.  
It allows users to view products, see product details, add items to the shopping cart, register/login, and place orders.  
All product and cart data are managed dynamically via a RESTful backend.

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript (Vanilla JS)
- **Authentication:** JWT (JSON Web Token)
- **Dev Tools:** npx serve, VSCode Live Server

---

## Project Structure

Web-University-Project-main/
├── backend/
│ ├── index.js
│ ├── models/
│ ├── routes/
│ ├── seedProducts.js
│ └── ... (Node.js backend code)
├── index.html
├── add-product.html
├── cart.html
├── login.html
├── product.html
├── script.js
├── style.css
├── Images/
│ ├── cloth1.jpg
│ ├── cloth2.jpg
│ └── ... (product images)
└── README.md

yaml
Copy
Edit

---

## How to Run

### 1. Run the Backend (Node.js + Express)

1. Go to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    npm run dev
    ```
    You should see "Server running on port 5000" and "MongoDB connected!" messages.

> **Note:** Make sure MongoDB is installed and running on your system.

---

### 2. Run the Frontend

You can serve the HTML files with any static server. Two recommended ways:

#### Option 1: VSCode + Live Server

- Open the project in VSCode.
- Right-click on `index.html` and choose **Open with Live Server**.
- The site will open at `http://localhost:5500/`.

#### Option 2: npx serve

- In the main project folder (where all HTML files are), run:
    ```bash
    npx serve .
    ```
- The site will be available at `http://localhost:3000/`.

> **Tip:** If you face issues with `npx serve` (e.g., redirect or not finding files), use VSCode Live Server or `python -m http.server 3000`.

---

### 3. Usage Guide

- **Product List:**  
  Go to `index.html` to view all products.
- **Product Details:**  
  Click on a product to view its details (`product.html?id=PRODUCT_ID`).
- **Add Product (Admin only):**  
  Go to `add-product.html` (requires login as admin).
- **Shopping Cart:**  
  Use `cart.html` to see/edit your cart.
- **Register/Login:**  
  Use `login.html` for authentication.

---

## Main Features

- **Display product list (fetched from MongoDB)**
- **View product details (dynamic page)**
- **Add to cart, update quantity, and remove products**
- **View cart and total price**
- **Register and login (JWT authentication)**
- **Add new product (admin only)**
- **Cart data stored per user on the backend**

---

## Technical Notes

- Product images must be placed in the `Images` folder with the correct filenames (e.g., `cloth1.jpg`).
- Product data (name, price, description, etc.) is seeded into the database via `backend/seedProducts.js`.
- Only logged-in users can add to cart and checkout.
- Cart is associated with the user account; users always see their own cart after login.

---

## Troubleshooting

- **No products shown?**  
  Check that the backend is running and MongoDB is seeded with products.
- **Can't open product details page?**  
  Make sure you click products from the list (to generate `product.html?id=...` URLs). If you open `product.html` directly, add a valid product id in the URL.
- **Authentication/cookie problems?**  
  Check the browser console and ensure the backend is running on `localhost:5000`.
- **Redirect issues with static server?**  
  Use VSCode Live Server or `python -m http.server` if `npx serve` causes problems.

---

## Credits

- Developer: [Your Name & Student ID Here]
- University Project – [Course name, term, instructor, etc.]

---

**Good luck and happy coding!**
