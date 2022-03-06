import { DndProviderProps } from './utils/types';
import { DndStore } from './dnd-store';
export default function BuildDndProvider(props?: DndStore): (props: DndProviderProps) => JSX.Element;
