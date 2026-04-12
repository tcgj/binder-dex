import { useMemo, useState } from 'react'
import { mockCards } from '../../data/mockCards'
import { filterCards } from '../core/binder'
import type { CardRecord } from '../../data/mockCards'
import type { EditorMode } from '../core/types'

type UseInspectorPanelStateArgs = {
  selectedSlotId: string | null
  cardsById: Record<string, CardRecord>
  onAssignCardToSlot: (slotId: string, cardId: string) => void
}

export function useInspectorPanelState({
  selectedSlotId,
  cardsById,
  onAssignCardToSlot,
}: UseInspectorPanelStateArgs) {
  const [searchQuery, setSearchQuery] = useState('')
  const [previewCardId, setPreviewCardId] = useState<string | null>(null)
  const [isBrowsingSelection, setIsBrowsingSelection] = useState(false)

  const mode: EditorMode = previewCardId
    ? 'browse-preview'
    : selectedSlotId && !isBrowsingSelection
      ? 'selected-slot'
      : 'browse'

  const previewCard = previewCardId ? (cardsById[previewCardId] ?? null) : null

  const filteredCards = useMemo(
    () => filterCards(mockCards, searchQuery),
    [searchQuery],
  )

  const openCardPreview = (cardId: string) => {
    setPreviewCardId(cardId)
  }

  const closeCardPreview = () => {
    setPreviewCardId(null)
  }

  const openCardBrowser = () => {
    setPreviewCardId(null)
    setIsBrowsingSelection(true)
  }

  const assignPreviewCard = () => {
    if (!selectedSlotId || !previewCardId) {
      return
    }

    onAssignCardToSlot(selectedSlotId, previewCardId)
    setPreviewCardId(null)
    setIsBrowsingSelection(false)
  }

  return {
    mode,
    previewCard,
    searchQuery,
    filteredCards,
    setSearchQuery,
    openCardPreview,
    closeCardPreview,
    openCardBrowser,
    assignPreviewCard,
  }
}
