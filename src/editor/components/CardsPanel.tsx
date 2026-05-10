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

export type CardsPanelControls = {
  isOpen: boolean
  isToolsPanelOpen: boolean
  close: () => void
  toggle: () => void
}

export type CardsPanelCardAssignment = {
  assignCardToSlot: (slotId: string, cardId: string) => void
  clearSelectedSlot: () => void
}

export type CardsPanelProps = {
  selectedSlot: SelectedSlotState
  cardsById: Record<string, CardRecord>
  controls: CardsPanelControls
  cardAssignment: CardsPanelCardAssignment
}

export function CardsPanel({
  selectedSlot,
  cardsById,
  controls,
  cardAssignment,
}: CardsPanelProps) {
  const panel = useCardsPanelState({
    selectedSlotId: selectedSlot.id,
    cardsById,
    onAssignCardToSlot: cardAssignment.assignCardToSlot,
  })

  return (
    <>
      <aside
        className={`${styles.cardsPanel} ${
          controls.isOpen ? styles.cardsPanelOpen : ''
        }`}
      >
        <div
          className={`${styles.rail} ${
            controls.isToolsPanelOpen ? styles.railHidden : ''
          }`}
          onClick={() => {
            if (controls.isOpen) {
              controls.close()
            }
          }}
        >
          <button
            className={styles.handle}
            onClick={(event) => {
              event.stopPropagation()
              controls.toggle()
            }}
            aria-label={
              controls.isOpen ? 'Close cards panel' : 'Open cards panel'
            }
            title={controls.isOpen ? 'Close cards panel' : 'Open cards panel'}
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
              onClearSlot={cardAssignment.clearSelectedSlot}
            />
          </div>
        </div>
      </aside>

      <button
        className={`${styles.backdrop} ${
          controls.isOpen ? styles.backdropVisible : ''
        }`}
        onClick={controls.close}
        aria-label="Close cards panel"
      />
    </>
  )
}
