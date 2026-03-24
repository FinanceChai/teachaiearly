"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Device {
  name: string;
  emoji: string;
  whatItDoes: string;
  dataCollected: string[];
  surpriseFact: string;
}

interface Room {
  id: string;
  name: string;
  emoji: string;
  devices: Device[];
}

const ROOMS: Room[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    emoji: "🍳",
    devices: [
      {
        name: "Smart Fridge",
        emoji: "🧊",
        whatItDoes: "Tracks what food you have and suggests recipes",
        dataCollected: ["What food you buy", "When you open the fridge", "What expires and gets thrown away", "Your eating patterns"],
        surpriseFact: "Some smart fridges have cameras inside that take photos every time you close the door — it knows exactly what you eat!",
      },
      {
        name: "Voice Assistant Speaker",
        emoji: "🔊",
        whatItDoes: "Plays music, sets timers, answers questions",
        dataCollected: ["Every voice command you give", "Your voice patterns", "When you're home", "Your music taste"],
        surpriseFact: "These speakers are always listening for their wake word — which means they process sound 24/7, even when you think they're off!",
      },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    emoji: "🛏️",
    devices: [
      {
        name: "Smart Watch (charging)",
        emoji: "⌚",
        whatItDoes: "Tracks sleep, heart rate, and daily steps",
        dataCollected: ["Sleep quality every night", "Heart rate 24/7", "How much you move", "Stress levels"],
        surpriseFact: "Your smartwatch can detect you're getting sick BEFORE you feel symptoms — it notices tiny changes in your heart rate and temperature!",
      },
      {
        name: "Smart Light Bulbs",
        emoji: "💡",
        whatItDoes: "Automatically dims at bedtime, brightens in morning",
        dataCollected: ["When you go to bed", "When you wake up", "Your light preferences", "Which rooms you're in"],
        surpriseFact: "Smart lights know your entire daily schedule — when you wake up, when you leave, and even when you use the bathroom at night!",
      },
    ],
  },
  {
    id: "living-room",
    name: "Living Room",
    emoji: "📺",
    devices: [
      {
        name: "Smart TV",
        emoji: "📺",
        whatItDoes: "Streams shows and recommends what to watch next",
        dataCollected: ["Everything you watch", "How long you watch", "When you pause or stop", "What you search for"],
        surpriseFact: "Some smart TVs use a hidden microphone to listen to conversations in the room — they use it to serve you targeted ads!",
      },
      {
        name: "Robot Vacuum",
        emoji: "🤖",
        whatItDoes: "Cleans the floor and maps your home layout",
        dataCollected: ["Complete floor plan of your home", "Room sizes", "Where furniture is", "Cleaning schedule"],
        surpriseFact: "One robot vacuum company tried to sell their customers' home floor plans to advertisers! Your home map is valuable data.",
      },
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    emoji: "🚿",
    devices: [
      {
        name: "Smart Toothbrush",
        emoji: "🪥",
        whatItDoes: "Tracks brushing habits and gives feedback via an app",
        dataCollected: ["How long you brush", "Which areas you miss", "How often you brush", "Time of day"],
        surpriseFact: "Your smart toothbrush app might share data with dental insurance companies — they could adjust your rates based on your brushing habits!",
      },
      {
        name: "Smart Scale",
        emoji: "⚖️",
        whatItDoes: "Measures weight, body fat, and syncs to health apps",
        dataCollected: ["Your weight over time", "Body composition", "Who in the family uses it", "Health trends"],
        surpriseFact: "Smart scales can identify different family members by their weight pattern — it knows exactly who just stepped on, even without logging in!",
      },
    ],
  },
  {
    id: "front-door",
    name: "Front Door",
    emoji: "🚪",
    devices: [
      {
        name: "Smart Doorbell Camera",
        emoji: "📹",
        whatItDoes: "Records video of everyone who approaches your door",
        dataCollected: ["Faces of everyone who visits", "Delivery times", "Neighbor activity", "Your coming/going schedule"],
        surpriseFact: "Some doorbell cameras share footage with police without asking you! They've created a massive surveillance network across neighborhoods.",
      },
      {
        name: "Smart Lock",
        emoji: "🔐",
        whatItDoes: "Locks/unlocks with your phone or code",
        dataCollected: ["Every time the door opens/closes", "Who unlocked it", "What time people come and go", "Failed unlock attempts"],
        surpriseFact: "Smart locks keep a complete log of every entry and exit — parents can see exactly when you came home and when your friends left!",
      },
    ],
  },
];

export function SmartHomeMapper({ onComplete }: { onComplete: () => void }) {
  const [exploredRooms, setExploredRooms] = useState<string[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [activeDevice, setActiveDevice] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const room = ROOMS.find((r) => r.id === activeRoom);
  const totalDataPoints = ROOMS.reduce((sum, r) => sum + r.devices.reduce((ds, d) => ds + d.dataCollected.length, 0), 0);
  const allExplored = exploredRooms.length === ROOMS.length;

  const exploreRoom = (id: string) => {
    setActiveRoom(id);
    setActiveDevice(null);
    if (!exploredRooms.includes(id)) {
      setExploredRooms((prev) => [...prev, id]);
    }
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-space-800 rounded-2xl p-6 border border-slate-700 text-center"
      >
        <div className="text-5xl mb-4">🏠</div>
        <h2 className="text-2xl font-bold text-white mb-3">Home Fully Mapped!</h2>

        <div className="bg-space-900 rounded-xl p-4 mb-4">
          <div className="text-4xl font-bold text-cyan-400 mb-1">{totalDataPoints}</div>
          <div className="text-slate-300 text-sm">data points collected by devices in just ONE home</div>
        </div>

        <div className="bg-space-900 rounded-xl p-4 mb-5 text-left">
          <p className="text-slate-300 text-sm mb-2">
            Every smart device in your home is collecting data about you — <span className="text-cyan-400 font-bold">all day, every day</span>.
          </p>
          <p className="text-slate-300 text-sm mb-2">
            Combined together, these devices know your sleep schedule, eating habits, who visits you, your health, what you watch, and when you&apos;re home.
          </p>
          <p className="text-slate-300 text-sm">
            That&apos;s more information than your best friend knows about you! 🤯
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
        >
          Continue
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="bg-space-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">🏠 Smart Home Mapper</h2>
        <span className="text-cyan-400 text-sm font-mono">{exploredRooms.length}/{ROOMS.length} rooms</span>
      </div>

      <div className="w-full bg-space-900 rounded-full h-2 mb-5">
        <motion.div
          className="bg-cyan-500 h-2 rounded-full"
          animate={{ width: `${(exploredRooms.length / ROOMS.length) * 100}%` }}
        />
      </div>

      {!activeRoom ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="text-slate-300 text-sm mb-4">
            Tap each room to discover the hidden AI devices and what data they collect!
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {ROOMS.map((r) => (
              <motion.button
                key={r.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exploreRoom(r.id)}
                className={`p-4 rounded-xl border-2 text-center transition-colors ${
                  exploredRooms.includes(r.id)
                    ? "border-cyan-500/50 bg-cyan-500/10"
                    : "border-slate-700 bg-space-900 hover:border-cyan-500 animate-pulse"
                }`}
              >
                <div className="text-3xl mb-1">{r.emoji}</div>
                <div className="text-white text-xs font-bold">{r.name}</div>
                {exploredRooms.includes(r.id) && (
                  <div className="text-cyan-400 text-xs mt-1">✓ Explored</div>
                )}
              </motion.button>
            ))}
          </div>

          {allExplored && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFinished(true)}
              className="w-full py-3 bg-cyan-500 text-space-900 font-bold rounded-xl"
            >
              See the Full Picture →
            </motion.button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoom}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setActiveRoom(null)}
                className="text-slate-300 hover:text-white text-sm"
              >
                ← Back to map
              </button>
              <span className="text-2xl ml-auto">{room!.emoji}</span>
              <span className="text-white font-bold">{room!.name}</span>
            </div>

            <div className="space-y-3">
              {room!.devices.map((device, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <button
                    onClick={() => setActiveDevice(activeDevice === idx ? null : idx)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                      activeDevice === idx
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 bg-space-900 hover:border-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{device.emoji}</span>
                      <span className="text-white font-bold">{device.name}</span>
                      <span className="ml-auto text-slate-500 text-sm">
                        {activeDevice === idx ? "▼" : "▶"}
                      </span>
                    </div>

                    <AnimatePresence>
                      {activeDevice === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <div className="mb-2">
                              <div className="text-xs text-cyan-400 font-bold mb-1">What it does:</div>
                              <p className="text-slate-300 text-sm">{device.whatItDoes}</p>
                            </div>
                            <div className="mb-2">
                              <div className="text-xs text-cyan-400 font-bold mb-1">Data it collects:</div>
                              <ul className="space-y-1">
                                {device.dataCollected.map((d, i) => (
                                  <li key={i} className="text-slate-300 text-sm flex items-start gap-1">
                                    <span className="text-cyan-500">•</span> {d}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-cyan-500/10 rounded-lg p-2 mt-2">
                              <div className="text-xs text-cyan-400 font-bold mb-1">😮 Surprise fact:</div>
                              <p className="text-slate-300 text-sm">{device.surpriseFact}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setActiveRoom(null)}
              className="w-full mt-4 py-3 bg-space-900 text-cyan-400 font-bold rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors"
            >
              ← Back to House Map
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
