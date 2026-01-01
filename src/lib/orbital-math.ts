/**
 * Orbital Math Utilities
 * 
 * Pure functions for calculating orbital positions
 * Used by the animation hook to update planet positions
 */

export interface OrbitalPosition {
    x: number
    y: number
}

/**
 * Calculate position on an elliptical orbit
 * @param radius - Base orbital radius
 * @param angle - Current angle in radians
 * @param eccentricity - 0 = circle, higher = more elliptical
 * @returns {x, y} position relative to center (0, 0)
 */
export function calculateOrbitalPosition(
    radius: number,
    angle: number,
    eccentricity: number = 0
): OrbitalPosition {
    // Elliptical orbit: x-axis is stretched by (1 + eccentricity)
    // y-axis is compressed by (1 - eccentricity/2)
    const a = radius * (1 + eccentricity * 0.5) // Semi-major axis
    const b = radius * (1 - eccentricity * 0.3) // Semi-minor axis

    const x = a * Math.cos(angle)
    const y = b * Math.sin(angle)

    return { x, y }
}

/**
 * Update angle based on speed and delta time
 * @param currentAngle - Current angle in radians
 * @param speed - Angular velocity (radians per second)
 * @param deltaTime - Time elapsed in seconds
 * @returns New angle in radians
 */
export function updateAngle(
    currentAngle: number,
    speed: number,
    deltaTime: number
): number {
    const newAngle = currentAngle + speed * deltaTime
    // Keep angle in 0-2π range
    return newAngle % (2 * Math.PI)
}

/**
 * Convert relative coordinates to viewport coordinates
 * @param x - Relative x position
 * @param y - Relative y position
 * @param centerX - Center x in viewport
 * @param centerY - Center y in viewport
 * @returns Viewport coordinates
 */
export function toViewportCoords(
    x: number,
    y: number,
    centerX: number,
    centerY: number
): OrbitalPosition {
    return {
        x: centerX + x,
        y: centerY + y,
    }
}

/**
 * Calculate scale factor based on viewport width
 * @param viewportWidth - Current viewport width
 * @returns Scale multiplier for orbits
 */
export function calculateOrbitScale(viewportWidth: number): number {
    if (viewportWidth < 768) return 0.4 // Mobile
    if (viewportWidth < 1024) return 0.6 // Tablet
    if (viewportWidth < 1280) return 0.8 // Small desktop
    return 1 // Large desktop
}

/**
 * Calculate planet size based on viewport width
 * @param viewportWidth - Current viewport width
 * @returns Planet diameter in pixels
 */
export function calculatePlanetSize(viewportWidth: number): number {
    if (viewportWidth < 768) return 60 // Mobile
    if (viewportWidth < 1024) return 80 // Tablet
    return 100 // Desktop
}
