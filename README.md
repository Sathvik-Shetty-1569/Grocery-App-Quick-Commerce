
  <div align="center">
  <h1>🛒 Grocery Delivery App</h1>
  <p>A comprehensive dual-platform grocery delivery solution for customers and delivery partners</p>
  
  <div>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Zustand-FF9500?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
    <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO" />
    <img src="https://img.shields.io/badge/React_Navigation-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Navigation" />
  </div>

  <br />

  <!-- App Preview GIFs -->
 <h2>📸 App Previews</h2>
<p><em>Customer & Delivery partner flows in action 🚀</em></p>

<table>
  <tr>
    <td align="center">
      <img src="./screenshots/WhatsApp Video 2025-09-14 at 13.47.37_db3b36a9.gif" alt="Customer Login" width="250" />
      <br/><b>🔐 Customer Login</b>
    </td>
    <td align="center">
      <img src="./screenshots/WhatsApp Image 2025-09-14 at 13.47.35_13a94183.jpg" alt="Delivery Login" width="250" />
      <br/><b>🚚 Delivery Login</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="./screenshots/WhatsApp Video 2025-09-14 at 13.47.43_fd0fa8be.gif" alt="Customer Home" width="250" />
      <br/><b>🏠 Customer Home</b>
    </td>
    <td align="center">
      <img src="./screenshots/WhatsApp Image 2025-09-14 at 13.47.35_5a2fb419.jpg" alt="Delivery Home" width="250" />
      <br/><b>📦 Delivery Dashboard</b>
    </td>
  </tr>
</table>

<br />

<p><em>📱 A modern grocery shopping experience with real-time delivery tracking 🚚</em></p>
</div>


  <!-- Screenshots placeholder -->
 
</div>

## ✨ Key Highlights

🎯 **Dual Platform Architecture**
- **Customer App**: Browse, shop, track orders
- **Delivery Partner App**: Receive orders, navigate, update status

🚀 **Real-time Features**
- Live order tracking with Socket.IO
- Real-time delivery status updates
- Interactive maps with directions
- Push notifications and alerts

💎 **Premium User Experience**
- Smooth carousel animations
- Auto-scrolling product banners
- Gesture-based interactions
- Responsive typography and layouts

## 📱 Main Screens Overview

### 🔐 Authentication Flow
- **Splash Screen** (`src/features/auth/SplashScreen.tsx`)
  - Animated brand introduction
- **Customer Login** (`src/features/auth/CustomerLogin.tsx`)
  - Customer authentication with JWT
- **Delivery Login** (`src/features/auth/DeliveryLogin.tsx`)
  - Delivery partner authentication

### 🛍️ Customer Experience
- **Product Dashboard** (`src/features/dashboard/ProductDashboard.tsx`)
  - Animated header with search
  - Product carousels and categories
  - Featured products and offers
- **Product Categories** (`src/features/category/ProductCategories.tsx`)
  - Sidebar navigation
  - Filterable product lists
  - Add to cart functionality
- **Cart & Checkout** (`src/features/cart/`)
  - Cart animation wrapper
  - Order summary and pricing
  - Checkout flow
- **Order Tracking** (`src/features/map/LiveTracking.tsx`)
  - Real-time GPS tracking
  - Delivery partner location
  - ETA and route visualization
- **Profile Management** (`src/features/profile/Profile.tsx`)
  - User preferences and settings

### 🚚 Delivery Partner Experience
- **Delivery Dashboard** (`src/features/delivery/DeliveryDashboard.tsx`)
  - Active orders management
  - Earnings tracker
  - Performance metrics
- **Delivery Map** (`src/features/delivery/DeliveryMap.tsx`)
  - Navigation to customer
  - Order details overlay
  - Status update controls

## 🏗️ Architecture & Tech Stack

### 📱 **Frontend**
- **React Native** `0.77.0` - Latest stable version
- **TypeScript** `5.0.4` - Type-safe development
- **React Navigation** `7.x` - Screen navigation

### 🗄️ **State Management**
- **Zustand** `5.0.3` - Lightweight state management
- **MMKV** `3.2.0` - Ultra-fast key-value storage
- **JWT Decode** `4.0.0` - Token management

### 🎨 **UI & Animations**
- **Lottie React Native** `7.2.2` - Beautiful animations
- **React Native Reanimated** `3.16.7` - 60fps animations
- **Reanimated Carousel** `3.5.1` - Smooth carousels
- **Auto Scroll** - Automated content scrolling
- **Linear Gradient** `2.8.3` - Gradient backgrounds
- **Vector Icons** `10.2.0` - Comprehensive icon library
- **SVG Support** `15.11.1` - Scalable vector graphics

### 🗺️ **Location & Maps**
- **React Native Maps** `1.20.1` - Interactive maps
- **Maps Directions** `1.9.0` - Route navigation
- **Geolocation** `3.4.0` - GPS positioning

### 🔄 **Real-time Communication**
- **Socket.IO Client** `4.8.1` - Real-time updates
- **Axios** `1.7.9` - HTTP client

### 🛠️ **Development Tools**
- **ESLint** `8.19.0` - Code linting
- **Prettier** `2.8.8` - Code formatting
- **Jest** `29.6.3` - Testing framework
- **Patch Package** - Dependency patching

## 🗂️ Project Structure

```
🗂️ grocery_app/
├── 📁 src/
│   ├── 🎨 assets/           # Images, fonts, animations
│   │   ├── animations/      # Lottie animation files
│   │   ├── category/        # Category images
│   │   ├── fonts/          # Custom fonts
│   │   ├── icons/          # App icons
│   │   ├── images/         # Static images
│   │   └── products/       # Product images
│   ├── 🧩 components/       # Reusable UI components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── delivery/        # Delivery components
│   │   ├── global/          # Global components
│   │   ├── login/           # Login components
│   │   ├── map/            # Map components
│   │   └── ui/             # UI components
│   ├── 🎯 features/         # Feature modules
│   │   ├── auth/           # Authentication
│   │   ├── cart/           # Shopping cart
│   │   ├── category/       # Product categories
│   │   ├── dashboard/      # Main dashboard
│   │   ├── delivery/       # Delivery features
│   │   ├── map/           # Map & tracking
│   │   ├── order/         # Order management
│   │   └── profile/       # User profile
│   ├── 🧭 navigation/      # Navigation configuration
│   ├── 🌐 service/         # API services
│   ├── 🔄 state/          # State management
│   │   ├── authStore.tsx   # Authentication state
│   │   ├── cartStore.tsx   # Cart state
│   │   ├── mapStore.tsx    # Map state
│   │   └── storage.tsx     # Persistent storage
│   ├── 🎨 styles/         # Global styles
│   └── 🔧 utils/          # Utility functions
├── 🗄️ server/             # Backend server (if applicable)
├── 📱 android/            # Android specific code
├── 🍎 ios/               # iOS specific code
└── 📄 App.tsx            # Root component
```

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed:

- ✅ [Node.js](https://nodejs.org/) (>= 18.0.0)
- ✅ [React Native CLI](https://reactnative.dev/docs/environment-setup)
- ✅ [Android Studio](https://developer.android.com/studio) (for Android)
- ✅ [Xcode](https://developer.apple.com/xcode/) (for iOS, macOS only)
- ✅ [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd grocery_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Link custom fonts**
   ```bash
   npm run link:fonts
   ```

4. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### ▶️ Running the App

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## 🌟 Key Features in Detail

### 🛍️ **For Customers**
- **Smart Product Search**: Intelligent search with filters and categories
- **Interactive Cart**: Real-time cart updates with animations
- **Live Order Tracking**: GPS-based real-time delivery tracking
- **Personalized Experience**: User preferences and order history
- **Multiple Payment Options**: Secure payment integration

### 🚚 **For Delivery Partners**
- **Order Management**: Accept/reject orders with smart routing
- **Navigation Integration**: Turn-by-turn directions to customers
- **Earnings Tracking**: Real-time earnings and performance metrics
- **Status Updates**: Easy order status management
- **Optimized Routes**: AI-powered route optimization

### 🔄 **Real-time Features**
- **Live Updates**: Socket.IO powered real-time communication
- **Push Notifications**: Instant order and delivery updates
- **Location Tracking**: Accurate GPS tracking for deliveries
- **Chat Support**: In-app communication between customers and delivery partners

## 🧪 Testing & Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Apply patches after npm install
npm run postinstall
```

## 📱 Platform Support

| Platform | Support | Version |
|----------|---------|----------|
| 🤖 Android | ✅ | API 21+ |
| 🍎 iOS | ✅ | iOS 12+ |

## 🚀 Deployment

### Android
```bash
# Generate APK
cd android && ./gradlew assembleRelease
```

### iOS
```bash
# Open in Xcode for archiving
open ios/grocery_app.xcworkspace
```

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`git checkout -b feature/amazing-feature`)
3. ✅ Commit changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to branch (`git push origin feature/amazing-feature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Community** - For the amazing framework
- **Zustand** - For lightweight state management
- **Lottie** - For beautiful animations
- **Socket.IO** - For real-time communication
- **React Native Maps** - For map integration

## 📞 Support

If you need help or have questions:
- 🐛 [Report Issues](../../issues)
- 💬 [Start Discussion](../../discussions)
- 📧 Contact the development team

---

<div align="center">
  <p>🛒 Built with ❤️ for seamless grocery delivery experiences</p>
  <p>⭐ Star this repo if it helps you!</p>
</div>
