import type { CardRecord } from '../../data/mockCards'
import type { SelectedSlotMeta } from '../core/types'
import styles from './CardPreviewView.module.css'

type CardPreviewViewProps = {
  card: CardRecord
  selectedSlotMeta: SelectedSlotMeta | null
  onBack: () => void
  onAssignToSelectedSlot: (() => void) | null
}

export function CardPreviewView({
  card,
  selectedSlotMeta,
  onBack,
  onAssignToSelectedSlot,
}: CardPreviewViewProps) {
  return (
    <section className={styles.view}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={onBack}
          aria-label="Go back"
        >
          <span aria-hidden="true">←</span>
        </button>
        <div>
          <p className={styles.label}>Card preview</p>
          <h2>{card.name}</h2>
          {selectedSlotMeta ? (
            <p className={styles.context}>
              Replacing Page {selectedSlotMeta.pageIndex + 1} · Slot{' '}
              {selectedSlotMeta.slotIndex + 1}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.previewCard}>
        <div
          className={styles.cardFace}
          style={{
            background: `linear-gradient(155deg, ${card.palette[0]}, ${card.palette[1]})`,
          }}
        >
          <span>{card.set}</span>
          <strong>{card.name}</strong>
          <span>{card.number}</span>
        </div>
      </div>

      <dl className={styles.metaList}>
        <div>
          <dt>Set</dt>
          <dd>
            {card.set} · {card.number}
          </dd>
        </div>
        <div>
          <dt>Rarity</dt>
          <dd>{card.rarity}</dd>
        </div>
        <div>
          <dt>Tags</dt>
          <dd>{card.tags.join(' / ')}</dd>
        </div>
      </dl>

      {onAssignToSelectedSlot ? (
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={onAssignToSelectedSlot}
          >
            Replace card
          </button>
        </div>
      ) : null}
    </section>
  )
}
