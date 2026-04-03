import { useState } from "react";
import Icon from "@/components/ui/icon";

export type CallType = "audio" | "video" | null;

export function CallModal({ type, name, onClose }: { type: CallType; name: string; onClose: () => void }) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md mx-4">
        {type === "video" && (
          <div className="relative rounded-2xl overflow-hidden bg-card border border-neon-green/20 mb-4"
               style={{ aspectRatio: "16/9", boxShadow: "0 0 40px hsl(168 100% 50% / 0.15)" }}>
            <div className="absolute inset-0 cyber-grid opacity-20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-green/30 to-accent/30 flex items-center justify-center text-3xl font-black mb-3">
                {name[0]}
              </div>
              {camOff ? (
                <span className="text-muted-foreground text-sm">Камера выключена</span>
              ) : (
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              )}
            </div>
            <div className="absolute bottom-3 right-3 w-24 h-16 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden">
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs">00:42</span>
            </div>
          </div>
        )}

        {type === "audio" && (
          <div className="rounded-2xl bg-card border border-border p-10 mb-4 flex flex-col items-center"
               style={{ boxShadow: "0 0 40px hsl(270 80% 65% / 0.1)" }}>
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/30 to-neon-green/20 flex items-center justify-center text-4xl font-black mb-4 animate-pulse-neon">
              {name[0]}
            </div>
            <h3 className="text-xl font-black">{name}</h3>
            <p className="text-muted-foreground text-sm mt-1">Голосовой звонок</p>
            <div className="flex items-center gap-2 mt-3 bg-muted px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              <span className="font-mono text-xs text-neon-green">00:42</span>
            </div>
            <div className="flex items-end gap-1 mt-5 h-8">
              {[3,5,8,6,4,9,5,7,3,6,8,4,6].map((h, i) => (
                <div key={i} className="w-1 rounded-full bg-neon-green/60 animate-pulse"
                     style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        )}

        {type === "video" && (
          <div className="text-center mb-4">
            <h3 className="text-lg font-black">{name}</h3>
            <p className="text-muted-foreground text-sm">Видеозвонок</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-13 h-13 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              muted ? "bg-red-500/20 border border-red-500/50 text-red-400" : "bg-muted border border-border text-foreground"
            }`}
          >
            <Icon name={muted ? "MicOff" : "Mic"} size={18} />
          </button>

          {type === "video" && (
            <button
              onClick={() => setCamOff(!camOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                camOff ? "bg-red-500/20 border border-red-500/50 text-red-400" : "bg-muted border border-border text-foreground"
              }`}
            >
              <Icon name={camOff ? "VideoOff" : "Video"} size={18} />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
            style={{ boxShadow: "0 0 20px hsl(0 80% 60% / 0.4)" }}
          >
            <Icon name="PhoneOff" size={22} className="text-white" />
          </button>

          <button className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center transition-all hover:scale-110">
            <Icon name="Volume2" size={18} className="text-foreground" />
          </button>

          {type === "video" && (
            <button className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center transition-all hover:scale-110">
              <Icon name="ScreenShare" size={18} className="text-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("Александр Иванов");
  const [email, setEmail] = useState("alex@example.com");
  const [phone, setPhone] = useState("+7 (900) 123-45-67");
  const [status, setStatus] = useState("В сети");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm mx-4 glass rounded-2xl border border-border p-6"
           style={{ boxShadow: "0 0 40px hsl(168 100% 50% / 0.1)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black">Редактировать профиль</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-green/40 to-accent/40 flex items-center justify-center text-2xl font-black">
              {name[0]}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-neon-green rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
              <Icon name="Camera" size={13} className="text-background" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Имя", value: name, set: setName, icon: "User" },
            { label: "Email", value: email, set: setEmail, icon: "Mail" },
            { label: "Телефон", value: phone, set: setPhone, icon: "Phone" },
            { label: "Статус", value: status, set: setStatus, icon: "Circle" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
              <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2 focus-within:border-neon-green/50 transition-colors">
                <Icon name={field.icon} size={14} className="text-muted-foreground flex-shrink-0" />
                <input
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-border text-sm py-2.5 rounded-lg hover:border-neon-green/30 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-neon-green text-background font-bold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
