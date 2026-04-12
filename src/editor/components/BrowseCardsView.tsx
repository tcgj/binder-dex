import type { CardRecord } from '../../data/mockCards'
import { CardSearchResults } from './CardSearchResults'
import styles from './BrowseCardsView.module.css'

type BrowseCardsViewProps = {
  searchQuery: string
  filteredCards: CardRecord[]
  currentSlotCardId: string | null
  onSearchChange: (value: string) => void
  onOpenCardPreview: (cardId: string) => void
}

export function BrowseCardsView({
  searchQuery,
  filteredCards,
  currentSlotCardId,
  onSearchChange,
  onOpenCardPreview,
}: BrowseCardsViewProps) {
  return (
    <section className={styles.view}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Browse cards</p>
          <h2>Card library</h2>
          <p className={styles.copy}>
            Search the collection and open a card to inspect it in more detail.
          </p>
        </div>
      </div>

      <label className={styles.field}>
        <span>Search cards</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, set, rarity, or tag"
        />
      </label>

      <div className={styles.resultsHeader}>
        <p className={styles.resultsLabel}>Results</p>
        <span className={styles.resultsCount}>
          {filteredCards.length} card{filteredCards.length === 1 ? '' : 's'}
        </span>
      </div>

      <CardSearchResults
        cards={filteredCards}
        currentSlotCardId={currentSlotCardId}
        isDisabled={false}
        onSelectCard={onOpenCardPreview}
      />
    </section>
  )
}
