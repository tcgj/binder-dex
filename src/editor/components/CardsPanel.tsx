import { RightPanel } from './RightPanel'
import styles from './CardsPanel.module.css'
import { useCardsPanelState } from '../hooks/useCardsPanelState'
import type { CardRecord } from '../../data/mockCards'
import type { SelectedSlotMeta } from '../core/types'

type SelectedSlotState = {
  id: string | null
  meta: SelectedSlotMeta | null
  currentCardId: string | null
}

type CardsPanelProps = {
  selectedSlot: SelectedSlotState
  cardsById: Record<string, CardRecord>
  isOpen: boolean
  isToolsPanelOpen: boolean
  onClose: () => void
  onToggle: () => void
  onAssignCardToSlot: (slotId: string, cardId: string) => void
  onClearSlot: () => void
}

export function CardsPanel({
  selectedSlot,
  cardsById,
  isOpen,
  isToolsPanelOpen,
  onClose,
  onToggle,
  onAssignCardToSlot,
  onClearSlot,
}: CardsPanelProps) {
  const panel = useCardsPanelState({
    selectedSlotId: selectedSlot.id,
    cardsById,
    onAssignCardToSlot,
  })

  return (
    <>
      <aside
        className={`${styles.cardsPanel} ${isOpen ? styles.cardsPanelOpen : ''}`}
      >
        <div
          className={`${styles.rail} ${isToolsPanelOpen ? styles.railHidden : ''}`}
          onClick={() => {
            if (isOpen) {
              onClose()
            }
          }}
        >
          <button
            className={styles.handle}
            onClick={(event) => {
              event.stopPropagation()
              onToggle()
            }}
            aria-label={isOpen ? 'Close cards panel' : 'Open cards panel'}
            title={isOpen ? 'Close cards panel' : 'Open cards panel'}
          >
            <span className={styles.handleIcon} aria-hidden="true">
              <span className={styles.handleGrid}>
                <span />
                <span />
                <span />
                <span />
              </span>
            </span>
          </button>
        </div>

        <div className={styles.surface}>
          <div className={styles.content}>
            <RightPanel
              mode={panel.mode}
              selectedSlotMeta={selectedSlot.meta}
              currentSlotCardId={selectedSlot.currentCardId}
              previewCard={panel.previewCard}
              cardsById={cardsById}
              searchQuery={panel.searchQuery}
              filteredCards={panel.filteredCards}
              onSearchChange={panel.setSearchQuery}
              onOpenCardPreview={panel.openCardPreview}
              onCloseCardPreview={panel.closeCardPreview}
              onOpenCardBrowser={panel.openCardBrowser}
              onAssignPreviewCard={panel.assignPreviewCard}
              onClearSlot={onClearSlot}
            />
          </div>
        </div>
      </aside>

      <button
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-label="Close cards panel"
      />
    </>
  )
}
