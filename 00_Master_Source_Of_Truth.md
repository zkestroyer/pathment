# 00 Master Source Of Truth (SSOT)

## 1. ERD & Schema
### User Model
- **name, email, password, phoneNumber**: Core user details.
- **addresses**: Array of addresses containing country, city, address1, address2, zipCode, addressType.
- **role**: Role of the user (default: 'user', could be 'admin').
- **avatar**: Public ID and URL for cloud storage.

### Shop (Seller) Model
- **name, email, password, description, address, phoneNumber, zipCode**: Shop details.
- **role**: Default 'Seller'.
- **avatar**: Public ID and URL.
- **withdrawMethod**: Object for seller's payment withdrawal.
- **availableBalance**: Current shop balance.
- **transections**: Array of transaction history.

### Product Model
- **name, description, category, tags, originalPrice, discountPrice, stock**: Core product info.
- **images**: Array of image objects.
- **reviews**: Array of review objects (user, rating, comment, productId).
- **shopId, shop**: Associated shop info.
- **sold_out**: Total sold.

### Order Model
- **cart**: Array of products.
- **shippingAddress, user, totalPrice**: Order details.
- **status**: e.g., 'Processing', 'Delivered'.
- **paymentInfo**: ID, status, and type.
- **paidAt, deliveredAt**: Timestamps.

## 2. API Endpoints (Planned)
- **Auth/User**: `/api/v2/user/create-user`, `/api/v2/user/login-user`, `/api/v2/user/getuserinfo`
- **Shop**: `/api/v2/shop/create-shop`, `/api/v2/shop/login-shop`, `/api/v2/shop/get-seller`
- **Product**: `/api/v2/product/create-product`, `/api/v2/product/get-all-products`, `/api/v2/product/get-all-products-shop`
- **Order**: `/api/v2/order/create-order`, `/api/v2/order/get-all-orders/:userId`, `/api/v2/order/update-order-status/:id`
- **Payment**: `/api/v2/payment/process`, `/api/v2/payment/stripeapikey`

## 3. Screen Flow & Sidebar Nodes
### Buyer Flow
- Landing Page -> Products -> Product Details -> Cart -> Checkout -> Payment -> Order Success -> Order Tracking/History.
### Seller Flow
- Shop Registration -> Dashboard -> Manage Products (Add/Edit) -> Manage Orders -> Withdraw Balance.
### Admin Flow
- Admin Dashboard -> Manage Users -> Manage Shops -> Manage All Orders.

## 4. Data Validations
- **Auth**: Passwords must be hashed and have minimum length. Unique emails.
- **Product**: Stock must be positive. Discount price cannot exceed original price.
- **Order**: Payment must be verified before status becomes "Processing" or "Paid".

## 5. Edge Cases
- Seller attempting to withdraw more than `availableBalance`.
- Order placement for a product that just went out of stock.
- Expired JWT tokens on critical operations (checkout/withdraw).
