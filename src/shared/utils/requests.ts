import typedFetch from "@/shared/utils/typed-fetch"

export default function requests(backendUrl: string) {
  const sendGetRequest = <T>(path: string) => {
    return typedFetch<T>(backendUrl + path, {
      method: "GET",
      headers: {}
    })
  }

  const sendPostRequest = <T>(path: string, body: { [key: string]: any }) => {
    return typedFetch<T>(backendUrl + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
  }

  const sendDeleteRequest = <T>(path: string, body: { [key: string]: any }) => typedFetch<T>(backendUrl + path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })

  return {
    post: sendPostRequest,
    get: sendGetRequest,
    _delete: sendDeleteRequest
  }
}