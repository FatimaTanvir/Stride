# Stride - Running Community Forum

A modern, responsive web application for runners to share experiences, connect with fellow athletes, and discover new routes. Built with React, Supabase, and modern web technologies.

## 🏃‍♀️ Features

### Core Functionality
- **Post Creation**: Create posts with titles, content, images, and tags
- **Post Feed**: Pinterest-style masonry layout displaying all posts
- **Post Details**: Full post view with comments and interactions
- **Search & Filter**: Find posts by title and filter by categories
- **Sorting**: Sort posts by newest, oldest, or most cheers
- **Comments**: Add and view comments on posts
- **Cheers System**: Like posts with a "cheer" instead of traditional likes

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Smooth Animations**: Page transitions and hover effects
- **Masonry Layout**: Pinterest-style grid that adapts to content
- **Tag System**: Categorized tags for easy content discovery

### Technical Features
- **Modern React**: Built with React 19 and latest hooks
- **Client-Side Routing**: Smooth navigation with React Router
- **State Management**: Context API for theme management
- **CSS Variables**: Dynamic theming system
- **Responsive CSS**: Mobile-first design approach

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router DOM
- **Styling**: Custom CSS with CSS Variables
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Deployment**: Ready for Netlify
- **Development**: ESLint, Hot Module Replacement

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stride
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CategoryFilter.jsx
│   ├── DarkModeToggle.jsx
│   ├── MasonryGrid.css
│   ├── Navbar.jsx
│   └── PageTransition.jsx
├── contexts/           # React Context providers
│   └── ThemeContext.jsx
├── pages/             # Main application pages
│   ├── CreatePost.jsx
│   ├── Home.jsx
│   ├── Landing.jsx
│   └── PostDetail.jsx
├── utils/             # Utility functions
│   └── dateUtils.js
├── App.jsx            # Main app component
├── App.css            # App-specific styles
├── index.css          # Global styles
└── main.jsx           # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: `#4f46e5` (Indigo)
- **Secondary**: `#10b981` (Emerald)
- **Background Light**: `#ffffff`
- **Background Dark**: `#1f2937`
- **Text Light**: `#1f2937`
- **Text Dark**: `#f9fafb`

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Font Sizes**: Responsive scale from 14px to 48px
- **Line Height**: 1.6 for optimal readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Hover effects with transform animations
- **Forms**: Clean inputs with focus states
- **Tags**: Pill-shaped with category colors

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up the following tables:
   ```sql
   -- Posts table
   CREATE TABLE posts (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT,
     image_url TEXT,
     tags TEXT[],
     cheers_count INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Comments table
   CREATE TABLE comments (
     id SERIAL PRIMARY KEY,
     post_id INTEGER REFERENCES posts(id),
     author TEXT NOT NULL,
     content TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful running images
- **React Team** for the amazing framework
- **Supabase** for the backend-as-a-service
- **Vite** for the fast build tool

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Running! 🏃‍♂️💨**
