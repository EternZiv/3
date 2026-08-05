import { useEffect, useState } from "react";
import {
  fetchWarrantyClaims,
  updateWarrantyClaimStatus,
  deleteWarrantyClaim,
  fetchWarrantyRegistrations,
  updateWarrantyStatus,
  deleteWarrantyRegistration,
} from "./adminApi";
import type { WarrantyRegistration, WarrantyClaim } from "../lib/types";
import { toast } from "sonner";
import {
  Shield,
  Search,
  Trash2,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  FileText,
  Mail,
} from "lucide-react";

const regStatusCycle: Record<string, string> = {
  pending: "approved",
  approved: "rejected",
  rejected: "pending",
};

const regStatusConfig: Record<
  string,
  { label: string; bg: string; text: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    bg: "bg-green-100",
    text: "text-green-700",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-100",
    text: "text-red-700",
    icon: XCircle,
  },
};

const claimStatusCycle: Record<string, string> = {
  open: "in_progress",
  in_progress: "resolved",
  resolved: "closed",
  closed: "open",
};

const claimStatusConfig: Record<
  string,
  { label: string; bg: string; text: string; icon: typeof Clock }
> = {
  open: {
    label: "Open",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: Clock,
  },
  in_progress: {
    label: "In Progress",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: Clock,
  },
  resolved: {
    label: "Resolved",
    bg: "bg-green-100",
    text: "text-green-700",
    icon: CheckCircle,
  },
  closed: {
    label: "Closed",
    bg: "bg-gray-100",
    text: "text-gray-700",
    icon: XCircle,
  },
};

type Tab = "registrations" | "claims";

export default function AdminWarranties() {
  const [activeTab, setActiveTab] = useState<Tab>("registrations");

  // Registrations state
  const [registrations, setRegistrations] = useState<WarrantyRegistration[]>([]);
  const [regLoading, setRegLoading] = useState(true);
  const [regSearch, setRegSearch] = useState("");
  const [selectedRegistration, setSelectedRegistration] =
    useState<WarrantyRegistration | null>(null);
  const [showRegDetail, setShowRegDetail] = useState(false);
  const [deleteRegConfirm, setDeleteRegConfirm] = useState<string | null>(null);
  const [updatingRegId, setUpdatingRegId] = useState<string | null>(null);

  // Claims state
  const [claims, setClaims] = useState<WarrantyClaim[]>([]);
  const [claimLoading, setClaimLoading] = useState(true);
  const [claimSearch, setClaimSearch] = useState("");
  const [selectedClaim, setSelectedClaim] = useState<WarrantyClaim | null>(null);
  const [showClaimDetail, setShowClaimDetail] = useState(false);
  const [deleteClaimConfirm, setDeleteClaimConfirm] = useState<string | null>(null);
  const [updatingClaimId, setUpdatingClaimId] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    async function fetchRegistrations() {
      setRegLoading(true);
      try {
        const data = await fetchWarrantyRegistrations();
        setRegistrations(data);
      } catch (err) {
        toast.error("Failed to load warranty registrations");
      }
      setRegLoading(false);
    }

    fetchRegistrations();
  }, []);

  useEffect(() => {
    if (activeTab !== "claims") return;

    async function loadClaims() {
      setClaimLoading(true);
      try {
        const data = await fetchWarrantyClaims();
        setClaims(data);
      } catch {
        toast.error("Failed to load warranty claims");
      }
      setClaimLoading(false);
    }

    loadClaims();
  }, [activeTab]);

  const filteredRegistrations = registrations.filter((r) => {
    const term = regSearch.toLowerCase();
    return (
      r.full_name.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term) ||
      r.serial_number.toLowerCase().includes(term) ||
      r.product_model.toLowerCase().includes(term)
    );
  });

  const filteredClaims = claims.filter((c) => {
    const term = claimSearch.toLowerCase();
    return (
      c.full_name.toLowerCase().includes(term) ||
      c.serial_number.toLowerCase().includes(term) ||
      c.claim_type.toLowerCase().includes(term)
    );
  });

  async function handleRegStatusChange(id: string, targetStatus: string) {
    setUpdatingRegId(id);

    try {
      await updateWarrantyStatus(id, targetStatus);
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, warranty_status: targetStatus } : r
        )
      );
      setSelectedRegistration((prev) =>
        prev && prev.id === id ? { ...prev, warranty_status: targetStatus } : prev
      );
      toast.success(`Status changed to ${targetStatus}`);
    } catch {
      toast.error("Failed to update status");
    }

    setUpdatingRegId(null);
  }

  async function handleClaimStatusChange(id: string, targetStatus: string, notes?: string) {
    setUpdatingClaimId(id);

    try {
      await updateWarrantyClaimStatus(id, targetStatus, notes);
      setClaims((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, claim_status: targetStatus, admin_notes: notes } : c
        )
      );
      setSelectedClaim((prev) =>
        prev && prev.id === id ? { ...prev, claim_status: targetStatus, admin_notes: notes } : prev
      );
      toast.success(`Claim status updated to ${targetStatus}`);
    } catch {
      toast.error("Failed to update status");
    }

    setUpdatingClaimId(null);
  }

  async function handleDeleteRegistration(id: string) {
    try {
      await deleteWarrantyRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
      toast.success("Registration deleted");
    } catch {
      toast.error("Failed to delete registration");
    }

    setDeleteRegConfirm(null);
  }

  async function handleDeleteClaim(id: string) {
    try {
      await deleteWarrantyClaim(id);
      setClaims((prev) => prev.filter((c) => c.id !== id));
      toast.success("Claim deleted");
    } catch {
      toast.error("Failed to delete claim");
    }

    setDeleteClaimConfirm(null);
  }

  function handleReplyClaimViaEmail(claim: WarrantyClaim) {
    const subject = `Re: Warranty Claim - Serial ${claim.serial_number}`;
    const dateStr = new Date(claim.created_at).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    const body = `\n\n--- Original Claim ---\nFrom: ${claim.full_name} (${claim.email})\nPhone: ${claim.phone || 'N/A'}\nSerial Number: ${claim.serial_number}\nProduct Model: ${claim.product_model || 'N/A'}\nPurchase Date: ${claim.purchase_date || 'N/A'}\nClaim Type: ${claim.claim_type || 'N/A'}\nReceived: ${dateStr}\n\nIssue Description:\n${claim.issue_description}`;
    
    window.location.href = `mailto:${encodeURIComponent(claim.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function getRegStatusBadge(status: string) {
    const config = regStatusConfig[status] || regStatusConfig.pending;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  }

  function getClaimStatusBadge(status: string) {
    const config = claimStatusConfig[status] || claimStatusConfig.open;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Warranties</h1>
      </div>

      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("registrations")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === "registrations"
              ? "text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Warranty Registrations
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              {registrations.length}
            </span>
          </div>
          {activeTab === "registrations" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("claims")}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === "claims"
              ? "text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Warranty Claims
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              {claims.length}
            </span>
          </div>
          {activeTab === "claims" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
          )}
        </button>
      </div>

      {activeTab === "registrations" && (
        <>
          {regLoading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, serial number, or product model..."
                  value={regSearch}
                  onChange={(e) => setRegSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-gray-500">
                        <th className="px-6 py-3 font-medium">Customer</th>
                        <th className="px-6 py-3 font-medium">Product Model</th>
                        <th className="px-6 py-3 font-medium">Serial Number</th>
                        <th className="px-6 py-3 font-medium">Purchase Date</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Registered</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-6 py-12 text-center text-gray-400"
                          >
                            {registrations.length === 0
                              ? "No warranty registrations yet."
                              : "No results match your search."}
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map((r) => (
                          <tr
                            key={r.id}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">
                                {r.full_name}
                              </div>
                              <div className="text-xs text-gray-500">{r.email}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {r.product_model}
                            </td>
                            <td className="px-6 py-4 text-gray-700 font-mono text-xs">
                              {r.serial_number}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {r.purchase_date
                                ? new Date(r.purchase_date).toLocaleDateString()
                                : "—"}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() =>
                                  handleRegStatusChange(r.id, regStatusCycle[r.warranty_status] || "pending")
                                }
                                disabled={updatingRegId === r.id}
                                className="cursor-pointer disabled:opacity-50"
                                title="Click to change status"
                              >
                                {updatingRegId === r.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                ) : (
                                  getRegStatusBadge(r.warranty_status)
                                )}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(r.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => {
                                    setSelectedRegistration(r);
                                    setAdminNotes(r.admin_notes || "");
                                    setShowRegDetail(true);
                                  }}
                                  className="rounded-md p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                  title="View details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteRegConfirm(r.id)}
                                  className="rounded-md p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {showRegDetail && selectedRegistration && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Warranty Details
                  </h2>
                  <button
                    onClick={() => {
                      setShowRegDetail(false);
                      setSelectedRegistration(null);
                    }}
                    className="rounded-md p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-emerald-600" />
                    {getRegStatusBadge(selectedRegistration.warranty_status)}
                  </div>
                  {[
                    { label: "Full Name", value: selectedRegistration.full_name },
                    { label: "Email", value: selectedRegistration.email },
                    { label: "Phone", value: selectedRegistration.phone },
                    { label: "Address", value: selectedRegistration.address },
                    { label: "City", value: selectedRegistration.city },
                    { label: "Postal Code", value: selectedRegistration.postal_code },
                    { label: "Product Model", value: selectedRegistration.product_model },
                    { label: "Serial Number", value: selectedRegistration.serial_number },
                    {
                      label: "Purchase Date",
                      value: selectedRegistration.purchase_date
                        ? new Date(selectedRegistration.purchase_date).toLocaleDateString()
                        : "—",
                    },
                    { label: "Dealer Name", value: selectedRegistration.dealer_name },
                    { label: "Dealer Location", value: selectedRegistration.dealer_location },
                    {
                      label: "Registered",
                      value: new Date(selectedRegistration.created_at).toLocaleString(),
                    },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {field.label}
                      </span>
                      <span className="mt-0.5 text-sm text-gray-900">
                        {field.value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    {selectedRegistration.warranty_status === "pending" && (
                      <>
                        <button
                          onClick={() => handleRegStatusChange(selectedRegistration.id, "approved")}
                          disabled={updatingRegId === selectedRegistration.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRegStatusChange(selectedRegistration.id, "rejected")}
                          disabled={updatingRegId === selectedRegistration.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {selectedRegistration.warranty_status === "approved" && (
                      <>
                        <button
                          onClick={() => handleRegStatusChange(selectedRegistration.id, "rejected")}
                          disabled={updatingRegId === selectedRegistration.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleRegStatusChange(selectedRegistration.id, "pending")}
                          disabled={updatingRegId === selectedRegistration.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Set Pending
                        </button>
                      </>
                    )}
                    {selectedRegistration.warranty_status === "rejected" && (
                      <>
                        <button
                          onClick={() => handleRegStatusChange(selectedRegistration.id, "approved")}
                          disabled={updatingRegId === selectedRegistration.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRegStatusChange(selectedRegistration.id, "pending")}
                          disabled={updatingRegId === selectedRegistration.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Set Pending
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setShowRegDetail(false);
                      setSelectedRegistration(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {deleteRegConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
                <div className="px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Confirm Deletion
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete this warranty registration? This
                    action cannot be undone.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                  <button
                    onClick={() => setDeleteRegConfirm(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteRegistration(deleteRegConfirm)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "claims" && (
        <>
          {claimLoading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, serial number, or claim type..."
                  value={claimSearch}
                  onChange={(e) => setClaimSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-gray-500">
                        <th className="px-6 py-3 font-medium">Customer</th>
                        <th className="px-6 py-3 font-medium">Serial #</th>
                        <th className="px-6 py-3 font-medium">Claim Type</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Filed</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClaims.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-12 text-center text-gray-400"
                          >
                            {claims.length === 0
                              ? "No warranty claims yet."
                              : "No results match your search."}
                          </td>
                        </tr>
                      ) : (
                        filteredClaims.map((c) => (
                          <tr
                            key={c.id}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">
                                {c.full_name}
                              </div>
                              <div className="text-xs text-gray-500">{c.email}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-700 font-mono text-xs">
                              {c.serial_number}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {c.claim_type}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() =>
                                  handleClaimStatusChange(c.id, claimStatusCycle[c.claim_status] || "open", c.admin_notes)
                                }
                                disabled={updatingClaimId === c.id}
                                className="cursor-pointer disabled:opacity-50"
                                title="Click to change status"
                              >
                                {updatingClaimId === c.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                ) : (
                                  getClaimStatusBadge(c.claim_status)
                                )}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(c.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => {
                                    setSelectedClaim(c);
                                    setShowClaimDetail(true);
                                  }}
                                  className="rounded-md p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                  title="View details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleReplyClaimViaEmail(c)}
                                  className="rounded-md p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                  title="Reply via Email"
                                >
                                  <Mail className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setDeleteClaimConfirm(c.id)}
                                  className="rounded-md p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {showClaimDetail && selectedClaim && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Warranty Claim Details
                  </h2>
                  <button
                    onClick={() => {
                      setShowClaimDetail(false);
                      setSelectedClaim(null);
                    }}
                    className="rounded-md p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-emerald-600" />
                    {getClaimStatusBadge(selectedClaim.claim_status)}
                  </div>
                  {[
                    { label: "Full Name", value: selectedClaim.full_name },
                    { label: "Email", value: selectedClaim.email },
                    { label: "Phone", value: selectedClaim.phone },
                    { label: "Product Model", value: selectedClaim.product_model },
                    { label: "Serial Number", value: selectedClaim.serial_number },
                    {
                      label: "Purchase Date",
                      value: selectedClaim.purchase_date
                        ? new Date(selectedClaim.purchase_date).toLocaleDateString()
                        : "—",
                    },
                    { label: "Claim Type", value: selectedClaim.claim_type },
                    { label: "Issue Description", value: selectedClaim.issue_description },
                    {
                      label: "Attachments",
                      value:
                        selectedClaim.attachment_urls?.length > 0
                          ? selectedClaim.attachment_urls.length + " file(s)"
                          : "None",
                    },
                    {
                      label: "Admin Notes",
                      value: selectedClaim.admin_notes || "—",
                    },
                    {
                      label: "Filed",
                      value: new Date(selectedClaim.created_at).toLocaleString(),
                    },
                    {
                      label: "Last Updated",
                      value: new Date(selectedClaim.updated_at).toLocaleString(),
                    },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {field.label}
                      </span>
                      <span className="mt-0.5 text-sm text-gray-900">
                        {field.value || "—"}
                      </span>
                    </div>
                  ))}

                  <div className="flex flex-col border-t border-gray-100 pt-4 mt-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Update Admin Notes / Remarks
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[90px] bg-gray-50 hover:bg-white focus:bg-white transition"
                      placeholder="Add system model serial info, verification notes, shipment details, tracking info..."
                    />
                  </div>
                </div>
                <div className="border-t border-gray-200 px-6 py-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedClaim.claim_status === "open" && (
                      <>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "in_progress", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition cursor-pointer disabled:opacity-50"
                        >
                          Start Progress
                        </button>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "resolved", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
                        >
                          Resolve Claim
                        </button>
                      </>
                    )}
                    {selectedClaim.claim_status === "in_progress" && (
                      <>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "in_progress", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                        >
                          Save Notes Only
                        </button>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "resolved", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
                        >
                          Resolve Claim
                        </button>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "closed", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition cursor-pointer disabled:opacity-50"
                        >
                          Close Claim
                        </button>
                      </>
                    )}
                    {selectedClaim.claim_status === "resolved" && (
                      <>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "resolved", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                        >
                          Save Notes Only
                        </button>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "closed", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition cursor-pointer disabled:opacity-50"
                        >
                          Close Claim
                        </button>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "open", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                        >
                          Reopen Claim
                        </button>
                      </>
                    )}
                    {selectedClaim.claim_status === "closed" && (
                      <>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "closed", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                        >
                          Save Notes Only
                        </button>
                        <button
                          onClick={() => handleClaimStatusChange(selectedClaim.id, "open", adminNotes)}
                          disabled={updatingClaimId === selectedClaim.id}
                          className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                        >
                          Reopen Claim
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 border-t border-gray-100 pt-3">
                    <button
                      onClick={() => handleReplyClaimViaEmail(selectedClaim)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Mail className="h-4 w-4" />
                      Reply via Email
                    </button>
                    <button
                      onClick={() => {
                        setShowClaimDetail(false);
                        setSelectedClaim(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {deleteClaimConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
                <div className="px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Confirm Deletion
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete this warranty claim? This
                    action cannot be undone.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
                  <button
                    onClick={() => setDeleteClaimConfirm(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteClaim(deleteClaimConfirm)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
