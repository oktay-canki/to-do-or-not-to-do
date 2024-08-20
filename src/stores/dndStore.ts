import { create } from "zustand";
import { strOrNull } from "../types/common";

type DNDState = {
  draggedItemId: strOrNull;
  sourceListId: strOrNull;
  dragOverListId: strOrNull;
  dragOverItemId: strOrNull;
  isDragActive: boolean;
};

type DNDActions = {
  onDragStart: (itemId: string, sourceListId: string) => void;
  setDragOver: (listId: strOrNull, itemId: strOrNull) => void;
  onDragEnd: () => void;
  clearDND: () => void;
};

export const useDNDStore = create<DNDState & DNDActions>((set) => ({
  draggedItemId: null,
  sourceListId: null,
  dragOverListId: null,
  dragOverItemId: null,
  isDragActive: false,
  onDragStart: (sourceListId, itemId) =>
    set({
      draggedItemId: itemId,
      sourceListId: sourceListId,
      isDragActive: true,
    }),
  onDragEnd: () => {
    set({
      dragOverListId: null,
      dragOverItemId: null,
      isDragActive: false,
    });
  },
  clearDND: () =>
    set({
      draggedItemId: null,
      sourceListId: null,
      dragOverListId: null,
      dragOverItemId: null,
      isDragActive: false,
    }),
  setDragOver: (listId, itemId) =>
    set({ dragOverListId: listId, dragOverItemId: itemId }),
}));
