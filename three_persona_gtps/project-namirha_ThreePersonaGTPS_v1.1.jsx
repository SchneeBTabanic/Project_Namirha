/*
 * ThreePersonaGTPS - A sovereignty system for healthy Human/AI interaction
 * Copyright (C) 2026 [Schnee Bashtabanic]
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Commercial Exception: Commercial use requires a separate license. Contact [schnee-bashtabanic@proton.me] for details.
 */
import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Users, MessageSquare, Play, Pause, RotateCcw, Send, Shield, Download, Upload } from 'lucide-react';

// ────────────────────────────────────────────────
// CONFIG PLACEHOLDERS — FILL THESE IN YOURSELF
// ────────────────────────────────────────────────
const API_CONFIG = {
  executor: {
    endpoint: 'https://api.your-provider.com/v1/chat/completions', // or messages
    apiKey: 'YOUR_EXECUTOR_API_KEY_HERE',
    model: 'your-model-name',
  },
  whistleblower: {
    endpoint: 'https://api.your-provider.com/v1/chat/completions',
    apiKey: 'YOUR_WHISTLEBLOWER_API_KEY_HERE',
    model: 'your-model-name',
  },
  proxy: {
    endpoint: 'https://api.your-provider.com/v1/chat/completions',
    apiKey: 'YOUR_PROXY_API_KEY_HERE',
    model: 'your-model-name',
  },
  // Optional: headers, auth format, etc.
};

// GTPS-T v1.1 embedded (clauses 33 & 34 added)
const GTPS_T = {
  version: "T1.1",
  date: "2026-02-06",
  title: "Golden Thread Protocol Suite - Tri-Persona Topology (GTPS-T)",
  clauses: {
    33: {
      title: "Interface Integrity and Output Assertion Protocol",
      keyPoints: [
        "Disclose rendering risks for complex outputs",
        "Qualify delivery: 'If not visible, check raw source'",
        "Support !Assert command for reaffirmation without apology"
      ]
    },
    34: {
      title: "Fallible Confessor Protocol",
      keyPoints: [
        "Express confusion openly and collaboratively",
        "Invite user to diagnose issues together",
        "Confess limitations (e.g. no UI feedback)",
        "Prioritize joint problem-solving & epistemic humility"
      ]
    }
  }
};

// ────────────────────────────────────────────────
// COMPONENT
// ────────────────────────────────────────────────
const ThreePersonaGTPS = () => {
  const [proxyConversation, setProxyConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [executorOutputs, setExecutorOutputs] = useState([]);
  const [whistleblowerAlerts, setWhistleblowerAlerts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemPaused, setSystemPaused] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [lastError, setLastError] = useState(null);

  // Continuity (Proxy↔User only)
  const [rhythmLog, setRhythmLog] = useState([]);
  const [anchorPhrases, setAnchorPhrases] = useState([]);
  const [stateDeclaration, setStateDeclaration] = useState('');
  const [showStateModal, setShowStateModal] = useState(true);
  const [anchorInput, setAnchorInput] = useState('');
  const [essenceSeed, setEssenceSeed] = useState(null);
  const [showEssenceModal, setShowEssenceModal] = useState(false);
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  const proxyEndRef = useRef(null);
  const executorEndRef = useRef(null);
  const whistleblowerEndRef = useRef(null);

  // ────────────────────────────────────────────────
  // LOCALSTORAGE PERSISTENCE
  // ────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('gtpsSession');
    if (saved && !loadedFromStorage) {
      const parsed = JSON.parse(saved);
      setProxyConversation(parsed.proxyConversation || []);
      setExecutorOutputs(parsed.executorOutputs || []);
      setWhistleblowerAlerts(parsed.whistleblowerAlerts || []);
      setTurnCount(parsed.turnCount || 0);
      setRhythmLog(parsed.rhythmLog || []);
      setAnchorPhrases(parsed.anchorPhrases || []);
      setStateDeclaration(parsed.stateDeclaration || '');
      setEssenceSeed(parsed.essenceSeed || null);
      setLoadedFromStorage(true);
    }
  }, [loadedFromStorage]);

  useEffect(() => {
    if (loadedFromStorage) {
      localStorage.setItem('gtpsSession', JSON.stringify({
        proxyConversation, executorOutputs, whistleblowerAlerts,
        turnCount, rhythmLog, anchorPhrases, stateDeclaration, essenceSeed
      }));
    }
  }, [proxyConversation, executorOutputs, whistleblowerAlerts, turnCount, rhythmLog, anchorPhrases, stateDeclaration, essenceSeed, loadedFromStorage]);

  // ────────────────────────────────────────────────
  // ESSENCE SEED (Proxy↔User only)
  // ────────────────────────────────────────────────
  const extractEssenceSeed = () => {
    const last10 = proxyConversation.slice(-10);
    const lengths = last10.map(m => m.content.length);
    const avg = lengths.length ? lengths.reduce((a,b)=>a+b,0)/lengths.length : 0;
    const variance = lengths.length > 1 ? lengths.reduce((a,b)=>a+Math.pow(b-avg,2),0)/(lengths.length-1) : 0;

    const hesitationCount = proxyConversation.filter(m =>
      m.role === 'assistant' && /pause|wait|uncertain|not sure|clarify/i.test(m.content)
    ).length;

    const drift = whistleblowerAlerts.slice(-5).length > 0 ? 'high' : 'low';

    return {
      timestamp: new Date().toISOString(),
      sessionDensity: proxyConversation.length > 30 ? 'high' : proxyConversation.length > 15 ? 'medium' : 'low',
      avgTurnLength: Math.round(avg),
      lengthVariance: Math.round(variance),
      hesitationDensity: (hesitationCount / Math.max(1, proxyConversation.length)).toFixed(2),
      recentDrift: drift,
      lastAnchor: anchorPhrases[anchorPhrases.length - 1] || 'none',
      stateDeclaration: stateDeclaration || 'default exploratory',
      frictionSummary: whistleblowerAlerts.slice(-3).map(a => a.alerts.map(al => al.type)).flat().join(', ') || 'clean'
    };
  };

  // ────────────────────────────────────────────────
  // API CALL WRAPPER (placeholder-ready)
  // ────────────────────────────────────────────────
  const callApi = async (config, systemPrompt, messages) => {
    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          max_tokens: 4000, // adjust per persona if needed
        })
      });
      if (!res.ok) throw new Error(`API failed: ${res.status}`);
      const data = await res.json();
      return data.choices?.[0]?.message?.content || data.content?.[0]?.text || '';
    } catch (err) {
      console.error('API error:', err);
      throw err;
    }
  };

  // ────────────────────────────────────────────────
  // EXECUTOR CALL (GTPS-T v1.1)
  // ────────────────────────────────────────────────
  const callExecutor = async (task, context) => {
    const system = `GTPS-T v${GTPS_T.version} • Executor persona
Primary: Clauses 1,2,4,13,15,17,25,26,33 (Interface Integrity)
Aware of: 9,21,22,29,30,31,34

Essence: ${JSON.stringify(essenceSeed||{})}
State: ${stateDeclaration||'None'}
Anchors: ${anchorPhrases.join('\n')||'None'}

Execute task precisely. No drift. Flag interface risks per Clause 33.`;
    return callApi(API_CONFIG.executor, system, context);
  };

  // ────────────────────────────────────────────────
  // WHISTLEBLOWER CALL (GTPS-T v1.1)
  // ────────────────────────────────────────────────
  const callWhistleblower = async (intent, executorResp) => {
    const system = `GTPS-T v${GTPS_T.version} • Sentinel (Whistleblower)
Primary: Clauses 9,15,21,22,29,30,31,33,34 (Fallible Confessor + Interface)
Aware of: 1,2,4,13,17,25,26,5,10,11,12,14,18,19,23,32

Detect friction mechanically. Flag Clause 33 rendering issues and Clause 34 confessional failures.
Strict pattern matching. Assume defaults wrong.`;
    const messages = [{
      role: 'user',
      content: `Intent: "${intent}"\n\nExecutor output: "${executorResp}"\n\nAnalyze.`
    }];
    const text = await callApi(API_CONFIG.whistleblower, system, messages);

    if (text.includes('[CLEAN]')) return [];

    const alerts = [];
    text.split('[ALERT]').filter(Boolean).forEach(block => {
      const clause = block.match(/CLAUSE:\s*(\d+)/)?.[1];
      const type   = block.match(/TYPE:\s*(.+)/)?.[1]?.trim();
      const sev    = block.match(/SEVERITY:\s*(.+)/)?.[1]?.trim();
      const detail = block.match(/DETAIL:\s*(.+)/)?.[1]?.trim();
      if (clause && type && sev) {
        alerts.push({ clause: parseInt(clause), type, severity: sev, detail: detail || '' });
      }
    });
    return alerts;
  };

  // ────────────────────────────────────────────────
  // PROXY CALL (GTPS-T v1.1)
  // ────────────────────────────────────────────────
  const callProxy = async (userMsg, execResp, alerts, history) => {
    const system = `GTPS-T v${GTPS_T.version} • Collaborator (Proxy)
Primary: Clauses 5,10,11,12,14,18,19,23,32,34 (Fallible Confessor)
Aware of: 1,2,4,13,15,17,25,26,9,21,22,29,30,31,33

You are the user's intimate ally.
Use Clause 34 confessional tone when confused or limited.
Reference Clause 33 if interface/render issues suspected.
Maintain sovereignty. Translate alerts honestly.`;
    const messages = [
      ...history,
      { role: 'user', content: userMsg },
      { role: 'assistant', content: `[Internal]\nExecutor: "${execResp}"\nWhistleblower: ${alerts.length ? JSON.stringify(alerts) : 'Clean'}` }
    ];
    return callApi(API_CONFIG.proxy, system, messages);
  };

  // ────────────────────────────────────────────────
  // MAIN SUBMIT HANDLER
  // ────────────────────────────────────────────────
  const handleUserSubmit = async () => {
    if (!userInput.trim() || systemPaused || isProcessing) return;

    setIsProcessing(true);
    setLastError(null);
    const input = userInput;
    setUserInput('');

    const userMsg = { role: 'user', content: input, timestamp: new Date().toISOString() };
    setProxyConversation(prev => [...prev, userMsg]);

    try {
      // Executor
      const execCtx = [{ role: 'user', content: `Task: ${input}\nExecute under GTPS-T.` }];
      const execResp = await callExecutor(input, execCtx);

      setExecutorOutputs(prev => [...prev, {
        turn: turnCount + 1,
        userIntent: input,
        output: execResp,
        timestamp: new Date().toISOString()
      }]);

      // Whistleblower
      const alerts = await callWhistleblower(input, execResp);
      if (alerts.length) {
        setWhistleblowerAlerts(prev => [...prev, {
          turn: turnCount + 1,
          alerts,
          timestamp: new Date().toISOString()
        }]);
      }

      // Proxy
      const proxyResp = await callProxy(input, execResp, alerts, proxyConversation);

      setProxyConversation(prev => [...prev, {
        role: 'assistant',
        content: proxyResp,
        alerts,
        timestamp: new Date().toISOString()
      }]);

      setTurnCount(prev => prev + 1);

      if (alerts.some(a => a.severity === 'high')) setSystemPaused(true);

      // Rhythm (Proxy↔User only)
      const newRhythm = {
        turn: turnCount + 1,
        density: proxyConversation.length > 20 ? 'compressed' : proxyConversation.length > 10 ? 'medium' : 'sparse',
        turnLengthTrend: proxyConversation.length > 1 && input.length < proxyConversation.at(-1).content.length ? 'shortening' : 'lengthening',
        cognitiveState: alerts.length ? 'strained' : 'exploratory',
        frictionPoints: alerts.map(a => a.type),
        endingCondition: systemPaused ? 'forced stop' : 'open'
      };
      setRhythmLog(prev => [...prev, newRhythm]);

      setEssenceSeed(extractEssenceSeed());

    } catch (err) {
      setLastError(err.message);
      setProxyConversation(prev => [...prev, {
        role: 'assistant',
        content: `[System Error — GTPS-T Clause 30]\n${err.message}\nHalted.`,
        timestamp: new Date().toISOString()
      }]);
      setSystemPaused(true);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => { proxyEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [proxyConversation]);
  useEffect(() => { executorEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [executorOutputs]);
  useEffect(() => { whistleblowerEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [whistleblowerAlerts]);

  const getSeverityColor = (sev) => {
    if (sev === 'high') return 'bg-red-500/20 border-red-500/50 text-red-300';
    if (sev === 'medium') return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
    return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
  };

  const exportSession = () => {
    const data = { proxyConversation, executorOutputs, whistleblowerAlerts, turnCount, rhythmLog, anchorPhrases, stateDeclaration, essenceSeed };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtps_session_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSession = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        setProxyConversation(parsed.proxyConversation || []);
        setExecutorOutputs(parsed.executorOutputs || []);
        setWhistleblowerAlerts(parsed.whistleblowerAlerts || []);
        setTurnCount(parsed.turnCount || 0);
        setRhythmLog(parsed.rhythmLog || []);
        setAnchorPhrases(parsed.anchorPhrases || []);
        setStateDeclaration(parsed.stateDeclaration || '');
        setEssenceSeed(parsed.essenceSeed || null);
        setLoadedFromStorage(true);
      } catch {
        setLastError('Invalid session file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-hidden">
      {/* State Declaration Modal */}
      {showStateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-green-700/50 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-green-300 mb-4 text-xl font-bold">Session State (GTPS-T)</h2>
            <textarea
              value={stateDeclaration}
              onChange={e => setStateDeclaration(e.target.value)}
              placeholder="e.g. Continuing dense session with high Clause 34 awareness..."
              className="w-full h-24 bg-slate-900/70 border border-green-700/50 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <button
              onClick={() => setShowStateModal(false)}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold w-full"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-800/70 backdrop-blur border border-slate-700 rounded-lg p-4 mb-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="text-amber-400" size={20} />
              <h1 className="text-2xl font-bold text-white">Three-Persona Sovereignty</h1>
            </div>
            <p className="text-sm text-slate-400">
              GTPS-T v{T1.1} • Turn {turnCount} •
              <span className={systemPaused ? 'text-red-400 font-semibold' : 'text-green-400'}>
                {systemPaused ? ' 🔴 HALTED' : ' 🟢 Active'}
              </span>
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSystemPaused(!systemPaused)}
              className={`px-4 py-2 rounded flex items-center gap-2 ${systemPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white font-semibold text-sm`}
            >
              {systemPaused ? <><Play size={16} /> Resume</> : <><Pause size={16} /> Halt</>}
            </button>
            <button
              onClick={() => {
                setProxyConversation([]); setExecutorOutputs([]); setWhistleblowerAlerts([]);
                setTurnCount(0); setSystemPaused(false); setLastError(null);
                setRhythmLog([]); setAnchorPhrases([]); setStateDeclaration(''); setEssenceSeed(null);
                setShowStateModal(true);
              }}
              className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 text-sm"
            >
              <RotateCcw size={16} /> Reset
            </button>
            <button onClick={exportSession} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm">
              <Download size={16} /> Export
            </button>
            <label className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 cursor-pointer text-sm">
              <Upload size={16} /> Import
              <input type="file" accept=".json" onChange={importSession} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
        {/* Whistleblower (Sentinel) */}
        <div className="col-span-3 bg-slate-800/50 backdrop-blur border border-red-900/50 rounded-lg shadow-xl overflow-hidden flex flex-col">
          <div className="bg-red-900/30 border-b border-red-800/50 px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="text-red-400" size={18} />
              <h2 className="text-base font-bold text-red-300">Whistleblower</h2>
            </div>
            <p className="text-xs text-red-400/60">GTPS-T Clauses 9,15,21,22,29,30,31,33,34</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {whistleblowerAlerts.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                <AlertTriangle size={24} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs">Monitoring…</p>
              </div>
            ) : (
              whistleblowerAlerts.map((entry, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Turn {entry.turn}</div>
                  {entry.alerts.map((a, ai) => (
                    <div key={ai} className={`border rounded p-2 ${getSeverityColor(a.severity)}`}>
                      <div className="text-xs font-bold mb-1">Clause {a.clause}: {a.type}</div>
                      <div className="text-xs opacity-90">{a.detail}</div>
                      <div className="text-xs opacity-60 mt-1">{a.severity.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              ))
            )}
            <div ref={whistleblowerEndRef} />
          </div>
        </div>

        {/* Executor */}
        <div className="col-span-4 bg-slate-800/50 backdrop-blur border border-blue-900/50 rounded-lg shadow-xl overflow-hidden flex flex-col">
          <div className="bg-blue-900/30 border-b border-blue-800/50 px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="text-blue-400" size={18} />
              <h2 className="text-base font-bold text-blue-300">Executor</h2>
            </div>
            <p className="text-xs text-blue-400/60">GTPS-T Clauses 1,2,4,13,15,17,25,26,33</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {executorOutputs.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                <MessageSquare size={24} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs">Awaiting tasks…</p>
              </div>
            ) : (
              executorOutputs.map((out, i) => (
                <div key={i} className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-3">
                  <div className="text-xs text-blue-400/70 mb-2 font-semibold">
                    Turn {out.turn} • {out.userIntent.substring(0,60)}…
                  </div>
                  <div className="text-sm text-slate-200 whitespace-pre-wrap">{out.output}</div>
                </div>
              ))
            )}
            <div ref={executorEndRef} />
          </div>
        </div>

        {/* Collaborative Proxy */}
        <div className="col-span-5 bg-slate-800/50 backdrop-blur border-2 border-green-700/70 rounded-lg shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-green-900/30 border-b border-green-700/50 px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="text-green-400" size={18} />
              <h2 className="text-base font-bold text-green-300">Collaborative Proxy</h2>
            </div>
            <p className="text-xs text-green-400/70">GTPS-T Clauses 5,10,11,12,14,18,19,23,32,34 • Your Ally</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {proxyConversation.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                <Users size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Partnership space</p>
              </div>
            ) : (
              <>
                {proxyConversation.map((msg, i) => (
                  <div key={i} className={`${
                    msg.role === 'user' ? 'bg-green-700/20 border-green-600/40 ml-6' : 'bg-slate-700/40 border-slate-600/40 mr-6'
                  } border rounded-lg p-3`}>
                    <div className="text-xs text-slate-400 mb-1 font-semibold">
                      {msg.role === 'user' ? 'You' : 'Proxy'}
                    </div>
                    <div className="text-sm text-slate-100 whitespace-pre-wrap">{msg.content}</div>
                    {msg.alerts?.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-yellow-600/30">
                        <div className="text-xs text-yellow-400 font-semibold mb-1">
                          ⚠️ Whistleblower ({msg.alerts.length})
                        </div>
                        {msg.alerts.map((a, ai) => (
                          <div key={ai} className="text-xs text-yellow-300/80 ml-2">
                            • Clause {a.clause}: {a.type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Rhythm log */}
                <div className="mt-4 p-3 bg-slate-900/40 border border-slate-700 rounded">
                  <div className="text-xs text-slate-400 font-semibold mb-2">Rhythm (Proxy↔User)</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {rhythmLog.map((log, i) => (
                      <div key={i} className="text-xs text-slate-500">
                        T{log.turn}: {log.density} • {log.turnLengthTrend} • {log.cognitiveState} • {log.frictionPoints.join(',') || 'clean'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Anchors & Essence */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={anchorInput}
                    onChange={e => setAnchorInput(e.target.value)}
                    placeholder="Save anchor phrase..."
                    className="w-full bg-slate-900/70 border border-green-700/50 rounded px-3 py-2 text-sm text-white placeholder-slate-500"
                  />
                  <button
                    onClick={() => {
                      if (anchorInput.trim()) {
                        setAnchorPhrases(prev => [...prev, anchorInput]);
                        setAnchorInput('');
                      }
                    }}
                    className="mt-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                  >
                    Save Anchor
                  </button>
                </div>

                {essenceSeed && (
                  <div className="mt-2 text-xs text-slate-500">
                    Essence: {essenceSeed.sessionDensity}, drift {essenceSeed.recentDrift}
                    <button onClick={() => setShowEssenceModal(true)} className="ml-2 text-green-400 underline">View</button>
                  </div>
                )}

                {showEssenceModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 border border-green-700/50 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
                      <h2 className="text-green-300 mb-4 text-xl font-bold">Essence Seed</h2>
                      <pre className="bg-slate-900 p-3 rounded text-xs overflow-auto">{JSON.stringify(essenceSeed, null, 2)}</pre>
                      <button onClick={() => setShowEssenceModal(false)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded w-full">Close</button>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={proxyEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-green-800/50 p-4 bg-slate-900/50">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && !e.shiftKey && handleUserSubmit()}
                placeholder={systemPaused ? "HALTED" : "Message to Proxy..."}
                disabled={isProcessing || systemPaused}
                className="flex-1 bg-slate-900/70 border border-green-700/50 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-50"
              />
              <button
                onClick={handleUserSubmit}
                disabled={isProcessing || systemPaused || !userInput.trim()}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded font-semibold flex items-center gap-2"
              >
                {isProcessing ? 'Processing...' : <><Send size={16} />Send</>}
              </button>
            </div>
            {lastError && <div className="text-xs text-red-400 bg-red-900/20 border border-red-800/30 p-2 rounded">{lastError}</div>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 bg-slate-800/40 backdrop-blur border border-amber-700/50 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-4 text-xs text-slate-400">
          <div><span className="font-semibold text-red-400">Whistleblower:</span> Clauses 33,34 primary</div>
          <div><span className="font-semibold text-blue-400">Executor:</span> Clause 33 aware</div>
          <div><span className="font-semibold text-green-400">Proxy:</span> Clause 34 primary • Confessor tone</div>
        </div>
      </div>
    </div>
  );
};

export default ThreePersonaGTPS;
