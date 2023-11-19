import Logger from "@/shared/utils/logger"

export default async function typedFetch<T = unknown>(input: RequestInfo | URL, init?: RequestInit, signal?: AbortSignal) {
  const reqBody = {
    signal,
    ...(init ?? {})
  }

  try {
    const res = await fetch(input, reqBody).then(response => response.json()).catch((e: any) => {
      throw new Error("Fetch exception", e)
    }) as Promise<T>

    if ((res as never as { statusCode: number }).statusCode) {
      return undefined
    }

    return res as T
  } catch (e: any) {
    Logger.errorFrom("Fetch", e?.message)
    return undefined
  }
}