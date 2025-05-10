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

export interface PlaceProps {
  id: number;
  place: string;
}

export interface TypeProps {
  id: number;
  type: string;
}

export interface Cloth {
  id?: number;
  name: string;
  photoUrl: string;
  size: string;
  type: string;
  place: string;
}

export type ClothState = {
  placeContainer: PlaceProps[];
  addPlace: (place: string) => void;
  getPlace: () => void;
  editPlace: (id: number, place: string) => void;
  deletePlace: (id: number) => void;
  typeContainer: TypeProps[];
  addType: (type: string) => void;
  getType: () => void;
  editType: (id: number, type: string) => void;
  deleteType: (id: number) => void;

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
  editCloth: (id: number, cloth: Omit<Cloth, "id">) => void;
  deleteCloth: (id: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export const useClothStore = create<ClothState>((set, get) => ({
  placeContainer: [],
  editPlace: (id: number, place: string) => {
    api
      .put<PlaceProps>(`/places/${id}`, { place })
      .then((response) => {
        set((state) => ({
          placeContainer: state.placeContainer.map((item) =>
            item.id === id ? response.data : item
          ),
        }));
      })
      .catch((error) => {
        console.error("Failed to edit place:", error);
        throw new Error("Ошибка при редактировании пространства");
      });
  },
  deletePlace: (id: number) => {
    api
      .delete(`/places/${id}`)
      .then(() => {
        set((state) => ({
          placeContainer: state.placeContainer.filter((item) => item.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Failed to delete place:", error);
        throw new Error("Ошибка при удалении пространства");
      });
  },
  editType: (id: number, type: string) => {
    api
      .put<TypeProps>(`/cloth_types/${id}`, { type })
      .then((response) => {
        set((state) => ({
          typeContainer: state.typeContainer.map((item) =>
            item.id === id ? response.data : item
          ),
        }));
      })
      .catch((error) => {
        console.error("Failed to edit type:", error);
        throw new Error("Ошибка при редактировании типа");
      });
  },
  deleteType: (id: number) => {
    api
      .delete(`/cloth_types/${id}`)
      .then(() => {
        set((state) => ({
          typeContainer: state.typeContainer.filter((item) => item.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Failed to delete type:", error);
        throw new Error("Ошибка при удалении типа");
      });
  },
  addPlace: (place: string) => {
    api
      .post<PlaceProps>("/places", { place })
      .then((response) => {
        set((state) => ({
          placeContainer: [...state.placeContainer, response.data],
        }));
      })
      .catch((error) => {
        console.error("Failed to add place:", error);
        throw new Error("Ошибка при добавлении пространства");
      });
  },
  getPlace: () => {
    api
      .get<PlaceProps[]>("/places")
      .then((response) => {
        set({ placeContainer: response.data });
      })
      .catch((error) => {
        console.error("Failed to get places:", error);
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
      .then((response) => {
        addCloth(response.data); 
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
  editCloth: (id: number, cloth: Omit<Cloth, "id">) => {
    api
      .put<Cloth>(`/clothes/${id}`, cloth)
      .then((response) => {
        set((state) => ({
          clothes: state.clothes.map((item) =>
            item.id === id ? response.data : item
          ),
        }));
      })
      .catch((error) => {
        console.error("Failed to edit cloth:", error);
        throw new Error("Ошибка при редактировании одежды");
      });
  },

  deleteCloth: (id: number) => {
    api
      .delete(`/clothes/${id}`)
      .then(() => {
        set((state) => ({
          clothes: state.clothes.filter((item) => item.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Failed to delete cloth:", error);
        throw new Error("Ошибка при удалении одежды");
      });
  },
}));
