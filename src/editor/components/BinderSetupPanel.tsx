import type { CSSProperties } from 'react'
import { binderPresets, clamp } from '../core/binder'
import type { BinderConfig, BinderPresetId } from '../core/types'
import styles from './BinderSetupPanel.module.css'

type BinderSetupPanelProps = {
  config: BinderConfig
  filledSlots: number
  slotsPerPage: number
  totalSlotCount: number
  onPresetChange: (preset: BinderPresetId) => void
  onConfigChange: <K extends keyof BinderConfig>(
    key: K,
    value: BinderConfig[K],
  ) => void
}

export function BinderSetupPanel({
  config,
  filledSlots,
  slotsPerPage,
  totalSlotCount,
  onPresetChange,
  onConfigChange,
}: BinderSetupPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.identityBlock}>
        <p className={styles.sectionLabel}>Binder</p>
        <label className={styles.titleField}>
          <span className={styles.srOnly}>Binder title</span>
          <input
            value={config.title}
            onChange={(event) => onConfigChange('title', event.target.value)}
            placeholder="Collection title"
          />
        </label>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>Layout</p>
        </div>

        <div className={styles.layoutStack}>
          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>Binder type</span>
              <div
                className={styles.presetGrid}
                role="radiogroup"
                aria-label="Binder type"
              >
                {Object.entries(binderPresets).map(([presetId, preset]) => (
                  <button
                    key={presetId}
                    type="button"
                    role="radio"
                    aria-checked={config.preset === presetId}
                    className={`${styles.presetButton} ${
                      config.preset === presetId
                        ? styles.presetButtonActive
                        : ''
                    }`}
                    onClick={() => onPresetChange(presetId as BinderPresetId)}
                  >
                    <span
                      className={styles.presetDots}
                      style={
                        {
                          ['--preset-columns' as string]: String(
                            preset.columns,
                          ),
                          ['--preset-rows' as string]: String(preset.rows),
                          ['--preset-dot-width' as string]:
                            preset.rows >= 4
                              ? '5px'
                              : preset.rows === 3
                                ? '6px'
                                : '8px',
                          ['--preset-dot-height' as string]:
                            preset.rows >= 4
                              ? '7px'
                              : preset.rows === 3
                                ? '9px'
                                : '12px',
                        } as CSSProperties
                      }
                      aria-hidden="true"
                    >
                      {Array.from(
                        { length: preset.rows * preset.columns },
                        (_, index) => (
                          <span key={index} className={styles.presetDot} />
                        ),
                      )}
                    </span>
                    <span className={styles.presetLabel}>{preset.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  role="radio"
                  aria-checked={config.preset === 'custom'}
                  className={`${styles.presetButton} ${
                    config.preset === 'custom' ? styles.presetButtonActive : ''
                  }`}
                  onClick={() => onPresetChange('custom')}
                >
                  <span className={styles.presetDots} aria-hidden="true">
                    <span className={styles.customGlyph}>+</span>
                  </span>
                  <span className={styles.presetLabel}>Custom</span>
                </button>
              </div>
            </label>
          </div>

          {config.preset === 'custom' ? (
            <div className={styles.customFieldGrid}>
              <label className={styles.field}>
                <span>Rows</span>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={config.rows}
                  onChange={(event) =>
                    onConfigChange(
                      'rows',
                      clamp(Number(event.target.value), 1, 6),
                    )
                  }
                />
              </label>

              <label className={styles.field}>
                <span>Columns</span>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={config.columns}
                  onChange={(event) =>
                    onConfigChange(
                      'columns',
                      clamp(Number(event.target.value), 1, 6),
                    )
                  }
                />
              </label>
            </div>
          ) : null}

          <label className={styles.field}>
            <span>Pages</span>
            <input
              type="number"
              min={1}
              max={60}
              value={config.pageCount}
              onChange={(event) =>
                onConfigChange(
                  'pageCount',
                  clamp(Number(event.target.value), 1, 60),
                )
              }
            />
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>Summary</p>
        </div>

        <div className={styles.miniStats}>
          <div>
            <span>Cards / page</span>
            <strong>{slotsPerPage}</strong>
          </div>
          <div>
            <span>Total slots</span>
            <strong>{totalSlotCount}</strong>
          </div>
          <div>
            <span>Placed cards</span>
            <strong>{filledSlots}</strong>
          </div>
        </div>
      </section>
    </section>
  )
}
