'use client';

import dynamic from 'next/dynamic';

const ThreeDShowcase = dynamic(() => import('./ThreeDShowcase').then(mod => ({ default: mod.ThreeDShowcase })), {
  ssr: false,
  loading: () => (
    <div className='flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='animate-pulse text-gray-400'>Loading 3D Scene...</div>
    </div>
  ),
});

export function ThreeDShowcaseWrapper() {
  return (
    <div className='w-full h-[400px] md:h-[500px]'>
      <ThreeDShowcase />
    </div>
  );
}
