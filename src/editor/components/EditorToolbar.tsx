import styles from './EditorToolbar.module.css'

type EditorToolbarProps = {
  activePage: number
  pageCount: number
  pageInput: string
  showSlotDetails: boolean
  onPageInputChange: (value: string) => void
  onCommitPageInput: () => void
  onPageChange: (pageIndex: number) => void
  onToggleSlotDetails: () => void
}

export function EditorToolbar({
  activePage,
  pageCount,
  pageInput,
  showSlotDetails,
  onPageInputChange,
  onCommitPageInput,
  onPageChange,
  onToggleSlotDetails,
}: EditorToolbarProps) {
  return (
    <div className={styles.toolbarShell}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(activePage - 1)}
            disabled={activePage === 0}
            aria-label="Previous page"
            title="Previous page"
          >
            Previous
          </button>
          <label className={styles.pageInputField}>
            <span className={styles.srOnly}>Page number</span>
            <input
              type="number"
              min={1}
              max={pageCount}
              value={pageInput}
              onChange={(event) => onPageInputChange(event.target.value)}
              onBlur={onCommitPageInput}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onCommitPageInput()
                }
              }}
            />
          </label>
          <span className={styles.pageTotal}>of {pageCount}</span>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(activePage + 1)}
            disabled={activePage === pageCount - 1}
            aria-label="Next page"
            title="Next page"
          >
            Next
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button
            className={`${styles.ghostButton} ${
              showSlotDetails ? styles.ghostButtonActive : ''
            }`}
            aria-pressed={showSlotDetails}
            onClick={onToggleSlotDetails}
          >
            {showSlotDetails ? 'Hide metadata' : 'Show metadata'}
          </button>
        </div>
      </div>
    </div>
  )
}
