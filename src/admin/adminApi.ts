import { supabase } from "../lib/supabase";
import type { DbProduct, DbProductVariant, WarrantyRegistration, ContactMessage, WarrantyClaim } from "../lib/types";
import { getAdminSession } from "./adminAuth";

// Helper to retrieve admin credentials from session
function getAdminCreds() {
  const session = getAdminSession();
  const username = session?.username || "";
  const hash = localStorage.getItem("p2g_admin_hash") || "";
  return { p_username: username, p_password_hash: hash };
}

export async function fetchDbProducts(): Promise<DbProduct[]> {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_fetch_products", {
    p_username,
    p_password_hash,
  });
  if (error) throw error;
  return (data || []) as DbProduct[];
}

export async function fetchDbProductVariants(productId: string): Promise<DbProductVariant[]> {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_fetch_product_variants", {
    p_username,
    p_password_hash,
    p_product_id: productId,
  });
  if (error) throw error;
  return (data || []) as DbProductVariant[];
}

export async function createDbProduct(product: Omit<DbProduct, "id" | "created_at" | "updated_at">) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_create_product", {
    p_username,
    p_password_hash,
    p_product: product,
  });
  if (error) throw error;
  return data as DbProduct;
}

export async function updateDbProduct(id: string, updates: Partial<DbProduct>) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_update_product", {
    p_username,
    p_password_hash,
    p_id: id,
    p_updates: updates,
  });
  if (error) throw error;
}

export async function deleteDbProduct(id: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_delete_product", {
    p_username,
    p_password_hash,
    p_id: id,
  });
  if (error) throw error;
}

export async function createDbProductVariant(variant: Omit<DbProductVariant, "id" | "created_at">) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_create_product_variant", {
    p_username,
    p_password_hash,
    p_variant: variant,
  });
  if (error) throw error;
  return data as DbProductVariant;
}

export async function updateDbProductVariant(id: string, updates: Partial<DbProductVariant>) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_update_product_variant", {
    p_username,
    p_password_hash,
    p_id: id,
    p_updates: updates,
  });
  if (error) throw error;
}

export async function deleteDbProductVariant(id: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_delete_product_variant", {
    p_username,
    p_password_hash,
    p_id: id,
  });
  if (error) throw error;
}

export async function fetchWarrantyRegistrations(): Promise<WarrantyRegistration[]> {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_fetch_warranties", {
    p_username,
    p_password_hash,
  });
  if (error) throw error;
  return (data || []) as WarrantyRegistration[];
}

// Public registration submission (inserts directly using RLS write-only policy)
export async function createWarrantyRegistration(reg: Omit<WarrantyRegistration, "id" | "created_at" | "warranty_status">): Promise<void> {
  const { error } = await supabase
    .from("warranty_registrations")
    .insert(reg);
  if (error) throw error;
}

export async function updateWarrantyStatus(id: string, status: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_update_warranty_status", {
    p_username,
    p_password_hash,
    p_id: id,
    p_status: status,
  });
  if (error) throw error;
}

export async function deleteWarrantyRegistration(id: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_delete_warranty", {
    p_username,
    p_password_hash,
    p_id: id,
  });
  if (error) throw error;
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_fetch_messages", {
    p_username,
    p_password_hash,
  });
  if (error) throw error;
  return (data || []) as ContactMessage[];
}

// Public contact message submission (inserts directly using RLS write-only policy)
export async function createContactMessage(msg: Omit<ContactMessage, "id" | "created_at" | "is_read">): Promise<void> {
  const { error } = await supabase
    .from("contact_messages")
    .insert(msg);
  if (error) throw error;
}

export async function markMessageRead(id: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_mark_message_read", {
    p_username,
    p_password_hash,
    p_id: id,
  });
  if (error) throw error;
}

export async function deleteContactMessage(id: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_delete_message", {
    p_username,
    p_password_hash,
    p_id: id,
  });
  if (error) throw error;
}

export async function fetchWarrantyClaims(): Promise<WarrantyClaim[]> {
  const { p_username, p_password_hash } = getAdminCreds();
  const { data, error } = await supabase.rpc("admin_fetch_claims", {
    p_username,
    p_password_hash,
  });
  if (error) throw error;
  return (data || []) as WarrantyClaim[];
}

// Public claim submission (inserts directly using RLS write-only policy)
export async function createWarrantyClaim(claim: Omit<WarrantyClaim, "id" | "created_at" | "updated_at" | "claim_status" | "admin_notes">): Promise<void> {
  const { error } = await supabase
    .from("warranty_claims")
    .insert(claim);
  if (error) throw error;
}

export async function updateWarrantyClaimStatus(id: string, status: string, adminNotes?: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_update_claim_status", {
    p_username,
    p_password_hash,
    p_id: id,
    p_status: status,
    p_notes: adminNotes || "",
  });
  if (error) throw error;
}

export async function deleteWarrantyClaim(id: string) {
  const { p_username, p_password_hash } = getAdminCreds();
  const { error } = await supabase.rpc("admin_delete_claim", {
    p_username,
    p_password_hash,
    p_id: id,
  });
  if (error) throw error;
}

// Public lookup using a secure RPC wrapper that only retrieves a single serial-matching warranty (to prevent table scraping)
export async function lookupWarrantyBySerial(serialNumber: string): Promise<WarrantyRegistration | null> {
  const { data, error } = await supabase.rpc("public_lookup_warranty_by_serial", {
    p_serial_number: serialNumber,
  });
  if (error || !data || data.length === 0) return null;
  return data[0] as WarrantyRegistration;
}
