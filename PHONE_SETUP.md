# 📱 How to Open AR App on Your Phone

## 🚀 **Method 1: Using Your Computer as Server (Best for AR)**

### Step 1: Start the server on your computer
```bash
python server.py
```

### Step 2: Connect your phone to the same WiFi network as your computer

### Step 3: Open your phone's browser and go to:
```
http://192.168.1.15:8000
```

**Important:** Make sure both your phone and computer are connected to the same WiFi network!

---

## 🌐 **Method 2: Using ngrok (Works from anywhere)**

### Step 1: Install ngrok
Download from: https://ngrok.com/download

### Step 2: Start your server
```bash
python server.py
```

### Step 3: In a new terminal, run ngrok
```bash
ngrok http 8000
```

### Step 4: Use the ngrok URL on your phone
The ngrok command will give you a URL like: `https://abc123.ngrok.io`

---

## 📋 **Step-by-Step Instructions:**

1. **On your computer:**
   - Open Command Prompt/PowerShell
   - Navigate to your project folder
   - Run: `python server.py`
   - Keep this running

2. **On your phone:**
   - Connect to the same WiFi as your computer
   - Open Chrome/Safari browser
   - Type: `http://192.168.1.15:8000`
   - Press Enter

3. **Using the AR app:**
   - Click "Start AR Experience"
   - Allow camera access
   - Point camera at the sample markers shown on screen

---

## 🔧 **Troubleshooting:**

### If it doesn't work:
1. **Check WiFi connection** - Both devices must be on same network
2. **Try different browsers** - Chrome, Safari, Firefox
3. **Check firewall** - Windows firewall might block the connection
4. **Use ngrok** - If local network doesn't work

### Windows Firewall Fix:
If you get blocked, allow Python through Windows Firewall:
1. Go to Windows Security → Firewall & network protection
2. Click "Allow an app through firewall"
3. Add Python and allow it

---

## 📱 **Best Phone Setup:**

- **Use Chrome or Safari** (best AR support)
- **Enable camera permissions**
- **Good lighting** for better marker detection
- **Hold phone steady** when scanning markers
- **Keep markers flat** and unobstructed

---

## 🎯 **Quick Test:**

1. Start server on computer
2. Open `http://192.168.1.15:8000` on phone
3. You should see the AR app interface
4. Click "Start AR Experience"
5. Point camera at the sample markers on screen

**Success!** You should see 3D objects appear on your phone screen! 🎉 