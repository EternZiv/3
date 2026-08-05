import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import type { Product } from "../lib/types";

interface CompareContextType {
  comparedProducts: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isCompared: (productId: number) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("p2g_compare_list");
    if (saved) {
      try {
        setComparedProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse compare list from localStorage", e);
      }
    }
  }, []);

  const saveCompareList = (list: Product[]) => {
    setComparedProducts(list);
    localStorage.setItem("p2g_compare_list", JSON.stringify(list));
  };

  const addToCompare = (product: Product) => {
    if (comparedProducts.some((p) => p.id === product.id)) {
      toast.info(`${product.name} is already in the comparison list.`);
      return;
    }
    if (comparedProducts.length >= 3) {
      toast.error("You can compare up to 3 products at a time.", {
        description: "Remove an item from your list to add this one.",
      });
      return;
    }
    const newList = [...comparedProducts, product];
    saveCompareList(newList);
    toast.success(`Added ${product.name} to comparison list.`, {
      description: `${newList.length}/3 products selected.`,
    });
  };

  const removeFromCompare = (productId: number) => {
    const product = comparedProducts.find((p) => p.id === productId);
    const newList = comparedProducts.filter((p) => p.id !== productId);
    saveCompareList(newList);
    if (product) {
      toast.info(`Removed ${product.name} from comparison list.`);
    }
  };

  const clearCompare = () => {
    saveCompareList([]);
    toast.info("Cleared comparison list.");
  };

  const isCompared = (productId: number) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
