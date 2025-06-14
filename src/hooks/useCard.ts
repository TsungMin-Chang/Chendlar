import { useCallback } from "react";

import type { UpdateCardRequest } from "@/validators/crudTypes";

const userId = "f60ff11e-d4e8-4faa-9eae-0c4e9567e48d";

export default function useCard() {
  const getCards = useCallback(async () => {
    const res = await fetch(`/api/cards`, {
      method: "GET",
      headers: { userId },
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    const body = await res.json();
    return body;
  }, []);

  const postCard = useCallback(async () => {
    const data = {
      userId,
      name: "initialDB_" + new Date().getTime().toString(),
    };
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/cards`, {
      method: "POST",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const updateCard = useCallback(async (data: UpdateCardRequest) => {
    const jsonData = JSON.stringify(data);
    const res = await fetch(`/api/cards`, {
      method: "PUT",
      body: jsonData,
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  const deleteCard = useCallback(async (cardName: string) => {
    const utf8Bytes = new TextEncoder().encode(cardName);
    const base64EncodedString = btoa(String.fromCharCode(...utf8Bytes));
    const res = await fetch(`/api/cards`, {
      method: "DELETE",
      headers: { cardName: base64EncodedString },
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    return;
  }, []);

  return {
    getCards,
    postCard,
    updateCard,
    deleteCard,
  };
}
