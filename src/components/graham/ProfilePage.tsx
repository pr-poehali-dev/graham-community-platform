import { useState } from "react";
import Icon from "@/components/ui/icon";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  status: string;
  timezone: string;
  language: string;
};

const DEFAULT_PROFILE: ProfileData = {
  name: "Александр Иванов",
  email: "alex@example.com",
  phone: "+7 (900) 123-45-67",
  status: "В сети",
  timezone: "UTC+3 (Москва)",
  language: "Русский",
};

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(profile);

  const openEdit = () => {
    setDraft({ ...profile });
    setEditOpen(true);
  };

  const save = () => {
    setProfile({ ...draft });
    setEditOpen(false);
  };

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6 animate-fade-in max-w-xl">
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm mx-4 glass rounded-2xl border border-border p-6"
               style={{ boxShadow: "0 0 40px hsl(168 100% 50% / 0.1)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black">Редактировать профиль</h2>
              <button onClick={() => setEditOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-green/40 to-accent/40 flex items-center justify-center text-2xl font-black">
                  {draft.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-neon-green rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Icon name="Camera" size={13} className="text-background" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {([
                { label: "Имя", key: "name", icon: "User" },
                { label: "Email", key: "email", icon: "Mail" },
                { label: "Телефон", key: "phone", icon: "Phone" },
                { label: "Статус", key: "status", icon: "Circle" },
                { label: "Часовой пояс", key: "timezone", icon: "Clock" },
                { label: "Язык", key: "language", icon: "Globe" },
              ] as { label: string; key: keyof ProfileData; icon: string }[]).map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                  <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2 focus-within:border-neon-green/50 transition-colors">
                    <Icon name={field.icon} size={14} className="text-muted-foreground flex-shrink-0" />
                    <input
                      value={draft[field.key]}
                      onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 border border-border text-sm py-2.5 rounded-lg hover:border-neon-green/30 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={save}
                className="flex-1 bg-neon-green text-background font-bold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-black">Профиль</h1>

      <div className="glass rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-green/40 to-accent/40 flex items-center justify-center text-2xl font-black animate-pulse-neon">
              {initials}
            </div>
            <button
              onClick={openEdit}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Icon name="Camera" size={12} className="text-background" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-black">{profile.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-sm text-muted-foreground">{profile.status}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              @{profile.name.toLowerCase().replace(/\s/g, "_")} · #2847
            </div>
          </div>
          <button
            onClick={openEdit}
            className="ml-auto flex items-center gap-1.5 border border-border text-sm px-3 py-1.5 rounded-lg hover:border-neon-green/50 hover:text-neon-green transition-colors"
          >
            <Icon name="Pencil" size={13} />
            Изменить
          </button>
        </div>

        <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Серверов", value: "0" },
            { label: "Друзей", value: "0" },
            { label: "Сообщений", value: "0" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl font-black neon-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl border border-border divide-y divide-border">
        {([
          { label: "Email", key: "email", icon: "Mail" },
          { label: "Телефон", key: "phone", icon: "Phone" },
          { label: "Часовой пояс", key: "timezone", icon: "Clock" },
          { label: "Язык", key: "language", icon: "Globe" },
        ] as { label: string; key: keyof ProfileData; icon: string }[]).map((item) => (
          <div key={item.label} className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Icon name={item.icon} size={15} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="text-sm font-medium mt-0.5">{profile[item.key]}</div>
            </div>
            <button
              onClick={openEdit}
              className="text-xs text-muted-foreground hover:text-neon-green transition-colors"
            >
              <Icon name="Pencil" size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
