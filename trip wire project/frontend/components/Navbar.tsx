"use client";

import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500/10 p-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              TripWire
            </h1>

            <p className="text-xs text-zinc-400">
              Runtime Firewall for AI Agents
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}