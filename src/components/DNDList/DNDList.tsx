import { useDNDStore } from "../../stores/dndStore";
import DNDListItem from "./DNDListItem";

interface ListProps<T> {
  listId: string;
  items: T[];
  getItemId: (item: T) => string;
  itemRender: (item: T) => React.ReactNode;
  handleDrop: (destinationListId: string, index?: number) => void;
  listStyle: React.CSSProperties;
  listDragOverStyle: React.CSSProperties;
  itemDragBorder?: string;
  itemDragOverBorder?: string;
}

const DNDList = <T,>({
  listId,
  items,
  getItemId,
  itemRender,
  handleDrop,
  listStyle,
  listDragOverStyle,
  itemDragBorder,
  itemDragOverBorder,
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
      className="dnd-list"
      style={{
        listStyleType: "none",
        padding: "10px 0px",
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
          >
            {itemRender(item)}
          </DNDListItem>
        );
      })}
    </ul>
  );
};

export default DNDList;
