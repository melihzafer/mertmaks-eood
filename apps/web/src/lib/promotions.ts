import { readFileSync } from 'fs';
import { join } from 'path';

export interface Promotion {
  id: string;
  title: string;
  description: string;
  store: 'supermarket' | 'industrial' | 'construction';
  category: string;
  discount: number;
  validFrom: string;
  validTo: string;
  active: boolean;
  featured: boolean;
  image: string;
  terms: string[];
}

/**
 * Load promotions from JSONL file (Server-side only)
 */
function loadPromotions(): Promotion[] {
  try {
    const filePath = join(process.cwd(), 'data', 'promotions.jsonl');
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    return lines.map(line => JSON.parse(line));
  } catch (error) {
    console.error('Failed to load promotions:', error);
    return [];
  }
}

/**
 * Get all active promotions
 */
export function getActivePromotions(): Promotion[] {
  const promotions = loadPromotions();
  const now = new Date();
  
  return promotions.filter(promo => {
    if (!promo.active) return false;
    
    const validFrom = new Date(promo.validFrom);
    const validTo = new Date(promo.validTo);
    
    return now >= validFrom && now <= validTo;
  });
}

/**
 * Get featured promotions (active + featured flag)
 */
export function getFeaturedPromotions(): Promotion[] {
  return getActivePromotions().filter(promo => promo.featured);
}

/**
 * Get promotions by store
 */
export function getPromotionsByStore(storeId: string): Promotion[] {
  return getActivePromotions().filter(promo => promo.store === storeId);
}

/**
 * Get promotions by category
 */
export function getPromotionsByCategory(category: string): Promotion[] {
  return getActivePromotions().filter(promo => promo.category === category);
}

/**
 * Get a single promotion by ID
 */
export function getPromotion(id: string): Promotion | undefined {
  const promotions = loadPromotions();
  return promotions.find(promo => promo.id === id);
}

/**
 * Check if a promotion is currently valid
 */
export function isPromotionValid(promotion: Promotion): boolean {
  if (!promotion.active) return false;
  
  const now = new Date();
  const validFrom = new Date(promotion.validFrom);
  const validTo = new Date(promotion.validTo);
  
  return now >= validFrom && now <= validTo;
}

/**
 * Get formatted date range for a promotion
 */
export function getPromotionDateRange(promotion: Promotion): string {
  const validFrom = new Date(promotion.validFrom);
  const validTo = new Date(promotion.validTo);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bg-BG', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  return `${formatDate(validFrom)} - ${formatDate(validTo)}`;
}
