import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HomePage, ServersPage, SettingsPage, HelpPage } from "@/components/graham/pages";
import { ChatsPage } from "@/components/graham/ChatsPage";
import { ProfilePage } from "@/components/graham/ProfilePage";

type Page = "home" | "servers" | "chats" | "profile" | "settings" | "help";

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "servers", label: "Серверы", icon: "Server" },
  { id: "chats", label: "Чаты", icon: "MessageSquare" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "settings", label: "Настройки", icon: "Settings" },
  { id: "help", label: "Справка", icon: "HelpCircle" },
];

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = (page: Page) => setActivePage(page);

  const renderPage = () => {
    switch (activePage) {
      case "home":     return <HomePage navigate={navigate} />;
      case "servers":  return <ServersPage />;
      case "chats":    return <ChatsPage />;
      case "profile":  return <ProfilePage />;
      case "settings": return <SettingsPage />;
      case "help":     return <HelpPage navigate={navigate} />;
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
                onClick={() => navigate(item.id)}
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
            <button
              onClick={() => navigate("profile")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors"
            >
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
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
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
