import { useState, useEffect } from "react";
import { products } from "../data/products";
import {
  fetchDbProducts,
  createDbProduct,
  updateDbProduct,
  deleteDbProduct,
} from "./adminApi";
import type { DbProduct } from "../lib/types";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Package,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const categories = [
  "residential",
  "commercial",
  "portable",
  "monitoring",
  "industrial",
];

const defaultFormData = {
  name: "",
  model: "",
  category: "residential",
  capacity: 0,
  capacity_label: "",
  power: "",
  voltage: "",
  warranty: "",
  badge: "",
  features: "",
  image_url: "",
  hover_image_url: "",
  description: "",
  what_included: "",
  warranty_support: "",
  specifications: [{ key: "", value: "" }],
  detailed_key_features: "",
  applications: "",
  is_active: true,
};

export default function AdminProducts() {
  const [customProducts, setCustomProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    general: true,
    specs: true,
    overview: true,
    technical: true,
    features: true,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchDbProducts();
      setCustomProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function toggleSection(key: string) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function openAddForm() {
    setEditingProduct(null);
    setFormData(defaultFormData);
    setShowForm(true);
  }

  function openEditForm(product: DbProduct) {
    setEditingProduct(product);
    const specs = product.specifications
      ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }];
    setFormData({
      name: product.name,
      model: product.model,
      category: product.category,
      capacity: product.capacity,
      capacity_label: product.capacity_label,
      power: product.power,
      voltage: product.voltage,
      warranty: product.warranty,
      badge: product.badge,
      features: product.features?.join(", ") || "",
      image_url: product.image_url,
      hover_image_url: product.hover_image_url || "",
      description: product.description || "",
      what_included: product.what_included?.join("\n") || "",
      warranty_support: product.warranty_support?.join("\n") || "",
      specifications: specs.length > 0 ? specs : [{ key: "", value: "" }],
      detailed_key_features: product.detailed_key_features?.join("\n") || "",
      applications: product.applications?.join("\n") || "",
      is_active: product.is_active,
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingProduct(null);
    setFormData(defaultFormData);
  }

  function addSpecRow() {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "" }],
    });
  }

  function removeSpecRow(index: number) {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((_, i) => i !== index),
    });
  }

  function updateSpecRow(index: number, field: "key" | "value", val: string) {
    const updated = [...formData.specifications];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, specifications: updated });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const specs: Record<string, string> = {};
      formData.specifications.forEach((s) => {
        if (s.key.trim()) specs[s.key.trim()] = s.value.trim();
      });

      const payload = {
        product_id: editingProduct?.product_id || Date.now(),
        name: formData.name,
        model: formData.model,
        category: formData.category,
        capacity: Number(formData.capacity),
        capacity_label: formData.capacity_label,
        power: formData.power,
        voltage: formData.voltage,
        warranty: formData.warranty,
        badge: formData.badge,
        features: formData.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f.length > 0),
        image_url: formData.image_url,
        hover_image_url: formData.hover_image_url,
        description: formData.description,
        what_included: formData.what_included
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
        warranty_support: formData.warranty_support
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
        specifications: specs,
        detailed_key_features: formData.detailed_key_features
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
        applications: formData.applications
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0),
        image_data: "",
        hover_image_data: "",
        has_variants: false,
        is_active: formData.is_active,
        sort_order: editingProduct?.sort_order || customProducts.length + 1,
      };

      if (editingProduct) {
        await updateDbProduct(editingProduct.id, payload);
        toast.success("Product updated successfully");
      } else {
        await createDbProduct(payload);
        toast.success("Product created successfully");
      }

      closeForm();
      await loadProducts();
    } catch (err) {
      toast.error(editingProduct ? "Failed to update product" : "Failed to create product");
    } finally {
      setSaving(false);
    }
  }

  async function importProductToDb(product: typeof products[0]): Promise<string | null> {
    try {
      const existing = customProducts.find((p) => p.product_id === product.id);
      if (existing) return existing.id;

      const payload = {
        product_id: product.id,
        name: product.name,
        model: product.model,
        category: product.category,
        capacity: product.capacity,
        capacity_label: product.capacityLabel,
        power: product.power,
        voltage: product.voltage,
        warranty: product.warranty,
        badge: product.badge || "",
        features: product.features || [],
        image_url: product.image?.[0] || "",
        hover_image_url: product.image?.[1] || "",
        image_data: "",
        hover_image_data: "",
        description: product.description || "",
        what_included: product.what_included || [],
        warranty_support: product.warranty_support || [],
        specifications: product.specifications || {},
        detailed_key_features: product.detailed_key_features || product.keyFeatures || [],
        applications: product.applications || [],
        has_variants: product.hasVariants || false,
        is_active: true,
        sort_order: customProducts.length + 1,
      };
      const created = await createDbProduct(payload);
      await loadProducts();
      return created.id;
    } catch (err) {
      toast.error(`Failed to import "${product.name}"`);
      return null;
    }
  }

  async function handleDeleteDefault(product: typeof products[0]) {
    if (!confirm(`Delete "${product.name}"? It will be imported to DB first then removed.`)) return;
    try {
      const dbId = await importProductToDb(product);
      if (dbId) {
        setDeletingId(dbId);
        await deleteDbProduct(dbId);
        toast.success(`"${product.name}" deleted`);
        await loadProducts();
      }
    } catch {
      toast.error(`Failed to delete "${product.name}"`);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      setDeletingId(id);
      await deleteDbProduct(id);
      toast.success("Product deleted successfully");
      await loadProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleImportAll() {
    const toImport = products.filter((p) => !customProducts.some((c) => c.product_id === p.id));
    if (toImport.length === 0) {
      toast.info("All products already imported");
      return;
    }
    try {
      for (const product of toImport) {
        await importProductToDb(product);
      }
      toast.success(`${toImport.length} products imported`);
      await loadProducts();
    } catch {
      toast.error("Failed to import some products");
    }
  }

  function SectionHeader({ title, sectionKey }: { title: string; sectionKey: string }) {
    return (
      <button
        type="button"
        onClick={() => toggleSection(sectionKey)}
        className="flex w-full items-center justify-between border-b bg-gray-50 px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
    );
  }

  const selectClass =
    "flex h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage default and custom products
          </p>
        </div>
        <Button onClick={openAddForm} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Unified Products Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
          </div>
          <Button variant="outline" size="sm" onClick={handleImportAll}>
            <Plus className="h-4 w-4 mr-1" />
            Import All to Database
          </Button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Default Products */}
                {products.map((product) => {
                  return (
                    <tr key={`default-${product.id}`} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-400">{product.model}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 capitalize text-gray-500">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant="secondary" className="text-xs">Built-in</Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(null);
                              setFormData({
                                name: product.name,
                                model: product.model,
                                category: product.category,
                                capacity: product.capacity,
                                capacity_label: product.capacityLabel,
                                power: product.power,
                                voltage: product.voltage,
                                warranty: product.warranty,
                                badge: product.badge || "",
                                features: product.features?.join(", ") || "",
                                image_url: product.image?.[0] || "",
                                hover_image_url: product.image?.[1] || "",
                                description: product.description || "",
                                what_included: "",
                                warranty_support: "",
                                specifications: product.specifications
                                  ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
                                  : [{ key: "", value: "" }],
                                detailed_key_features: product.keyFeatures?.join("\n") || "",
                                applications: product.applications?.join("\n") || "",
                                is_active: true,
                              });
                              setShowForm(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteDefault(product)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* Custom Products (DB) */}
                {customProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.model}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 capitalize text-gray-500">
                      {product.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">Custom</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deletingId === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={closeForm} />
          <div className="relative z-50 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct ? "Edit Product" : "Create New Product"}
              </h3>
              <button onClick={closeForm} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="divide-y">
              {/* Section 1: General Product Information */}
              <div>
                <SectionHeader title="1. General Product Information" sectionKey="general" />
                {expandedSections.general && (
                  <div className="space-y-4 px-6 py-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Product ID (Unique Number) *
                      </label>
                      <Input
                        type="number"
                        value={formData.capacity || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: Number(e.target.value) })
                        }
                        placeholder="Unique numeric ID (e.g. 1001)"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className={selectClass}
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Product Title *
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. P2G LV Energy Vault 25"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Model Subtitle *
                        </label>
                        <Input
                          value={formData.model}
                          onChange={(e) =>
                            setFormData({ ...formData, model: e.target.value })
                          }
                          placeholder="e.g. LV 5 kWh"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Product Overview Description *
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Enter full overview description..."
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Main Image URL (View 1) *
                        </label>
                        <Input
                          value={formData.image_url}
                          onChange={(e) =>
                            setFormData({ ...formData, image_url: e.target.value })
                          }
                          placeholder="public/images/product-main.webp"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Hover Image URL (View 2)
                        </label>
                        <Input
                          value={formData.hover_image_url}
                          onChange={(e) =>
                            setFormData({ ...formData, hover_image_url: e.target.value })
                          }
                          placeholder="public/images/product-hover.webp"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Quick Specs & Capacity Options */}
              <div>
                <SectionHeader title="2. Quick Specs & Select Capacity Options" sectionKey="specs" />
                {expandedSections.specs && (
                  <div className="space-y-4 px-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Quick Spec: Capacity *
                        </label>
                        <Input
                          value={formData.capacity_label}
                          onChange={(e) =>
                            setFormData({ ...formData, capacity_label: e.target.value })
                          }
                          placeholder="e.g. 5 kWh (1 Unit)"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Quick Spec: Power *
                        </label>
                        <Input
                          value={formData.power}
                          onChange={(e) =>
                            setFormData({ ...formData, power: e.target.value })
                          }
                          placeholder="e.g. 2.5 kW"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Quick Spec: Voltage *
                        </label>
                        <Input
                          value={formData.voltage}
                          onChange={(e) =>
                            setFormData({ ...formData, voltage: e.target.value })
                          }
                          placeholder="e.g. 51.2V"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Quick Spec: Warranty *
                        </label>
                        <Input
                          value={formData.warranty}
                          onChange={(e) =>
                            setFormData({ ...formData, warranty: e.target.value })
                          }
                          placeholder="e.g. 5 Years"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                          Badge
                        </label>
                        <Input
                          value={formData.badge}
                          onChange={(e) =>
                            setFormData({ ...formData, badge: e.target.value })
                          }
                          placeholder="e.g. Residential"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Features Tags (Comma-separated pills)
                      </label>
                      <Input
                        value={formData.features}
                        onChange={(e) =>
                          setFormData({ ...formData, features: e.target.value })
                        }
                        placeholder="Reliable, Space Saving, Easy Installation"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Overview Tab Feature Lists */}
              <div>
                <SectionHeader title="3. Overview Tab Feature Lists & Badges" sectionKey="overview" />
                {expandedSections.overview && (
                  <div className="space-y-4 px-6 py-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        What's Included Checklist (One per line)
                      </label>
                      <Textarea
                        value={formData.what_included}
                        onChange={(e) =>
                          setFormData({ ...formData, what_included: e.target.value })
                        }
                        placeholder={"P2G Energy Vault Unit\nInstallation Manual\nWarranty Certificate\nMounting Bracket\nBattery Connection Cables"}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Warranty & Support Checklist (One per line)
                      </label>
                      <Textarea
                        value={formData.warranty_support}
                        onChange={(e) =>
                          setFormData({ ...formData, warranty_support: e.target.value })
                        }
                        placeholder={"5 Years Manufacturer Warranty\n24/7 Technical Support\nFree Installation Guidance\nApp Connectivity"}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: Technical Specifications Tab */}
              <div>
                <SectionHeader title="4. Technical Specifications Tab (Table Fields)" sectionKey="technical" />
                {expandedSections.technical && (
                  <div className="space-y-4 px-6 py-4">
                    {formData.specifications.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          value={spec.key}
                          onChange={(e) => updateSpecRow(idx, "key", e.target.value)}
                          placeholder="Table field name (e.g. Energy Capacity)"
                          className="flex-1"
                        />
                        <Input
                          value={spec.value}
                          onChange={(e) => updateSpecRow(idx, "value", e.target.value)}
                          placeholder="Value (e.g. 5 kWh)"
                          className="flex-1"
                        />
                        {formData.specifications.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSpecRow(idx)}
                            className="text-red-500 hover:text-red-600 flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSpecRow}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Spec Row
                    </Button>
                  </div>
                )}
              </div>

              {/* Section 5: Features & Applications Tab */}
              <div>
                <SectionHeader title="5. Features & Applications Tab" sectionKey="features" />
                {expandedSections.features && (
                  <div className="space-y-4 px-6 py-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Detailed Key Features List (One per line)
                      </label>
                      <Textarea
                        value={formData.detailed_key_features}
                        onChange={(e) =>
                          setFormData({ ...formData, detailed_key_features: e.target.value })
                        }
                        placeholder={"Space saving compact wall mount design\nHigh efficiency LFP cell battery technology\nEasy plug-and-play installation\nAutomatic protection against overcharge and short circuit"}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Recommended Applications List (One per line)
                      </label>
                      <Textarea
                        value={formData.applications}
                        onChange={(e) =>
                          setFormData({ ...formData, applications: e.target.value })
                        }
                        placeholder={"Residential homes & apartments\nSmall offices & home workspaces\nSolar backup storage"}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) =>
                          setFormData({ ...formData, is_active: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                        Active (visible on site)
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {editingProduct ? "Update Product" : "Save Full Product Record"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
