'use client'

/**
 * WebGL Support Detection Utilities
 * 
 * Detects WebGL support and GPU performance
 * Provides fallback decision logic
 */

export interface WebGLCapabilities {
    webglSupported: boolean
    webgl2Supported: boolean
    renderer: string
    vendor: string
    performanceScore: 'high' | 'medium' | 'low' | 'unsupported'
}

/**
 * Detect WebGL support and GPU capabilities
 */
export function detectWebGLSupport(): WebGLCapabilities {
    // Server-side rendering check
    if (typeof window === 'undefined') {
        return {
            webglSupported: false,
            webgl2Supported: false,
            renderer: 'unknown',
            vendor: 'unknown',
            performanceScore: 'unsupported',
        }
    }

    try {
        const canvas = document.createElement('canvas')

        // Check WebGL 2 first
        const gl2 = canvas.getContext('webgl2') as WebGL2RenderingContext | null
        const gl1 = canvas.getContext('webgl') as WebGLRenderingContext | null
        const glExperimental = canvas.getContext('experimental-webgl') as WebGLRenderingContext | null

        const gl = gl2 || gl1 || glExperimental

        if (!gl) {
            return {
                webglSupported: false,
                webgl2Supported: false,
                renderer: 'none',
                vendor: 'none',
                performanceScore: 'unsupported',
            }
        }

        // Get GPU info
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        let renderer = 'unknown'
        let vendor = 'unknown'

        if (debugInfo) {
            renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
            vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string
        }

        // Estimate performance based on GPU
        const performanceScore = estimatePerformance(renderer, vendor)

        return {
            webglSupported: true,
            webgl2Supported: !!gl2,
            renderer,
            vendor,
            performanceScore,
        }
    } catch {
        return {
            webglSupported: false,
            webgl2Supported: false,
            renderer: 'error',
            vendor: 'error',
            performanceScore: 'unsupported',
        }
    }
}

/**
 * Estimate GPU performance based on renderer string
 */
function estimatePerformance(renderer: string, vendor: string): 'high' | 'medium' | 'low' | 'unsupported' {
    const rendererLower = renderer.toLowerCase()
    const vendorLower = vendor.toLowerCase()

    // High-end GPUs
    if (
        rendererLower.includes('nvidia') ||
        rendererLower.includes('radeon') ||
        rendererLower.includes('geforce') ||
        rendererLower.includes('rtx') ||
        rendererLower.includes('gtx') ||
        rendererLower.includes('apple m1') ||
        rendererLower.includes('apple m2') ||
        rendererLower.includes('apple m3')
    ) {
        return 'high'
    }

    // Medium GPUs (Intel integrated, decent mobile)
    if (
        rendererLower.includes('intel') ||
        rendererLower.includes('iris') ||
        rendererLower.includes('adreno 6') ||
        rendererLower.includes('mali-g')
    ) {
        return 'medium'
    }

    // Low-end (older mobile, software rendering)
    if (
        rendererLower.includes('adreno 5') ||
        rendererLower.includes('mali-4') ||
        rendererLower.includes('swiftshader') ||
        rendererLower.includes('software') ||
        vendorLower.includes('microsoft')
    ) {
        return 'low'
    }

    // Default to medium if unknown
    return 'medium'
}

/**
 * Should we use WebGL based on capabilities?
 */
export function shouldUseWebGL(capabilities: WebGLCapabilities): boolean {
    // Must have WebGL support
    if (!capabilities.webglSupported) return false

    // Only use on high/medium performance GPUs
    return capabilities.performanceScore === 'high' || capabilities.performanceScore === 'medium'
}

/**
 * Check for reduced motion preference
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
