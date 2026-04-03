import { useState } from "react";
import Icon from "@/components/ui/icon";
import { EditProfileModal } from "@/components/graham/modals";

export function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in max-w-xl">
      {editOpen && <EditProfileModal onClose={() => setEditOpen(false)} />}
      <h1 className="text-2xl font-black">Профиль</h1>

      <div className="glass rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-green/40 to-accent/40 flex items-center justify-center text-2xl font-black animate-pulse-neon">
              АИ
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-neon-green rounded-full flex items-center justify-center">
              <Icon name="Camera" size={12} className="text-background" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-black">Александр Иванов</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-sm text-muted-foreground">В сети</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground mt-1">@alexander_i · #2847</div>
          </div>
          <button
            onClick={() => setEditOpen(true)}
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
        {[
          { label: "Email", value: "alex@example.com", icon: "Mail" },
          { label: "Телефон", value: "+7 (900) 123-45-67", icon: "Phone" },
          { label: "Часовой пояс", value: "UTC+3 (Москва)", icon: "Clock" },
          { label: "Язык", value: "Русский", icon: "Globe" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Icon name={item.icon} size={15} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="text-sm font-medium mt-0.5">{item.value}</div>
            </div>
            <button className="text-xs text-muted-foreground hover:text-neon-green transition-colors">
              <Icon name="Pencil" size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}