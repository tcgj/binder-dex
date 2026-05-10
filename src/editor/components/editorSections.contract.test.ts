import type { CardRecord } from '../../data/mockCards'
import type {
  EditorSidebarState,
  PageSlot,
  SelectedSlotMeta,
} from '../core/types'
import type {
  EditorCardsSectionProps,
  EditorMainContentProps,
  EditorToolsSectionProps,
} from './EditorSections'

const sidebar: EditorSidebarState = {
  config: {
    title: 'Trade binder',
    preset: '9-pocket',
    rows: 3,
    columns: 3,
    pageCount: 12,
  },
  filledSlots: 4,
  slotsPerPage: 9,
  pageOverviews: [{ pageIndex: 0, filledSlots: 4, totalSlots: 9 }],
  activePage: 0,
}

const slots: PageSlot[] = [
  {
    slotId: 'slot-0-0',
    slotIndex: 0,
    cardId: null,
  },
]

const selectedSlotMeta: SelectedSlotMeta = {
  pageIndex: 0,
  slotIndex: 0,
}

export const editorMainContentContract = {
  workspace: {
    title: 'Trade binder',
    activePage: 0,
    pageCount: 12,
    columns: 3,
    currentPageSlots: slots,
    cardsById: {} as Record<string, CardRecord>,
  },
  selectedSlot: {
    id: 'slot-0-0',
    select: () => undefined,
  },
  display: {
    showSlotDetails: true,
  },
  slotActions: {
    clearSlotById: () => undefined,
  },
} satisfies EditorMainContentProps

export const editorToolsSectionContract = {
  sidebar,
  controls: {
    isOpen: true,
    isCardsPanelOpen: false,
    close: () => undefined,
    toggle: () => undefined,
  },
  binderSettings: {
    setPreset: () => undefined,
    setConfigField: () => undefined,
  },
  pageNavigation: {
    goToPage: () => undefined,
  },
} satisfies EditorToolsSectionProps

export const editorCardsSectionContract = {
  selectedSlot: {
    id: 'slot-0-0',
    meta: selectedSlotMeta,
    currentCardId: null,
  },
  cardsById: {} as Record<string, CardRecord>,
  controls: {
    isOpen: true,
    isToolsPanelOpen: false,
    close: () => undefined,
    toggle: () => undefined,
  },
  cardAssignment: {
    assignCardToSlot: () => undefined,
    clearSelectedSlot: () => undefined,
  },
} satisfies EditorCardsSectionProps

export function assertEditorSectionContracts() {
  return {
    mainContent: editorMainContentContract,
    toolsSection: editorToolsSectionContract,
    cardsSection: editorCardsSectionContract,
  }
}
