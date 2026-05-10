import { useEditorState } from './useEditorState'
import type { SelectedSlotMeta } from '../core/types'

type PanelState = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

type SelectedSlotState = {
  id: string | null
  meta: SelectedSlotMeta | null
  currentCardId: string | null
  select: (slotId: string) => void
  clear: () => void
}

type EditorState = ReturnType<typeof useEditorState>

export function assertEditorStateContract(state: EditorState) {
  const page: { activePage: number } = state.page
  const toolsPanel: PanelState = state.toolsPanel
  const cardsPanel: PanelState = state.cardsPanel
  const selectedSlot: SelectedSlotState = state.selectedSlot

  return {
    page,
    toolsPanel,
    cardsPanel,
    selectedSlot,
  }
}
