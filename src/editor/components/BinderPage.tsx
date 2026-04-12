import type { CSSProperties } from 'react'
import type { CardRecord } from '../../data/mockCards'
import type { PageSlot } from '../core/types'
import { BinderSlot } from './BinderSlot'
import styles from './BinderPage.module.css'

type BinderPageProps = {
  columns: number
  slots: PageSlot[]
  selectedSlotId: string | null
  showSlotDetails: boolean
  cardsById: Record<string, CardRecord>
  onSelectSlot: (slotId: string) => void
  onClearSlot: (slotId: string) => void
}

export function BinderPage({
  columns,
  slots,
  selectedSlotId,
  showSlotDetails,
  cardsById,
  onSelectSlot,
  onClearSlot,
}: BinderPageProps) {
  const rows = Math.max(1, Math.ceil(slots.length / columns))

  return (
    <div
      className={styles.binderPage}
      style={
        {
          ['--binder-columns' as string]: String(columns),
          ['--binder-rows' as string]: String(rows),
        } as CSSProperties
      }
    >
      <div
        className={styles.slotGrid}
        style={{
          gridTemplateColumns: `repeat(${columns}, var(--slot-width))`,
        }}
      >
        {slots.map(({ slotId, slotIndex, cardId }) => {
          const card = cardId ? cardsById[cardId] : null
          const isActive = selectedSlotId === slotId

          return (
            <BinderSlot
              key={slotId}
              slotId={slotId}
              slotIndex={slotIndex}
              card={card}
              isActive={isActive}
              showMeta={showSlotDetails || isActive}
              onSelect={onSelectSlot}
              onClear={onClearSlot}
            />
          )
        })}
      </div>
    </div>
  )
}
