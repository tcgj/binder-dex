import { useMemo, useState } from 'react'
import { mockCards } from '../../data/mockCards'
import {
  applyBinderPreset,
  clamp,
  createSlotAssignments,
  defaultConfig,
  getPageOverviews,
  getSlotId,
  mergeSlotAssignments,
} from '../core/binder'
import type {
  BinderConfig,
  BinderPresetId,
  EditorActions,
  EditorController,
  EditorSidebarState,
  EditorWorkspaceState,
  PageSlot,
  SlotAssignment,
} from '../core/types'

export function useBinderState(): EditorController {
  const [config, setConfig] = useState<BinderConfig>(defaultConfig)
  const [slotAssignments, setSlotAssignments] = useState<SlotAssignment>(() =>
    createSlotAssignments(defaultConfig),
  )
  const [activePage, setActivePage] = useState(0)

  const slotsPerPage = config.rows * config.columns

  const currentPageSlots = useMemo<PageSlot[]>(() => {
    return Array.from({ length: slotsPerPage }, (_, slotIndex) => {
      const slotId = getSlotId(activePage, slotIndex)

      return {
        slotId,
        slotIndex,
        cardId: slotAssignments[slotId] ?? null,
      }
    })
  }, [activePage, slotAssignments, slotsPerPage])

  const cardsById = useMemo(
    () => Object.fromEntries(mockCards.map((card) => [card.id, card])),
    [],
  )

  const filledSlots = useMemo(
    () => Object.values(slotAssignments).filter(Boolean).length,
    [slotAssignments],
  )

  const pageOverviews = useMemo(
    () => getPageOverviews(config, slotAssignments),
    [config, slotAssignments],
  )

  const setConfigField = <K extends keyof BinderConfig>(
    key: K,
    value: BinderConfig[K],
  ) => {
    const nextConfigBase = {
      ...config,
      [key]: value,
    }
    const nextConfig =
      (key === 'rows' || key === 'columns') && config.preset !== 'custom'
        ? { ...nextConfigBase, preset: 'custom' as BinderPresetId }
        : nextConfigBase
    const nextActivePage = clamp(activePage, 0, nextConfig.pageCount - 1)

    setConfig(nextConfig)
    setSlotAssignments((currentAssignments) =>
      mergeSlotAssignments(currentAssignments, nextConfig),
    )
    setActivePage(nextActivePage)
  }

  const setBinderPreset = (preset: BinderPresetId) => {
    const nextConfig = applyBinderPreset(config, preset)
    const nextActivePage = clamp(activePage, 0, nextConfig.pageCount - 1)

    setConfig(nextConfig)
    setSlotAssignments((currentAssignments) =>
      mergeSlotAssignments(currentAssignments, nextConfig),
    )
    setActivePage(nextActivePage)
  }

  const assignCardToSlot = (slotId: string, cardId: string) => {
    setSlotAssignments((currentAssignments) => ({
      ...currentAssignments,
      [slotId]: cardId,
    }))
  }

  const clearSlotById = (slotId: string) => {
    setSlotAssignments((currentAssignments) => ({
      ...currentAssignments,
      [slotId]: null,
    }))
  }

  const goToPage = (nextPage: number) => {
    setActivePage(clamp(nextPage, 0, config.pageCount - 1))
  }

  const sidebar: EditorSidebarState = {
    config,
    filledSlots,
    slotsPerPage,
    pageOverviews,
    activePage,
  }

  const workspace: EditorWorkspaceState = {
    title: config.title,
    activePage,
    pageCount: config.pageCount,
    columns: config.columns,
    currentPageSlots,
    slotAssignments,
    cardsById,
  }

  const actions: EditorActions = {
    setBinderPreset,
    setConfigField,
    assignCardToSlot,
    clearSlotById,
    goToPage,
  }

  return {
    sidebar,
    workspace,
    actions,
  }
}
