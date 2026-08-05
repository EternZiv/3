import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import logo from 'figma:asset/5ce08c1df550714d0fc0aa9b66e97432a1986a84.png';
import {
  LayoutDashboard,
  Package,
  Shield,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Bell,
  Mail,
  FileText,
  Check,
  AlertCircle,
} from 'lucide-react';
import { getAdminSession, clearAdminSession } from './adminAuth';
import {
  fetchWarrantyClaims,
  fetchWarrantyRegistrations,
  fetchContactMessages,
} from './adminApi';

const navLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/warranties', label: 'Warranties', icon: Shield },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

interface AdminNotification {
  id: string;
  type: 'registration' | 'message' | 'claim';
  title: string;
  subtitle: string;
  date: string;
  read: boolean;
}

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const navigate = useNavigate();

  const loadNotifications = async () => {
    try {
      const [regs, claims, msgs] = await Promise.all([
        fetchWarrantyRegistrations().catch(() => []),
        fetchWarrantyClaims().catch(() => []),
        fetchContactMessages().catch(() => []),
      ]);

      const formatted: AdminNotification[] = [];

      // Add pending registrations
      regs.filter((r: any) => r.warranty_status === 'pending').forEach((r: any) => {
        formatted.push({
          id: r.id,
          type: 'registration',
          title: 'New Warranty Registered',
          subtitle: `${r.full_name} - ${r.product_model}`,
          date: r.created_at,
          read: false,
        });
      });

      // Add open claims
      claims.filter((c: any) => c.claim_status === 'open').forEach((c: any) => {
        formatted.push({
          id: c.id,
          type: 'claim',
          title: 'New Claim Submitted',
          subtitle: `${c.full_name} (${c.claim_type})`,
          date: c.created_at,
          read: false,
        });
      });

      // Add unread messages
      msgs.filter((m: any) => !m.is_read).forEach((m: any) => {
        formatted.push({
          id: m.id,
          type: 'message',
          title: 'New Message Received',
          subtitle: `From ${m.name}: "${m.subject || 'No Subject'}"`,
          date: m.created_at,
          read: false,
        });
      });

      // Sort by date descending
      formatted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setNotifications(formatted);
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (item: AdminNotification) => {
    setIsOpen(false);
    if (item.type === 'registration' || item.type === 'claim') {
      navigate('/admin/warranties');
    } else if (item.type === 'message') {
      navigate('/admin/messages');
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors focus:outline-hidden"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 z-50 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 text-emerald-600" /> Notifications
              </span>
              <span className="text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                {unreadCount} Pending
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2.5">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Check className="h-8 w-8 text-green-500 mb-1" />
                  <p className="text-xs font-semibold text-gray-800">All caught up!</p>
                  <p className="text-[10px] text-gray-400">No pending notifications</p>
                </div>
              ) : (
                notifications.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleNotificationClick(item)}
                    className="flex cursor-pointer items-start gap-2.5 rounded-lg p-2 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                  >
                    <div className="mt-0.5 rounded-full bg-emerald-50 p-1.5 text-emerald-600">
                      {item.type === 'message' && <Mail className="h-3.5 w-3.5" />}
                      {item.type === 'registration' && <Shield className="h-3.5 w-3.5" />}
                      {item.type === 'claim' && <FileText className="h-3.5 w-3.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-gray-500 truncate">{item.subtitle}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5">
                        {new Date(item.date).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getAdminSession();
    if (!session) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setAuthenticated(true);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600" />
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const getCurrentTabTitle = (path: string) => {
    if (path.includes("products")) return "Products Catalog";
    if (path.includes("warranties")) return "Warranties & Claims";
    if (path.includes("messages")) return "Contact Messages";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gray-900 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Power2Go" className="h-7 object-contain" />
            <span className="text-base font-bold tracking-tight text-white/90">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const isActive =
              location.pathname === to ||
              (to === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/'));
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-800 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Persistent Top Header (Visible on Desktop and Mobile) */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-lg font-bold text-gray-900 lg:block hidden">
              {getCurrentTabTitle(location.pathname)}
            </span>
            <span className="text-lg font-bold text-gray-900 lg:hidden block">
              P2G Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <div className="h-8 w-px bg-gray-200" />
            <span className="text-sm font-medium text-gray-700">
              Admin Portal
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}