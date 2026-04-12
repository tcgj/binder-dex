import type { CardRecord } from '../../data/mockCards'
import styles from './BinderSlot.module.css'

type BinderSlotProps = {
  slotId: string
  slotIndex: number
  card: CardRecord | null
  isActive: boolean
  showMeta: boolean
  onSelect: (slotId: string) => void
  onClear: (slotId: string) => void
}

export function BinderSlot({
  slotId,
  slotIndex,
  card,
  isActive,
  showMeta,
  onSelect,
  onClear,
}: BinderSlotProps) {
  return (
    <button
      className={`${styles.binderSlot} ${
        showMeta ? styles.binderSlotShowingMeta : ''
      } ${isActive ? styles.binderSlotActive : ''}`}
      onClick={() => onSelect(slotId)}
    >
      {card ? (
        <span
          className={styles.slotActions}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className={styles.slotClearButton}
            onClick={() => onClear(slotId)}
            aria-label={`Clear slot ${slotIndex + 1}`}
          >
            Clear
          </button>
        </span>
      ) : null}

      {card ? (
        <span
          className={styles.slotCard}
          style={{
            background: `linear-gradient(155deg, ${card.palette[0]}, ${card.palette[1]})`,
          }}
        >
          <span>{card.set}</span>
          <strong>{card.name}</strong>
          <span>{card.number}</span>
        </span>
      ) : (
        <span className={styles.slotPlaceholder}>Select a card</span>
      )}

      <span className={styles.slotMetaOverlay}>
        <span>Slot {slotIndex + 1}</span>
        <span>{card ? card.rarity : 'Empty pocket'}</span>
      </span>
    </button>
  )
}
