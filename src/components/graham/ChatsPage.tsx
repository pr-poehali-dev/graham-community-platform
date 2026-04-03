import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CallModal } from "@/components/graham/modals";
import type { CallType } from "@/components/graham/modals";

type Chat = {
  id: number;
  name: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
  private: boolean;
  messages: { from: string; text: string; time: string }[];
};

export function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [call, setCall] = useState<CallType>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrivate, setNewPrivate] = useState(true);

  const activeChatData = activeChat !== null ? chats.find((c) => c.id === activeChat) ?? null : null;

  const addChat = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const newChat: Chat = {
      id: Date.now(),
      name: trimmed,
      msg: "Чат создан",
      time,
      unread: 0,
      online: false,
      private: newPrivate,
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setNewName("");
    setShowAddModal(false);
  };

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed || activeChat === null) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? { ...c, messages: [...c.messages, { from: "me", text: trimmed, time }], msg: trimmed, time }
          : c
      )
    );
    setMessage("");
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ height: "calc(100vh - 140px)" }}>
      {call && activeChatData && (
        <CallModal type={call} name={activeChatData.name} onClose={() => setCall(null)} />
      )}

      {/* Add chat modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm mx-4 glass rounded-2xl border border-border p-6"
               style={{ boxShadow: "0 0 40px hsl(168 100% 50% / 0.1)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black">Добавить друга</h2>
              <button onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Имя или никнейм</label>
              <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2 focus-within:border-neon-green/50 transition-colors">
                <Icon name="User" size={14} className="text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus
                  placeholder="Например: Иван Петров"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addChat()}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6 px-1">
              <div>
                <div className="text-sm font-semibold">Приватный чат</div>
                <div className="text-xs text-muted-foreground mt-0.5">E2E шифрование сообщений</div>
              </div>
              <button
                onClick={() => setNewPrivate(!newPrivate)}
                className={`relative w-11 h-6 rounded-full transition-all ${newPrivate ? "bg-neon-green" : "bg-muted"}`}
                style={newPrivate ? { boxShadow: "0 0 10px hsl(168 100% 50% / 0.5)" } : {}}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${newPrivate ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 border border-border text-sm py-2.5 rounded-lg hover:border-neon-green/30 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={addChat}
                disabled={!newName.trim()}
                className="flex-1 bg-neon-green text-background font-bold text-sm py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon name="UserPlus" size={15} />
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-full gap-4">
        {/* Chat list */}
        <div className="w-72 flex-shrink-0 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black">Чаты</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-neon-green/10 text-neon-green border border-neon-green/30 px-2.5 py-1.5 rounded-lg hover:bg-neon-green/20 transition-colors"
            >
              <Icon name="UserPlus" size={13} />
              Добавить
            </button>
          </div>

          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-neon-green/50 transition-colors"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1">
            {filteredChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
                  <Icon name="Users" size={20} className="text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {searchQuery ? "Ничего не найдено" : "Нет чатов"}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-3 text-xs text-neon-green hover:underline"
                  >
                    Добавить первого друга →
                  </button>
                )}
              </div>
            ) : (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    activeChat === chat.id ? "bg-neon-green/10 border border-neon-green/30" : "hover:bg-muted border border-transparent"
                  }`}
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
              ))
            )}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 glass rounded-xl border border-border flex flex-col overflow-hidden">
          {activeChatData ? (
            <>
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-green/30 to-accent/30 flex items-center justify-center font-bold text-sm">
                    {activeChatData.name[0]}
                  </div>
                  {activeChatData.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-green border-2 border-background" />
                  )}
                </div>
                <div>
                  <div className="font-bold flex items-center gap-2">
                    {activeChatData.name}
                    {activeChatData.private && (
                      <span className="flex items-center gap-1 text-xs text-neon-green bg-neon-green/10 px-1.5 py-0.5 rounded font-mono">
                        <Icon name="Lock" size={10} /> E2E
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activeChatData.online ? "В сети" : "Не в сети"}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setCall("audio")}
                    className="w-8 h-8 rounded-lg hover:bg-neon-green/10 flex items-center justify-center transition-colors"
                    title="Голосовой звонок"
                  >
                    <Icon name="Phone" size={15} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setCall("video")}
                    className="w-8 h-8 rounded-lg hover:bg-neon-green/10 flex items-center justify-center transition-colors"
                    title="Видеозвонок"
                  >
                    <Icon name="Video" size={15} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => {
                      setChats((prev) => prev.filter((c) => c.id !== activeChat));
                      setActiveChat(null);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center transition-colors"
                    title="Удалить чат"
                  >
                    <Icon name="Trash2" size={15} className="text-muted-foreground hover:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {activeChatData.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-12 h-12 rounded-2xl bg-neon-green/10 flex items-center justify-center mb-3">
                      <Icon name="MessageSquare" size={20} className="text-neon-green" />
                    </div>
                    <p className="text-sm text-muted-foreground">Напишите первое сообщение</p>
                  </div>
                ) : (
                  activeChatData.messages.map((msg, i) => (
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
                  ))
                )}
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
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-7 h-7 rounded-lg bg-neon-green/20 hover:bg-neon-green/30 text-neon-green flex items-center justify-center transition-colors"
                  >
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
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-5 flex items-center gap-2 bg-neon-green text-background font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm hover:scale-105"
              >
                <Icon name="UserPlus" size={15} />
                Добавить друга
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
