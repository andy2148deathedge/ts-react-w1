import { type } from "os";

type Currency = {
  name: string,
  rate: number
}

interface NewCurrency {
  currency: string | null,
  rate: number | null
}

export type { Currency, NewCurrency };  