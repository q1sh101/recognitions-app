// ========================================
// PostCSS Configuration
// ========================================
// CSS processing pipeline for production builds

module.exports = {
  plugins: [
    // Autoprefixer - adds vendor prefixes for browser compatibility
    require('autoprefixer'),
    
    // PostCSS Custom Properties - enables CSS variables fallback
    require('postcss-custom-properties'),
  ],
};