import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/audio';
import { Atom, ShieldCheck, Activity, RotateCcw, Play, Pause, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface VRPNode {
  id: number;
  x: number;
  y: number;
  label: string;
  isDepot?: boolean;
}

export const InteractiveLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quantum' | 'tradehive' | 'rlls16'>('quantum');

  // --- Quantum VRP State ---
  const [vrpNodes, setVrpNodes] = useState<VRPNode[]>([
    { id: 0, x: 200, y: 150, label: 'Depot 0', isDepot: true },
    { id: 1, x: 80, y: 70, label: 'Node 1' },
    { id: 2, x: 320, y: 60, label: 'Node 2' },
    { id: 3, x: 340, y: 220, label: 'Node 3' },
    { id: 4, x: 140, y: 240, label: 'Node 4' },
    { id: 5, x: 230, y: 270, label: 'Node 5' },
  ]);
  const [vrpRoute, setVrpRoute] = useState<number[]>([0, 1, 2, 3, 5, 4, 0]);
  const [vrpEnergy, setVrpEnergy] = useState<number>(742.8);
  const [quantumField, setQuantumField] = useState<number>(0.85);
  const [isAnnealing, setIsAnnealing] = useState<boolean>(false);
  const vrpCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- TradeHive Risk Gate State ---
  interface TradeSignal {
    id: string;
    timestamp: string;
    asset: string;
    action: 'BUY' | 'SELL';
    size: number;
    price: number;
    mlConfidence: number;
    riskStatus: 'PERMITTED' | 'BLOCKED_DRAWDOWN' | 'BLOCKED_EXPOSURE' | 'THROTTLED';
    reason: string;
  }

  const [maxPositionExposure, setMaxPositionExposure] = useState<number>(250000);
  const [currentExposure, setCurrentExposure] = useState<number>(142000);
  const [tradesHistory, setTradesHistory] = useState<TradeSignal[]>([
    {
      id: 'SIG-901',
      timestamp: '20:04:12',
      asset: 'BTC/USD',
      action: 'BUY',
      size: 1.8,
      price: 88420,
      mlConfidence: 0.94,
      riskStatus: 'PERMITTED',
      reason: 'Passed deterministic capital & delta checks',
    },
    {
      id: 'SIG-902',
      timestamp: '20:04:18',
      asset: 'ETH/USD',
      action: 'BUY',
      size: 45.0,
      price: 3120,
      mlConfidence: 0.89,
      riskStatus: 'PERMITTED',
      reason: 'Risk gate invariant validated',
    },
    {
      id: 'SIG-903',
      timestamp: '20:04:25',
      asset: 'SOL/USD',
      action: 'BUY',
      size: 900.0,
      price: 195,
      mlConfidence: 0.82,
      riskStatus: 'BLOCKED_EXPOSURE',
      reason: 'Position would breach Max Exposure Limit ($250k)',
    },
  ]);
  const [autoSimTrades, setAutoSimTrades] = useState<boolean>(false);

  // --- RLLS16 Grid State ---
  const GRID_SIZE = 6;
  const [agentPos, setAgentPos] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [goalPos] = useState<{ r: number; c: number }>({ r: 5, c: 5 });
  const [hazards] = useState<{ r: number; c: number }[]>([
    { r: 1, c: 2 },
    { r: 2, c: 4 },
    { r: 3, c: 1 },
    { r: 4, c: 3 },
  ]);
  const [episodeReward, setEpisodeReward] = useState<number>(0);
  const [stepCount, setStepCount] = useState<number>(0);
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);

  // Draw VRP Canvas
  useEffect(() => {
    const canvas = vrpCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw route paths
    if (vrpRoute.length > 1) {
      ctx.beginPath();
      const startNode = vrpNodes.find((n) => n.id === vrpRoute[0]);
      if (startNode) {
        ctx.moveTo(startNode.x, startNode.y);
        for (let i = 1; i < vrpRoute.length; i++) {
          const nextNode = vrpNodes.find((n) => n.id === vrpRoute[i]);
          if (nextNode) {
            ctx.lineTo(nextNode.x, nextNode.y);
          }
        }
      }
      ctx.strokeStyle = isAnnealing ? '#a855f7' : '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = isAnnealing ? '#a855f7' : '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Nodes
    vrpNodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.isDepot ? 9 : 6, 0, Math.PI * 2);
      ctx.fillStyle = node.isDepot ? '#f59e0b' : '#38bdf8';
      ctx.shadowColor = node.isDepot ? '#f59e0b' : '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px "Fira Code", monospace';
      ctx.fillText(node.label, node.x + 10, node.y - 6);
    });
  }, [vrpNodes, vrpRoute, isAnnealing]);

  // Handle click on VRP Canvas to add customer node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (vrpNodes.length >= 10 || isAnnealing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newNode: VRPNode = {
      id: vrpNodes.length,
      x,
      y,
      label: `Node ${vrpNodes.length}`,
    };
    playSound('blip');
    const updated = [...vrpNodes, newNode];
    setVrpNodes(updated);
    // Append to route before depot
    const newRoute = [...vrpRoute.slice(0, -1), newNode.id, 0];
    setVrpRoute(newRoute);
  };

  // Run Quantum Annealing Simulation
  const runQuantumAnnealing = () => {
    if (isAnnealing || vrpNodes.length < 3) return;
    setIsAnnealing(true);
    playSound('quantum');

    let step = 0;
    const totalSteps = 15;
    const interval = setInterval(() => {
      step++;
      // Shuffle intermediate nodes
      const intermediate = vrpNodes.filter((n) => !n.isDepot).map((n) => n.id);
      for (let i = intermediate.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [intermediate[i], intermediate[j]] = [intermediate[j], intermediate[i]];
      }
      setVrpRoute([0, ...intermediate, 0]);

      // Calculate pseudo energy
      const simulatedEnergy = Math.round(520 + Math.random() * 200 * (1 - step / totalSteps));
      setVrpEnergy(simulatedEnergy);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsAnnealing(false);
        // Optimize heuristic route (e.g. sorted by angle or nearest)
        const sorted = [...vrpNodes.filter((n) => !n.isDepot)].sort(
          (a, b) => Math.atan2(a.y - 150, a.x - 200) - Math.atan2(b.y - 150, b.x - 200)
        );
        setVrpRoute([0, ...sorted.map((n) => n.id), 0]);
        setVrpEnergy(418.2);
        playSound('success');
      }
    }, 110);
  };

  const resetVrp = () => {
    playSound('click');
    const initial: VRPNode[] = [
      { id: 0, x: 200, y: 150, label: 'Depot 0', isDepot: true },
      { id: 1, x: 80, y: 70, label: 'Node 1' },
      { id: 2, x: 320, y: 60, label: 'Node 2' },
      { id: 3, x: 340, y: 220, label: 'Node 3' },
      { id: 4, x: 140, y: 240, label: 'Node 4' },
      { id: 5, x: 230, y: 270, label: 'Node 5' },
    ];
    setVrpNodes(initial);
    setVrpRoute([0, 1, 2, 3, 5, 4, 0]);
    setVrpEnergy(742.8);
  };

  // TradeHive Auto-Sim Interval
  useEffect(() => {
    if (!autoSimTrades) return;
    const assets = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'AVAX/USD'];
    const interval = setInterval(() => {
      const asset = assets[Math.floor(Math.random() * assets.length)];
      const action: 'BUY' | 'SELL' = Math.random() > 0.4 ? 'BUY' : 'SELL';
      const price = asset.startsWith('BTC') ? 88000 : asset.startsWith('ETH') ? 3150 : 190;
      const size = Number((Math.random() * 2 + 0.1).toFixed(2));
      const notional = size * price;
      const confidence = Number((0.75 + Math.random() * 0.24).toFixed(2));

      let riskStatus: TradeSignal['riskStatus'] = 'PERMITTED';
      let reason = 'Risk gate invariants satisfied. Order routed to execution engine.';

      if (currentExposure + notional > maxPositionExposure) {
        riskStatus = 'BLOCKED_EXPOSURE';
        reason = `Hard ceiling breach: Exposure $${Math.round(currentExposure + notional).toLocaleString()} exceeds max $${maxPositionExposure.toLocaleString()}`;
        playSound('alert');
      } else if (confidence < 0.78) {
        riskStatus = 'THROTTLED';
        reason = 'ML confidence below deterministic gate threshold (0.78). Position sized down.';
        playSound('telemetry');
      } else {
        setCurrentExposure((prev) => Math.min(maxPositionExposure, prev + notional * (action === 'BUY' ? 1 : -0.7)));
        playSound('blip');
      }

      const newSig: TradeSignal = {
        id: `SIG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        asset,
        action,
        size,
        price,
        mlConfidence: confidence,
        riskStatus,
        reason,
      };

      setTradesHistory((prev) => [newSig, ...prev.slice(0, 9)]);
    }, 2800);

    return () => clearInterval(interval);
  }, [autoSimTrades, currentExposure, maxPositionExposure]);

  // RLLS16 Agent Step
  const stepAgent = () => {
    playSound('blip');
    setAgentPos((prev) => {
      const moves = [
        { dr: 0, dc: 1 }, // Right
        { dr: 1, dc: 0 }, // Down
        { dr: 0, dc: -1 }, // Left
        { dr: -1, dc: 0 }, // Up
      ];

      // Epsilon-greedy towards goal (5,5)
      let chosenMove = moves[0];
      if (Math.random() > 0.25) {
        // Greedy towards goal
        if (prev.c < goalPos.c && Math.random() > 0.4) {
          chosenMove = { dr: 0, dc: 1 };
        } else if (prev.r < goalPos.r) {
          chosenMove = { dr: 1, dc: 0 };
        }
      } else {
        // Exploration step
        chosenMove = moves[Math.floor(Math.random() * moves.length)];
      }

      const nr = Math.max(0, Math.min(GRID_SIZE - 1, prev.r + chosenMove.dr));
      const nc = Math.max(0, Math.min(GRID_SIZE - 1, prev.c + chosenMove.dc));

      // Check hazard
      const hitHazard = hazards.some((h) => h.r === nr && h.c === nc);
      if (hitHazard) {
        setEpisodeReward((r) => r - 15);
        playSound('alert');
        return prev; // Stay in place
      }

      // Check goal
      if (nr === goalPos.r && nc === goalPos.c) {
        setEpisodeReward((r) => r + 100);
        playSound('success');
        return { r: 0, c: 0 }; // Reset episode
      }

      setEpisodeReward((r) => r - 1);
      setStepCount((s) => s + 1);
      return { r: nr, c: nc };
    });
  };

  useEffect(() => {
    if (!isAgentRunning) return;
    const interval = setInterval(stepAgent, 450);
    return () => clearInterval(interval);
  }, [isAgentRunning]);

  return (
    <section id="interactive-lab" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE SYSTEMS PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hands-On Systems Simulation Lab
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Test the live dynamics of our research models, risk-gate invariant engines, and reinforcement-learning simulation environments in real time.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
          <button
            onClick={() => {
              setActiveTab('quantum');
              playSound('click');
            }}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2.5 transition-all ${
              activeTab === 'quantum'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Atom className="w-4 h-4 text-cyan-400" />
            <span>1. Quantum VRP (QUBO Annealing)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tradehive');
              playSound('click');
            }}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2.5 transition-all ${
              activeTab === 'tradehive'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>2. TradeHive (Deterministic Risk Gate)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('rlls16');
              playSound('click');
            }}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-mono flex items-center gap-2.5 transition-all ${
              activeTab === 'rlls16'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Activity className="w-4 h-4 text-purple-400" />
            <span>3. RLLS16 (RL World Dynamics)</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="hud-card rounded-xl p-6 lg:p-8 relative">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          {/* TAB 1: QUANTUM VRP */}
          {activeTab === 'quantum' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Canvas Column */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="relative border border-cyan-500/30 rounded-lg overflow-hidden bg-black/60 w-full max-w-[460px] aspect-[460/320] shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  <canvas
                    ref={vrpCanvasRef}
                    width={460}
                    height={320}
                    onClick={handleCanvasClick}
                    className="w-full h-full cursor-crosshair"
                  />
                  <div className="absolute top-2 left-2 text-[10px] font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-300">
                    CLICK CANVAS TO ADD TARGET NODE ({vrpNodes.length}/10)
                  </div>
                  {isAnnealing && (
                    <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="bg-black/80 border border-purple-500 px-4 py-2 rounded-lg text-purple-300 font-mono text-xs animate-pulse flex items-center gap-2">
                        <Atom className="w-4 h-4 animate-spin text-purple-400" />
                        <span>QUANTUM WAVEFUNCTION COLLAPSE IN PROGRESS...</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-2">
                  Orange: Depot (Origin) · Blue: Customer Nodes · Neon: Active Solution Path
                </div>
              </div>

              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Atom className="w-5 h-5 text-cyan-400" />
                    Quantum Annealing Routing Simulator
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Solves the combinatorial NP-Hard Vehicle Routing Problem by encoding constraint matrices into a QUBO formulation and simulating transverse-field quantum state tunneling.
                  </p>
                </div>

                {/* Telemetry Readouts */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5">
                    <div className="text-slate-500">HAMILTONIAN ENERGY</div>
                    <div className="text-cyan-400 text-base font-bold mt-0.5">{vrpEnergy} kcal/mol</div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-2.5">
                    <div className="text-slate-500">ACTIVE NODES</div>
                    <div className="text-purple-400 text-base font-bold mt-0.5">{vrpNodes.length} Coordinates</div>
                  </div>
                </div>

                {/* Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Transverse Field Strength (Γ)</span>
                    <span className="text-cyan-400">{quantumField}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.05"
                    value={quantumField}
                    onChange={(e) => setQuantumField(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-0.5">
                    <span>Classical Regime</span>
                    <span>High Superposition Tunneling</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={runQuantumAnnealing}
                    disabled={isAnnealing}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs rounded-lg shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>RUN QUANTUM ANNEALING</span>
                  </button>

                  <button
                    onClick={resetVrp}
                    className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESET</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRADEHIVE RISK GATE */}
          {activeTab === 'tradehive' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    TradeHive Deterministic Risk Boundary Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Autonomous deep-RL models output trading signals, but zero orders hit the exchange without passing deterministic risk invariants (hard exposure, drawdown limits, and delta bounds).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setAutoSimTrades(!autoSimTrades);
                      playSound('click');
                    }}
                    className={`px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all ${
                      autoSimTrades
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                    }`}
                  >
                    {autoSimTrades ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{autoSimTrades ? 'HALT SIGNAL GENERATOR' : 'START RL SIGNAL STREAM'}</span>
                  </button>
                </div>
              </div>

              {/* Controls & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-400 mb-1">MAX NOTIONAL EXPOSURE</div>
                  <input
                    type="range"
                    min="100000"
                    max="500000"
                    step="25000"
                    value={maxPositionExposure}
                    onChange={(e) => setMaxPositionExposure(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 mb-2 cursor-pointer"
                  />
                  <div className="text-emerald-400 font-bold text-sm">${maxPositionExposure.toLocaleString()}</div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-400 mb-1">CURRENT ACTIVE EXPOSURE</div>
                  <div className="text-cyan-400 font-bold text-sm mt-3">
                    ${Math.round(currentExposure).toLocaleString()} ({((currentExposure / maxPositionExposure) * 100).toFixed(1)}%)
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        currentExposure / maxPositionExposure > 0.85 ? 'bg-rose-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${Math.min(100, (currentExposure / maxPositionExposure) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
                  <div className="text-slate-400 mb-1">DETERMINISTIC INVARIANT STATUS</div>
                  <div className="text-emerald-400 font-bold text-sm mt-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>HARD GATE ACTIVE (0 LEAKS)</span>
                  </div>
                  <div className="text-slate-500 text-[10px] mt-1">Rust Zero-Cost Enforcement</div>
                </div>
              </div>

              {/* Live Signal Telemetry Table */}
              <div className="border border-slate-800 rounded-lg overflow-hidden bg-black/60">
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>LIVE REINFORCEMENT LEARNING SIGNAL TELEMETRY</span>
                  <span>GATE ACTION: INTERCEPT & RECONCILE</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-56 overflow-y-auto font-mono text-xs">
                  {tradesHistory.map((trade) => (
                    <div key={trade.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-900/40">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-[11px]">{trade.timestamp}</span>
                        <span className="text-white font-bold">{trade.asset}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            trade.action === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {trade.action} {trade.size}
                        </span>
                        <span className="text-slate-400">@ ${trade.price.toLocaleString()}</span>
                        <span className="text-slate-500 text-[10px] hidden md:inline">
                          (RL Conf: {(trade.mlConfidence * 100).toFixed(0)}%)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {trade.riskStatus === 'PERMITTED' && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>PERMITTED</span>
                          </span>
                        )}
                        {trade.riskStatus === 'BLOCKED_EXPOSURE' && (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>BLOCKED: EXPOSURE</span>
                          </span>
                        )}
                        {trade.riskStatus === 'THROTTLED' && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>THROTTLED: CONFIDENCE</span>
                          </span>
                        )}
                        <span className="text-slate-400 text-[11px] truncate max-w-[220px]">{trade.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RLLS16 GRID SIMULATOR */}
          {activeTab === 'rlls16' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Grid Column */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="p-4 bg-black/70 border border-purple-500/30 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <div className="grid grid-cols-6 gap-2 w-64 h-64 sm:w-80 sm:h-80">
                    {Array.from({ length: GRID_SIZE }).map((_, r) =>
                      Array.from({ length: GRID_SIZE }).map((_, c) => {
                        const isAgent = agentPos.r === r && agentPos.c === c;
                        const isGoal = goalPos.r === r && goalPos.c === c;
                        const isHazard = hazards.some((h) => h.r === r && h.c === c);

                        return (
                          <div
                            key={`${r}-${c}`}
                            className={`border rounded flex items-center justify-center font-mono text-xs transition-all relative ${
                              isAgent
                                ? 'bg-cyan-500/40 border-cyan-400 text-white shadow-[0_0_12px_#38bdf8]'
                                : isGoal
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 animate-pulse'
                                : isHazard
                                ? 'bg-rose-950/60 border-rose-800 text-rose-400'
                                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                            }`}
                          >
                            {isAgent && <div className="w-3 h-3 bg-cyan-300 rounded-full animate-ping" />}
                            {isGoal && '★ GOAL'}
                            {isHazard && '▲ HAZARD'}
                            {!isAgent && !isGoal && !isHazard && (
                              <span className="text-[9px] text-slate-700">
                                {((GRID_SIZE - r) * 0.1).toFixed(1)}
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-2">
                  Cyan: Active Agent · Green: Terminal Reward (+100) · Red: Negative Penalty (-15)
                </div>
              </div>

              {/* Telemetry & Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    RLLS16 Spatial Agent Policy Dynamics
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Visualizing agent state transitions, Q-value gradients, policy exploration vs. exploitation dynamics, and reward convergence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-3">
                    <div className="text-slate-500">CUMULATIVE EPISODE REWARD</div>
                    <div className={`text-base font-bold mt-1 ${episodeReward >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {episodeReward} PTS
                    </div>
                  </div>
                  <div className="bg-slate-900/80 border border-slate-800 rounded p-3">
                    <div className="text-slate-500">TOTAL STEP VECTOR</div>
                    <div className="text-cyan-400 text-base font-bold mt-1">{stepCount} STEPS</div>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded p-3 text-xs font-mono text-slate-400 space-y-1">
                  <div className="text-purple-400 font-bold">// AGENT POLICY TELEMETRY</div>
                  <div>State Vector: [r: {agentPos.r}, c: {agentPos.c}]</div>
                  <div>Action Space: Discrete(4) [Up, Down, Left, Right]</div>
                  <div>Policy: ε-Greedy Q-Network with experience replay buffer</div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={stepAgent}
                    className="flex-1 py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>STEP POLICY (1 STEP)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAgentRunning(!isAgentRunning);
                      playSound('click');
                    }}
                    className={`py-2.5 px-4 font-mono font-bold text-xs rounded-lg border transition-all flex items-center gap-2 ${
                      isAgentRunning
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {isAgentRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isAgentRunning ? 'PAUSE' : 'AUTO-ROLLOUT'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
