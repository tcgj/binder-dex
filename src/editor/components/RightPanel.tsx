import type { CardRecord } from '../../data/mockCards'
import type { EditorMode, SelectedSlotMeta } from '../core/types'
import { BrowseCardsView } from './BrowseCardsView'
import { CardPreviewView } from './CardPreviewView'
import { SelectedSlotView } from './SelectedSlotView'
import styles from './RightPanel.module.css'

type RightPanelProps = {
  mode: EditorMode
  selectedSlotMeta: SelectedSlotMeta | null
  currentSlotCardId: string | null
  previewCard: CardRecord | null
  cardsById: Record<string, CardRecord>
  searchQuery: string
  filteredCards: CardRecord[]
  onSearchChange: (value: string) => void
  onOpenCardPreview: (cardId: string) => void
  onCloseCardPreview: () => void
  onOpenCardBrowser: () => void
  onAssignPreviewCard: () => void
  onClearSlot: () => void
}

export function RightPanel({
  mode,
  selectedSlotMeta,
  currentSlotCardId,
  previewCard,
  cardsById,
  searchQuery,
  filteredCards,
  onSearchChange,
  onOpenCardPreview,
  onCloseCardPreview,
  onOpenCardBrowser,
  onAssignPreviewCard,
  onClearSlot,
}: RightPanelProps) {
  const currentSlotCard = currentSlotCardId
    ? (cardsById[currentSlotCardId] ?? null)
    : null

  return (
    <aside className={styles.panel}>
      {mode === 'browse' ? (
        <BrowseCardsView
          searchQuery={searchQuery}
          filteredCards={filteredCards}
          currentSlotCardId={currentSlotCardId}
          onSearchChange={onSearchChange}
          onOpenCardPreview={onOpenCardPreview}
        />
      ) : null}

      {mode === 'browse-preview' && previewCard ? (
        <CardPreviewView
          card={previewCard}
          selectedSlotMeta={selectedSlotMeta}
          onBack={onCloseCardPreview}
          onAssignToSelectedSlot={selectedSlotMeta ? onAssignPreviewCard : null}
        />
      ) : null}

      {mode === 'selected-slot' ? (
        <SelectedSlotView
          selectedSlotMeta={selectedSlotMeta}
          currentCard={currentSlotCard}
          onReplaceCard={onOpenCardBrowser}
          onRemoveCard={currentSlotCard ? onClearSlot : null}
        />
      ) : null}
    </aside>
  )
}
