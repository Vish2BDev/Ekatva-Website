'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { detectWebGLSupport, shouldUseWebGL, WebGLCapabilities } from '@/lib/webgl-utils'
import OrbitalSystem from './OrbitalSystem'

// Dynamically import WebGL component (client-side only, no SSR)
const WebGLOrbit = dynamic(() => import('./WebGLOrbit'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-oneness-black flex items-center justify-center">
            <div className="text-mid-gray text-sm">Loading 3D Experience...</div>
        </div>
    ),
})

/**
 * OrbitalSystemSelector - Chooses between WebGL and SVG renderers
 * 
 * Features:
 * - Auto-detects WebGL/GPU capabilities
 * - Falls back to SVG on unsupported devices
 * - Shows renderer info in dev mode
 * - User can toggle between renderers
 */
export default function OrbitalSystemSelector() {
    const [renderer, setRenderer] = useState<'loading' | 'webgl' | 'svg'>('loading')
    const [capabilities, setCapabilities] = useState<WebGLCapabilities | null>(null)
    const [forceRenderer, setForceRenderer] = useState<'auto' | 'webgl' | 'svg'>('auto')

    // Detect WebGL support on mount
    useEffect(() => {
        const caps = detectWebGLSupport()
        setCapabilities(caps)

        // Determine which renderer to use
        if (forceRenderer !== 'auto') {
            setRenderer(forceRenderer)
        } else {
            setRenderer(shouldUseWebGL(caps) ? 'webgl' : 'svg')
        }
    }, [forceRenderer])

    // Loading state
    if (renderer === 'loading') {
        return (
            <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] bg-oneness-black flex items-center justify-center">
                <div className="text-mid-gray text-sm">Detecting capabilities...</div>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* Render appropriate system */}
            {renderer === 'webgl' ? <WebGLOrbit /> : <OrbitalSystem />}

            {/* Dev mode toggle (only in development) */}
            {process.env.NODE_ENV === 'development' && capabilities && (
                <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 bg-oneness-black/90 border border-divider-gray/30 rounded-lg p-3 text-xs">
                    <div className="text-light-gray font-mono">
                        <span className="text-mid-gray">GPU:</span> {capabilities.renderer.substring(0, 30)}
                    </div>
                    <div className="text-light-gray font-mono">
                        <span className="text-mid-gray">Perf:</span> {capabilities.performanceScore}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => setForceRenderer('svg')}
                            className={`px-2 py-1 rounded text-[10px] ${renderer === 'svg'
                                    ? 'bg-ekatva-teal text-oneness-black'
                                    : 'bg-divider-gray/30 text-light-gray'
                                }`}
                        >
                            SVG
                        </button>
                        <button
                            onClick={() => setForceRenderer('webgl')}
                            className={`px-2 py-1 rounded text-[10px] ${renderer === 'webgl'
                                    ? 'bg-ekatva-teal text-oneness-black'
                                    : 'bg-divider-gray/30 text-light-gray'
                                }`}
                        >
                            WebGL
                        </button>
                        <button
                            onClick={() => setForceRenderer('auto')}
                            className={`px-2 py-1 rounded text-[10px] ${forceRenderer === 'auto'
                                    ? 'bg-unity-gold text-oneness-black'
                                    : 'bg-divider-gray/30 text-light-gray'
                                }`}
                        >
                            Auto
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
