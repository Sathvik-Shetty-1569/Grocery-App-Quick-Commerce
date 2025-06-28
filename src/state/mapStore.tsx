import {create} from "zustand"

interface MapStore {
    mapRef: any
    setMapRef: (mapRef: any) => void
}

export const useMapRefStore = create<MapStore>((set) => ({
    mapRef: null,
    setMapRef: (ref) => set({ mapRef: ref }),
}))