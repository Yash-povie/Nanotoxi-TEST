# NanoToxi AI Frontend

A modern, clean, and minimalistic frontend for NanoToxi AI - an AI-powered platform for predicting nanoparticle toxicity and cytotoxicity.

## 🚀 Features

- **Modern UI/UX**: Glassmorphism design with green theme
- **Dynamic Forms**: Conditional field visibility based on user input
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Vue 3 + TypeScript**: Latest Vue.js with Composition API
- **Mock API Integration**: Ready for backend integration
- **Accessibility**: WCAG compliant with proper ARIA labels

## 📋 Pages

1. **Landing Page** (`/`) - Hero section with glassmorphism effects and feature cards
2. **Prediction Page** (`/predict`) - Dynamic form for nanoparticle toxicity prediction
3. **About Page** (`/about`) - Company information and team members
4. **Contact Page** (`/contact`) - Contact form with validation

## 🛠 Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: Vue Router
- **Icons**: Custom SVG components
- **Forms**: Native HTML5 validation + custom validation

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: `#16a34a` (Green 600)
- **Secondary**: `#22c55e` (Green 500) 
- **Accent**: `#86efac` (Green 300)
- **Background**: Gradient from Green 50 to Green 100

### Components
- **FormCard**: Glassmorphism effect container
- **InputField**: Styled form inputs with validation
- **SelectField**: Custom select dropdowns
- **FeatureCard**: Landing page feature cards
- **ResultCard**: Prediction results display
- **TeamMemberCard**: About page team member cards

## 🔧 Dynamic Form Behavior

The prediction form includes smart conditional logic:

- When **Hydrodynamic Diameter** has a value → hides Temperature and pH fields
- When **Hydrodynamic Diameter** is empty → shows Temperature and pH fields
- Smooth transitions for better UX

## 🔌 API Integration

### Current Mock Service

Located in `src/services/mockApi.ts`, provides realistic mock responses for development.

### Real API Integration

Replace the mock service calls with actual API endpoints:

```typescript
// In src/services/mockApi.ts
export const predictionService = {
  async predict(data: PredictionRequest): Promise<PredictionResponse> {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_API_KEY}`
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error('Prediction failed')
    }
    
    return response.json()
  }
}
```

### Environment Variables

Create `.env` file for API configuration:

```env
VITE_API_BASE_URL=https://api.nanotoxi.com
VITE_API_KEY=your-api-key-here
```

## 📱 Mock API Response Format

```json
{
  "toxicity": "Toxic" | "Non-Toxic",
  "cytotoxicityEffects": [
    "Reactive oxygen species (ROS) ↑",
    "Cell membrane disruption",
    "Mitochondrial dysfunction"
  ],
  "confidence": 0.78,
  "keyDrivers": [
    "High dosage",
    "Extended exposure",
    "Small core size"
  ],
  "citations": [
    {
      "title": "Machine learning prediction of nanoparticle toxicity",
      "journal": "Nature Nanotechnology", 
      "year": 2023
    }
  ]
}
```

## 🎯 Form Fields

### Required Fields
- Core Size (nm)
- Zeta Potential (mV) 
- Surface Area (m²/g)
- Bandgap Energy (eV)
- Number of Oxygen Atoms
- Dosage (µg/mL)
- Exposure Time (hours)
- Protein Corona (dropdown)

### Conditional Fields
- **Temperature (°C)** - shown when Hydrodynamic Diameter is empty
- **Environmental pH** - shown when Hydrodynamic Diameter is empty

### Optional Fields  
- Nanoparticle ID
- Hydrodynamic Diameter (nm)

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

```bash
# Build for production
npm run build

# The dist/ folder contains the built application
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For questions about the codebase, contact the development team at dev@nanotoxi.com