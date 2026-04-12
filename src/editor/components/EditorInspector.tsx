import { RightPanel } from './RightPanel'
import styles from './EditorInspector.module.css'
import { useInspectorPanelState } from '../hooks/useInspectorPanelState'
import type { CardRecord } from '../../data/mockCards'
import type { SelectedSlotMeta } from '../core/types'

type InspectorViewState = {
  selectedSlotId: string | null
  selectedSlotMeta: SelectedSlotMeta | null
  currentSlotCardId: string | null
}

type EditorInspectorProps = {
  inspector: InspectorViewState
  cardsById: Record<string, CardRecord>
  isOpen: boolean
  isDrawerBlocked: boolean
  onClose: () => void
  onToggle: () => void
  onAssignCardToSlot: (slotId: string, cardId: string) => void
  onClearSlot: () => void
}

export function EditorInspector({
  inspector,
  cardsById,
  isOpen,
  isDrawerBlocked,
  onClose,
  onToggle,
  onAssignCardToSlot,
  onClearSlot,
}: EditorInspectorProps) {
  const panel = useInspectorPanelState({
    selectedSlotId: inspector.selectedSlotId,
    cardsById,
    onAssignCardToSlot,
  })

  return (
    <>
      <aside className={`${styles.inspector} ${isOpen ? styles.inspectorOpen : ''}`}>
        <div
          className={`${styles.rail} ${isDrawerBlocked ? styles.railHidden : ''}`}
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
              selectedSlotMeta={inspector.selectedSlotMeta}
              currentSlotCardId={inspector.currentSlotCardId}
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
        aria-label="Close inspector"
      />
    </>
  )
}
