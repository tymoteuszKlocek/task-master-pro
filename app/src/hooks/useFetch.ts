import { useEffect, useState, useCallback } from "react";

export function useFetch<T>(url: string) {

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(
        async (signal?: AbortSignal) => {
            setIsLoading(true);
            setError(null);

            try {
                const resp = await fetch(url,{ signal });

                if (!resp.ok) {
                    throw new Error(`HTTP ${resp.status}`);
                }

                const data = await resp.json();
                setData(data);

            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                const message = e instanceof Error ? e.message : "Fetch failed";
                setError(message);
            } finally {
                setIsLoading(false);
            }

        }, [url]);

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);

        return () => {
            controller.abort();
        }
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}