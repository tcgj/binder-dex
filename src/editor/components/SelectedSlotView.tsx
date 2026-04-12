import type { CardRecord } from '../../data/mockCards'
import type { SelectedSlotMeta } from '../core/types'
import styles from './SelectedSlotView.module.css'

type SelectedSlotViewProps = {
  selectedSlotMeta: SelectedSlotMeta | null
  currentCard: CardRecord | null
  onReplaceCard: () => void
  onRemoveCard: (() => void) | null
}

export function SelectedSlotView({
  selectedSlotMeta,
  currentCard,
  onReplaceCard,
  onRemoveCard,
}: SelectedSlotViewProps) {
  return (
    <section className={styles.view}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Selected slot</p>
          <h2>
            {selectedSlotMeta
              ? `Page ${selectedSlotMeta.pageIndex + 1} · Slot ${selectedSlotMeta.slotIndex + 1}`
              : 'Selected slot'}
          </h2>
        </div>
      </div>

      {currentCard ? (
        <div className={styles.previewCard}>
          <div
            className={styles.cardFace}
            style={{
              background: `linear-gradient(155deg, ${currentCard.palette[0]}, ${currentCard.palette[1]})`,
            }}
          >
            <span>{currentCard.set}</span>
            <strong>{currentCard.name}</strong>
            <span>{currentCard.number}</span>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>Empty pocket</strong>
          <p>Choose a card to fill this slot.</p>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.primaryButton} onClick={onReplaceCard}>
          {currentCard ? 'Replace card' : 'Browse cards'}
        </button>
        {onRemoveCard ? (
          <button
            className={styles.iconButton}
            onClick={onRemoveCard}
            aria-label="Remove card"
          >
            <span aria-hidden="true">🗑</span>
          </button>
        ) : null}
      </div>
    </section>
  )
}
