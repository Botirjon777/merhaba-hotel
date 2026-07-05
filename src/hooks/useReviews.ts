import { useState, useEffect } from 'react';

const PROPERTY_ID = 506781;
const CACHE_DURATION = 3600 * 1000; // 1 hour in ms

export interface RateSummary {
  rate: {
    providerName: string;
    providerAddress: string;
    rate: number;
    maxRate: number;
    reviewsCount: number;
    textRate: string;
  };
  providerRates: {
    rate: number;
    maxRate: number;
    categoryName: string;
  }[];
  ratingAssessmentCounts: Record<string, number>;
  reviewsCount: number;
}

export interface Review {
  reviewGuid: string;
  reviewId: number;
  reviewRates: { 
    rate: number; 
    maxRate: number; 
    textRate: string;
    percentRate?: number;
  }[];
  text: string;
  translateText?: string;
  date: string;
  authorName: string;
  source: { 
    name: string; 
    code: string;
    id?: number;
    hideIcon?: boolean;
  };
  language: string;
  reviewResponses?: {
    date: string;
    text: string;
    reviewGuid?: string;
  }[];
}

export interface ReviewsResponse {
  reviews: Review[];
}

function getCache(key: string) {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data, timestamp } = JSON.parse(item);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function setCache(key: string, data: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}

export function useRateSummary(language: string = 'ru') {
  const [data, setData] = useState<RateSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `rate_summary_${language}`;

    const fetchRate = async () => {
      // Check cache first
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        setData(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const apiLang = ['en', 'ru', 'uz'].includes(language) ? language : 'ru';
        const res = await fetch(`https://uz-ibe.hopenapi.com/reputation-widget-api/rate?id=${PROPERTY_ID}&language=${apiLang}&extended=true`);
        if (!res.ok) throw new Error('Failed to fetch rate summary');
        const json = await res.json();
        
        if (isMounted) {
          setData(json);
          setCache(cacheKey, json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRate();
    return () => { isMounted = false; };
  }, [language]);

  return { data, isLoading, error };
}

export function useDetailedReviews(language: string = 'ru', limit: number = 10) {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `detailed_reviews_${language}_${limit}`;

    const fetchReviews = async () => {
      // Check cache first
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        setData(cachedData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const apiLang = ['en', 'ru', 'uz'].includes(language) ? language : 'ru';
        const res = await fetch(`https://uz-ibe.hopenapi.com/reputation-widget-api/reviews?id=${PROPERTY_ID}&language=${apiLang}&sort=date&order=desc&limit=${limit}`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const json = await res.json();
        
        if (isMounted) {
          setData(json);
          setCache(cacheKey, json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReviews();
    return () => { isMounted = false; };
  }, [language, limit]);

  return { data, isLoading, error };
}


