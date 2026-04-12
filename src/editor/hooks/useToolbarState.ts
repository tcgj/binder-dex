import { useState } from 'react'

type UseToolbarStateArgs = {
  activePage: number
  onPageChange: (pageIndex: number) => void
}

export function useToolbarState({
  activePage,
  onPageChange,
}: UseToolbarStateArgs) {
  const [showSlotDetails, setShowSlotDetails] = useState(false)
  const [pageInputState, setPageInputState] = useState({
    value: String(activePage + 1),
    page: activePage,
  })

  const pageInput =
    pageInputState.page === activePage
      ? pageInputState.value
      : String(activePage + 1)

  const commitPageInput = () => {
    const parsedPage = Number(pageInput)

    if (Number.isNaN(parsedPage)) {
      setPageInputState({
        value: String(activePage + 1),
        page: activePage,
      })
      return
    }

    onPageChange(parsedPage - 1)
  }

  return {
    pageInput,
    showSlotDetails,
    setPageInput: (value: string) =>
      setPageInputState({
        value,
        page: activePage,
      }),
    commitPageInput,
    toggleSlotDetails: () => setShowSlotDetails((current) => !current),
  }
}
