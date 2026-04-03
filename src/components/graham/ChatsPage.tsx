import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CallModal } from "@/components/graham/modals";
import type { CallType } from "@/components/graham/modals";

const CHATS = [
  { name: "Алексей Ковалёв", msg: "Отлично, встретимся в 15:00", time: "14:32", unread: 2, online: true, private: true },
  { name: "Мария Петрова", msg: "Файл уже отправлен", time: "13:51", unread: 0, online: true, private: true },
  { name: "Дмитрий Соколов", msg: "Принял, спасибо за обновление", time: "12:20", unread: 5, online: false, private: false },
  { name: "Елена Новикова", msg: "Когда будет готово?", time: "11:08", unread: 0, online: true, private: true },
  { name: "Иван Морозов", msg: "Посмотрю завтра утром", time: "Вчера", unread: 0, online: false, private: false },
];

const MESSAGES = [
  { from: "them", text: "Привет! Нужно обсудить проект", time: "14:20" },
  { from: "me", text: "Конечно, слушаю тебя", time: "14:21" },
  { from: "them", text: "Отлично, встретимся в 15:00?", time: "14:30" },
  { from: "me", text: "Да, договорились", time: "14:32" },
];

export function ChatsPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [call, setCall] = useState<CallType>(null);

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
