# 🔍 AR Image Scanner

A web-based augmented reality application that can detect specific images and overlay 3D content on them. Built with HTML, CSS, JavaScript, and AR.js.

## 🌟 Features

- **Image Recognition**: Detects predefined AR markers (Hiro and Kanji)
- **3D Object Overlay**: Displays interactive 3D objects on detected markers
- **Real-time Camera Feed**: Uses device camera for live AR experience
- **Responsive Design**: Works on both desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations
- **Audio Feedback**: Plays success sounds when markers are detected

## 🚀 How to Use

### Prerequisites
- A modern web browser with camera support
- HTTPS connection (required for camera access)
- Mobile device recommended for best experience

### Getting Started

1. **Open the Application**
   - Open `index.html` in your web browser
   - For camera access, serve the files through a local server

2. **Start AR Experience**
   - Click the "Start AR Experience" button
   - Allow camera access when prompted
   - Point your camera at one of the sample markers

3. **Sample Markers**
   - **Hiro Marker**: Shows rotating cube, sphere, and cylinder
   - **Kanji Marker**: Displays 3D text and torus

### Running Locally

You can run this application using any local server. Here are a few options:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

**Using Live Server (VS Code Extension):**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then open `http://localhost:8000` in your browser.

## 📱 Mobile Experience

For the best AR experience:
- Use a mobile device with a rear-facing camera
- Ensure good lighting conditions
- Hold the device steady when scanning markers
- Keep markers flat and unobstructed

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: AR functionality and user interactions
- **AR.js**: Web-based augmented reality framework
- **A-Frame**: 3D web framework for VR/AR

### AR Markers
The application currently supports two preset markers:
- **Hiro Marker**: Standard AR.js marker with geometric shapes
- **Kanji Marker**: Japanese character marker with text and torus

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari (iOS)
- Edge

## 🎨 Customization

### Adding Custom Markers
You can add custom markers by modifying the HTML:

```html
<a-marker preset="custom" url="path/to/your/marker.patt">
    <a-box position="0 0.5 0" material="color: red;"></a-box>
</a-marker>
```

### Adding Custom 3D Objects
Use A-Frame entities to add 3D objects:

```html
<a-marker preset="hiro">
    <!-- Your custom 3D objects here -->
    <a-sphere position="0 1 0" radius="0.5" material="color: blue;"></a-sphere>
    <a-text value="Hello AR!" position="0 2 0"></a-text>
</a-marker>
```

### Styling Customization
Modify `styles.css` to customize the appearance:
- Change color schemes in CSS variables
- Adjust button styles and animations
- Modify layout and responsive breakpoints

## 🔧 Troubleshooting

### Common Issues

1. **Camera Not Working**
   - Ensure you're using HTTPS or localhost
   - Check browser permissions
   - Try refreshing the page

2. **Markers Not Detecting**
   - Ensure good lighting
   - Keep markers flat and unobstructed
   - Try different angles and distances

3. **Performance Issues**
   - Close other camera-using applications
   - Reduce browser window size
   - Use a device with better hardware

### Debug Mode
Open browser developer tools (F12) to see console messages and debug information.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new AR markers
- Improving the UI/UX
- Adding new 3D objects
- Optimizing performance
- Adding new features

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review browser console for error messages
3. Ensure all files are properly served
4. Test with different devices and browsers

---

**Enjoy exploring augmented reality! 🚀** 