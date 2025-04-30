import { create } from "zustand";
import axios from "axios";

const api = axios.create({ baseURL: "http://82.147.85.20:8080/api" });

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface SpaceProps {
  id: number;
  space: string;
}

export interface TypeProps {
  id: number;
  type: string;
}

export interface Cloth {
  name: string;
  photoUrl: string;
  size: string;
  type: string;
  place: string;
}

export type ClothState = {
  spaceContainer: SpaceProps[];
  addSpace: (space: string) => void;
  getSpace: () => void;

  typeContainer: TypeProps[];
  addType: (type: string) => void;
  getType: () => void;

  name: string;
  photoUrl: string;
  size: string;
  type: string;
  place: string;
  setName: (name: string) => void;
  setPhotoUrl: (photoUrl: string) => void;
  setSize: (size: string) => void;
  setType: (type: string) => void;
  setPlace: (place: string) => void;

  clothes: Cloth[];
  addCloth: (cloth: Cloth) => void;
  getClothes: () => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export const useClothStore = create<ClothState>((set, get) => ({
  spaceContainer: [],
  addSpace: (space: string) => {
    api
      .post<SpaceProps>("/places", { space })
      .then((response) => {
        set((state) => ({
          spaceContainer: [...state.spaceContainer, response.data],
        }));
      })
      .catch((error) => {
        console.error("Failed to add space:", error);
        throw new Error("Ошибка при добавлении пространства");
      });
  },
  getSpace: () => {
    api
      .get<SpaceProps[]>("/places")
      .then((response) => {
        set({ spaceContainer: response.data });
      })
      .catch((error) => {
        console.error("Failed to get spaces:", error);
        throw new Error("Ошибка при получении пространств");
      });
  },

  typeContainer: [],
  addType: (type: string) => {
    api
      .post<TypeProps>("/cloth_types", { type })
      .then((response) => {
        set((state) => ({
          typeContainer: [...state.typeContainer, response.data],
        }));
      })
      .catch((error) => {
        console.error("Failed to add type:", error);
        throw new Error("Ошибка при добавлении типа");
      });
  },
  getType: () => {
    api
      .get<TypeProps[]>("/cloth_types")
      .then((response) => {
        set({ typeContainer: response.data });
      })
      .catch((error) => {
        console.error("Failed to get types:", error);
        throw new Error("Ошибка при получении типов");
      });
  },

  name: "",
  photoUrl: "",
  size: "",
  type: "",
  place: "",
  setName: (name: string) => set({ name }),
  setPhotoUrl: (photoUrl: string) => set({ photoUrl }),
  setSize: (size: string) => set({ size }),
  setType: (type: string) => set({ type }),
  setPlace: (place: string) => set({ place }),

  clothes: [],
  addCloth: (cloth: Cloth) =>
    set((state) => ({ clothes: [...state.clothes, cloth] })),
  getClothes: () => {
    api
      .get<Cloth[]>("/clothes")
      .then((response) => {
        set({ clothes: response.data });
      })
      .catch((error) => {
        console.error("Failed to fetch clothes:", error);
        throw new Error("Ошибка при получении одежды");
      });
  },
  handleSubmit: (e: React.FormEvent) => {
    e.preventDefault();

    const { name, photoUrl, size, type, place, addCloth } = get();

    if (!name || !photoUrl || !size || !type || !place) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const newCloth: Cloth = {
      name,
      photoUrl,
      size,
      type,
      place,
    };

    api
      .post("/clothes", newCloth)
      .then(() => {
        addCloth(newCloth); // Добавляем одежду в локальное состояние
        set({
          name: "",
          photoUrl: "",
          size: "",
          type: "",
          place: "",
        });
        console.log("Одежда успешно добавлена");
      })
      .catch((error) => {
        console.error("Failed to add cloth:", error);
        alert("Ошибка при добавлении одежды");
      });
  },
}));