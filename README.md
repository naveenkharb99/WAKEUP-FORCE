# WAKEUP FORCE 🏋️‍♂️⏰

A premium alarm application that ensures you actually wake up by making you **walk 30 steps** (Free Mode) or **walk + take a selfie with water on your face** (Premium Mode) to dismiss the alarm.

## ✨ Features

### 🎯 FREE MODE: Walk to Dismiss
- Set alarm for any time
- Alarm rings with loud beep + phone vibration
- Must walk **30 steps** to dismiss (shake detection)
- Real-time step counter
- Manually simulate steps for testing

### 💎 PREMIUM MODE: Face + Water Verification
- All FREE features +
- **Razorpay payment integration** (₹99/month or ₹950/year)
- Camera access for face verification
- **Water detection algorithm** - confirms water on face
- Auto-renewal subscription support
- Premium user statistics & analytics

### ⏱️ BONUS: Timer & Stopwatch
- Classic timer with start/pause/reset
- Stopwatch with lap tracking
- Persistent time display

---

## 🚀 Quick Start

### **Live App** 
🌐 https://naveenkharb99.github.io/WAKEUP-FORCE/

### **Local Setup**

1. **Frontend** (Already Live on GitHub Pages)
```bash
# No setup needed - app runs on GitHub Pages
# Open: https://naveenkharb99.github.io/WAKEUP-FORCE/
```

2. **Backend** (Node.js + MongoDB)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB & Razorpay keys
npm run dev  # Runs on http://localhost:5000
```

---

## 📁 Project Structure

```
WAKEUP-FORCE/
├── index.html                 # Frontend (hosted on GitHub Pages)
├── backend/
│   ├── server.js             # Express server
│   ├── package.json
│   ├── .env.example
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints (12 total)
│   ├── middleware/           # JWT authentication
│   └── BACKEND_SETUP.md      # Detailed docs
├── README.md                 # This file
└── .gitignore
```

---

## 🔧 Technology Stack

### **Frontend**
- Pure HTML5 / CSS3 / Vanilla JavaScript
- No frameworks or dependencies
- Browser APIs: MediaDevices, DeviceMotion, Canvas, AudioContext, LocalStorage
- GitHub Pages hosting

### **Backend**
- **Node.js + Express** - REST API server
- **MongoDB** - NoSQL database
- **Razorpay** - Payment gateway
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

---

## 📡 API Endpoints (12 Total)

### Authentication (5)
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile
- `GET /api/auth/verify` - Verify token

### Subscriptions (4)
- `POST /api/subscriptions/create-order` - Create Razorpay order
- `POST /api/subscriptions/verify-payment` - Verify & activate
- `GET /api/subscriptions/my-subscription` - Check status
- `POST /api/subscriptions/cancel-auto-renew` - Cancel renewal

### Alarms (3)
- `POST /api/alarms/log` - Log alarm completion
- `GET /api/alarms/history` - Get history
- `GET /api/alarms/stats` - Get statistics

---

## 🔐 Configuration

### Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wakeup_force
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
FRONTEND_URL=http://localhost:3000
```

### Get API Keys

**MongoDB:**
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Copy connection string

**Razorpay:**
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API keys from Settings → API Keys
3. Use test keys for development

---

## 🎮 How It Works

### **Free Mode (Walkthrough)**
1. Set alarm (e.g., 7:30 AM)
2. Click "SET ALARM"
3. At alarm time, phone rings loudly + vibrates
4. Shake phone or click "SIMULATE STEP" 30 times
5. "STOP ALARM" button unlocks when 30 steps done
6. Click to dismiss

### **Premium Mode (Walkthrough)**
1. Subscribe (₹99/month or ₹950/year)
2. Set alarm
3. At alarm time, phone rings
4. Walk 30 steps (same as free)
5. Allow camera access
6. Take selfie with water on face
7. Click "STOP ALARM" to dismiss

---

## 📊 Database Schema

**Users**
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed)
}
```

**Subscriptions**
```javascript
{
  userId: ObjectId,
  plan: "monthly" | "yearly",
  amount: 99 | 950,
  status: "active" | "expired",
  expiryDate: Date,
  autoRenew: Boolean,
  razorpayPaymentId: String
}
```

**Alarms**
```javascript
{
  userId: ObjectId,
  alarmTime: String,
  stepsWalked: Number,
  waterDropsVerified: Boolean,
  mode: "free" | "premium",
  status: "dismissed"
}
```

---

## 🌐 Deployment

### **Frontend** (Already Live ✅)
- Hosted on GitHub Pages
- Auto-deploys on push to main branch
- Live at: https://naveenkharb99.github.io/WAKEUP-FORCE/

### **Backend Options**

**Railway.app** (Recommended)
```bash
1. Connect GitHub repo
2. Add environment variables
3. Deploy (auto on push)
```

**Heroku**
```bash
heroku create wakeup-force-api
heroku config:set MONGODB_URI=...
git push heroku main
```

**AWS/DigitalOcean**
- Ubuntu VM with Node.js
- PM2 for process management
- Nginx reverse proxy

---

## 🔒 Security

✅ Passwords hashed with bcryptjs (10 rounds)
✅ JWT tokens with 30-day expiration
✅ CORS restricted to frontend domain
✅ Razorpay payment signature verification
✅ Input validation on all routes
✅ Environment variables for secrets

---

## 📱 Browser Support

✅ **Chrome/Chromium** - Full support
✅ **Firefox** - Full support
✅ **Safari** - Full support (iOS 14+)
✅ **Edge** - Full support

**Requirements:**
- Modern browser with WebGL support
- Camera access (for premium mode)
- Device motion sensors (for step detection)

---

## 🐛 Troubleshooting

### App not loading?
- Clear browser cache
- Check if using HTTPS (GitHub Pages)
- Try different browser

### Alarm not ringing?
- Check browser volume
- Verify permissions allowed
- Test with "SIMULATE STEP"

### Payment failing?
- Use test Razorpay credentials
- Verify API keys in `.env`
- Check internet connection

### Camera not working?
- Allow camera permission
- Check browser camera settings
- Try HTTPS only

---

## 📚 Detailed Documentation

- **[Backend Setup Guide](./backend/BACKEND_SETUP.md)** - Complete API documentation
- **[API Endpoints](./backend/BACKEND_SETUP.md#-api-endpoints-12-total)** - All 12 endpoints with examples
- **[Deployment Guide](./backend/BACKEND_SETUP.md#-deployment)** - Deploy backend

---

## 🎯 Features In Development

- 🔔 Push notifications
- 📊 Advanced analytics dashboard
- 🎵 Custom alarm sounds
- 🌙 Sleep tracking integration
- ⚙️ More customization options

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review backend documentation
3. Check browser console for errors
4. Test with test Razorpay credentials

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 🙏 Credits

Built with ❤️ for better mornings ☀️

**Made by:** Naveen Kharb

---

**Start your day right with WAKEUP FORCE!** 💪⏰✨
