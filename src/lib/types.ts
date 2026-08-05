export interface ProductVariant {
  capacity: string;
  capacityLabel: string;
  model: string;
  power: string;
  voltage?: string;
  features: string[];
  description: string;
  specifications: Record<string, string>;
  keyFeatures: string[];
  applications: string[];
}

export interface Product {
  id: number;
  name: string;
  model: string;
  category: string;
  image: string[];
  capacity: number;
  capacityLabel: string;
  power: string;
  voltage: string;
  warranty: string;
  badge?: string;
  features: string[];
  animationInterval?: number;
  hasVariants?: boolean;
  variants?: ProductVariant[];
  description?: string;
  specifications?: Record<string, string>;
  keyFeatures?: string[];
  applications?: string[];
  what_included?: string[];
  warranty_support?: string[];
  detailed_key_features?: string[];
}

export interface DbProduct {
  id: string;
  product_id: number;
  name: string;
  model: string;
  category: string;
  capacity: number;
  capacity_label: string;
  power: string;
  voltage: string;
  warranty: string;
  badge: string;
  features: string[];
  image_url: string;
  hover_image_url: string;
  image_data?: string;
  hover_image_data?: string;
  description: string;
  what_included: string[];
  warranty_support: string[];
  specifications: Record<string, string>;
  detailed_key_features: string[];
  applications: string[];
  has_variants: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbProductVariant {
  id: string;
  product_id: string;
  capacity: string;
  capacity_label: string;
  model: string;
  power: string;
  voltage: string;
  features: string[];
  description: string;
  specifications: Record<string, string>;
  key_features: string[];
  applications: string[];
  sort_order: number;
  created_at: string;
}

export interface WarrantyRegistration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  product_model: string;
  serial_number: string;
  purchase_date: string;
  dealer_name: string;
  dealer_location: string;
  warranty_status: string;
  admin_notes?: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface WarrantyClaim {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  serial_number: string;
  product_model: string;
  purchase_date: string;
  claim_type: string;
  issue_description: string;
  attachment_urls: string[];
  claim_status: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}
