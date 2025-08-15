# Web Development Final Project - Stride

Submitted by: **Fatima Tanvir**

This web app: **A social platform for runners to share their experiences, connect with fellow runners, and discover new routes. Users can create posts about their runs, share photos, and interact with the running community.**

Time spent: **25** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time (newest/oldest)
    -  upvotes count (most cheers)
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page

The following **optional** features are implemented:

- [x] Users can customize the interface
  - Dark mode toggle for color scheme customization
  - Responsive design that adapts to different screen sizes
  - Modern UI with smooth animations and transitions
- [x] Users can add more characteristics to their posts
  - Users can add tags to categorize posts (Nutrition, Training, Gear, etc.)
  - Users can filter posts by categories on the home feed
  - Users can share external images via URL
- [x] Web app displays a loading animation whenever data is being fetched
  - Loading states for posts and comments
  - Smooth page transitions
  - Real-time updates with Supabase subscriptions

The following **additional** features are implemented:

- [x] **Real-time Updates**: Posts and comments update in real-time using Supabase subscriptions
- [x] **Masonry Layout**: Beautiful Pinterest-style grid layout for posts
- [x] **Advanced Search & Filtering**: Combined search and category filtering system
- [x] **Responsive Design**: Fully responsive design that works on desktop, tablet, and mobile
- [x] **Modern UI/UX**: Clean, modern interface with hover effects and smooth animations
- [x] **Date Formatting**: Smart relative time display (e.g., "2h ago", "5m ago")
- [x] **Category System**: Predefined categories for running-related content
- [x] **Comment System**: Full comment functionality with real-time updates
- [x] **Image Support**: External image URL support with proper display
- [x] **Sort Dropdown**: Elegant dropdown for sorting options integrated with filters

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

**Challenges encountered while building the app:**

1. **Database Schema Design**: Initially struggled with the correct column names and relationships between posts and comments tables. Had to ensure consistency between `upvotes_count` vs `cheers_count` and proper foreign key relationships.

2. **Real-time Subscriptions**: Implementing real-time updates with Supabase was challenging, especially handling different event types (INSERT, UPDATE, DELETE) and ensuring the UI updates correctly without conflicts.

3. **Dark Mode Implementation**: Ensuring consistent dark mode styling across all components, especially for custom-styled elements like the search bar and dropdown menus, required careful attention to CSS variables and theme context.

4. **Masonry Layout**: Creating a responsive masonry grid that works well with dynamic content and maintains proper spacing across different screen sizes required significant CSS adjustments.

5. **State Management**: Managing complex state for filtering, sorting, and real-time updates while maintaining good performance and user experience was a key challenge.

6. **Date Handling**: Implementing robust date formatting that handles edge cases (invalid dates, missing timestamps) and provides user-friendly relative time display.

## Technologies Used

- **Frontend**: React 19, Vite, CSS3
- **Backend**: Supabase (PostgreSQL database, real-time subscriptions)
- **Styling**: CSS Grid, Flexbox, CSS Variables for theming
- **Deployment**: Ready for deployment on Netlify/Vercel

## License

    Copyright 2024 Fatima Tanvir

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
