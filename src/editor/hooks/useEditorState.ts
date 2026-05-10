import { useEffect, useMemo, useState } from 'react'
import { getSelectedSlotMeta } from '../core/binder'
import type { SlotAssignment } from '../core/types'

type UseEditorStateArgs = {
  activePage: number
  slotAssignments: SlotAssignment
}

export function useEditorState({
  activePage,
  slotAssignments,
}: UseEditorStateArgs) {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false)
  const [isCardsPanelOpen, setIsCardsPanelOpen] = useState(false)
  const [rawSelectedSlotId, setRawSelectedSlotId] = useState<string | null>(
    null,
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      if (isCardsPanelOpen) {
        setIsCardsPanelOpen(false)
        return
      }

      if (isToolsPanelOpen) {
        setIsToolsPanelOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCardsPanelOpen, isToolsPanelOpen])

  const selectedSlotId =
    rawSelectedSlotId && rawSelectedSlotId in slotAssignments
      ? rawSelectedSlotId
      : null

  const selectedSlotMeta = useMemo(
    () => getSelectedSlotMeta(selectedSlotId),
    [selectedSlotId],
  )

  const currentSlotCardId = selectedSlotId
    ? slotAssignments[selectedSlotId]
    : null

  return {
    page: {
      activePage,
    },
    toolsPanel: {
      isOpen: isToolsPanelOpen,
      open: () => setIsToolsPanelOpen(true),
      close: () => setIsToolsPanelOpen(false),
      toggle: () => setIsToolsPanelOpen((current) => !current),
    },
    cardsPanel: {
      isOpen: isCardsPanelOpen,
      open: () => setIsCardsPanelOpen(true),
      close: () => setIsCardsPanelOpen(false),
      toggle: () => setIsCardsPanelOpen((current) => !current),
    },
    selectedSlot: {
      id: selectedSlotId,
      meta: selectedSlotMeta,
      currentCardId: currentSlotCardId,
      select: (slotId: string) => {
        setRawSelectedSlotId(slotId)
      },
      clear: () => {
        setRawSelectedSlotId(null)
      },
    },
  }
}
