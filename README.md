# WanderLust 🏡

WanderLust is a full-stack Airbnb-inspired accommodation listing web application built with **Node.js, Express, MongoDB, EJS, and Passport.js**. Users can browse stays, create and manage listings, upload listing images, and add reviews.

## ✨ Features

- 🔐 User authentication with signup, login, logout, sessions, and Passport.js
- 🏠 Browse accommodation listings
- 🔎 View detailed listing information
- ➕ Create new listings
- ✏️ Edit listings
- 🗑️ Delete listings
- 🖼️ Upload listing images using Cloudinary
- ⭐ Add reviews with a 1–5 star rating
- ✏️ Edit reviews
- 🗑️ Delete reviews
- 👤 Associate listings and reviews with users
- 🔔 Flash messages for success and error feedback
- ⚠️ Custom 404 and application error handling
- 📱 Server-rendered UI using EJS and EJS-Mate

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Frontend:** EJS, EJS-Mate, HTML, CSS, JavaScript

**Authentication:** Passport.js, Passport-Local, Passport-Local-Mongoose, Express Session

**Other:** Connect Flash, Method Override, Joi, dotenv

**Image Uploads:** Multer, Cloudinary, multer-storage-cloudinary

## 📁 Project Structure

```text
Airbnb/
├── Controller/          # Controller logic
│   ├── listings.js
│   ├── review.js
│   └── user.js
├── models/              # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routing/             # Express routers
├── views/               # EJS templates
├── public/              # CSS, JavaScript and static assets
├── init/                # Seed/data scripts
├── utils/               # Utility and custom error classes
├── cloudConfig.js       # Cloudinary configuration
├── schemavalidation.js  # Joi validation schemas
├── app.js               # Application entry point
├── package.json         # Dependencies and scripts
└── README.md
```

## 🔄 Application Flow

```text
Browser
   ↓
Express Routes
   ↓
Controllers
   ↓
Mongoose Models
   ↓
MongoDB

Images → Multer → Cloudinary
Authentication → Passport.js → Express Session
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shiva154200/Airbnb.git
cd Airbnb
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start MongoDB

The application currently connects to:

```text
mongodb://127.0.0.1:27017/wanderlust
```

Make sure your local MongoDB server is running.

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRETE=your_cloudinary_api_secret
```

Never commit real credentials to GitHub.

### 5. Run the application

Development mode:

```bash
npm run dev
```

Production-style start command:

```bash
npm start
```

The server runs on **http://localhost:8080**.

## 🌱 Seed Data

To run the project's seed script:

```bash
npm run seed
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the Express server |
| `npm run dev` | Starts the server with Nodemon |
| `npm run seed` | Runs the database seed script |

## 🗃️ Main Data Models

### User
Stores user account and authentication information.

### Listing
Stores the title, description, image, price, location, country, owner, and reviews.

### Review
Stores the comment, rating, author, and creation date.

Listings reference their reviews, and reviews reference their authors. Deleting a listing also removes its associated reviews.

## 🔐 Authentication

Authentication uses Passport Local Strategy and Passport-Local-Mongoose. User sessions are maintained with `express-session`, and flash messages provide feedback after actions such as login, logout, listing creation, and review operations.

## ☁️ Cloudinary

Listing images are uploaded using Multer and `multer-storage-cloudinary`. The current Cloudinary configuration stores uploads in the `WanderLustDev` folder and allows PNG, JPEG, and JPG images.

## 🧪 Validation & Error Handling

- Joi is used for request/data validation.
- A custom `ExpressError` class is used for application errors.
- A custom 404 handler is included.
- Flash messages are used for success and error feedback.

## 🔮 Future Improvements

- Add listing search and filters
- Add categories for listings
- Add map/location integration
- Strengthen authorization checks for listing and review ownership
- Improve responsive UI and accessibility
- Move production database configuration to environment variables
- Add automated tests
- Deploy the application to a production hosting platform

## 👨‍💻 Author

**Shivam Jogdand**

GitHub: [@shiva154200](https://github.com/shiva154200)

## 📄 License

This project is intended as an educational/full-stack development project.
