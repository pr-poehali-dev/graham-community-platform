import { useState } from "react";
import Icon from "@/components/ui/icon";

type CallType = "audio" | "video" | null;

function CallModal({ type, name, onClose }: { type: CallType; name: string; onClose: () => void }) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md mx-4">
        {/* Video area */}
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
            {/* Self preview */}
            <div className="absolute bottom-3 right-3 w-24 h-16 rounded-xl bg-muted border border-border flex items-center justify-center overflow-hidden">
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
            {/* Duration */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-xs">00:42</span>
            </div>
          </div>
        )}

        {/* Audio area */}
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
            {/* Audio wave */}
            <div className="flex items-end gap-1 mt-5 h-8">
              {[3,5,8,6,4,9,5,7,3,6,8,4,6].map((h, i) => (
                <div key={i} className="w-1 rounded-full bg-neon-green/60 animate-pulse"
                     style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Name bar for video */}
        {type === "video" && (
          <div className="text-center mb-4">
            <h3 className="text-lg font-black">{name}</h3>
            <p className="text-muted-foreground text-sm">Видеозвонок</p>
          </div>
        )}

        {/* Controls */}
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

function EditProfileModal({ onClose }: { onClose: () => void }) {
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

        {/* Avatar */}
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

type Page = "home" | "servers" | "chats" | "profile" | "settings" | "help";

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "servers", label: "Серверы", icon: "Server" },
  { id: "chats", label: "Чаты", icon: "MessageSquare" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "settings", label: "Настройки", icon: "Settings" },
  { id: "help", label: "Справка", icon: "HelpCircle" },
];

const SERVERS = [
  { name: "Команда разработки", members: 24, online: 8, color: "hsl(168 100% 50%)", tag: "DEV" },
  { name: "Дизайн и UI/UX", members: 12, online: 5, color: "hsl(270 80% 65%)", tag: "ART" },
  { name: "Маркетинг", members: 18, online: 3, color: "hsl(210 100% 60%)", tag: "MKT" },
  { name: "Общий чат", members: 156, online: 42, color: "hsl(45 100% 55%)", tag: "GEN" },
];

const CHATS = [
  { name: "Алексей Ковалёв", msg: "Отлично, встретимся в 15:00", time: "14:32", unread: 2, online: true, private: true },
  { name: "Мария Петрова", msg: "Файл уже отправлен", time: "13:51", unread: 0, online: true, private: true },
  { name: "Дмитрий Соколов", msg: "Принял, спасибо за обновление", time: "12:20", unread: 5, online: false, private: false },
  { name: "Елена Новикова", msg: "Когда будет готово?", time: "11:08", unread: 0, online: true, private: true },
  { name: "Иван Морозов", msg: "Посмотрю завтра утром", time: "Вчера", unread: 0, online: false, private: false },
];

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
  { q: "Как создать приватный чат?", a: "В разделе Чаты нажмите «+» и выберите «Приватный». Сообщения будут зашифрованы сквозным шифрованием." },
  { q: "Насколько защищены мои данные?", a: "Graham использует E2E-шифрование для всех сообщений. Ваши данные не передаются третьим лицам." },
  { q: "Как включить двухфакторную аутентификацию?", a: "Перейдите в Настройки → Безопасность и активируйте 2FA через приложение-аутентификатор." },
  { q: "Можно ли удалить свои данные?", a: "Да. В разделе Настройки → Данные вы можете запросить полное удаление аккаунта и всех связанных данных." },
];

function HomePage() {
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
            <button className="flex items-center gap-2 bg-neon-green text-background font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all hover:scale-105 text-sm">
              <Icon name="MessageSquare" size={16} />
              Начать общение
            </button>
            <button className="flex items-center gap-2 border border-border text-foreground px-5 py-2.5 rounded-lg hover:border-neon-green/50 transition-all text-sm">
              <Icon name="Server" size={16} />
              Найти сервер
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
        <div className="space-y-3">
          {[
            { user: "Алексей К.", action: "вошёл в сервер Команда разработки", time: "2 мин назад", icon: "LogIn" },
            { user: "Мария П.", action: "отправила зашифрованное сообщение", time: "5 мин назад", icon: "Lock" },
            { user: "Новый сервер", action: "«Аналитика Q2» создан с E2E защитой", time: "12 мин назад", icon: "Shield" },
            { user: "Иван М.", action: "обновил настройки приватности", time: "28 мин назад", icon: "Settings" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm animate-fade-in" style={{ animationDelay: `${0.3 + i * 0.05}s`, opacity: 0 }}>
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={13} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-foreground">{item.user}</span>
                <span className="text-muted-foreground"> {item.action}</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Серверы</h1>
          <p className="text-muted-foreground text-sm mt-1">Ваши защищённые пространства для общения</p>
        </div>
        <button className="flex items-center gap-2 bg-neon-green text-background font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm hover:scale-105">
          <Icon name="Plus" size={15} />
          Создать сервер
        </button>
      </div>

      <div className="grid gap-4">
        {SERVERS.map((server, i) => (
          <div
            key={server.name}
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
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
            <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(server.online / server.members) * 100}%`,
                  backgroundColor: server.color,
                  boxShadow: `0 0 8px ${server.color}`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatsPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [call, setCall] = useState<CallType>(null);

  const MESSAGES = [
    { from: "them", text: "Привет! Нужно обсудить проект", time: "14:20" },
    { from: "me", text: "Конечно, слушаю тебя", time: "14:21" },
    { from: "them", text: "Отлично, встретимся в 15:00?", time: "14:30" },
    { from: "me", text: "Да, договорились", time: "14:32" },
  ];

  return (
    <div className="animate-fade-in" style={{ height: "calc(100vh - 140px)" }}>
      {call && activeChat !== null && (
        <CallModal type={call} name={CHATS[activeChat].name} onClose={() => setCall(null)} />
      )}
      <div className="flex h-full gap-4">
        <div className="w-72 flex-shrink-0 space-y-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-black">Чаты</h1>
            <button className="w-8 h-8 rounded-lg bg-neon-green/10 text-neon-green flex items-center justify-center hover:bg-neon-green/20 transition-colors">
              <Icon name="Plus" size={15} />
            </button>
          </div>
          <div className="relative mb-3">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Поиск чатов..."
              className="w-full bg-muted border border-border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-neon-green/50 transition-colors"
            />
          </div>
          {CHATS.map((chat, i) => (
            <button
              key={chat.name}
              onClick={() => setActiveChat(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all animate-fade-in ${
                activeChat === i ? "bg-neon-green/10 border border-neon-green/30" : "hover:bg-muted border border-transparent"
              }`}
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-green/30 to-accent/30 flex items-center justify-center font-bold text-sm">
                  {chat.name[0]}
                </div>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-green border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-sm truncate flex items-center gap-1">
                    {chat.name}
                    {chat.private && <Icon name="Lock" size={10} className="text-neon-green flex-shrink-0" />}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground flex-shrink-0">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.msg}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-neon-green text-background text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 glass rounded-xl border border-border flex flex-col overflow-hidden">
          {activeChat !== null ? (
            <>
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-green/30 to-accent/30 flex items-center justify-center font-bold text-sm">
                    {CHATS[activeChat].name[0]}
                  </div>
                  {CHATS[activeChat].online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-green border-2 border-background" />
                  )}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    {CHATS[activeChat].name}
                    {CHATS[activeChat].private && (
                      <span className="flex items-center gap-1 text-xs text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded font-mono">
                        <Icon name="Lock" size={10} /> E2E
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {CHATS[activeChat].online ? "В сети" : "Не в сети"}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setCall("audio")}
                    className="w-8 h-8 rounded-lg hover:bg-neon-green/10 hover:text-neon-green flex items-center justify-center transition-colors"
                    title="Голосовой звонок"
                  >
                    <Icon name="Phone" size={15} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setCall("video")}
                    className="w-8 h-8 rounded-lg hover:bg-neon-green/10 hover:text-neon-green flex items-center justify-center transition-colors"
                    title="Видеозвонок"
                  >
                    <Icon name="Video" size={15} className="text-muted-foreground" />
                  </button>
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                    <Icon name="MoreVertical" size={15} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {MESSAGES.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                        msg.from === "me"
                          ? "bg-neon-green text-background font-medium rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                      <div className={`text-xs mt-1 ${msg.from === "me" ? "text-background/60" : "text-muted-foreground"}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-border">
                <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
                  <button className="w-7 h-7 rounded-lg hover:bg-background/50 flex items-center justify-center transition-colors">
                    <Icon name="Paperclip" size={15} className="text-muted-foreground" />
                  </button>
                  <input
                    placeholder="Написать сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button className="w-7 h-7 rounded-lg bg-neon-green/20 hover:bg-neon-green/30 text-neon-green flex items-center justify-center transition-colors">
                    <Icon name="Send" size={14} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-neon-green/10 flex items-center justify-center mb-4 animate-float">
                <Icon name="MessageSquare" size={28} className="text-neon-green" />
              </div>
              <h3 className="font-bold text-lg">Выберите чат</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-xs">
                Все сообщения защищены сквозным шифрованием E2E
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
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
            { label: "Серверов", value: "7" },
            { label: "Друзей", value: "43" },
            { label: "Сообщений", value: "1.2K" },
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

function SettingsPage() {
  const [privacyOptions, setPrivacyOptions] = useState(PRIVACY_OPTIONS);

  const toggle = (id: string) => {
    setPrivacyOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, enabled: !o.enabled } : o))
    );
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
                onClick={() => toggle(option.id)}
                className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
                  option.enabled ? "bg-neon-green" : "bg-muted"
                }`}
                style={option.enabled ? { boxShadow: "0 0 10px hsl(168 100% 50% / 0.5)" } : {}}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                    option.enabled ? "left-[22px]" : "left-0.5"
                  }`}
                />
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
          {[
            { label: "Звук сообщений", desc: "Воспроизводить звук при получении" },
            { label: "Push-уведомления", desc: "Уведомления в браузере" },
            { label: "Упоминания", desc: "Только когда вас упоминают" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
              </div>
              <div
                className="relative w-11 h-6 rounded-full bg-neon-green cursor-pointer flex-shrink-0"
                style={{ boxShadow: "0 0 10px hsl(168 100% 50% / 0.5)" }}
              >
                <div className="absolute top-0.5 left-[22px] w-5 h-5 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in max-w-xl">
      <h1 className="text-2xl font-black">Справка</h1>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Начало работы", icon: "BookOpen", color: "hsl(168 100% 50%)" },
          { label: "Безопасность", icon: "Shield", color: "hsl(270 80% 65%)" },
          { label: "Приватность", icon: "Lock", color: "hsl(210 100% 60%)" },
          { label: "Поддержка", icon: "Headphones", color: "hsl(45 100% 55%)" },
        ].map((item, i) => (
          <button
            key={item.label}
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
        <button className="flex items-center gap-2 bg-neon-green text-background font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm hover:scale-105">
          <Icon name="Send" size={14} />
          Написать в поддержку
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage />;
      case "servers": return <ServersPage />;
      case "chats": return <ChatsPage />;
      case "profile": return <ProfilePage />;
      case "settings": return <SettingsPage />;
      case "help": return <HelpPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className="flex-shrink-0 border-r border-border flex flex-col transition-all duration-300 overflow-hidden"
        style={{ width: sidebarOpen ? "256px" : "0px" }}
      >
        <div className="w-64 flex flex-col h-full">
          <div className="px-5 py-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neon-green flex items-center justify-center font-black text-background text-lg animate-pulse-neon">
                G
              </div>
              <div>
                <div className="font-black text-lg leading-none tracking-tight">Graham</div>
                <div className="font-mono text-xs text-neon-green mt-0.5">SECURE CHAT</div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              title="Свернуть панель"
            >
              <Icon name="ChevronLeft" size={15} className="text-muted-foreground" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all animate-slide-in-left ${
                  activePage === item.id
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                }`}
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                <Icon
                  name={item.icon}
                  size={17}
                  className={activePage === item.id ? "text-neon-green" : ""}
                />
                <span className="font-medium text-sm">{item.label}</span>
                {activePage === item.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          <div className="px-3 py-4 border-t border-border">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green/40 to-accent/40 flex items-center justify-center font-bold text-xs">
                  АИ
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-neon-green border border-background" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold truncate">Александр И.</div>
                <div className="font-mono text-xs text-muted-foreground">#2847</div>
              </div>
              <Icon name="MoreVertical" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar with toggle */}
        {!sidebarOpen && (
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-green transition-colors"
              title="Открыть панель"
            >
              <Icon name="ChevronRight" size={16} />
              <div className="w-7 h-7 rounded-lg bg-neon-green flex items-center justify-center font-black text-background text-sm">
                G
              </div>
              <span className="font-medium">Graham</span>
            </button>
          </div>
        )}
        <div className="max-w-3xl mx-auto px-8 py-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}