"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type Phase = "idle" | "stripping" | "emerging" | "parkour" | "lazy" | "returning"

const LAZY_THRESHOLD = 60 // px per frame (fast mouse, 触发撒泼)
const STATIONARY_THRESHOLD = 3 // 鼠标几乎静止
const MOVE_THRESHOLD = 10 // 鼠标明显移动(从静止恢复跑酷)
const LERP_FACTOR = 0.14
const CHAR_SIZE = 120 // px (人物精灵图,方形)
const PHOTO_WIDTH = 320 // 照片静态宽度(与原 hero-image-container 一致)
const PHOTO_HEIGHT = 380 // 照片静态高度(与原 hero-image-container 一致)

// 精灵图:4×4 = 16 帧
const SPRITE_COLS = 4
const SPRITE_ROWS = 4
const SPRITE_FRAMES = SPRITE_COLS * SPRITE_ROWS
const FRAME_INTERVAL = 70 // ms per frame(跑步)
const TANTRUM_INTERVAL = 90 // ms per frame(撒泼打滚,稍慢)

export default function RunCharacter() {
  const [phase, setPhase] = useState<Phase>("idle")

  const posRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const prevMouseRef = useRef({ x: 0, y: 0 })
  const originRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const stationaryRef = useRef(false)
  const frameIndexRef = useRef(0)
  const lastFrameAdvanceRef = useRef(0)
  const photoRef = useRef<HTMLDivElement>(null)
  const charRef = useRef<HTMLDivElement>(null)

  const setOriginFromEl = useCallback(() => {
    const photo = photoRef.current
    if (!photo) return
    const r = photo.getBoundingClientRect()
    originRef.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    posRef.current = { ...originRef.current }
  }, [])

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setOriginFromEl()
      mouseRef.current = { x: e.clientX, y: e.clientY }
      prevMouseRef.current = { x: e.clientX, y: e.clientY }
      frameIndexRef.current = 0
      lastFrameAdvanceRef.current = performance.now()
      setPhase("stripping")
      window.setTimeout(() => setPhase("emerging"), 450)
      window.setTimeout(() => setPhase("parkour"), 900)
    },
    [setOriginFromEl],
  )

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setPhase("returning")
  }, [])

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("a, button")) {
      setPhase("returning")
    }
  }, [])

  useEffect(() => {
    if (phase !== "parkour" && phase !== "lazy" && phase !== "emerging") return

    const loop = () => {
      const pos = posRef.current
      const m = mouseRef.current
      const now = performance.now()

      const dx = m.x - prevMouseRef.current.x
      const dy = m.y - prevMouseRef.current.y
      const speed = Math.hypot(dx, dy)
      prevMouseRef.current = { ...m }

      if (phase === "parkour" && speed > LAZY_THRESHOLD) {
        frameIndexRef.current = 0
        lastFrameAdvanceRef.current = now
        stationaryRef.current = false
        setPhase("lazy")
      } else if (phase === "lazy") {
        if (speed < STATIONARY_THRESHOLD) {
          stationaryRef.current = true
        } else if (stationaryRef.current && speed > MOVE_THRESHOLD) {
          frameIndexRef.current = 0
          lastFrameAdvanceRef.current = now
          stationaryRef.current = false
          setPhase("parkour")
        }
      }

      if (phase === "parkour" || phase === "lazy" || phase === "emerging") {
        pos.x += (m.x - pos.x) * LERP_FACTOR
        pos.y += (m.y - pos.y) * LERP_FACTOR
      }

      const el = charRef.current
      if (el) {
        el.style.transition = "none"

        if (phase === "parkour" || phase === "lazy") {
          const interval = phase === "lazy" ? TANTRUM_INTERVAL : FRAME_INTERVAL
          if (now - lastFrameAdvanceRef.current > interval) {
            frameIndexRef.current = (frameIndexRef.current + 1) % SPRITE_FRAMES
            lastFrameAdvanceRef.current = now
          }
          const frame = frameIndexRef.current
          const col = frame % SPRITE_COLS
          const row = Math.floor(frame / SPRITE_COLS)
          const x = col * (100 / (SPRITE_COLS - 1))
          const y = row * (100 / (SPRITE_ROWS - 1))
          el.style.backgroundPosition = `${x}% ${y}%`
        }

        if (phase === "lazy") {
          el.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`
        } else if (phase === "emerging") {
          el.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(1.05)`
        } else {
          const bounce = Math.abs(Math.sin(now * 0.02)) * -6
          const dir = m.x > pos.x ? 1 : -1
          el.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) translateY(${bounce}px) scaleX(${dir})`
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("contextmenu", handleContextMenu)
    window.addEventListener("click", handleGlobalClick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("contextmenu", handleContextMenu)
      window.removeEventListener("click", handleGlobalClick)
    }
  }, [handleContextMenu, handleGlobalClick])

  useEffect(() => {
    setOriginFromEl()
  }, [setOriginFromEl])

  useEffect(() => {
    if (phase === "returning") {
      const el = charRef.current
      if (!el) return
      el.style.transition = "transform 0.45s cubic-bezier(0.6, -0.2, 0.4, 1)"
      el.style.transform = `translate(-50%, -50%) translate(${originRef.current.x}px, ${originRef.current.y}px) scale(0.2)`
      const t = window.setTimeout(() => setPhase("idle"), 450)
      return () => window.clearTimeout(t)
    }
  }, [phase])

  const charVisible =
    phase === "emerging" || phase === "parkour" || phase === "lazy" || phase === "returning"

  const photoBg =
    phase === "idle" ? "url('/avatar-full.jpg')" : "url('/avatar-bg.png')"

  const charBg =
    phase === "lazy" ? "url('/tantrum-sprite.png')" : "url('/run-sprite.png')"

  // 提示文字:待机显示"双击",触发后显示"右键放我回来"
  const hintText =
    phase === "idle" ? "双击点我！！速！！" : "右键放我回来..."

  return (
    <>
      {/* 提示文字(照片上方) */}
      <div
        style={{
          marginBottom: 8,
          textAlign: "center",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: "#333",
          whiteSpace: "nowrap",
        }}
      >
        {hintText}
      </div>

      <div
        ref={photoRef}
        onDoubleClick={handleDoubleClick}
        className="run-photo"
        style={{
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
          backgroundImage: photoBg,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          borderRadius: 0,
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      />

      {charVisible && (
        <div
          ref={charRef}
          className="run-character"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: CHAR_SIZE,
            height: CHAR_SIZE,
            backgroundImage: charBg,
            backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
            backgroundPosition: "0% 0%",
            backgroundRepeat: "no-repeat",
            cursor: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            zIndex: 50,
          }}
        />
      )}
    </>
  )
}
