"use server";

import type { FullDashboardData } from "../types";
import { fetchFullDashboardData } from "../services/dataServices";

export async function getFullDashboardDataAction(): Promise<{
  data: FullDashboardData | null;
  error: string | null;
}> {
  try {
    const fullData = await fetchFullDashboardData();
    return { data: fullData, error: null };
  } catch (e) {
    // const error = e instanceof Error ? e.message : "An unknown error occurred";
    console.error("Error in getFullDashboardDataAction:", e);
    return { data: null, error: "Gagal memuat data dasbor." };
  }
}
