import {create} from "zustand"

interface MapStore {
    mapRef: any
    setMapRef: (ref: any) => void
}

export const useMapRefStore = create<MapStore>((set) => ({
    mapRef: null,
    setMapRef: (ref) => set({ mapRef: ref }),
}))