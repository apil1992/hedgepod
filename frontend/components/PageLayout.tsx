/**
 * Animal Crossing-styled Page Layout Wrapper
 */

import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { Navigation } from './Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  showNavigation?: boolean;
}

export function PageLayout({ 
  children, 
  showBackground = true, 
  showFooter = true,
  showSidebar = true,
  showNavigation = true 
}: PageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navigation at top level - full width */}
      {showNavigation && <Navigation />}
      
      <main 
        className="relative flex-1 flex flex-col"
        style={showBackground ? {
          backgroundImage: 'url(/hedgepod_cherryblossmbackground.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        } : undefined}
      >
        {/* Overlay for better text readability */}
        {showBackground && (
          <div className="absolute inset-0 bg-cream/30 backdrop-blur-[2px]" />
        )}
        
        <div className="relative w-full flex-1" style={{ zIndex: 1 }}>
          {/* Sidebar - Fixed to left edge */}
          {showSidebar && (
            <div className="fixed left-0 top-[72px] h-[calc(100vh-72px)] z-20 hidden lg:block">
              <Sidebar />
            </div>
          )}
          
          {/* Main Content - With left margin for sidebar */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:pl-80">
            <div className="flex-1 min-w-0 relative" style={{ zIndex: 15 }}>
              {children}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer at the bottom */}
      {showFooter && <Footer />}
    </div>
  );
}

