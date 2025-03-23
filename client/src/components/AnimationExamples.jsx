import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AnimationExamples() {
  const [isTransformed, setIsTransformed] = useState(false);
  const [isTimingAnimating, setIsTimingAnimating] = useState(false);
  const [isKeyframesAnimating, setIsKeyframesAnimating] = useState(false);

  const toggleTransition = () => {
    setIsTransformed(!isTransformed);
  };

  const triggerTimingAnimation = () => {
    setIsTimingAnimating(true);
    // Reset after animation completes
    setTimeout(() => {
      setIsTimingAnimating(false);
    }, 1000);
  };

  const triggerKeyframesAnimation = () => {
    setIsKeyframesAnimating(false);
    // Force reflow
    setTimeout(() => {
      setIsKeyframesAnimating(true);
    }, 10);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-primary">Animation Examples</h2>
      
      <div className="space-y-4">
        {/* Transition Example */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium mb-2">Transition</h3>
          <div className="flex items-center gap-4">
            <div 
              className={`w-16 h-16 transition-all duration-500 ease-in-out ${
                isTransformed ? 
                'bg-secondary rounded-full scale-110' : 
                'bg-primary rounded-md scale-100'
              }`}
            ></div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTransition}
            >
              Trigger
            </Button>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Click to change color, size, and border-radius with transitions
          </div>
        </div>
        
        {/* Loader Example */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium mb-2">Loader</h3>
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
          </div>
        </div>
        
        {/* Timing Function Example */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium mb-2">Timing Functions</h3>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-2 items-center">
              <div 
                className={`w-4 h-4 bg-primary rounded transition-transform duration-1000 ease-linear ${
                  isTimingAnimating ? 'translate-x-24' : 'translate-x-0'
                }`}
              ></div>
              <span className="text-sm ml-32">linear</span>
            </div>
            <div className="flex gap-2 items-center">
              <div 
                className={`w-4 h-4 bg-secondary rounded transition-transform duration-1000 ease ${
                  isTimingAnimating ? 'translate-x-24' : 'translate-x-0'
                }`}
              ></div>
              <span className="text-sm ml-32">ease</span>
            </div>
            <div className="flex gap-2 items-center">
              <div 
                className={`w-4 h-4 bg-yellow-500 rounded transition-transform duration-1000 ease-in ${
                  isTimingAnimating ? 'translate-x-24' : 'translate-x-0'
                }`}
              ></div>
              <span className="text-sm ml-32">ease-in</span>
            </div>
            <div className="flex gap-2 items-center">
              <div 
                className={`w-4 h-4 bg-green-500 rounded transition-transform duration-1000 ease-out ${
                  isTimingAnimating ? 'translate-x-24' : 'translate-x-0'
                }`}
              ></div>
              <span className="text-sm ml-32">ease-out</span>
            </div>
            <div className="flex gap-2 items-center">
              <div 
                className={`w-4 h-4 bg-red-500 rounded transition-transform duration-1000 ease-in-out ${
                  isTimingAnimating ? 'translate-x-24' : 'translate-x-0'
                }`}
              ></div>
              <span className="text-sm ml-32">ease-in-out</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={triggerTimingAnimation} 
            disabled={isTimingAnimating}
            className="mt-3"
          >
            Animate
          </Button>
        </div>
        
        {/* Keyframes Example */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium mb-2">Keyframes</h3>
          <div className="flex justify-center">
            <div 
              className={`w-16 h-16 bg-indigo-500 rounded ${
                isKeyframesAnimating ? 'animate-[slideIn_0.5s_ease-out_forwards]' : ''
              }`}
              style={{ 
                animation: isKeyframesAnimating ? 'slideIn 0.5s ease-out forwards' : 'none',
                opacity: isKeyframesAnimating ? undefined : 0,
                transform: isKeyframesAnimating ? undefined : 'translateX(-20px)'
              }}
            ></div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={triggerKeyframesAnimation} 
            className="mt-3 mx-auto block"
          >
            Run Animation
          </Button>
          <style jsx>{`
            @keyframes slideIn {
              from {
                transform: translateX(-20px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
        
        {/* Infinite Animation Example */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-medium mb-2">Infinite Animation</h3>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-pink-500 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}