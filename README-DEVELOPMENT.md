# CredO Website - Local Development Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 14 or higher)
- **Any modern web browser**

### Getting Started

1. **Open Terminal/Command Prompt** in your project directory

2. **Start the development server**:
   ```bash
   # Using npm scripts (recommended):
   npm start
   # or
   npm run dev
   
   # Direct node command:
   node local-server.js
   ```

3. **Your browser will automatically open** to `http://localhost:3000`

## 🌟 Features

### ✅ **Live Reload**
- Edit any HTML, CSS, or JS file
- Save the file
- Watch the browser automatically refresh
- No manual refreshing needed!

### ✅ **Form Testing**
- Test all contact forms locally
- Forms redirect to success page
- Form data is logged in the terminal
- Perfect for testing before deployment

### ✅ **Asset Serving**
- All CSS, JavaScript, images work properly
- Proper MIME types for all file types
- Serves from your local file system

### ✅ **Error Handling**
- Custom 404 pages with CredO branding
- Helpful error messages
- Graceful error recovery

## 📝 Available Pages

Once the server is running, you can access:

- **Home**: http://localhost:3000/
- **About Us**: http://localhost:3000/who-we-are.html
- **Technical Details**: http://localhost:3000/under-the-hood.html
- **Enterprise Product**: http://localhost:3000/enterprise-product.html
- **IoT Solutions**: http://localhost:3000/connected-everything.html
- **Partners**: http://localhost:3000/partners.html
- **Team**: http://localhost:3000/whos-behind-this.html
- **Contact**: http://localhost:3000/reach-out.html
- **Success Page**: http://localhost:3000/success.html

## 🔧 Development Workflow

### 1. **Start Development**
```bash
npm start
```

### 2. **Make Changes**
- Edit any HTML, CSS, or JavaScript file
- Save your changes

### 3. **See Results Instantly**
- Browser automatically refreshes
- No manual reload needed
- Changes appear immediately

### 4. **Test Forms**
- Fill out contact forms
- Submit to see success page
- Check terminal for form data

### 5. **Stop Server**
- Press `Ctrl+C` in terminal
- Server shuts down gracefully

## 🛠️ Development Tips

### **CSS Changes**
- Edit `styles.css`
- Save file
- See styles update instantly
- Perfect for fine-tuning layouts

### **Content Updates**
- Edit any HTML file
- Add new sections or modify existing content
- Changes appear immediately

### **Testing Responsive Design**
- Use browser dev tools
- Test different screen sizes
- All responsive features work locally

### **Form Testing**
- All forms work without Netlify
- Success page redirects work
- Perfect for testing form validation

## 📊 Server Output

When you start the server, you'll see:

```
🚀 CredO Website Development Server Started!
=========================================
📍 Server URL: http://localhost:3000
📁 Serving files from: C:\Users\...\CredO-Website
🔄 Live reload: ENABLED
📧 Form handling: ENABLED (simulated)
=========================================

📝 Available pages:
   • Home: http://localhost:3000/
   • About: http://localhost:3000/who-we-are.html
   • Technical: http://localhost:3000/under-the-hood.html
   • Enterprise: http://localhost:3000/enterprise-product.html
   • IoT: http://localhost:3000/connected-everything.html
   • Partners: http://localhost:3000/partners.html
   • Team: http://localhost:3000/whos-behind-this.html
   • Contact: http://localhost:3000/reach-out.html

💡 Tips:
   • Edit any file and save - the page will auto-reload
   • Forms will redirect to success page (simulated)
   • Press Ctrl+C to stop the server

🌐 Opening browser...
```

## 🚨 Troubleshooting

### **Port Already in Use**
If port 3000 is busy:
1. Stop other applications using port 3000
2. Or edit `local-server.js` and change `PORT = 3000` to another port

### **Browser Doesn't Open**
- Manually visit `http://localhost:3000`
- Check that the server started successfully
- Ensure no firewall is blocking the connection

### **Files Not Loading**
- Ensure you're in the correct directory
- Check that all files exist in the project folder
- Verify file permissions

### **Live Reload Not Working**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try hard refresh (Ctrl+F5)

## 🎯 Ready for Production?

When you're satisfied with your changes:

1. **Stop the development server** (Ctrl+C)
2. **Commit your changes** to Git
3. **Push to GitHub**
4. **Deploy to Netlify**

Your local changes will match exactly what appears on the live site!

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide first
2. Look at the terminal output for error messages
3. Ensure Node.js is properly installed
4. Try restarting the development server

Happy developing! 🚀
