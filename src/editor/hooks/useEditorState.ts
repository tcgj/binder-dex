import { useEffect, useMemo, useState } from 'react'
import { getSelectedSlotMeta } from '../core/binder'
import type { SlotAssignment } from '../core/types'

type UseEditorStateArgs = {
  slotAssignments: SlotAssignment
}

export function useEditorState({ slotAssignments }: UseEditorStateArgs) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isInspectorOpen, setIsInspectorOpen] = useState(false)
  const [rawSelectedSlotId, setRawSelectedSlotId] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }

      if (isInspectorOpen) {
        setIsInspectorOpen(false)
        return
      }

      if (isDrawerOpen) {
        setIsDrawerOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, isInspectorOpen])

  const selectedSlotId =
    rawSelectedSlotId && rawSelectedSlotId in slotAssignments
      ? rawSelectedSlotId
      : null

  const selectedSlotMeta = useMemo(
    () => getSelectedSlotMeta(selectedSlotId),
    [selectedSlotId],
  )

  const currentSlotCardId = selectedSlotId ? slotAssignments[selectedSlotId] : null

  return {
    drawer: {
      isOpen: isDrawerOpen,
      open: () => setIsDrawerOpen(true),
      close: () => setIsDrawerOpen(false),
      toggle: () => setIsDrawerOpen((current) => !current),
    },
    inspector: {
      isOpen: isInspectorOpen,
      selectedSlotId,
      selectedSlotMeta,
      currentSlotCardId,
      open: () => setIsInspectorOpen(true),
      close: () => setIsInspectorOpen(false),
      toggle: () => setIsInspectorOpen((current) => !current),
      selectSlot: (slotId: string) => {
        setRawSelectedSlotId(slotId)
      },
      clearSelectedSlot: () => {
        setRawSelectedSlotId(null)
      },
    },
  }
}
