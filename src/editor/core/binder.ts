import type { CardRecord } from '../../data/mockCards'
import type {
  BinderConfig,
  BinderPresetId,
  PageOverview,
  PageSlot,
  SelectedSlotMeta,
  SlotAssignment,
} from './types'

export const binderPresets: Record<
  Exclude<BinderPresetId, 'custom'>,
  { label: string; rows: number; columns: number }
> = {
  '4-pocket': {
    label: '4-pocket',
    rows: 2,
    columns: 2,
  },
  '9-pocket': {
    label: '9-pocket',
    rows: 3,
    columns: 3,
  },
  '12-pocket': {
    label: '12-pocket',
    rows: 3,
    columns: 4,
  },
  '16-pocket': {
    label: '16-pocket',
    rows: 4,
    columns: 4,
  },
}

export const defaultConfig: BinderConfig = {
  title: 'My Virtual Binder',
  preset: '9-pocket',
  rows: 3,
  columns: 3,
  pageCount: 6,
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export function applyBinderPreset(
  config: BinderConfig,
  preset: BinderPresetId,
): BinderConfig {
  if (preset === 'custom') {
    return {
      ...config,
      preset,
    }
  }

  const nextPreset = binderPresets[preset]

  return {
    ...config,
    preset,
    rows: nextPreset.rows,
    columns: nextPreset.columns,
  }
}

export function getSlotId(pageIndex: number, slotIndex: number) {
  return `page-${pageIndex}-slot-${slotIndex}`
}

export function createSlotAssignments(config: BinderConfig): SlotAssignment {
  const assignments: SlotAssignment = {}
  const slotsPerPage = getSlotsPerPage(config)

  for (let pageIndex = 0; pageIndex < config.pageCount; pageIndex += 1) {
    for (let slotIndex = 0; slotIndex < slotsPerPage; slotIndex += 1) {
      assignments[getSlotId(pageIndex, slotIndex)] = null
    }
  }

  return assignments
}

export function getCardLabel(card: CardRecord) {
  return `${card.name} · ${card.set} · ${card.number}`
}

export function mergeSlotAssignments(
  currentAssignments: SlotAssignment,
  nextConfig: BinderConfig,
) {
  const nextAssignments = createSlotAssignments(nextConfig)

  for (const [slotId, cardId] of Object.entries(currentAssignments)) {
    if (slotId in nextAssignments) {
      nextAssignments[slotId] = cardId
    }
  }

  return nextAssignments
}

export function getSlotsPerPage(config: BinderConfig) {
  return config.rows * config.columns
}

export function getTotalSlotCount(config: BinderConfig) {
  return getSlotsPerPage(config) * config.pageCount
}

export function getFilledSlotCount(slotAssignments: SlotAssignment) {
  return Object.values(slotAssignments).filter(Boolean).length
}

export function getPageSlots(
  config: BinderConfig,
  slotAssignments: SlotAssignment,
  pageIndex: number,
): PageSlot[] {
  return Array.from({ length: getSlotsPerPage(config) }, (_, slotIndex) => {
    const slotId = getSlotId(pageIndex, slotIndex)

    return {
      slotId,
      slotIndex,
      cardId: slotAssignments[slotId] ?? null,
    }
  })
}

export function getPageOverviews(
  config: BinderConfig,
  slotAssignments: SlotAssignment,
): PageOverview[] {
  const slotsPerPage = getSlotsPerPage(config)

  return Array.from({ length: config.pageCount }, (_, pageIndex) => {
    const filledSlots = getPageSlots(config, slotAssignments, pageIndex).filter(
      ({ cardId }) => cardId,
    ).length

    return {
      pageIndex,
      filledSlots,
      totalSlots: slotsPerPage,
    }
  })
}

export function getSelectedSlotMeta(
  selectedSlotId: string | null,
): SelectedSlotMeta | null {
  if (!selectedSlotId) {
    return null
  }

  const [, pageText, , slotText] = selectedSlotId.split('-')

  return {
    pageIndex: Number(pageText),
    slotIndex: Number(slotText),
  }
}

export function filterCards(cards: CardRecord[], searchQuery: string) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  if (!normalizedQuery) {
    return cards
  }

  return cards.filter((card) => {
    const searchable = [
      card.name,
      card.set,
      card.number,
      card.rarity,
      ...card.tags,
    ]
      .join(' ')
      .toLowerCase()

    return searchable.includes(normalizedQuery)
  })
}
