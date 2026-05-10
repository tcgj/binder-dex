import type { CardRecord } from '../../data/mockCards'
import type {
  BinderConfig,
  BinderPresetId,
  EditorSidebarState,
  SelectedSlotMeta,
} from '../core/types'
import type { CardsPanelProps } from './CardsPanel'
import type { ToolsPanelProps } from './ToolsPanel'

type LooseToolsPanelProps = Extract<
  keyof ToolsPanelProps,
  | 'isOpen'
  | 'isCardsPanelOpen'
  | 'onClose'
  | 'onToggle'
  | 'onPresetChange'
  | 'onConfigChange'
  | 'onPageChange'
>

type LooseCardsPanelProps = Extract<
  keyof CardsPanelProps,
  | 'isOpen'
  | 'isToolsPanelOpen'
  | 'onClose'
  | 'onToggle'
  | 'onAssignCardToSlot'
  | 'onClearSlot'
>

type NoLooseToolsPanelProps = LooseToolsPanelProps extends never ? true : never

type NoLooseCardsPanelProps = LooseCardsPanelProps extends never ? true : never

const config: BinderConfig = {
  title: 'Trade binder',
  preset: '9-pocket',
  rows: 3,
  columns: 3,
  pageCount: 12,
}

const sidebar: EditorSidebarState = {
  config,
  filledSlots: 4,
  slotsPerPage: 9,
  pageOverviews: [{ pageIndex: 0, filledSlots: 4, totalSlots: 9 }],
  activePage: 0,
}

const selectedSlotMeta: SelectedSlotMeta = {
  pageIndex: 0,
  slotIndex: 3,
}

const setConfigField = (() => undefined) as <K extends keyof BinderConfig>(
  key: K,
  value: BinderConfig[K],
) => void

export const toolsPanelPropsContract = {
  sidebar,
  controls: {
    isOpen: true,
    isCardsPanelOpen: false,
    close: () => undefined,
    toggle: () => undefined,
  },
  binderSettings: {
    setPreset: (() => undefined) as (preset: BinderPresetId) => void,
    setConfigField,
  },
  pageNavigation: {
    goToPage: () => undefined,
  },
} satisfies ToolsPanelProps

export const cardsPanelPropsContract = {
  selectedSlot: {
    id: 'slot-0-3',
    meta: selectedSlotMeta,
    currentCardId: 'card-1',
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
} satisfies CardsPanelProps

export function assertEditorPanelPropOwnershipContracts() {
  const toolsPanelHasNoLooseCallbacks: NoLooseToolsPanelProps = true
  const cardsPanelHasNoLooseCallbacks: NoLooseCardsPanelProps = true

  return {
    toolsPanelHasNoLooseCallbacks,
    cardsPanelHasNoLooseCallbacks,
    toolsPanelGroups: {
      controls: toolsPanelPropsContract.controls,
      binderSettings: toolsPanelPropsContract.binderSettings,
      pageNavigation: toolsPanelPropsContract.pageNavigation,
    },
    cardsPanelGroups: {
      controls: cardsPanelPropsContract.controls,
      selectedSlot: cardsPanelPropsContract.selectedSlot,
      cardAssignment: cardsPanelPropsContract.cardAssignment,
    },
  }
}
