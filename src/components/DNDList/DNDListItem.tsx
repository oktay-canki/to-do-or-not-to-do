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
  className?: string;
  onClick: () => void;
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
  className,
  onClick,
}: React.PropsWithChildren<DNDListItemProps>) => {
  const { onDragStart, clearDND, onDragEnd, setDragOver } = useDNDStore();

  return (
    <li
      className={className}
      style={{
        boxSizing: "border-box",
        borderLeft: "4px solid",
        borderBottom: "2px solid",
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
      onClick={onClick}
    >
      <hr
        style={{
          width: "100%",
          border: "1px solid",
          margin: "0 auto",
          marginBottom: "5px",
          padding: 0,
          borderColor:
            !isDragging && isDragOverItem ? dragOverBorder : "transparent",
          borderRadius: "5px",
        }}
      />
      {children}
    </li>
  );
};

export default DNDListItem;
