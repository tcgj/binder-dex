import type { CardRecord } from '../../data/mockCards'
import styles from './CardSearchResults.module.css'

type CardSearchResultsProps = {
  cards: CardRecord[]
  currentSlotCardId: string | null
  isDisabled: boolean
  onSelectCard: (cardId: string) => void
}

export function CardSearchResults({
  cards,
  currentSlotCardId,
  isDisabled,
  onSelectCard,
}: CardSearchResultsProps) {
  return (
    <div className={styles.cardResults}>
      {cards.map((card) => {
        const isSelected = currentSlotCardId === card.id

        return (
          <button
            key={card.id}
            className={`${styles.cardResult} ${
              isSelected ? styles.cardResultSelected : ''
            }`}
            onClick={() => onSelectCard(card.id)}
            disabled={isDisabled}
          >
            <span
              className={styles.cardSwatch}
              style={{
                background: `linear-gradient(145deg, ${card.palette[0]}, ${card.palette[1]})`,
              }}
            />
            <span className={styles.cardCopy}>
              <strong>{card.name}</strong>
              <span>
                {card.set} · {card.number}
              </span>
              <span>
                {card.rarity} · {card.tags.join(' / ')}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
