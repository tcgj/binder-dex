import type { CardRecord } from '../../data/mockCards'

export type BinderPresetId =
  | '4-pocket'
  | '9-pocket'
  | '12-pocket'
  | '16-pocket'
  | 'custom'

export type BinderConfig = {
  title: string
  preset: BinderPresetId
  rows: number
  columns: number
  pageCount: number
}

export type SlotAssignment = Record<string, string | null>

export type PageOverview = {
  pageIndex: number
  filledSlots: number
  totalSlots: number
}

export type SelectedSlotMeta = {
  pageIndex: number
  slotIndex: number
}

export type EditorMode = 'browse' | 'browse-preview' | 'selected-slot'

export type PageSlot = {
  slotId: string
  slotIndex: number
  cardId: string | null
}

export type EditorSidebarState = {
  config: BinderConfig
  filledSlots: number
  slotsPerPage: number
  totalSlotCount: number
  pageOverviews: PageOverview[]
  activePage: number
}

export type EditorWorkspaceState = {
  title: string
  activePage: number
  pageCount: number
  columns: number
  currentPageSlots: PageSlot[]
  slotAssignments: SlotAssignment
  cardsById: Record<string, CardRecord>
}

export type EditorActions = {
  setBinderPreset: (preset: BinderPresetId) => void
  setConfigField: <K extends keyof BinderConfig>(
    key: K,
    value: BinderConfig[K],
  ) => void
  assignCardToSlot: (slotId: string, cardId: string) => void
  clearSlotById: (slotId: string) => void
  goToPage: (pageIndex: number) => void
}

export type EditorController = {
  sidebar: EditorSidebarState
  workspace: EditorWorkspaceState
  actions: EditorActions
}
