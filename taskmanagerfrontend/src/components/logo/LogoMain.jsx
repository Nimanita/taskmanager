// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    
    <svg width="118" height="35" viewBox="0 0 118 35" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="todoHeroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#1E88E5', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#1565C0', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* Background rectangle */}
      <rect x="0" y="0" width="35" height="35" rx="5" ry="5" fill="url(#todoHeroGradient)" />
      
      {/* Checkmark */}
      <path d="M7 17 L15 25 L28 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* TodoHero text */}
      <text x="40" y="24" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#1565C0">TodoHero</text>
    </svg>

  );
};

export default Logo;
