import { create } from 'zustand'
import { PLANET_CONFIGS, PlanetConfig } from '@/data/planets'
import { calculateOrbitalPosition, OrbitalPosition } from '@/lib/orbital-math'

/**
 * Planet runtime state (extends config with position)
 */
export interface PlanetState extends PlanetConfig {
    position: OrbitalPosition
    currentAngle: number
}

/**
 * Orbital system view modes
 */
export type ViewMode = 'orbit' | 'planet-expanded'

/**
 * Orbital store state
 */
interface OrbitalState {
    // Data
    planets: PlanetState[]

    // View state
    viewMode: ViewMode
    activePlanetId: string | null
    hoveredPlanetId: string | null
    isAnimating: boolean

    // Responsive
    orbitScale: number
    planetSize: number
    centerPosition: { x: number; y: number }

    // Actions
    setHoveredPlanet: (id: string | null) => void
    setActivePlanet: (id: string | null) => void
    updatePlanetAngle: (id: string, angle: number) => void
    updatePlanetPosition: (id: string, position: OrbitalPosition) => void
    setIsAnimating: (isAnimating: boolean) => void
    setOrbitScale: (scale: number) => void
    setPlanetSize: (size: number) => void
    setCenterPosition: (x: number, y: number) => void
    closePanel: () => void
}

// Initialize planets with starting positions
const initializePlanets = (): PlanetState[] => {
    return PLANET_CONFIGS.map((config) => {
        const position = calculateOrbitalPosition(
            config.orbital.radius,
            config.orbital.angle,
            config.orbital.eccentricity
        )
        return {
            ...config,
            position,
            currentAngle: config.orbital.angle,
        }
    })
}

/**
 * Zustand store for orbital system state
 */
export const useOrbitalStore = create<OrbitalState>((set) => ({
    // Initial state
    planets: initializePlanets(),
    viewMode: 'orbit',
    activePlanetId: null,
    hoveredPlanetId: null,
    isAnimating: true,
    orbitScale: 1,
    planetSize: 100,
    centerPosition: { x: 400, y: 400 },

    // Actions
    setHoveredPlanet: (id) =>
        set({ hoveredPlanetId: id }),

    setActivePlanet: (id) =>
        set({
            activePlanetId: id,
            viewMode: id ? 'planet-expanded' : 'orbit',
            // Pause animation when panel is open
            isAnimating: !id,
        }),

    updatePlanetAngle: (id, angle) =>
        set((state) => ({
            planets: state.planets.map((p) =>
                p.id === id ? { ...p, currentAngle: angle } : p
            ),
        })),

    updatePlanetPosition: (id, position) =>
        set((state) => ({
            planets: state.planets.map((p) =>
                p.id === id ? { ...p, position } : p
            ),
        })),

    setIsAnimating: (isAnimating) =>
        set({ isAnimating }),

    setOrbitScale: (scale) =>
        set({ orbitScale: scale }),

    setPlanetSize: (size) =>
        set({ planetSize: size }),

    setCenterPosition: (x, y) =>
        set({ centerPosition: { x, y } }),

    closePanel: () =>
        set({
            activePlanetId: null,
            viewMode: 'orbit',
            isAnimating: true,
        }),
}))
