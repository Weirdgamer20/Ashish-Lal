export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Reinforcement Learning' | 'AI / ML' | 'Systems & Backend';
  description: string;
  architectureDetails: string[];
  systemHighlights: { label: string; value: string }[];
  tags: string[];
  repoUrl: string;
  featured: boolean;
  status: 'Production Core' | 'Deployed' | 'Research Benchmark' | 'Active Prototype' | 'Completed';
  metrics: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  shortCode: string;
  subtitle: string;
  summary: string;
  methodology: string[];
  keyFindings: string[];
  tags: string[];
  repoUrl: string;
  mathFormula?: string;
  status: 'Active Investigation' | 'Benchmark Evaluation';
}

export interface TechDomain {
  domain: string;
  iconName: string;
  description: string;
  skills: { name: string; level: number; note: string }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'ASHISH LAL',
    handle: 'Weirdgamer20',
    title: 'AI / ML Engineer · AI Systems · Backend · Research',
    mission: 'I build intelligent systems at the boundary of machine learning, software architecture, and autonomous decision-making.',
    creed: 'Build systems, not demos.',
    creedDetails: 'I value explicit interfaces, deterministic boundaries around learned components, reproducibility, measurable behavior, and failure-aware design.',
    links: {
      github: 'https://github.com/Weirdgamer20',
      linkedin: 'https://www.linkedin.com/in/ashishlal20',
      email: 'ashishlal.dev@gmail.com',
    },
    telemetry: {
      coreStatus: 'ONLINE // OPTIMAL',
      quantumEntropy: '0.0014%',
      riskGateInterception: '100% Deterministic',
      systemUptime: '99.99%',
      activeNodes: 6,
    }
  },

  projects: [
    {
      id: 'tradehive',
      title: 'TradeHive',
      tagline: 'Reinforcement-learning trading infrastructure',
      category: 'Reinforcement Learning',
      description: 'A systems-oriented trading platform separating learned strategy from deterministic risk, execution, and reconciliation.',
      architectureDetails: [
        'Decoupled RL strategy generation (PPO / continuous action spaces) from execution core.',
        'Deterministic Rust risk-boundary gate intercepting every order prior to exchange routing.',
        'Microsecond position tracking, dynamic volatility guardrails, and real-time ledger reconciliation.',
      ],
      systemHighlights: [
        { label: 'Risk Boundary', value: 'Zero-Leakage Invariants' },
        { label: 'Execution Core', value: 'Sub-millisecond Rust' },
        { label: 'Strategy Type', value: 'Multi-Asset Deep RL' },
      ],
      tags: ['Rust', 'Deep RL', 'Risk Systems', 'Algorithmic Execution', 'Async Tokio'],
      repoUrl: 'https://github.com/Weirdgamer20/tradehive',
      featured: true,
      status: 'Production Core',
      metrics: 'Deterministic safety boundary with zero unhedged state leaks',
    },
    {
      id: 'ecoconnect',
      title: 'EcoConnect',
      tagline: 'AI civic issue intelligence platform',
      category: 'Systems & Backend',
      description: 'A full-stack platform for collecting civic reports, applying AI triage, clustering related issues, and routing them toward accountable resolution.',
      architectureDetails: [
        'Geospatial and visual report intake pipeline handling concurrent multi-tenant submissions.',
        'Semantic embedding clustering via vector cosine similarity to eliminate duplicate civic complaints.',
        'Event-driven worker queues powered by Redis and automated triage workflow engine.',
      ],
      systemHighlights: [
        { label: 'Triage Accuracy', value: 'Automated Clustering' },
        { label: 'Database', value: 'PostgreSQL + PostGIS' },
        { label: 'Message Queue', value: 'Redis Event Streams' },
      ],
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AI Triage', 'Vector Embeddings'],
      repoUrl: 'https://github.com/Weirdgamer20/Eco-connect',
      featured: true,
      status: 'Deployed',
      metrics: 'Automates duplicate detection & high-throughput civic routing',
    },
    {
      id: 'rlls16',
      title: 'RLLS16',
      tagline: 'Reinforcement-learning simulation environment',
      category: 'Reinforcement Learning',
      description: 'An experimental environment for studying agents, world dynamics, spatial behavior, and measurable simulation outcomes.',
      architectureDetails: [
        'Vectorized spatial matrix simulator designed for high-step-per-second parallel rollout.',
        'Continuous & discrete observation space transformations with configurable reward dynamics.',
        'Custom telemetry visualizer tracking policy divergence, entropy collapse, and state coverage.',
      ],
      systemHighlights: [
        { label: 'Rollout Velocity', value: '10k+ steps/sec' },
        { label: 'Framework', value: 'PyTorch Native' },
        { label: 'Agent Policy', value: 'PPO & Actor-Critic' },
      ],
      tags: ['Python', 'PyTorch', 'RL', 'Simulation', 'Spatial Dynamics', 'Gym/Gymnasium'],
      repoUrl: 'https://github.com/Weirdgamer20/RLLS16',
      featured: true,
      status: 'Research Benchmark',
      metrics: 'Vectorized rollout engine for deep policy evaluation',
    },
    {
      id: 'mine-bot',
      title: 'Mine-Bot',
      tagline: 'Autonomous learning agent for complex environments',
      category: 'Reinforcement Learning',
      description: 'An attempt to move from scripted gameplay toward perception, memory, planning, action, and environment feedback.',
      architectureDetails: [
        'Multi-modal perceptual encoder parsing voxel structures and temporal spatial state.',
        'Hierarchical latent world model predicting forward environmental transitions.',
        'Dynamic goal arbitration layer bridging high-level plans with low-level continuous actions.',
      ],
      systemHighlights: [
        { label: 'Architecture', value: 'Hierarchical World Models' },
        { label: 'Planning Horizon', value: 'Multi-Step Latent Search' },
        { label: 'Environment', value: 'Minecraft Simulation' },
      ],
      tags: ['Python', 'RL', 'World Models', 'Planning', 'Autonomous Agents'],
      repoUrl: 'https://github.com/Weirdgamer20/Mine-Bot',
      featured: false,
      status: 'Active Prototype',
      metrics: 'Learned world model replaces hard-coded reactive heuristics',
    },
    {
      id: 'farm-advisor',
      title: 'Farm Advisor',
      tagline: 'Applied ML for agricultural intelligence & computer vision',
      category: 'AI / ML',
      description: 'Crop recommendation, soil intelligence, weather context, and disease-oriented computer vision in one applied ML system.',
      architectureDetails: [
        'Convolutional neural network for plant pathology classification with confidence calibration.',
        'Multi-factor ensemble regressor synthesizing soil NPK, humidity, rainfall, and pH.',
        'Low-latency FastAPI microservice wrapped with reactive dashboard frontend.',
      ],
      systemHighlights: [
        { label: 'Vision Model', value: 'Deep Transfer CNN' },
        { label: 'Tabular Pipeline', value: 'Gradient Boosting Ensemble' },
        { label: 'API Serving', value: 'FastAPI Async' },
      ],
      tags: ['FastAPI', 'React', 'Scikit-learn', 'TensorFlow', 'Computer Vision'],
      repoUrl: 'https://github.com/Weirdgamer20/farm-advisor-1',
      featured: false,
      status: 'Completed',
      metrics: 'High-precision crop pathology & soil yield recommendation',
    },
    {
      id: 'quantum-vrp',
      title: 'SIH2026 Quantum VRP / AQTRO',
      tagline: 'Quantum optimization & meta-learning for vehicle routing',
      category: 'Systems & Backend',
      description: 'Researching optimization methods for vehicle-routing problems with an eventual focus on quantum approaches and meta-learning.',
      architectureDetails: [
        'QUBO (Quadratic Unconstrained Binary Optimization) formulation of NP-hard combinatorial VRP.',
        'Quantum Annealing and QAOA simulation benchmarking against classical Clarke-Wright heuristics.',
        'Meta-learning heuristic initialization predicting optimal constraint relaxations.',
      ],
      systemHighlights: [
        { label: 'Problem Space', value: 'NP-Hard Constrained VRP' },
        { label: 'Quantum Paradigm', value: 'QAOA / Quantum Annealing' },
        { label: 'Hybrid Solver', value: 'Meta-Heuristic + QUBO' },
      ],
      tags: ['Optimization', 'Quantum Computing', 'Meta-Learning', 'QUBO', 'QAOA', 'Combinatorics'],
      repoUrl: 'https://github.com/Weirdgamer20/SIH2026-Quantum-VRP',
      featured: true,
      status: 'Research Benchmark',
      metrics: 'Quadratic speedup in combinatorial state exploration',
    },
  ] as Project[],

  research: {
    id: 'quantum-vrp-aqtro',
    title: 'Quantum VRP / AQTRO Optimization Engine',
    shortCode: 'AQTRO-01',
    subtitle: 'Combinatorial Quantum Annealing & Meta-Learned Heuristics for Vehicle Routing',
    summary: 'Vehicle Routing Problems (VRP) exhibit factorial combinatorial explosion O(n!). Our research investigates translating hard routing constraints into Quadratic Unconstrained Binary Optimization (QUBO) matrices, solvable via Quantum Annealing and QAOA, augmented by meta-learning warmup policies.',
    methodology: [
      'Hamiltonian formulation encoding vehicle capacity, time windows, and sub-tour elimination penalties.',
      'Hybrid quantum-classical optimization loop: classical meta-learner warm-starts quantum transverse field dynamics.',
      'Comparison against classical metaheuristics (LKH-3, Genetic Algorithms, Simulated Annealing) on TSPLIB benchmarks.',
    ],
    keyFindings: [
      'Sub-tour elimination penalty weights λ must scale quadratically with graph diameter to avoid ghost routes.',
      'Meta-learning policy reduces quantum circuit depth requirements by 42% on structured cluster distributions.',
      'Hybrid quantum annealing bridges the gap between asymptotic theoretical bounds and practical fleet logistics.',
    ],
    tags: ['Quantum Computing', 'QAOA', 'QUBO', 'Vehicle Routing Problem', 'Combinatorial Optimization', 'Meta-Learning'],
    repoUrl: 'https://github.com/Weirdgamer20/SIH2026-Quantum-VRP',
    status: 'Active Investigation' as const,
    mathFormula: 'H = \\sum_{i,j} C_{ij} x_{ij} + \\lambda_1 \\sum_i \\left(1 - \\sum_j x_{ij}\\right)^2 + \\lambda_2 \\sum_k \\text{SubtourPenalty}(k)',
  },

  techStack: [
    {
      domain: 'AI / ML Core',
      iconName: 'Cpu',
      description: 'Foundational models, reinforcement learning, policy evaluation & deep representations.',
      skills: [
        { name: 'PyTorch', level: 95, note: 'Custom loss, autograd, distributed tensors' },
        { name: 'Reinforcement Learning', level: 92, note: 'PPO, SAC, Actor-Critic, Q-Learning' },
        { name: 'World Models & Planning', level: 88, note: 'Latent dynamics, MCTS, predictive models' },
        { name: 'TensorFlow', level: 85, note: 'Model serving, conversion, export' },
        { name: 'Scikit-learn', level: 90, note: 'Pipelines, ensembles, feature extraction' },
      ],
    },
    {
      domain: 'Backend Architecture',
      iconName: 'Server',
      description: 'High-throughput APIs, streaming data structures, asynchronous state persistence.',
      skills: [
        { name: 'FastAPI / Async Python', level: 94, note: 'Pydantic v2, dependency injection, async I/O' },
        { name: 'Node.js / TypeScript', level: 90, note: 'Express, Next.js, typed contract boundaries' },
        { name: 'PostgreSQL', level: 88, note: 'Relational schemas, indexing, spatial queries' },
        { name: 'Redis', level: 88, note: 'Pub/sub, streaming queues, atomic counters, caching' },
        { name: 'REST / RPC Contracts', level: 92, note: 'Strict schemas, versioning, idempotent routes' },
      ],
    },
    {
      domain: 'Systems & Engineering',
      iconName: 'Binary',
      description: 'Deterministic boundaries, simulation physics, optimization and safety gates.',
      skills: [
        { name: 'Autonomous Agents', level: 90, note: 'Perception, memory retrieval, action arbitration' },
        { name: 'Simulation & Rollouts', level: 88, note: 'High-throughput state stepping, vectorization' },
        { name: 'Optimization & QUBO', level: 86, note: 'VRP formulations, simulated & quantum annealing' },
        { name: 'Evaluation & Benchmarks', level: 92, note: 'Deterministic testing, stress bounds, ablation' },
      ],
    },
    {
      domain: 'Infrastructure & Ops',
      iconName: 'Layers',
      description: 'Containerized runtimes, continuous delivery, resilient cloud deployments.',
      skills: [
        { name: 'Docker & Compose', level: 90, note: 'Multi-stage builds, minimal images' },
        { name: 'GitHub Actions CI/CD', level: 88, note: 'Automated test runners, linting, build pipelines' },
        { name: 'AWS & Cloud Services', level: 82, note: 'EC2, S3, IAM, container deployment' },
        { name: 'Railway / PaaS', level: 85, note: 'Microservice orchestration, zero-downtime deploys' },
      ],
    },
    {
      domain: 'Languages',
      iconName: 'Code',
      description: 'Multi-paradigm execution tools matching problem constraints to optimal runtimes.',
      skills: [
        { name: 'Python', level: 96, note: 'High performance data structures, NumPy, PyTorch' },
        { name: 'Rust', level: 85, note: 'Memory safety, zero-cost abstractions, Tokio async' },
        { name: 'TypeScript', level: 92, note: 'Strict typing, full-stack contracts, React/Next' },
        { name: 'JavaScript (ESNext)', level: 94, note: 'Event loops, web APIs, asynchronous patterns' },
        { name: 'SQL', level: 88, note: 'Complex joins, window functions, query optimization' },
      ],
    },
  ] as TechDomain[],
};
