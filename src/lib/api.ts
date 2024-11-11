import { goto } from "$app/navigation";

let URL = "/api";

export type Action = "TAB" | "LINK" | "COPY";
export const actionEntries: Action[] = ["TAB", "LINK", "COPY"]

export interface Link {
  payload: string;
  action: Action;
}

export interface Address {
  id: string;
  direct: boolean;
  code: string;
  links: Link[];
}

export interface User {
  username: string;
  password: string;
}

export function cookieExists(name: string): boolean {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${name}=`));
}

export async function checkAuth(code: string): Promise<void> {
  if (cookieExists("token")) return;

  //If both tokens are missing redirect to login page
  if (!cookieExists("refreshToken")) {
    goto(`/login/${code}`)
    throw undefined;
  }

  //Attempt to login with refreshToken
  await loginToken().catch((error) => {
    goto(`/login/${code}`)
    throw undefined;
  });
}

export async function getAddress(code: string): Promise<Address> {
  try {
    const response = await fetch(`${URL}/address/${code}`);
    if (response.status !== 200) throw response.status;
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function postAddress(address: Address): Promise<Address> {
  try {
    await checkAuth(address.code)

    const response = await fetch(`${URL}/address`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function putAddress(address: Address): Promise<void> {
  try {
    await checkAuth(address.code)

    const response = await fetch(`${URL}/address/${address.code}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });

    if (response.status != 200) throw response.status;
  } catch (error) {
    throw error;
  } 
}

export async function deleteAddress(code: string): Promise<void> {
  try {
    await checkAuth(code)

    const response = await fetch(`${URL}/address/${code}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.status != 200) throw response.status;
  } catch (error) {
    throw error;
  }
}

export async function login(user: User): Promise<void> {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (response.status != 200) throw response.status;
  } catch (error) {
    throw error;
  }
}

export async function loginToken(): Promise<void> {
  try {
    const response = await fetch(`${URL}/login`, { method: "POST" });
    if (response.status != 200) throw response.status;
  } catch (error) {
    throw error;
  }
}