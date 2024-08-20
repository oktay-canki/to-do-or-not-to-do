import { useDNDStore } from "../../stores/dndStore";
import DNDListItem from "./DNDListItem";

interface ListProps<T> {
  listId: string;
  items: T[];
  getItemId: (item: T) => string;
  itemRender: (item: T) => React.ReactNode;
  handleDrop: (destinationListId: string, index?: number) => void;
  listStyle?: React.CSSProperties;
  listDragOverStyle?: React.CSSProperties;
  itemDragBorder?: string;
  itemDragOverBorder?: string;
  className?: string;
  liClassName?: string;
  onItemClick?: (item: T) => void;
}

const DNDList = <T,>({
  listId,
  items,
  getItemId,
  itemRender,
  handleDrop,
  listStyle = {},
  listDragOverStyle,
  itemDragBorder,
  itemDragOverBorder,
  className,
  liClassName,
  onItemClick,
}: ListProps<T>) => {
  const {
    sourceListId,
    draggedItemId,
    dragOverListId,
    dragOverItemId,
    setDragOver,
    onDragEnd,
    isDragActive,
  } = useDNDStore();
  const isOwnDrag = sourceListId === listId;

  return (
    <ul
      className={className}
      style={{
        listStyleType: "none",
        ...listStyle,
        ...(!isOwnDrag && listId === dragOverListId ? listDragOverStyle : {}),
      }}
      onDragEnter={(e) => {
        setDragOver(listId, null);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setDragOver(null, null);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e: React.DragEvent<HTMLUListElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onDragEnd();
        handleDrop(listId);
      }}
    >
      {items.map((item, index) => {
        const itemId = getItemId(item);

        return (
          <DNDListItem
            className={liClassName}
            key={index}
            listId={listId}
            itemId={itemId}
            index={index}
            isDragging={isDragActive && isOwnDrag && itemId === draggedItemId}
            isDragOverItem={
              dragOverListId === listId && dragOverItemId === itemId
            }
            handleDrop={handleDrop}
            dragBorder={itemDragBorder}
            dragOverBorder={itemDragOverBorder}
            onClick={() => {
              if (onItemClick) onItemClick(item);
            }}
          >
            {itemRender(item)}
          </DNDListItem>
        );
      })}
    </ul>
  );
};

export default DNDList;
