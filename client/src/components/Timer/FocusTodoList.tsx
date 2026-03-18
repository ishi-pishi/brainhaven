import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Todo {
  id: string;
  text: string;
}

interface SortableTodoItemProps {
  todo: Todo;
  isFirst: boolean;
  onRemove: (id: string) => void;
}

function SortableTodoItem({ todo, isFirst, onRemove }: SortableTodoItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 bg-card ${isDragging ? "opacity-50 border-primary" : "border-border"
        } ${isFirst && !isDragging
          ? "scale-[1.02] shadow-md border-primary/40 bg-primary/5 py-4"
          : "hover:bg-accent/50"
        }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-muted p-1 rounded transition-colors"
        aria-label="Drag handle"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex-1 overflow-hidden">
        {isFirst && !isDragging && (
          <span className="text-[10px] uppercase font-bold text-primary tracking-wider block mb-1">
            Current Focus
          </span>
        )}
        <span
          className={`block truncate ${isFirst && !isDragging ? "font-bold text-lg text-primary" : "text-card-foreground"
            }`}
        >
          {todo.text}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
        onClick={() => onRemove(todo.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function FocusTodoList() {
  const [todos, setTodos] = useState<Todo[]>([
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
    };

    setTodos([...todos, newTodo]);
    setNewTaskText("");
  };

  const handleRemoveTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full max-w-sm bg-card/80 backdrop-blur-xl border border-border shadow-xl rounded-2xl overflow-hidden flex flex-col h-[400px]">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          Focus Session Tasks
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Drag to prioritize. The top task is your current focus.
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm italic border-2 border-dashed rounded-lg">
                  No tasks added yet. <br /> What's your focus for today?
                </div>
              ) : (
                todos.map((todo, index) => (
                  <SortableTodoItem
                    key={todo.id}
                    todo={todo}
                    isFirst={index === 0}
                    onRemove={handleRemoveTodo}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>

      <div className="p-4 bg-muted/20 border-t">
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <Input
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 bg-background"
          />
          <Button type="submit" size="icon" disabled={!newTaskText.trim()}>
            <Plus className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
