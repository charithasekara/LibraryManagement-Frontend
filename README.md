# 📚 Library Management System

A modern, responsive library management system built with React and TypeScript, featuring an intuitive dashboard for efficient book management.

## ✨ Features

### 📊 Dashboard Overview
- Modern, clean interface with responsive design
- Sidebar navigation for easy access to different sections
- Real-time notifications for all actions

### 📚 Book Management

- **Add/Edit Books**:
  - User-friendly modal interface
  - Form validation
  - Interactive input fields with icons
  - Smooth transitions and animations

- **Delete Books**:
  - Confirmation modal
  - Safe deletion process
  - Visual feedback

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: TailwindCSS for modern, responsive design
- **Icons**: Lucide React icons
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Build Tool**: Vite

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Main dashboard
│   └── dashboard/      # Dashboard sections
│       ├── AddBookSection.tsx
│       ├── BooksSection.tsx
│       ├── AnalyticsSection.tsx
│       └── ActivitySection.tsx
├── types/             # TypeScript type definitions
└── assets/           # Static assets and images
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/charithasekara/LibraryManagement-Frontend.git
```

2. Navigate to project directory:
```bash
cd LibraryManagement-Frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Key Features Walkthrough

### Book Management
- **Search**: Real-time search across title, author, and description
- **Filters**: Quick access filters for book categories
- **CRUD Operations**:
  - Add new books with detailed information
  - Edit existing book details
  - Delete books with confirmation

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Hover states, transitions, and animations
- **Accessibility**: ARIA labels and semantic HTML
- **Error Handling**: Clear error messages and validations

## 🔧 Configuration

The application connects to a backend API at `https://localhost:7036`. Update the API URL in the appropriate configuration files if needed.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- React Team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Lucide for the beautiful icons