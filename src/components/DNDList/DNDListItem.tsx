import { useDNDStore } from "../../stores/dndStore";

type DNDListItemProps = {
  listId: string;
  itemId: string;
  index: number;
  isDragging: boolean;
  isDragOverItem: boolean;
  handleDrop: (destinationListId: string, index?: number) => void;
  dragBorder?: string;
  dragOverBorder?: string;
};

const DNDListItem = ({
  children,
  listId,
  itemId,
  index,
  isDragging,
  isDragOverItem,
  handleDrop,
  dragBorder,
  dragOverBorder,
}: React.PropsWithChildren<DNDListItemProps>) => {
  const { onDragStart, clearDND, onDragEnd, setDragOver } = useDNDStore();

  return (
    <li
      className={!isDragging && isDragOverItem ? "dragover-item" : ""}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        border: "2px solid",
        borderColor: "transparent",
        borderLeftColor: isDragging ? dragBorder : "transparent",
        opacity: isDragging ? 0.75 : 1,
      }}
      draggable
      onDragStart={(e) => {
        onDragStart(listId, itemId);
      }}
      onDragEnd={(e) => {
        onDragEnd();
      }}
      onDragOver={(e) => {
        setDragOver(listId, itemId);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setDragOver(listId, null);
        }
      }}
      onDrop={(e: React.DragEvent<HTMLLIElement>) => {
        e.stopPropagation();
        if (isDragging) {
          // Item dropped on itself
          clearDND();
          return;
        }
        handleDrop(listId, index);
      }}
    >
      {!isDragging && isDragOverItem && (
        <hr
          style={{
            width: "90%",
            border: "1px solid",
            margin: 0,
            padding: 0,
            borderColor: dragOverBorder,
          }}
        />
      )}
      {children}
    </li>
  );
};

export default DNDListItem;
