"use client";
import { PaginationState } from "@tanstack/react-table";
import {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";

interface JobContextType {
  refresh: () => void;
  isRefreshing: boolean;
  pagination: PaginationState;
  setPagination: (value: SetStateAction<PaginationState>) => void;
  refreshKey: number;
  setRefreshKey: (value: SetStateAction<number>) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function RefreshProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    });
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  return (
    <JobContext.Provider
      value={{ refresh, isRefreshing, pagination, setPagination, refreshKey, setRefreshKey }}
    >
      {children}
    </JobContext.Provider>
  );
}

export const useRefresh = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useRefresh must be used within JobProvider");
  return context;
};
