"use client"
import { useRef, useState, useEffect } from "react"

// ── CODE RAIN COLUMNS ─────────────────────────────────────────────────────────
const RAIN_COLUMNS = [
  { chars: "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01バイト01", left: "3%",  duration: "8s",  delay: "0s"    },
  { chars: "10101010アクセス拒否01システム01010101010101", left: "10%", duration: "12s", delay: "1.4s"  },
  { chars: "GHOSTSHELL_v2.4.1_INIT_OK_SCAN_COMPLETE_01", left: "17%", duration: "9s",  delay: "0.7s"  },
  { chars: "01101001ｷﾞｬｯﾌﾟ01001011ゴースト01010011", left: "24%", duration: "15s", delay: "2.1s"  },
  { chars: "ACCESS_GRANTED_0x4F_0x4B_10110010101011", left: "31%", duration: "11s", delay: "0.3s"  },
  { chars: "ﾊﾌﾎﾐﾒﾔﾖﾗﾘﾙﾚﾛﾜｦﾝ01011101シェル010011", left: "38%", duration: "7s",  delay: "3.2s"  },
  { chars: "ROOTKIT_DETECTED_FALSE_POSITIVE_CLEAR_OK", left: "45%", duration: "13s", delay: "1.1s"  },
  { chars: "10001001ﾊﾐﾋｰｳｼﾅ01010101ネット01010", left: "52%", duration: "10s", delay: "2.8s"  },
  { chars: "ENCRYPTING_PAYLOAD_AES256_KEY_EXCHANGE_OK", left: "59%", duration: "16s", delay: "0.5s"  },
  { chars: "01010111アクセス01001011ゴースト_シェル", left: "66%", duration: "8s",  delay: "4.0s"  },
  { chars: "GHOST_SHELL_DAEMON_PID_4291_UPTIME_99.99", left: "73%", duration: "11s", delay: "1.7s"  },
  { chars: "10110010ｷﾞｬｯﾌﾟ01001011ネット01010101", left: "80%", duration: "14s", delay: "0.9s"  },
  { chars: "EXPLOIT_ZERO_DAY_PATCHED_KERNEL_CLEAN_OK", left: "87%", duration: "9s",  delay: "3.5s"  },
  { chars: "01001101ﾊﾌﾎﾐﾒﾔﾖ01010101シェル010011", left: "93%", duration: "12s", delay: "2.3s"  },
]

const INIT_LINES = [
  "> initializing ghost_shell...",
  "> kernel: Linux 6.1.0-ghost #1 SMP x86_64",
  "> system: ONLINE",
  "> scanning: 127.0.0.1...",
  "> threat level: NOMINAL",
  "> ACCESS GRANTED",
]

const MODULES = [
  {
    id: "module_01.sh",
    name: "exploit_design",
    tag: "OFFENSIVE",
    synopsis: "craft zero-trust interfaces that anticipate breach vectors before adversaries do",
    config: [
      "type:       UI/UX Engineering",
      "stack:      React · Next.js · WebGL",
      "threat_mod: enabled",
      "zero_trust: true",
    ],
  },
  {
    id: "module_02.sh",
    name: "zero_day_dev",
    tag: "CRITICAL",
    synopsis: "full-stack development pipelines with security-first architecture and automated pen-test loops",
    config: [
      "type:       Full-Stack Development",
      "stack:      Node · Rust · Postgres",
      "ci_scan:    trivy · semgrep · snyk",
      "cve_watch:  true",
    ],
  },
  {
    id: "module_03.sh",
    name: "ghost_protocol",
    tag: "CLASSIFIED",
    synopsis: "anonymous deployment workflows — no trace, no fingerprint, maximum operational security",
    config: [
      "type:       DevSecOps",
      "stack:      K8s · Terraform · Vault",
      "anonymity:  high",
      "log_purge:  auto",
    ],
  },
]

const OPERATIONS = [
  { date: "2026-04-11", perms: "drwxr-x---", size: "4.2M", name: "project_nightfall/",   desc: "adversarial ML sandbox" },
  { date: "2026-03-28", perms: "-rwx------", size: "891K", name: "kernel_ghost.sh",       desc: "kernel-level rootkit sim" },
  { date: "2026-02-14", perms: "drwxr-x---", size: "12M",  name: "redteam_atlas/",        desc: "red team ops dashboard" },
  { date: "2025-12-01", perms: "-rwxr-x---", size: "2.1M", name: "zero_day_scanner.py",   desc: "CVE exploit surface map" },
  { date: "2025-10-17", perms: "drwx------", size: "7.8M", name: "phantom_proxy/",        desc: "TOR-layer routing mesh" },
  { date: "2025-08-03", perms: "-rw-r-----", size: "340K", name: "ghostchain.sol",        desc: "on-chain identity vault" },
]

// ── BLINK CURSOR ──────────────────────────────────────────────────────────────
function BlinkCursor() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{ color: "#00FF41", visibility: visible ? "visible" : "hidden" }}>█</span>
  )
}

// ── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ pct, label, value }: { pct: number; label: string; value: string }) {
  const filled = Math.round(pct / 100 * 20)
  const empty = 20 - filled
  return (
    <div style={{ marginBottom: "20px", fontFamily: "'Courier New', Courier, monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "#008F11", fontSize: "11px", letterSpacing: "0.12em" }}>{label}</span>
        <span style={{ color: "#00FF41", fontSize: "11px", letterSpacing: "0.08em" }}>{value}</span>
      </div>
      <div style={{ color: "#00FF41", fontSize: "13px", letterSpacing: "2px" }}>
        {"█".repeat(filled)}
        {"░".repeat(empty)}
      </div>
    </div>
  )
}

// ── TERMINAL WINDOW ───────────────────────────────────────────────────────────
function TerminalWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: "1px solid #008F11",
      borderRadius: "4px",
      overflow: "hidden",
      backgroundColor: "#000",
    }}>
      <div style={{
        backgroundColor: "#001a00",
        borderBottom: "1px solid #008F11",
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ color: "#ff5f57", fontSize: "10px" }}>●</span>
        <span style={{ color: "#febc2e", fontSize: "10px" }}>●</span>
        <span style={{ color: "#28c840", fontSize: "10px" }}>●</span>
        <span style={{
          marginLeft: "12px",
          color: "#008F11",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
        }}>{title}</span>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function GhostShellPage() {
  const [typedLines, setTypedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [doneTyping, setDoneTyping] = useState(false)
  const [email, setEmail] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)

  // Typewriter effect
  useEffect(() => {
    let lineIdx = 0
    let charIdx = 0
    let finished = false

    const tick = () => {
      if (finished) return
      const line = INIT_LINES[lineIdx]
      if (charIdx < line.length) {
        setCurrentLine(line.slice(0, charIdx + 1))
        charIdx++
        setTimeout(tick, 28 + Math.random() * 22)
      } else {
        setTypedLines(prev => [...prev, line])
        setCurrentLine("")
        lineIdx++
        charIdx = 0
        if (lineIdx >= INIT_LINES.length) {
          finished = true
          setDoneTyping(true)
          return
        }
        setTimeout(tick, 260)
      }
    }

    setTimeout(tick, 700)
  }, [])

  const mono: React.CSSProperties = {
    fontFamily: "'Courier New', Courier, monospace",
  }

  return (
    <div style={{ ...mono, backgroundColor: "#000", color: "#00FF41", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── CODE RAIN BACKGROUND ───────────────────────────────────────────── */}
      <div style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.18,
      }}>
        <style>{`
          @keyframes code-rain {
            0%   { transform: translateY(-100%); opacity: 1; }
            85%  { opacity: 0.6; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          @keyframes blink-cursor {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
          }
          @keyframes scanline {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          .gs-scanline {
            position: fixed;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(transparent, rgba(0,255,65,0.08), transparent);
            pointer-events: none;
            z-index: 1;
            animation: scanline 6s linear infinite;
          }
        `}</style>
        {RAIN_COLUMNS.map((col, i) => (
          <div key={i} style={{
            position: "absolute",
            left: col.left,
            top: 0,
            writingMode: "vertical-rl",
            fontSize: "12px",
            color: "#00FF41",
            letterSpacing: "4px",
            animation: `code-rain ${col.duration} linear ${col.delay} infinite`,
            userSelect: "none",
          }}>
            {col.chars}
          </div>
        ))}
      </div>

      {/* Scanline overlay */}
      <div className="gs-scanline" />

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.92)",
        borderBottom: "1px solid #008F11",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
        backdropFilter: "blur(4px)",
      }}>
        <span style={{ color: "#00FF41", fontSize: "13px", fontWeight: "bold", letterSpacing: "0.06em" }}>
          [GHOST_SHELL v2.4.1]
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["> work", "> about", "> contact"].map(link => (
            <a key={link} href="#" style={{
              color: "#008F11",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00FF41")}
            onMouseLeave={e => (e.currentTarget.style.color = "#008F11")}
            >{link}</a>
          ))}
          <button style={{
            border: "1px solid #00FF41",
            backgroundColor: "transparent",
            color: "#00FF41",
            fontSize: "11px",
            padding: "6px 16px",
            letterSpacing: "0.12em",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#00FF41"; e.currentTarget.style.color = "#000" }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#00FF41" }}
          >[CONNECT]</button>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 10 }}>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section ref={heroRef} style={{
          minHeight: "100vh",
          paddingTop: "52px",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Terminal title bar */}
          <div style={{
            backgroundColor: "#001200",
            borderBottom: "1px solid #008F11",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}>
            <span style={{ color: "#ff5f57", fontSize: "10px" }}>●</span>
            <span style={{ color: "#febc2e", fontSize: "10px" }}>●</span>
            <span style={{ color: "#28c840", fontSize: "10px" }}>●</span>
            <span style={{ color: "#008F11", fontSize: "11px", marginLeft: "16px", letterSpacing: "0.1em" }}>
              GHOST_SHELL — bash — 80x24
            </span>
            <span style={{ marginLeft: "auto", color: "#003300", fontSize: "10px" }}>
              PID 4291 · SSH authenticated · AES-256
            </span>
          </div>

          {/* Terminal body */}
          <div style={{
            flex: 1,
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}>
            {/* Init sequence */}
            <div style={{ marginBottom: "40px" }}>
              {typedLines.map((line, i) => (
                <div key={i} style={{
                  fontSize: "14px",
                  lineHeight: "2",
                  color: i === typedLines.length - 1 && doneTyping ? "#00FF41" : "#008F11",
                  letterSpacing: "0.04em",
                }}>
                  {line}
                </div>
              ))}
              {!doneTyping && (
                <div style={{ fontSize: "14px", lineHeight: "2", color: "#00FF41", letterSpacing: "0.04em" }}>
                  {currentLine}<BlinkCursor />
                </div>
              )}
            </div>

            {/* ASCII-style GHOST SHELL logotype */}
            <div style={{
              margin: "20px 0 32px",
              lineHeight: "1.15",
              overflowX: "auto",
            }}>
              <pre style={{
                color: "#00FF41",
                fontSize: "clamp(6px, 1.1vw, 13px)",
                margin: 0,
                fontFamily: "'Courier New', Courier, monospace",
                textShadow: "0 0 12px rgba(0,255,65,0.6)",
                userSelect: "none",
              }}>{`
  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗    ███████╗██╗  ██╗███████╗██╗     ██╗
 ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝    ██╔════╝██║  ██║██╔════╝██║     ██║
 ██║  ███╗███████║██║   ██║███████╗   ██║       ███████╗███████║█████╗  ██║     ██║
 ██║   ██║██╔══██║██║   ██║╚════██║   ██║       ╚════██║██╔══██║██╔══╝  ██║     ██║
 ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║       ███████║██║  ██║███████╗███████╗███████╗
  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝`}</pre>
            </div>

            {/* Sub-headline */}
            <div style={{ color: "#008F11", fontSize: "13px", marginBottom: "48px", letterSpacing: "0.14em" }}>
              ▶ cybersecurity engineering · stealth deployment · adversarial design
            </div>

            {/* Deploy prompt */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "15px",
              color: "#00FF41",
              letterSpacing: "0.06em",
            }}>
              <span style={{ color: "#008F11" }}>ghost@shell:~$</span>
              <span>deploy --env production --silent --zero-trace</span>
              <BlinkCursor />
            </div>

            <div style={{ marginTop: "48px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <button style={{
                backgroundColor: "#00FF41",
                color: "#000",
                border: "none",
                padding: "12px 32px",
                fontSize: "12px",
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: "bold",
                letterSpacing: "0.14em",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                [EXECUTE]
              </button>
              <button style={{
                backgroundColor: "transparent",
                color: "#00FF41",
                border: "1px solid #008F11",
                padding: "12px 32px",
                fontSize: "12px",
                fontFamily: "'Courier New', Courier, monospace",
                letterSpacing: "0.14em",
                cursor: "pointer",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00FF41"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#008F11"; }}
              >
                ▶ man ghost_shell
              </button>
            </div>
          </div>
        </section>

        {/* ── SYSTEM STATUS ──────────────────────────────────────────────── */}
        <section style={{ padding: "80px 40px", borderTop: "1px solid #003300" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ color: "#008F11", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}>
              ■ SECTION_02
            </div>
            <h2 style={{ color: "#00FF41", fontSize: "clamp(22px, 3vw, 36px)", marginBottom: "48px", letterSpacing: "0.08em", fontWeight: "normal" }}>
              SYSTEM_STATUS
            </h2>

            <TerminalWindow title="status.sh — live readout">
              <div style={{ color: "#008F11", fontSize: "11px", marginBottom: "24px", letterSpacing: "0.08em" }}>
                $ ./status.sh --verbose --live
              </div>
              <ProgressBar pct={99.99} label="UPTIME" value="99.99%" />
              <ProgressBar pct={12}    label="THREAT_LEVEL" value="LOW / NOMINAL" />
              <ProgressBar pct={91}    label="CLIENTS_ACTIVE" value="2,847" />
              <ProgressBar pct={78}    label="COMMITS_TOTAL" value="84,291" />
              <ProgressBar pct={100}   label="CVE_PATCHES_APPLIED" value="1,204 / 1,204" />
              <div style={{ marginTop: "28px", color: "#008F11", fontSize: "11px", letterSpacing: "0.08em" }}>
                <div style={{ marginBottom: "6px" }}>last_heartbeat:  {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC</div>
                <div>daemon_status:   <span style={{ color: "#00FF41" }}>RUNNING (PID 4291)</span></div>
              </div>
            </TerminalWindow>
          </div>
        </section>

        {/* ── MODULES ────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 40px", borderTop: "1px solid #003300" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ color: "#008F11", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}>
              ■ SECTION_03
            </div>
            <h2 style={{ color: "#00FF41", fontSize: "clamp(22px, 3vw, 36px)", marginBottom: "12px", letterSpacing: "0.08em", fontWeight: "normal" }}>
              MODULES
            </h2>
            <div style={{ color: "#008F11", fontSize: "12px", marginBottom: "48px", letterSpacing: "0.08em" }}>
              $ ls -1 /etc/ghost_shell/modules/
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {MODULES.map((mod) => (
                <TerminalWindow key={mod.id} title={mod.id}>
                  <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#00FF41", fontSize: "16px", fontWeight: "bold", letterSpacing: "0.04em" }}>
                      {mod.name}
                    </span>
                    <span style={{
                      border: "1px solid #008F11",
                      color: "#008F11",
                      fontSize: "9px",
                      padding: "2px 8px",
                      letterSpacing: "0.14em",
                    }}>{mod.tag}</span>
                  </div>
                  <div style={{ color: "#008F11", fontSize: "12px", lineHeight: "1.7", marginBottom: "20px", letterSpacing: "0.04em" }}>
                    {mod.synopsis}
                  </div>
                  <div style={{ borderTop: "1px solid #002200", paddingTop: "16px" }}>
                    {mod.config.map((line, i) => (
                      <div key={i} style={{ color: "#005500", fontSize: "11px", lineHeight: "1.9", letterSpacing: "0.04em" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                  <button style={{
                    marginTop: "20px",
                    backgroundColor: "transparent",
                    border: "1px solid #003300",
                    color: "#008F11",
                    fontSize: "10px",
                    padding: "7px 14px",
                    fontFamily: "'Courier New', Courier, monospace",
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#00FF41"; e.currentTarget.style.borderColor = "#008F11" }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#008F11"; e.currentTarget.style.borderColor = "#003300" }}
                  >
                    ▶ man {mod.name}
                  </button>
                </TerminalWindow>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPERATIONS ─────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 40px", borderTop: "1px solid #003300" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ color: "#008F11", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}>
              ■ SECTION_04
            </div>
            <h2 style={{ color: "#00FF41", fontSize: "clamp(22px, 3vw, 36px)", marginBottom: "12px", letterSpacing: "0.08em", fontWeight: "normal" }}>
              OPERATIONS
            </h2>
            <div style={{ color: "#008F11", fontSize: "12px", marginBottom: "36px", letterSpacing: "0.08em" }}>
              $ ls -la /ops/classified/
            </div>

            <TerminalWindow title="ops_log.sh — classified directory">
              <div style={{ color: "#008F11", fontSize: "11px", marginBottom: "20px", letterSpacing: "0.08em" }}>
                total {OPERATIONS.length} entries &nbsp;·&nbsp; clearance required: TOP SECRET
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #002200" }}>
                      {["DATE", "PERMISSIONS", "SIZE", "OPERATION", "DESCRIPTION"].map(h => (
                        <th key={h} style={{
                          textAlign: "left",
                          color: "#005500",
                          padding: "6px 16px 10px 0",
                          fontWeight: "normal",
                          letterSpacing: "0.12em",
                          fontSize: "10px",
                          whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {OPERATIONS.map((op, i) => (
                      <tr key={i}
                        style={{ cursor: "pointer", transition: "background 0.1s" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#001200")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td style={{ color: "#008F11", padding: "10px 16px 10px 0", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{op.date}</td>
                        <td style={{ color: "#005500", padding: "10px 16px 10px 0", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{op.perms}</td>
                        <td style={{ color: "#008F11", padding: "10px 16px 10px 0", whiteSpace: "nowrap", textAlign: "right", paddingRight: "24px" }}>{op.size}</td>
                        <td style={{ color: "#00FF41", padding: "10px 16px 10px 0", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{op.name}</td>
                        <td style={{ color: "#005500", padding: "10px 0", letterSpacing: "0.04em" }}># {op.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TerminalWindow>
          </div>
        </section>

        {/* ── WHOAMI ─────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 40px", borderTop: "1px solid #003300" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ color: "#008F11", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}>
              ■ SECTION_05
            </div>
            <h2 style={{ color: "#00FF41", fontSize: "clamp(22px, 3vw, 36px)", marginBottom: "48px", letterSpacing: "0.08em", fontWeight: "normal" }}>
              WHOAMI
            </h2>

            <TerminalWindow title="whoami.sh — identity disclosure">
              <div style={{ marginBottom: "20px" }}>
                <span style={{ color: "#008F11", fontSize: "12px", letterSpacing: "0.06em" }}>ghost@shell:~$ </span>
                <span style={{ color: "#00FF41", fontSize: "12px", letterSpacing: "0.06em" }}>whoami --verbose</span>
              </div>

              <div style={{ borderLeft: "2px solid #003300", paddingLeft: "20px", marginBottom: "28px" }}>
                {[
                  ["uid",       "0(ghost) gid=0(root) groups=0(root),4(adm),27(sudo)"],
                  ["shell",     "/bin/ghost_shell"],
                  ["hostname",  "ghost-prod-01.internal"],
                  ["uptime",    "847 days, 14:22:09"],
                  ["clearance", "CLASSIFIED / SAP ACCESS"],
                ].map(([key, val]) => (
                  <div key={key} style={{ display: "flex", gap: "12px", fontSize: "12px", lineHeight: "1.9", letterSpacing: "0.04em" }}>
                    <span style={{ color: "#005500", minWidth: "90px" }}>{key}:</span>
                    <span style={{ color: "#008F11" }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ color: "#008F11", fontSize: "13px", lineHeight: "1.9", letterSpacing: "0.04em" }}>
                <p style={{ marginBottom: "16px" }}>
                  # Ghost Shell is a stealth-first engineering collective operating at the intersection
                  # of offensive security and product design. We build systems that resist adversaries
                  # by design — not as an afterthought.
                </p>
                <p style={{ marginBottom: "16px" }}>
                  # Our team has shipped infrastructure for red-team operations, zero-trust enterprise
                  # dashboards, and anonymized deployment pipelines used by 2,847+ clients across
                  # 38 jurisdictions.
                </p>
                <p>
                  # We don&apos;t leave traces. <span style={{ color: "#00FF41" }}>That&apos;s the point.</span>
                </p>
              </div>
            </TerminalWindow>
          </div>
        </section>

        {/* ── PING / CONTACT ─────────────────────────────────────────────── */}
        <section style={{ padding: "80px 40px", borderTop: "1px solid #003300" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ color: "#008F11", fontSize: "11px", letterSpacing: "0.2em", marginBottom: "8px" }}>
              ■ SECTION_06
            </div>
            <h2 style={{ color: "#00FF41", fontSize: "clamp(22px, 3vw, 36px)", marginBottom: "48px", letterSpacing: "0.08em", fontWeight: "normal" }}>
              PING
            </h2>

            <TerminalWindow title="ping.sh — establish connection">
              <div style={{ marginBottom: "28px", fontSize: "13px", color: "#008F11", letterSpacing: "0.06em" }}>
                <div>ghost@shell:~$ ping ghost@shell.io</div>
                <div style={{ color: "#005500", marginTop: "6px" }}>PING ghost@shell.io 56 bytes of data.</div>
                <div style={{ color: "#005500" }}>64 bytes from ghost@shell.io: icmp_seq=0 ttl=64 time=0.42 ms</div>
                <div style={{ color: "#00FF41", marginTop: "6px" }}>--- ghost@shell.io ping statistics ---</div>
                <div style={{ color: "#005500" }}>1 packets transmitted, 1 received, 0.0% packet loss</div>
              </div>

              <div style={{ borderTop: "1px solid #002200", paddingTop: "28px" }}>
                <div style={{ color: "#008F11", fontSize: "12px", marginBottom: "16px", letterSpacing: "0.06em" }}>
                  ghost@shell:~$ establish_connection --encrypted
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#008F11", fontSize: "11px", marginBottom: "8px", letterSpacing: "0.12em" }}>
                    ▶ YOUR_EMAIL_ADDR:
                  </label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid #008F11", backgroundColor: "#000" }}>
                    <span style={{ color: "#008F11", padding: "10px 12px", fontSize: "12px", whiteSpace: "nowrap" }}>
                      input@
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="user@domain.tld"
                      style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#00FF41",
                        fontSize: "13px",
                        fontFamily: "'Courier New', Courier, monospace",
                        padding: "10px 4px",
                        letterSpacing: "0.06em",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", color: "#008F11", fontSize: "11px", marginBottom: "8px", letterSpacing: "0.12em" }}>
                    ▶ MESSAGE_PAYLOAD:
                  </label>
                  <div style={{ border: "1px solid #008F11", backgroundColor: "#000" }}>
                    <textarea
                      rows={4}
                      placeholder="# enter your message here..."
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#00FF41",
                        fontSize: "13px",
                        fontFamily: "'Courier New', Courier, monospace",
                        padding: "10px 14px",
                        letterSpacing: "0.04em",
                        resize: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <button style={{
                  backgroundColor: "#00FF41",
                  color: "#000",
                  border: "none",
                  padding: "12px 36px",
                  fontSize: "12px",
                  fontFamily: "'Courier New', Courier, monospace",
                  fontWeight: "bold",
                  letterSpacing: "0.16em",
                  cursor: "pointer",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  [EXECUTE]
                </button>
              </div>
            </TerminalWindow>
          </div>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid #003300",
        padding: "24px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        backgroundColor: "rgba(0,0,0,0.96)",
      }}>
        <span style={{ color: "#008F11", fontSize: "12px", letterSpacing: "0.08em" }}>
          &gt; logout // Ghost Shell © 2026 // All systems nominal
        </span>
        <span style={{ color: "#003300", fontSize: "11px", letterSpacing: "0.06em" }}>
          [GHOST_SHELL v2.4.1] · uptime: 847d · PID 4291 · AES-256-GCM
        </span>
      </footer>

    </div>
  )
}
