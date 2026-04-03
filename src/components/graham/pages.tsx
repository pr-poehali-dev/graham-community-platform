import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "servers" | "chats" | "profile" | "settings" | "help";

const STATS = [
  { label: "Участников", value: "2,847", icon: "Users", color: "hsl(168 100% 50%)" },
  { label: "Серверов", value: "142", icon: "Server", color: "hsl(270 80% 65%)" },
  { label: "Сообщений сегодня", value: "18.4K", icon: "MessageSquare", color: "hsl(210 100% 60%)" },
  { label: "Защита данных", value: "E2E", icon: "ShieldCheck", color: "hsl(45 100% 55%)" },
];

const PRIVACY_OPTIONS = [
  { id: "e2e", label: "Сквозное шифрование", desc: "Все сообщения зашифрованы по умолчанию", enabled: true, icon: "Lock" },
  { id: "anon", label: "Анонимный режим", desc: "Скрыть статус и время последнего посещения", enabled: false, icon: "EyeOff" },
  { id: "2fa", label: "Двухфакторная аутентификация", desc: "Дополнительная защита аккаунта", enabled: true, icon: "ShieldCheck" },
  { id: "meta", label: "Минимизация метаданных", desc: "Не сохранять информацию о соединении", enabled: true, icon: "Database" },
  { id: "screenshot", label: "Защита от скриншотов", desc: "Блокировать снимки экрана в приватных чатах", enabled: false, icon: "CameraOff" },
];

const FAQ = [
  { q: "Как создать приватный чат?", a: "В разделе Чаты нажмите «Добавить» и введите имя контакта. Сообщения будут зашифрованы сквозным шифрованием." },
  { q: "Насколько защищены мои данные?", a: "Graham использует E2E-шифрование для всех сообщений. Ваши данные не передаются третьим лицам." },
  { q: "Как включить двухфакторную аутентификацию?", a: "Перейдите в Настройки → Безопасность и активируйте 2FA через приложение-аутентификатор." },
  { q: "Можно ли удалить свои данные?", a: "Да. В разделе Настройки → Данные вы можете запросить полное удаление аккаунта и всех связанных данных." },
];

type Server = { id: number; name: string; tag: string; color: string; members: number; online: number };

const SERVER_COLORS = [
  "hsl(168 100% 50%)",
  "hsl(270 80% 65%)",
  "hsl(210 100% 60%)",
  "hsl(45 100% 55%)",
  "hsl(340 80% 60%)",
];

export function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-neon-green/20 bg-card p-8">
        <div className="cyber-grid absolute inset-0 opacity-40" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-neon-green bg-neon-green/10 px-2 py-1 rounded border border-neon-green/30">
              SECURE
            </span>
            <span className="font-mono text-xs text-muted-foreground">v2.4.1</span>
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">
            Добро пожаловать<br />
            <span className="neon-text">в Graham</span>
          </h1>
          <p className="text-muted-foreground max-w-md text-base">
            Защищённая платформа для общения с E2E-шифрованием, приватными чатами и полным контролем над данными.
          </p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate("chats")}
              className="flex items-center gap-2 bg-neon-green text-background font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all hover:scale-105 text-sm"
            >
              <Icon name="MessageSquare" size={16} />
              Начать общение
            </button>
            <button
              onClick={() => navigate("servers")}
              className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-lg hover:border-neon-green/50 transition-all text-sm"
            >
              <Icon name="Server" size={16} />
              Серверы
            </button>
          </div>
        </div>
        <div className="absolute right-8 top-8 animate-float opacity-20">
          <div className="w-32 h-32 rounded-full border-2 border-neon-green/50"
               style={{ boxShadow: '0 0 40px hsl(168 100% 50% / 0.3)' }} />
        </div>
        <div className="absolute right-16 top-16 animate-float opacity-10" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 rounded-full bg-neon-green" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="glass rounded-xl p-4 animate-fade-in hover:scale-105 transition-transform cursor-default"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon name={stat.icon} size={18} style={{ color: stat.color }} />
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: stat.color }} />
            </div>
            <div className="text-2xl font-black font-mono" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          Активность в сети
        </h2>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
            <Icon name="Activity" size={18} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Активность появится, когда вы начнёте общаться</p>
          <button
            onClick={() => navigate("chats")}
            className="mt-3 text-xs text-neon-green hover:underline"
          >
            Перейти к чатам →
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServersPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  const createServer = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const tag = trimmed.slice(0, 3).toUpperCase();
    const color = SERVER_COLORS[servers.length % SERVER_COLORS.length];
    setServers((prev) => [
      ...prev,
      { id: Date.now(), name: trimmed, tag, color, members: 1, online: 1 },
    ]);
    setNewName("");
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm mx-4 glass rounded-2xl border border-border p-6"
               style={{ boxShadow: "0 0 40px hsl(168 100% 50% / 0.1)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black">Создать сервер</h2>
              <button onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
            <div className="mb-5">
              <label className="text-xs text-muted-foreground mb-1.5 block">Название сервера</label>
              <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2 focus-within:border-neon-green/50 transition-colors">
                <Icon name="Server" size={14} className="text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus
                  placeholder="Например: Команда проекта"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createServer()}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border border-border text-sm py-2.5 rounded-lg hover:border-neon-green/30 transition-colors">
                Отмена
              </button>
              <button
                onClick={createServer}
                disabled={!newName.trim()}
                className="flex-1 bg-neon-green text-background font-bold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon name="Plus" size={15} />
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Серверы</h1>
          <p className="text-muted-foreground text-sm mt-1">Ваши защищённые пространства для общения</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-neon-green text-background font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm hover:scale-105"
        >
          <Icon name="Plus" size={15} />
          Создать сервер
        </button>
      </div>

      {servers.length === 0 ? (
        <div className="glass rounded-2xl border border-border p-10 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Icon name="Server" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-bold text-base mb-1">Нет серверов</h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-4">
            Создайте первый сервер, чтобы общаться с командой в защищённом пространстве
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-neon-green text-background font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm hover:scale-105"
          >
            <Icon name="Plus" size={15} />
            Создать первый сервер
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {servers.map((server, i) => (
            <div
              key={server.id}
              className="group glass rounded-xl p-5 border border-border transition-all cursor-pointer animate-fade-in hover:scale-[1.01]"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: `${server.color}20`, color: server.color, border: `1px solid ${server.color}40` }}
                >
                  {server.tag}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{server.name}</h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                    <span className="text-xs text-neon-green font-mono">{server.online} online</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{server.members} участников</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    <Icon name="Lock" size={11} />
                    E2E
                  </div>
                  <button
                    onClick={() => setServers((prev) => prev.filter((s) => s.id !== server.id))}
                    className="w-7 h-7 rounded-lg hover:bg-red-500/10 flex items-center justify-center transition-colors"
                    title="Удалить сервер"
                  >
                    <Icon name="Trash2" size={13} className="text-muted-foreground hover:text-red-400" />
                  </button>
                </div>
              </div>
              <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: "100%", backgroundColor: server.color, boxShadow: `0 0 8px ${server.color}` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SettingsPage() {
  const [privacyOptions, setPrivacyOptions] = useState(PRIVACY_OPTIONS);
  const [notifOptions, setNotifOptions] = useState([
    { id: "sound", label: "Звук сообщений", desc: "Воспроизводить звук при получении", enabled: true },
    { id: "push", label: "Push-уведомления", desc: "Уведомления в браузере", enabled: true },
    { id: "mention", label: "Упоминания", desc: "Только когда вас упоминают", enabled: false },
  ]);

  const togglePrivacy = (id: string) => {
    setPrivacyOptions((prev) => prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o)));
  };

  const toggleNotif = (id: string) => {
    setNotifOptions((prev) => prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o)));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-xl">
      <h1 className="text-2xl font-black">Настройки</h1>

      <div>
        <h2 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
          <Icon name="Shield" size={14} className="text-neon-green" />
          Приватность и безопасность
        </h2>
        <div className="glass rounded-xl border border-border divide-y divide-border">
          {privacyOptions.map((option, i) => (
            <div
              key={option.id}
              className="flex items-center gap-4 px-5 py-4 animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: option.enabled ? "hsl(168 100% 50% / 0.15)" : "hsl(220 15% 12%)",
                  border: `1px solid ${option.enabled ? "hsl(168 100% 50% / 0.3)" : "hsl(220 15% 20%)"}`
                }}
              >
                <Icon name={option.icon} size={16} style={{ color: option.enabled ? "hsl(168 100% 50%)" : "hsl(215 15% 55%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{option.desc}</div>
              </div>
              <button
                onClick={() => togglePrivacy(option.id)}
                className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${option.enabled ? "bg-neon-green" : "bg-muted"}`}
                style={option.enabled ? { boxShadow: "0 0 10px hsl(168 100% 50% / 0.5)" } : {}}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${option.enabled ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
          <Icon name="Bell" size={14} className="text-accent" />
          Уведомления
        </h2>
        <div className="glass rounded-xl border border-border divide-y divide-border">
          {notifOptions.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
              <button
                onClick={() => toggleNotif(item.id)}
                className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${item.enabled ? "bg-neon-green" : "bg-muted"}`}
                style={item.enabled ? { boxShadow: "0 0 10px hsl(168 100% 50% / 0.5)" } : {}}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${item.enabled ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HelpPage({ navigate }: { navigate: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [supportSent, setSupportSent] = useState(false);
  const [supportText, setSupportText] = useState("");
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in max-w-xl">
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm mx-4 glass rounded-2xl border border-border p-6"
               style={{ boxShadow: "0 0 40px hsl(168 100% 50% / 0.1)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black">Написать в поддержку</h2>
              <button onClick={() => { setShowSupport(false); setSupportSent(false); setSupportText(""); }}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
            {supportSent ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="CheckCircle" size={24} className="text-neon-green" />
                </div>
                <p className="font-bold">Сообщение отправлено!</p>
                <p className="text-sm text-muted-foreground mt-1">Мы ответим в течение 24 часов</p>
                <button
                  onClick={() => { setShowSupport(false); setSupportSent(false); setSupportText(""); }}
                  className="mt-4 bg-neon-green text-background font-bold text-sm px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <textarea
                  autoFocus
                  placeholder="Опишите вашу проблему или вопрос..."
                  value={supportText}
                  onChange={(e) => setSupportText(e.target.value)}
                  rows={4}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-neon-green/50 transition-colors resize-none mb-4 placeholder:text-muted-foreground"
                />
                <div className="flex gap-2">
                  <button onClick={() => setShowSupport(false)}
                    className="flex-1 border border-border text-sm py-2.5 rounded-lg hover:border-neon-green/30 transition-colors">
                    Отмена
                  </button>
                  <button
                    onClick={() => setSupportSent(true)}
                    disabled={!supportText.trim()}
                    className="flex-1 bg-neon-green text-background font-bold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={14} />
                    Отправить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-black">Справка</h1>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Начать общение", icon: "MessageSquare", color: "hsl(168 100% 50%)", page: "chats" as Page },
          { label: "Серверы", icon: "Server", color: "hsl(270 80% 65%)", page: "servers" as Page },
          { label: "Приватность", icon: "Lock", color: "hsl(210 100% 60%)", page: "settings" as Page },
          { label: "Профиль", icon: "User", color: "hsl(45 100% 55%)", page: "profile" as Page },
        ].map((item, i) => (
          <button
            key={item.label}
            onClick={() => navigate(item.page)}
            className="glass rounded-xl border border-border p-4 flex items-center gap-3 hover:scale-105 transition-all text-left animate-fade-in"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}
            >
              <Icon name={item.icon} size={16} style={{ color: item.color }} />
            </div>
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div>
        <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Частые вопросы</h2>
        <div className="glass rounded-xl border border-border divide-y divide-border">
          {FAQ.map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${0.2 + i * 0.07}s`, opacity: 0 }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-sm pr-4">{item.q}</span>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-neon-green/20 bg-neon-green/5 p-5">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="MessageCircle" size={20} className="text-neon-green" />
          <h3 className="font-bold">Нужна помощь?</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Наша команда поддержки отвечает в течение 24 часов.
        </p>
        <button
          onClick={() => setShowSupport(true)}
          className="flex items-center gap-2 bg-neon-green text-background font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm hover:scale-105"
        >
          <Icon name="Send" size={14} />
          Написать в поддержку
        </button>
      </div>
    </div>
  );
}
